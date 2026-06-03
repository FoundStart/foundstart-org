import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { blogPosts, categories } from '@/data/blogPostsData';
import SedoBanner from '@/components/sedo/SedoBanner';
import SedoSearchWidget from '@/components/sedo/SedoSearchWidget';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      <Header />
      
      <PageHero
        title="FoundStart"
        highlight="Blog"
        subtitle="Insights, guides, and expert advice on agency formation, business setup, and starting your company in the USA & Europe."
      />

      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="container mx-auto max-w-7xl">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPosts.map((post) => (
            <Card key={post.id} className="mb-12 overflow-hidden border-2 border-primary/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 p-6 md:p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Badge className="mb-4">Featured Post</Badge>
                    <h2 className="text-xl md:text-2xl font-bold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground text-sm md:text-base">{post.description}</p>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{post.description}</p>
                  <Link to={`/blog/${post.slug}`}>
                    <Button className="group">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ))}

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs md:text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-base md:text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="w-full mt-4 group">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;