import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import WaitlistPage from './pages/WaitlistPage';
import FeatureRequestPage from './pages/FeatureRequestPage';
import PlaygroundPage from './pages/Playground';
import BlogPage from './pages/Blog';
import PricingPage from './pages/Pricing';
import './firebase.config';
import SearchComponent from './components/SearchComponent';
import VideoPage from './pages/video';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/waitlist" element={
                  <SidebarProvider>
                    <WaitlistPage />
                  </SidebarProvider>
                } />
                <Route path="/feature-request" element={
                  <SidebarProvider>
                    <FeatureRequestPage />
                  </SidebarProvider>
                } />
                <Route path="/playground" element={
                  <SidebarProvider>
                    <PlaygroundPage />
                  </SidebarProvider>
                } />
                <Route path="/search" element={<SearchComponent />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/video" element={<VideoPage />} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;