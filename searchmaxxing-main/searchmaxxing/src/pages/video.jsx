import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";

const VideoPage = () => {
  const shorts = [
    {
      id: 'ypG4fwlZP9s',
      thumbnail: 'https://i.ytimg.com/vi/ypG4fwlZP9s/maxresdefault.jpg',
    },
    // Add more shorts here as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 opacity-50"
      />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <HeroHighlight>
          <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-8">
            Wall of Shorts
          </h1>
        </HeroHighlight>
        <p className="text-xl md:text-2xl text-center mb-12 text-gray-300">
          Comment now and get showcased on our epic wall of comments!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shorts.map((short) => (
            <motion.div
              key={short.id}
              className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={short.thumbnail}
                alt={`YouTube Short ${short.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button
                  onClick={() => window.open(`https://www.youtube.com/shorts/${short.id}`, '_blank')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  comment on this short
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
