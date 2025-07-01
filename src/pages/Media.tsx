
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, Facebook, Instagram, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Media = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const videos = [
    {
      id: "1",
      title: "How to Start Your Business in Minutes with FoundStart",
      description: "Complete guide to business formation using our platform",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Tutorial",
      duration: "5:23"
    },
    {
      id: "2", 
      title: "AI Automation for Your Business - Full Walkthrough",
      description: "Learn how to automate your business processes with AI",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "AI Tools",
      duration: "8:45"
    },
    {
      id: "3",
      title: "Digital Partners Success Stories",
      description: "Real stories from our partner network",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", 
      videoId: "dQw4w9WgXcQ",
      category: "Success Stories",
      duration: "12:10"
    },
    {
      id: "4",
      title: "Banking Setup for New Businesses",
      description: "Step-by-step guide to setting up business banking",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ", 
      category: "Banking",
      duration: "6:30"
    },
    {
      id: "5",
      title: "Company Formation in Different Jurisdictions",
      description: "USA, UK, Canada - Which is right for you?",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoId: "dQw4w9WgXcQ",
      category: "Formation",
      duration: "15:20"
    },
    {
      id: "6",
      title: "SEO Management Suite Overview",
      description: "Maximize your online presence with our SEO tools",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", 
      videoId: "dQw4w9WgXcQ",
      category: "SEO",
      duration: "9:15"
    }
  ];

  const socialPlatforms = [
    { name: "YouTube", href: "https://www.youtube.com/@foundstart/", icon: Youtube, followers: "12.5K", description: "Business tutorials and guides" },
    { name: "Facebook", href: "https://www.facebook.com/foundstart/", icon: Facebook, followers: "8.2K", description: "Community updates and news" },
    { name: "Instagram", href: "https://www.instagram.com/foundstartco/", icon: Instagram, followers: "15.8K", description: "Behind the scenes content" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/foundstart/", icon: Linkedin, followers: "5.3K", description: "Professional insights" },
    { name: "Twitter", href: "https://x.com/foundstartco", icon: Twitter, followers: "9.7K", description: "Latest updates and tips" }
  ];

  const categories = ['All', ...Array.from(new Set(videos.map(v => v.category)))];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h1 className="text-3xl md:text-4xl font-bold">
                Media & <span className="gradient-text">Videos</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our latest videos, tutorials, and social media content to help grow your business.
              </p>
            </div>

            {/* Social Media Platforms */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-center">Follow Us On Social Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {socialPlatforms.map((platform, index) => {
                  const Icon = platform.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 text-center">
                      <CardHeader className="pb-4">
                        <div className="flex justify-center mb-2">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <Badge variant="secondary">{platform.followers}</Badge>
                        <p className="text-sm text-muted-foreground">{platform.description}</p>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full" 
                          onClick={() => window.open(platform.href, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Follow
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Video Search and Filter */}
            <div className="mb-8 space-y-4">
              <h2 className="text-2xl font-bold mb-6">Latest Videos</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">{video.duration}</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge>{video.category}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                    >
                      <Youtube className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No videos found matching your criteria.</p>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center">
              <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
                <CardContent className="p-8">
                  <Youtube className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-4">Subscribe to Our YouTube Channel</h4>
                  <p className="text-muted-foreground mb-6">
                    Get the latest business tips, tutorials, and insights delivered straight to your feed.
                  </p>
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://www.youtube.com/@foundstart/', '_blank')}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Media;
