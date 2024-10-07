import React, { useState } from 'react';

function KeywordTracker() {
  const [keyword, setKeyword] = useState('');
  const [trackedKeywords, setTrackedKeywords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword && !trackedKeywords.includes(keyword)) {
      setTrackedKeywords([...trackedKeywords, keyword]);
      setKeyword('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Track Keywords</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword to track"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Add Keyword
        </button>
      </form>
      <h3 className="font-semibold mb-2">Tracked Keywords:</h3>
      <ul className="list-disc pl-5">
        {trackedKeywords.map((kw, index) => (
          <li key={index}>{kw}</li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordTracker;