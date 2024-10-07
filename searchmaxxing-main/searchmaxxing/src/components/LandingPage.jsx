import React from 'react';
import { Button } from "@/components/ui/button"

const LandingPage = ({ onJoinWaitlist }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Maximize Your Reddit Search
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover insights, track keywords, and explore communities with our advanced Reddit search tool.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button onClick={onJoinWaitlist} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                I Need This
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Learn more
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">Features</h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {['Community Discovery', 'Keyword Tracking', 'Persona Explorer', 'AI Summarizer', 'Trend Analysis', 'Advanced Search'].map((feature) => (
              <div key={feature} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{feature}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;