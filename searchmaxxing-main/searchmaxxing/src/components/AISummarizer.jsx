import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function AISummarizer() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');

  const { isLoading, error, refetch } = useQuery({
    queryKey: ['aiSummary', url],
    queryFn: async () => {
      // This is a mock API call. In a real application, you'd call an AI service.
      const response = await axios.post('https://api.example.com/summarize', { url });
      setSummary(response.data.summary);
      return response.data;
    },
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">AI Summarizer</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Reddit post URL"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Summarize
        </button>
      </form>
      {isLoading && <p>Summarizing...</p>}
      {error && <p>Error: {error.message}</p>}
      {summary && (
        <div>
          <h3 className="font-semibold mb-2">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default AISummarizer;