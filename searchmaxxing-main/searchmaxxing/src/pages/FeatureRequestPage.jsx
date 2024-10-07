import { useEffect, useContext } from 'react';
import { useTheme } from '@/components/theme-provider';

const FeatureRequestPage = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://features.vote/widget/widget.js";
    script.async = true;
    script.setAttribute("slug", "searchmax");
    script.setAttribute("onload", `window.loadVotingBoard('feature-request-container', { theme: '${theme}' })`);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Feature Requests</h1>
        <div id="feature-request-container" className="w-full h-[800px]"></div>
      </div>
    </div>
  );
};

export default FeatureRequestPage;