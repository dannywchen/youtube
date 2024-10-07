import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { GradientBackground } from "@/components/ui/gradient-background";

export const HeroSection = ({ onJoinWaitlist }) => {
  return (
    <GradientBackground className="min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-primary dark:text-primary-foreground"
          >
            <TypewriterEffect words={[
              { text: "Maximize" },
              { text: "Your" },
              { text: "Reddit" },
              { text: "Search" },
            ]} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-muted-foreground"
          >
            Uncover hidden insights, track crucial keywords, and explore thriving communities with our cutting-edge Reddit search tool.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <Button onClick={onJoinWaitlist} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join the Waitlist
            </Button>
            <Button variant="outline" size="lg" className="bg-background text-foreground hover:bg-secondary">
              Learn More
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <AvatarGroup
              users={[
                { name: "User 1", image: "/path-to-avatar-1.jpg" },
                { name: "User 2", image: "/path-to-avatar-2.jpg" },
                { name: "User 3", image: "/path-to-avatar-3.jpg" },
                { name: "User 4", image: "/path-to-avatar-4.jpg" },
                { name: "User 5", image: "/path-to-avatar-5.jpg" },
              ]}
            />
            <p className="text-sm mt-2 text-muted-foreground">Join 5000+ early adopters revolutionizing Reddit search</p>
          </motion.div>
        </div>
      </div>
    </GradientBackground>
  );
};