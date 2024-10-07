import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AvatarGroup = ({ avatars = [], max = 5, size = "md", className }) => {
  const displayAvatars = avatars?.slice(0, max) || [];
  const remainingCount = Math.max(0, (avatars?.length || 0) - max);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      className={cn("flex items-center", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {displayAvatars.map((avatar, index) => (
        <motion.div
          key={index}
          className={cn("-ml-3 first:ml-0", sizeClasses[size])}
          variants={avatarVariants}
          whileHover={{ scale: 1.1, zIndex: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar className="border-2 border-background">
            <AvatarImage src={avatar} alt={`User avatar ${index + 1}`} />
            <AvatarFallback>{avatar.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </motion.div>
      ))}
      {remainingCount > 0 && (
        <motion.div
          className={cn("-ml-3", sizeClasses[size])}
          variants={avatarVariants}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar className="border-2 border-background bg-secondary">
            <AvatarFallback>+{remainingCount}</AvatarFallback>
          </Avatar>
        </motion.div>
      )}
    </motion.div>
  );
};
