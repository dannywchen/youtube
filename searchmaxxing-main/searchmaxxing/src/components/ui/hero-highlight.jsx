"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const HeroHighlight = ({ children, className }) => {
  return (
    <div className={cn("relative inline-block", className)}>
      {children}
    </div>
  );
};

export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 2, ease: "linear", delay: 0.5 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
        display: "inline",
      }}
      className={cn(
        "relative inline px-1 bg-gradient-to-r from-indigo-300/50 to-purple-300/50 dark:from-indigo-500/50 dark:to-purple-500/50 bg-[length:100%_0.2em] bg-no-repeat bg-bottom",
        className
      )}>
      {children}
    </motion.span>
  );
};