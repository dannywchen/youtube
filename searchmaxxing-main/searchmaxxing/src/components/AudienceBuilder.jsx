import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const AudienceBuilder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  const mockCommunities = [
    { name: 'r/SaaS', members: 50000, growth: '5.2%' },
    { name: 'r/startups', members: 1000000, growth: '3.8%' },
    { name: 'r/Entrepreneur', members: 800000, growth: '4.5%' },
  ];

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  const handleCommunitySelect = (community) => {
    setSelectedCommunities((prev) => 
      prev.includes(community) 
        ? prev.filter(c => c !== community) 
        : [...prev, community]
    );
  };

  const handleCreateAudience = () => {
    console.log('Creating audience with:', selectedCommunities);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Builder</CardTitle>
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
        <div className="mb-4">
          {mockCommunities.map((community) => (
            <div 
              key={community.name} 
              className={`p-2 mb-2 rounded cursor-pointer hover:bg-accent ${
                selectedCommunities.includes(community) ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              }`}
              onClick={() => handleCommunitySelect(community)}
            >
              <span className="font-bold">{community.name}</span>
              <span className="ml-2">{community.members.toLocaleString()} members</span>
              <span className="ml-2 text-green-500">+{community.growth}</span>
            </div>
          ))}
        </div>
        <Button onClick={handleCreateAudience} disabled={selectedCommunities.length === 0}>
          Create Audience
        </Button>
      </CardContent>
    </Card>
  );
};