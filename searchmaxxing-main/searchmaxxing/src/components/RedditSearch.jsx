import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function RedditSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['redditSearch', searchTerm],
    queryFn: async () => {
      const response = await axios.get(`https://www.reddit.com/search.json?q=${searchTerm}`);
      return response.data.data.children;
    },
    enabled: !!searchTerm,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the query
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Search Reddit</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Search
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul className="space-y-4">
          {data.map((post) => (
            <li key={post.data.id} className="border-b pb-2">
              <h3 className="font-semibold">{post.data.title}</h3>
              <p>Subreddit: r/{post.data.subreddit}</p>
              <a href={`https://www.reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View on Reddit
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RedditSearch;