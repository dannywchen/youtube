import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/animated-grid-pattern";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { useTheme } from "@/components/theme-provider";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const PricingTier = ({ title, price, features, isPopular, buttonText, buttonLink, saleTag, extraInfo }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`bg-card rounded-2xl shadow-xl overflow-hidden ${isPopular ? 'border-2 border-primary' : ''} relative`}
  >
    {saleTag && (
      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-bl-xl">
        {saleTag}
      </div>
    )}
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4 text-center">{title}</h3>
      <p className="text-4xl font-bold mb-6 text-center">${price}<span className="text-xl">/mo</span></p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <CheckCircle className="text-green-500 mr-2 h-4 w-4 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {extraInfo && <p className="text-sm text-primary mb-4">{extraInfo}</p>}
      {buttonLink ? (
        <a href={buttonLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full text-sm py-4" variant={isPopular ? 'default' : 'outline'}>
            {buttonText}
          </Button>
        </a>
      ) : (
        <Button className="w-full text-sm py-4" variant={isPopular ? 'default' : 'outline'}>
          {buttonText}
        </Button>
      )}
    </div>
  </motion.div>
);

const PricingPage = () => {
  const { theme } = useTheme();
  const bgGradient = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-900 to-gray-950'
    : 'bg-gradient-to-br from-gray-50 to-gray-100';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';

  const pricingTiers = [
    {
      title: 'Free',
      price: '0',
      features: [
        'Keyword search functionality',
        'Basic search algorithm',
        'Access to 100,000 database entries',
        'Limited summarization and user pain point identification',
        'Restricted lead generation'
      ],
      buttonText: 'Current Plan',
    },
    {
      title: 'Pro',
      price: '5',
      features: [
        'Uncover niche communities',
        'Audience segmentation (up to 10 segments)',
        'Unlimited keyword searches',
        'Real-time alerts for 10 tracked keywords',
        'Enhanced search capabilities',
        'AI-powered customer insight themes',
        'Identify rapidly growing subreddits',
        'AI-assisted pattern recognition',
        'Interactive AI Q&A interface',
        'Strategic content promotion insights',
        'Seamless Slack/Discord integration',
        'Data exports in CSV format',
        'Expanded database of 300,000 entries'
      ],
      isPopular: true,
      buttonText: 'Preorder now',
      buttonLink: 'https://buy.stripe.com/cN2bJ26QK3CmgFi7sv',
      saleTag: '15% OFF if you use LAUNCH5',
      extraInfo: 'Purchase before launch and get an extra month free! Pro starts counting when we launch.',
    },
  ];

  return (
    <div className={`min-h-screen ${bgGradient} ${textColor} relative overflow-hidden`}>
      <BackgroundBeams className="opacity-20" />
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 opacity-50"
      />
      <TracingBeam className="absolute left-0 top-0 h-full w-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center"
      >
        <HeroHighlight>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center tracking-tight">maximize your ideas</h1>
        </HeroHighlight>
        <p className="text-center text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Start shipping, not finding startup ideas. Preorder pro now and get an extra month free!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default PricingPage;