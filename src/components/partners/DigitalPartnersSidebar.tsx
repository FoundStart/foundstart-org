import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DigitalPartnersSidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  partnersCount: Record<string, number>;
}

const DigitalPartnersSidebar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  partnersCount 
}: DigitalPartnersSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categoryGroups = {
    'Business': ['Business Company Formation', 'Business Automation', 'Managements'],
    'AI & Technology': ['AI Tools', 'AI Videos', 'AI Voices', 'AI UGC', 'Vibe Coding'],
    'Marketing & Sales': ['Email Marketing', 'SMM Panel', 'SEO tools - Traffic', 'Meta ads'],
    'Finance & Payments': ['Fintech', 'Dropshipping & POD'],
    'Infrastructure': ['Web Hosting', 'Telecommunication', 'Security', 'Web Scrapping'],
    'Creative & Content': ['Design', 'Digital marketplace', 'Publisher & Advertising'],
    'Others': ['Learning & Courses', 'HR Managements', 'Travel', 'Health', 'Data', 'Microsoft', 'TikTok Coins']
  };

  return (
    <Card className="sticky top-4 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Categories</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="space-y-3">
            <Button
              variant={selectedCategory === 'All' ? "default" : "ghost"}
              className="w-full justify-between text-left"
              onClick={() => setSelectedCategory('All')}
            >
              All Partners
              <Badge variant="secondary" className="ml-2">
                375+
              </Badge>
            </Button>

            {Object.entries(categoryGroups).map(([groupName, groupCategories]) => (
              <div key={groupName} className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground px-2 py-1 border-b">
                  {groupName}
                </h4>
                {groupCategories.map((category) => {
                  if (!categories.includes(category)) return null;
                  const count = partnersCount[category] || 0;
                  return (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className="w-full justify-between text-left text-sm h-auto py-2 px-3"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <span className="truncate">{category}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DigitalPartnersSidebar;