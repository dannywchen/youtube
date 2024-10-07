import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavItem = ({ to, children }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to={to} className="text-base sm:text-lg font-medium hover:text-primary transition-colors duration-200 px-2 py-1">
        {children}
      </Link>
    </motion.div>
  );

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
            <Link to="/" className="text-xl sm:text-2xl font-bold font-poppins flex items-center">
              <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text hover:from-purple-600 hover:to-primary transition-all duration-300">YT Comment Champs</span>
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavItem to="/video">Video Wall</NavItem>
            <NavItem to="/comment">Comment Wall</NavItem>
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
          
          <div className="md:hidden flex items-center space-x-4">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavItem to="/video">Video Wall</NavItem>
            <NavItem to="/comment">Comment Wall</NavItem>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;