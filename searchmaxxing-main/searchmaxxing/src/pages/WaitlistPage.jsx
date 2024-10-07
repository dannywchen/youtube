import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [functionality, setFunctionality] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitted:', { email, functionality });
    // Reset form
    setEmail('');
    setFunctionality('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join our waitlist
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="functionality" className="block text-sm font-medium text-gray-700">
                What functionality would you like to see? (optional)
              </label>
              <div className="mt-1">
                <Textarea
                  id="functionality"
                  name="functionality"
                  rows={3}
                  value={functionality}
                  onChange={(e) => setFunctionality(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Join Waitlist
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;