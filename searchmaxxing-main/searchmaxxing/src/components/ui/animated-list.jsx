"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const notifications = [
  {
    name: "Find a profitable startup ideas",
    description: "in just a few clicks",
    time: "1s",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "Find user painpoints",
    description: "in just a few clicks",
    time: "1s",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Validate your idea",
    description: "With social proof",
    time: "1s",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "Join the waitlist",
    description: "now!",
    time: "1s",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

const Notification = ({ name, description, icon, color, time }) => {
  const { theme } = useTheme();

  return (
    <figure className={cn(
      "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
      "transition-all duration-200 ease-in-out hover:scale-[103%]",
      theme === "light" 
        ? "bg-white shadow-lg border border-gray-200" 
        : "bg-transparent backdrop-blur-sm dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      "transform-gpu"
    )}>
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl" style={{ backgroundColor: color }}>
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-gray-800 dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-gray-600 dark:text-white/60">{description}</p>
        </div>
      </div>
    </figure>
  );
};

export const AnimatedList = React.memo(({ className, delay = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % notifications.length);
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div className={cn("relative flex h-[500px] w-full flex-col p-6 overflow-hidden", className)}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5
          }}
        >
          <Notification {...notifications[index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

AnimatedList.displayName = "AnimatedList";
