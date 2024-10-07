import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where, limit, orderBy } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PostFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const postsQuery = query(
    collection(db, 'posts'),
    where('title', '>=', searchTerm),
    where('title', '<=', searchTerm + '\uf8ff'),
    orderBy('title'),
    limit(20)
  );

  const [posts, loading, error] = useCollectionData(postsQuery);

  const handleSearch = () => {
    // Trigger the query
  };

  const calculateMatchRate = (post) => {
    const words = searchTerm.toLowerCase().split(' ');
    const titleWords = post.title.toLowerCase().split(' ');
    const matchCount = words.filter(word => titleWords.includes(word)).length;
    return Math.round((matchCount / words.length) * 100);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts && posts.map((post) => (
          <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => openModal(post)}>
            <CardHeader>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">Subreddit: r/{post.subreddit}</p>
              <Progress value={calculateMatchRate(post)} className="w-full" />
              <p className="text-xs text-right mt-1">{calculateMatchRate(post)}% match</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              Posted in r/{selectedPost?.subreddit} by u/{selectedPost?.author}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm">{selectedPost?.selftext}</p>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Score: {selectedPost?.score}</span>
              <span>Comments: {selectedPost?.num_comments}</span>
            </div>
            <a href={selectedPost?.url} target="_blank" rel="noopener noreferrer" className="mt-4 block text-blue-500 hover:underline">
              View on Reddit
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostFinder;
