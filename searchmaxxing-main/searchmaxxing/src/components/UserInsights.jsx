import React, { useState, useCallback } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const UserInsights = () => {
  const [subreddit, setSubreddit] = useState('');
  const [activeTab, setActiveTab] = useState('hot');

  const postsQuery = useCallback(() => {
    return query(
      collection(db, 'posts'),
      where('subreddit', '==', subreddit),
      orderBy(activeTab === 'hot' ? 'score' : activeTab === 'new' ? 'created' : 'score', 'desc'),
      limit(20)
    );
  }, [subreddit, activeTab]);

  const [posts, loading, error] = useCollectionData(postsQuery());

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>User Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input 
            type="text" 
            placeholder="Enter subreddit name" 
            value={subreddit} 
            onChange={(e) => setSubreddit(e.target.value)}
            className="mr-2"
          />
          <Button onClick={() => {}}>Search</Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="hot">Hot</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="top">Top</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {posts && (
              <div>
                {posts.map((post) => (
                  <div key={post.id} className="p-2 mb-2 bg-secondary rounded">
                    <h3 className="font-bold">{post.title}</h3>
                    <p>{post.selftext.substring(0, 100)}...</p>
                    <div className="text-sm text-muted-foreground">
                      <span>{post.score} upvotes</span>
                      <span className="ml-2">{post.num_comments} comments</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};