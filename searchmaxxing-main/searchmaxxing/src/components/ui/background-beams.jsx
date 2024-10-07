"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(({ className }) => {
  const paths = useMemo(() => [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
    "M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
  ], []);

  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", className)}>
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}
        <defs>
          {paths.map((_, index) => (
            <linearGradient
              key={index}
              id={`linearGradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%">
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="50%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
