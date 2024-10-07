import { motion } from 'framer-motion';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { useTheme } from "@/components/theme-provider";
import { Footer } from "@/components/Footer";

const VideoPage = () => {
  const { theme } = useTheme();
  const shorts = [
    {
      id: 'ypG4fwlZP9s',
      thumbnail: 'https://i.ytimg.com/vi/ypG4fwlZP9s/maxresdefault.jpg',
    },
    {
      id: 'wJ9302RKrj4',
      thumbnail: 'https://i.ytimg.com/vi/wJ9302RKrj4/maxresdefault.jpg',
    },
    {
      id: 'GXzGzDyQ8CI',
      thumbnail: 'https://i.ytimg.com/vi/GXzGzDyQ8CI/maxresdefault.jpg',
    },
    {
      id: 'u2LRNmweAJQ',
      thumbnail: 'https://i.ytimg.com/vi/u2LRNmweAJQ/maxresdefault.jpg',
    }
  ];

  const bgGradient = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 to-gray-950'
    : 'bg-gradient-to-br from-gray-50 to-gray-100';

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subtextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={`min-h-screen ${bgGradient} ${textColor} relative overflow-hidden flex flex-col`}>
      <BackgroundBeams className={`opacity-20 ${theme === 'dark' ? '' : 'invert'}`} />
      <GridPattern
        width={40}
        height={40}
        className={`absolute inset-0 opacity-50 ${theme === 'dark' ? '' : 'invert'}`}
      />
      <div className="flex-grow container mx-auto px-4 py-8 sm:py-16 relative z-10 text-center flex flex-col justify-center items-center">
        <HeroHighlight>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-8">
            Wall of Shorts
          </h1>
        </HeroHighlight>
        <p className={`text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 ${subtextColor} max-w-3xl mx-auto`}>
          Comment now and get showcased on our epic wall of comments!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {shorts.map((short) => (
            <motion.div
              key={short.id}
              className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg mx-auto w-full max-w-xs cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(`https://www.youtube.com/shorts/${short.id}`, '_blank')}
            >
              <img
                src={short.thumbnail}
                alt={`YouTube Short ${short.id}`}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-white'} bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300`}>
                <span className={`${textColor} font-bold text-sm sm:text-base`}>
                  Comment on this short
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoPage;
