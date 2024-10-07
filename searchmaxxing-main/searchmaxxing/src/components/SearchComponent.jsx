import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ posts: [] });
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({ timeRange: 'all', sortBy: 'relevance' });

  useEffect(() => {
    if (searchTerm) handleSearch();
  }, [searchTerm, filters]);

  const handleSearch = async () => {
    const postsRef = collection(db, 'posts');
    const postSnapshot = await getDocs(postsRef);
    const allPosts = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const filteredPosts = allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.selftext.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      if (filters.timeRange !== 'all') {
        const postDate = new Date(post.created * 1000);
        const timeLimit = new Date();
        timeLimit.setDate(timeLimit.getDate() - parseInt(filters.timeRange));
        if (postDate < timeLimit) return false;
      }

      return true;
    });

    const sortedPosts = filteredPosts.sort((a, b) => {
      if (filters.sortBy === 'relevance') {
        return b.score - a.score;
      } else {
        return b.created - a.created;
      }
    });

    setSearchResults({ posts: sortedPosts.slice(0, 50) });
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <span key={index} className="bg-blue-200 text-blue-800">{part}</span> : part
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Advanced Search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts and communities"
            className="flex-grow"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex space-x-4 mb-4">
          <select
            value={filters.timeRange}
            onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="all">All Time</option>
            <option value="1">Past 24 Hours</option>
            <option value="7">Past Week</option>
            <option value="30">Past Month</option>
            <option value="365">Past Year</option>
          </select>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="relevance">Relevance</option>
            <option value="created">New</option>
          </select>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          {searchResults.posts.map(post => (
            <Card key={post.id} className="mb-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal(post)}>
              <CardHeader>
                <CardTitle className="text-lg">{highlightSearchTerm(post.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">
                  Posted in r/{post.subreddit} by u/{post.author} • {new Date(post.created * 1000).toLocaleString()}
                </p>
                <p className="text-sm">{highlightSearchTerm(post.selftext.substring(0, 150))}...</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="mr-2">{post.score} upvotes</Badge>
                  <Badge variant="outline">{post.num_comments} comments</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              Posted in r/{selectedPost?.subreddit} by u/{selectedPost?.author} • {selectedPost && new Date(selectedPost.created * 1000).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 h-[400px]">
            <p className="text-sm mb-4">{selectedPost?.selftext}</p>
            <h3 className="font-bold mb-2">Comments:</h3>
            {selectedPost?.comments && selectedPost.comments.map(comment => (
              <Card key={comment.id} className="mb-2">
                <CardContent className="py-2">
                  <p className="text-xs text-gray-500 mb-1">u/{comment.author} • {new Date(comment.created * 1000).toLocaleString()}</p>
                  <p className="text-sm">{comment.body}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>Score: {selectedPost?.score}</span>
            <span>Comments: {selectedPost?.num_comments}</span>
          </div>
          <a href={selectedPost?.url} target="_blank" rel="noopener noreferrer" className="mt-4 block text-blue-500 hover:underline">
            View on Reddit
          </a>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SearchComponent;