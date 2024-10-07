import { db } from './firebase.backend.config.js';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const targetSubreddits = ['sales', 'SaaS', 'AWSCertifications', 'SaaSSales', 'micro_saas'];

const MAX_REQUESTS_PER_MINUTE = 30;
const MINUTE_IN_MS = 60000;
let requestCount = 0;
let lastRequestTime = Date.now();

async function rateLimitedRequest(url) {
  const now = Date.now();
  if (now - lastRequestTime >= MINUTE_IN_MS) {
    requestCount = 0;
    lastRequestTime = now;
  }

  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    const waitTime = MINUTE_IN_MS - (now - lastRequestTime);
    console.log(`Rate limit reached. Waiting ${waitTime / 1000} seconds...`);
    await delay(waitTime);
    return rateLimitedRequest(url);
  }

  requestCount++;
  return axios.get(url);
}

async function fetchWithRetry(url, retries = 3, delayMs = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await rateLimitedRequest(url);
      await delay(2000);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log(`Rate limited. Waiting ${delayMs / 1000} seconds before retrying...`);
        await delay(delayMs);
      } else {
        console.error('Error fetching data:', error.message);
        await delay(delayMs);
      }
    }
  }
  throw new Error(`Failed after ${retries} retries`);
}

async function fetchSubredditInfo(subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}/about.json`;
  return fetchWithRetry(url);
}

async function fetchPosts(subreddit, after = null, limit = 100) {
  const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}${after ? `&after=${after}` : ''}`;
  return fetchWithRetry(url);
}

async function fetchComments(postId) {
  const url = `https://www.reddit.com/comments/${postId}.json`;
  return fetchWithRetry(url);
}

async function populateFirestore() {
  const communitiesRef = collection(db, 'communities');
  const postsRef = collection(db, 'posts');

  for (const subreddit of targetSubreddits) {
    try {
      console.log(`Processing subreddit: ${subreddit}`);
      const subredditInfo = await fetchSubredditInfo(subreddit);
      
      if (!subredditInfo.data) {
        console.log(`No data found for subreddit: ${subreddit}`);
        continue;
      }

      const subredditData = {
        name: subredditInfo.data.display_name,
        subscribers: subredditInfo.data.subscribers,
        description: subredditInfo.data.public_description,
        url: `https://www.reddit.com${subredditInfo.data.url}`
      };

      await setDoc(doc(communitiesRef, subreddit), subredditData);
      console.log(`Added/Updated subreddit: ${subreddit}`);

      let postAfter = null;
      let postCount = 0;
      let updatedPostCount = 0;
      let newPostFound = false;
      
      while (!newPostFound) {
        const postsData = await fetchPosts(subreddit, postAfter);
        
        if (!postsData.data || !postsData.data.children) {
          console.log(`No posts found for subreddit: ${subreddit}`);
          break;
        }

        for (const postChild of postsData.data.children) {
          const post = postChild.data;
          const postRef = doc(postsRef, post.id);
          const postDoc = await getDoc(postRef);

          if (!postDoc.exists()) {
            newPostFound = true;
            const postData = {
              id: post.id,
              title: post.title,
              subreddit: post.subreddit,
              author: post.author,
              score: post.score,
              num_comments: post.num_comments,
              created: post.created_utc,
              selftext: post.selftext || '',
              url: post.url,
              permalink: `https://www.reddit.com${post.permalink}`,
              comments: []
            };

            const commentsData = await fetchComments(post.id);
            if (commentsData[1] && commentsData[1].data && commentsData[1].data.children) {
              postData.comments = commentsData[1].data.children.map(comment => ({
                id: comment.data.id,
                author: comment.data.author,
                body: comment.data.body,
                score: comment.data.score,
                created: comment.data.created_utc
              })).filter(comment => comment.id && comment.author && comment.body && comment.score !== undefined && comment.created);
            }

            await setDoc(postRef, postData);
            postCount++;
            console.log(`Added new post: ${post.id}`);
          } else if (!postDoc.data().comments || postDoc.data().comments.length === 0) {
            const commentsData = await fetchComments(post.id);
            if (commentsData[1] && commentsData[1].data && commentsData[1].data.children) {
              const comments = commentsData[1].data.children.map(comment => ({
                id: comment.data.id,
                author: comment.data.author,
                body: comment.data.body,
                score: comment.data.score,
                created: comment.data.created_utc
              })).filter(comment => comment.id && comment.author && comment.body && comment.score !== undefined && comment.created);
              
              if (comments.length > 0) {
                await updateDoc(postRef, { comments });
                updatedPostCount++;
                console.log(`Updated post with comments: ${post.id}`);
              }
            }
          }
          await delay(1000); // Add a small delay between processing each post
        }

        console.log(`Processed ${postsData.data.children.length} posts for ${subreddit}`);
        console.log(`Added ${postCount} new posts, Updated ${updatedPostCount} existing posts`);

        if (!postsData.data.after || newPostFound) break;
        postAfter = postsData.data.after;
        await delay(3000); // Increased delay between pagination requests
      }

      console.log(`Subreddit ${subreddit} summary:`);
      console.log(`- Added ${postCount} new posts`);
      console.log(`- Updated ${updatedPostCount} existing posts`);
      await delay(5000); // Increased delay between processing subreddits
    } catch (error) {
      console.error(`Error processing subreddit ${subreddit}:`, error.message);
      await delay(10000); // Increased delay after encountering an error
    }
  }
}

populateFirestore().catch(console.error);