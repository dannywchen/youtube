import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export const GradientBackground = ({ children, className }) => {
  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 80%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
