import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div 
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="text-2xl font-bold font-poppins flex items-center">
              <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text hover:from-purple-600 hover:to-primary transition-all duration-300">YT Comment Champs</span>
            </Link>
          </motion.div>
          <div className="flex-grow flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/video" className="text-lg font-semibold hover:text-primary transition-colors duration-200">
                Video Wall
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.a
              href="https://discord.gg/5J3rjXgWrw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-[#5865F2] hover:text-[#7289DA] transition-colors duration-200"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.8 }}
            >
              <FaDiscord />
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;