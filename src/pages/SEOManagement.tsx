
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SEOTraditional from '@/components/seo/SEOTraditional';
import ASOOptimization from '@/components/seo/ASOOptimization';
import LLMOptimization from '@/components/seo/LLMOptimization';
import GEOOptimization from '@/components/seo/GEOOptimization';
import AEOOptimization from '@/components/seo/AEOOptimization';
import SEMManagement from '@/components/seo/SEMManagement';
import MetaManager from '@/components/seo/MetaManager';
import SiteFilesManager from '@/components/seo/SiteFilesManager';

const SEOManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold gradient-text">SEO & Optimization Suite</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete optimization toolkit for search engines, app stores, AI models, and more
          </p>
        </div>

        <Tabs defaultValue="seo" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="aso">ASO</TabsTrigger>
            <TabsTrigger value="llmo">LLMO</TabsTrigger>
            <TabsTrigger value="geo">GEO</TabsTrigger>
            <TabsTrigger value="aeo">AEO</TabsTrigger>
            <TabsTrigger value="sem">SEM</TabsTrigger>
            <TabsTrigger value="meta">Meta</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="seo" className="mt-6">
            <SEOTraditional />
          </TabsContent>

          <TabsContent value="aso" className="mt-6">
            <ASOOptimization />
          </TabsContent>

          <TabsContent value="llmo" className="mt-6">
            <LLMOptimization />
          </TabsContent>

          <TabsContent value="geo" className="mt-6">
            <GEOOptimization />
          </TabsContent>

          <TabsContent value="aeo" className="mt-6">
            <AEOOptimization />
          </TabsContent>

          <TabsContent value="sem" className="mt-6">
            <SEMManagement />
          </TabsContent>

          <TabsContent value="meta" className="mt-6">
            <MetaManager />
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <SiteFilesManager />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default SEOManagement;
