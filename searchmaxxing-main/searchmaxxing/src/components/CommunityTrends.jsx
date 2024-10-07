import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommunityTrends() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await axios.get('https://www.reddit.com/subreddits/popular.json');
        setTrends(response.data.data.children);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Community Trends</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {trends.length > 0 && (
        <ul className="space-y-4">
          {trends.map((subreddit) => (
            <li key={subreddit.data.id} className="border-b pb-2">
              <h3 className="font-semibold">{subreddit.data.display_name}</h3>
              <p>{subreddit.data.public_description}</p>
              <p>Subscribers: {subreddit.data.subscribers}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommunityTrends;