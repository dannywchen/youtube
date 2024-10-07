import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, TagIcon } from 'lucide-react';
import { BorderBeam } from "@/components/ui/border-beam";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { saveWaitlistSubmission } from '../firebase.config';
import { ToastAction } from "@/components/ui/toast";

const BlogPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await saveWaitlistSubmission(email, [useCase]);
      setIsDialogOpen(false);
      toast({
        title: "Success!",
        description: `You&apos;ve successfully joined the waitlist! You are the ${result.position}th person on the waitlist.`,
        action: (
          <ToastAction altText="Close">Close</ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast({
        title: "Success!",
        description: "You&apos;ve successfully joined the waitlist!",
        action: (
          <ToastAction altText="Close">Close</ToastAction>
        ),
      });
    } finally {
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 opacity-50"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 relative z-10"
      >
        <h1 className="text-6xl font-extrabold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          blog
        </h1>
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-2xl relative">
            <BorderBeam
              className="absolute inset-0 pointer-events-none"
              size={300}
              duration={20}
              colorFrom="#00C9A7"
              colorTo="#1E86FF"
            />
            <div className="relative h-[500px]">
              <video 
                src="/newest.mp4" 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end">
                <div className="p-8">
                  <Badge className="mb-4 text-lg px-4 py-2 bg-primary/80 text-white">Featured</Badge>
                  <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Join Our Waitlist: Be the First to Experience SearchMaxxing</h2>
                  <div className="flex items-center text-gray-300 space-x-6 text-lg">
                    <span className="flex items-center"><CalendarIcon className="w-5 h-5 mr-2" /> Oct 6, 2024</span>
                    <span className="flex items-center"><ClockIcon className="w-5 h-5 mr-2" /> 1 min read</span>
                    <span className="flex items-center"><TagIcon className="w-5 h-5 mr-2" /> Waitlist Launch</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="flex items-center mb-8">
                <Avatar className="h-16 w-16 ring-2 ring-primary">
                  <AvatarImage src="/author-avatar.jpg" alt="Author" />
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
                <div className="ml-6">
                  <p className="font-semibold text-xl">Danny Chen</p>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none text-lg">
                <p className="lead text-xl font-medium mb-6">
                  SearchMaxin releasing its waitlist.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Find Profitable Startup Ideas with a Single Search</h3>
                <ul className="space-y-3">
                  <li>Discover keywords through indexed subreddit communities</li>
                  <li>Identify EXACT user painpoints</li>
                  <li>Uncover user problems</li>
                  <li>Track emerging user trends</li>
                </ul>
                <p className="mt-6">
                  Don&apos;t miss this opportunity to revolutionize your startup research. Join our waitlist now and be among the first to harness the power of Reddit&apos;s vast information landscape.
                </p>
                <div className="mt-12 flex justify-center">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="px-10 py-4 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Secure Your Spot on the Waitlist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center mb-12">Latest Updates</h2>
        </div>
      </motion.div>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-8 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4">Join our Waitlist</DialogTitle>
            <DialogDescription className="text-xl mb-6">
              Be the first to know when we launch and get exclusive early access!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="email" className="text-lg font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-lg"
                required
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="useCase" className="text-lg font-semibold">What do you plan on using SearchMax for?</Label>
              <Select value={useCase} onValueChange={setUseCase} required>
                <SelectTrigger className="w-full px-4 py-3 text-lg">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To find startup ideas">To find startup ideas</SelectItem>
                  <SelectItem value="To validate startup ideas">To validate startup ideas</SelectItem>
                  <SelectItem value="To find user painpoints">To find user painpoints</SelectItem>
                  <SelectItem value="To find leads">To find leads</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              type="submit" 
              className={`w-full text-xl py-4 font-semibold ${
                theme === 'dark' 
                  ? 'bg-white text-gray-900 hover:bg-gray-200' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              } rounded-md shadow-lg hover:shadow-xl transition-all duration-300`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPage;