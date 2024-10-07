import React, { useState, useCallback } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const CommunityFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastVisible, setLastVisible] = useState(null);

  const communitiesQuery = useCallback(() => {
    const baseQuery = query(
      collection(db, 'communities'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff'),
      orderBy('name'),
      limit(10)
    );
    return lastVisible ? query(baseQuery, startAfter(lastVisible)) : baseQuery;
  }, [searchTerm, lastVisible]);

  const [communities, loading, error] = useCollectionData(communitiesQuery());

  const handleSearch = () => {
    setLastVisible(null);
  };

  const loadMore = () => {
    if (communities && communities.length > 0) {
      setLastVisible(communities[communities.length - 1]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Finder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input 
            type="text" 
            placeholder="Search communities" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {communities && (
          <div>
            {communities.map((community) => (
              <div key={community.id} className="p-2 mb-2 bg-secondary rounded">
                <span className="font-bold">{community.name}</span>
                <span className="ml-2">{community.subscribers.toLocaleString()} subscribers</span>
              </div>
            ))}
            {communities.length === 10 && (
              <Button onClick={loadMore} className="mt-4">Load More</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};