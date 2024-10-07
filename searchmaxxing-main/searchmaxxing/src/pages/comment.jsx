import { motion } from 'framer-motion';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";

const CommentWall = () => {
  const { theme } = useTheme();
  const videos = [
    {
      link: "https://youtube.com/shorts/wJ9302RKrj4?si=O6U-IA6DCu3uJKqS",
      title: "What will you be in 2030?",
      thumbnail: "https://i.ytimg.com/vi/wJ9302RKrj4/maxresdefault.jpg"
    },
    {
      link: "https://www.youtube.com/shorts/ypG4fwlZP9s",
      title: "pov: you in school in 2028",
      thumbnail: "https://i.ytimg.com/vi/ypG4fwlZP9s/maxresdefault.jpg"
    }
  ];

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
    {
      id: 5,
      author: "John",
      content: "here to stop people saying first",
      avatar: "https://yt3.ggpht.com/ytc/AIdro_ktf9w-_Y-Ykk2WaCOrvRvto-DqwRfZrCwkWm-etOgO-lhcHcpTYkUtyPAuK6d42C4TAw=s88-c-k-c0x00ffffff-no-rj",
      channel: "https://www.youtube.com/@John-tw9hy"
    },
    {
      id: 6,
      author: "dreamyuni",
      content: "FIRST!",
      avatar: "https://yt3.ggpht.com/bLey6ezMdbb-pQYJSSkY4XY6ZuAZBVZ1vV0zhjmN_Z5VbSf5FHaa2hz1_h7qzPMESwtuYcU=s88-c-k-c0x00ffffff-no-rj",
      channel: "http://www.youtube.com/@dreamyuni"
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-950 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} relative overflow-hidden`}>
      <BackgroundBeams className={`opacity-20 ${theme === 'dark' ? '' : 'invert'}`} />
      <GridPattern width={40} height={40} className={`absolute inset-0 opacity-50 ${theme === 'dark' ? '' : 'invert'}`} />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <HeroHighlight>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 text-center">
            Comment Wall
          </h1>
        </HeroHighlight>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3 space-y-8">
            {videos.map((video, index) => (
              <motion.div 
                key={index}
                className={`${theme === 'dark' ? 'bg-white/10' : 'bg-gray-800/10'} backdrop-blur-lg rounded-xl overflow-hidden`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                  <Button 
                    onClick={() => window.open(video.link, '_blank')}
                    className={`w-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded flex items-center justify-center`}
                  >
                    Comment to be on the wall!
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <Separator orientation="vertical" className="h-auto mx-4" />

          <div className="md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-800/5'} backdrop-blur-sm rounded-lg p-4 shadow-lg`}
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
                        className={`text-xs ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}
                      >
                        View Channel
                      </a>
                    </div>
                  </div>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{comment.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentWall;
