import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const StickyScroll = ({ content }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, content.length - 1]);

  useEffect(() => {
    const unsubscribe = progress.onChange((latest) => {
      setActiveCard(Math.round(latest));
    });
    return () => unsubscribe();
  }, [progress]);

  return (
    <motion.div ref={ref} className="h-[30rem] overflow-y-auto flex justify-center relative">
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-kg text-slate-500"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};