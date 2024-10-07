import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";

const CommentWall = () => {
  const videoLink = "https://www.youtube.com/shorts/ypG4fwlZP9s";
  const videoTitle = "pov: you in school in 2028";
  const videoThumbnail = "https://i.ytimg.com/vi/ypG4fwlZP9s/maxresdefault.jpg";

  const comments = [
    {
      id: 1,
      author: "Poisoned_Petals",
      content: "I'm in between comment and share rn lol",
      avatar: "https://yt3.ggpht.com/O2iHa0Klnm9AOx-yAejcZ5-9g4rNMtCGwux0R_BSdKK700eeluzIcrd72oz_zds_3-v9kjJ4Plo=s88-c-k-c0x00ffffff-no-rj",
      channel: "https://www.youtube.com/@elainegu5407"
    },
    {
      id: 2,
      author: "Cars are sigma",
      content: "All sigmas who want to be rich like",
      avatar: "https://yt3.ggpht.com/Z2afmeV_03OoI_IGl9aTgB282oEFcTbjSyaapydS3xqksLMxWB-jnaJNhlLD3n5lLaMa9Bcvbg=s88-c-k-c0x00ffffff-no-rj",
      channel: "https://www.youtube.com/@Carsaresigma"
    },
    {
      id: 3,
      author: "Daniel Ames",
      content: "Real",
      avatar: "https://yt3.ggpht.com/Fh310khGg7_AXTH2wXkEk4QX-rITiDJZGwiaVcjJ4K4iuqCy9M6WRhRKPFB4osI-reCsks51=s88-c-k-c0x00ffffff-no-rj",
      channel: "https://www.youtube.com/@danielames957"
    },
    {
      id: 4,
      author: "Caleb Glenn",
      content: "hi",
      avatar: "https://yt3.ggpht.com/ytc/AIdro_nr9xE_2vBhbh6K--Fq-aive21XyEQnu2y02BiS_JoIPeuEzrRmJAz6CHewA8Z5_h4Pew=s88-c-k-c0x00ffffff-no-rj",
      channel: "https://www.youtube.com/@CalebGlenn-j1y"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white relative overflow-hidden">
      <BackgroundBeams className="opacity-20" />
      <GridPattern width={40} height={40} className="absolute inset-0 opacity-50" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <HeroHighlight>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 text-center">
            Comment Wall
          </h1>
        </HeroHighlight>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <motion.div 
            className="md:w-1/3 bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={videoThumbnail} alt={videoTitle} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{videoTitle}</h2>
              <Button 
                onClick={() => window.open(videoLink, '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                Comment to be on the wall! <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-3">
                  <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h3 className="font-semibold">{comment.author}</h3>
                    <a 
                      href={comment.channel} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View Channel
                    </a>
                  </div>
                </div>
                <p className="text-gray-300">{comment.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentWall;
