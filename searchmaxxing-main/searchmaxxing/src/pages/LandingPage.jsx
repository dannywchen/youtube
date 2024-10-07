import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { useTheme } from "@/components/theme-provider";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { cn } from "@/lib/utils";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Separator } from "@/components/ui/separator";
import Lenis from "@studio-freight/lenis";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { theme } = useTheme();

  const bgGradient = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 to-gray-950'
    : 'bg-gradient-to-br from-gray-50 to-gray-100';

  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  const { scrollYProgress } = useScroll();

  return (
    <div className={`${bgGradient} ${textColor} overflow-hidden font-sans min-h-screen flex flex-col relative`} style={{ position: 'relative' }}>
      <BackgroundBeams className="opacity-20" />
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 opacity-50"
      />
      <TracingBeam className="absolute left-0 top-0 h-full w-20" />
      <div className="flex-grow mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center relative z-10">
        <section className="text-center mx-auto mb-12 sm:mb-16">
          <HeroHighlight>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 flex flex-col items-center leading-tight tracking-tight">
              <span className="block">youtube comment</span>
              <motion.div
                className="relative z-20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Highlight className={`block ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'}`}>CHAMPS 🏆</Highlight>
              </motion.div>
            </h1>
          </HeroHighlight>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className={`text-xl sm:text-2xl md:text-3xl mb-4 ${subtextColor} font-light leading-relaxed`}>
              if you commented on a video, see if you are on the comment wall :D
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8"
          >
            <Link to="/comment">
              <Button
                className={cn(
                  "text-xl sm:text-2xl font-semibold px-8 py-4",
                  "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
                  "text-white shadow-lg hover:shadow-xl transition-all duration-300",
                  "transform hover:scale-105 active:scale-95",
                  "rounded-full"
                )}
              >
                See Wall of Comments
              </Button>
            </Link>
          </motion.div>
        </section>

        <motion.div
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto mb-12 sm:mb-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <video 
            src="/graden.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full rounded-3xl shadow-2xl"
          />
          <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-4 py-2 rounded-tl-3xl rounded-br-3xl text-sm">
            go comment on my shorts and ping me on the video. get featured :D
          </div>
        </motion.div>

        <Separator className="mb-12 sm:mb-16 h-1 bg-gray-300 dark:bg-gray-700 w-3/4 mx-auto" />

        <section className="text-center mb-12 sm:mb-16 w-full max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl sm:text-2xl hover:text-primary transition-colors duration-300">How does this work?</AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-relaxed">
                If you comment on my shorts, I will add your name, comment and channel. You are the GOAT! 😎
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl sm:text-2xl hover:text-primary transition-colors duration-300">What happens if I like all of them?</AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-relaxed">
                Whoa, maybe you win a prize! 🎉
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl sm:text-2xl hover:text-primary transition-colors duration-300">What if I want to lock in?</AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg leading-relaxed">
                Join the server, look down 👇
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="text-center mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">linkys</h3>
          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={() => window.open('https://discord.gg/5J3rjXgWrw', '_blank')}
              className={cn(
                "text-lg sm:text-xl font-semibold px-6 py-3",
                "bg-[#5865F2] hover:bg-[#4752C4]",
                "text-white shadow-lg hover:shadow-xl transition-all duration-300",
                "transform hover:scale-105 active:scale-95",
                "flex items-center justify-center space-x-2"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
              </svg>
              <span>Join Discord</span>
            </Button>
            <Button
              onClick={() => window.open('https://dannywchen.com', '_blank')}
              className={cn(
                "text-lg sm:text-xl font-semibold px-6 py-3",
                "bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600",
                "text-white shadow-lg hover:shadow-xl transition-all duration-300",
                "transform hover:scale-105 active:scale-95"
              )}
            >
              my profile :D
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
