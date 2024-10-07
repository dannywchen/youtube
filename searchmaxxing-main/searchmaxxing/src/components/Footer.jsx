import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 w-full">
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-700 pt-8 flex justify-center w-full">
          <a 
            href="https://dannywchen.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
          >
            Made with ❤️ by Dragos
          </a>
        </div>
      </div>
    </footer>
  );
};