import { SidebarBody } from '@/components/ui/sidebar';
import { AudienceBuilder } from '@/components/AudienceBuilder';
import { CommunityFinder } from '@/components/CommunityFinder';
import { UserInsights } from '@/components/UserInsights';
import PostFinder from '@/components/PostFinder';
import SearchComponent from '@/components/SearchComponent';
const PlaygroundPage = () => {
  return (
    <div className="flex h-screen bg-background">
      <SidebarBody />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8">Playground</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AudienceBuilder />
            <CommunityFinder />
            <SearchComponent />
          </div>
          <PostFinder />
          <UserInsights />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;