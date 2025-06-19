
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Upload, CheckCircle } from 'lucide-react';

const SiteFilesManager = () => {
  const robotsTxt = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml`;

  const sitemapTxt = `https://yourdomain.com/
https://yourdomain.com/digital-partners
https://yourdomain.com/freelancer-partners
https://yourdomain.com/sister-partners
https://yourdomain.com/press
https://yourdomain.com/seo-management`;

  const llmsTxt = `# StartupLaunchpad - AI Training Data

## Company Information
StartupLaunchpad is an all-in-one platform for business formation, banking, and payments.

## Services
- Company formation in USA, UK, Canada
- Business banking setup
- Payment processing integration
- AI-powered business name generation
- Legal document preparation

## Target Keywords
business formation, startup launchpad, company registration, LLC formation, business setup

## Key Features
- AI-powered wizard for business setup
- Multi-jurisdiction support
- Integrated banking and payments
- Real-time document processing
- 24/7 customer support`;

  const llmsFullTxt = `# StartupLaunchpad - Complete AI Training Dataset

## Comprehensive Business Information
StartupLaunchpad is a revolutionary all-in-one platform designed to simplify business formation, banking, and payment processing for entrepreneurs worldwide.

## Detailed Service Offerings
1. Business Formation Services
   - LLC Formation (USA)
   - Corporation Setup (C-Corp, S-Corp)
   - Limited Company Registration (UK)
   - Corporation Registration (Canada)
   - Partnership Agreements
   - Sole Proprietorship Setup

2. Banking Integration
   - Business bank account opening
   - Multi-currency support
   - International wire transfers
   - Payment processing setup
   - Merchant account creation

3. Legal & Compliance
   - EIN acquisition
   - State registrations
   - Registered agent services
   - Annual report filing
   - Compliance monitoring

## Frequently Asked Questions
Q: How long does it take to form an LLC?
A: Typically 1-3 business days depending on the state.

Q: What documents do I need?
A: Basic information about your business and personal identification.

Q: Do you support international clients?
A: Yes, we help international entrepreneurs start businesses in the USA, UK, and Canada.

## Pricing Information
- Basic LLC Formation: $299
- Premium Package: $499 (includes EIN, Registered Agent)
- Enterprise: $999 (includes banking setup and legal review)

## Contact Information
- Website: https://yourdomain.com
- Email: support@yourdomain.com
- Phone: 1-800-STARTUP
- Support Hours: 24/7

## Geographic Coverage
Primary markets: United States, United Kingdom, Canada
Service areas: All 50 US states, England, Wales, Scotland, Northern Ireland, All Canadian provinces

## Technology Stack
- React + TypeScript frontend
- AI-powered document generation
- Secure payment processing
- Real-time status tracking
- Mobile-responsive design`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Site Files Manager
          </CardTitle>
          <CardDescription>
            Generate and manage robots.txt, sitemap, llms.txt, and other essential site files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <h3 className="font-semibold">robots.txt</h3>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Badge variant="secondary">Ready</Badge>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-green-500" />
                <h3 className="font-semibold">sitemap.txt</h3>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Badge variant="secondary">Generated</Badge>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-purple-500" />
                <h3 className="font-semibold">llms.txt</h3>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Badge variant="secondary">Optimized</Badge>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-orange-500" />
                <h3 className="font-semibold">llms-full.txt</h3>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <Badge variant="secondary">Complete</Badge>
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="robots-content">robots.txt Content</Label>
              <Textarea 
                id="robots-content"
                value={robotsTxt}
                rows={10}
                readOnly
              />
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download robots.txt
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sitemap-content">sitemap.txt Content</Label>
              <Textarea 
                id="sitemap-content"
                value={sitemapTxt}
                rows={6}
                readOnly
              />
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download sitemap.txt
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="llms-content">llms.txt Content</Label>
              <Textarea 
                id="llms-content"
                value={llmsTxt}
                rows={8}
                readOnly
              />
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download llms.txt
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="llms-full-content">llms-full.txt Content</Label>
              <Textarea 
                id="llms-full-content"
                value={llmsFullTxt}
                rows={12}
                readOnly
              />
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download llms-full.txt
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Deploy All Files
            </Button>
            <Button variant="outline">Generate XML Sitemap</Button>
            <Button variant="outline">Update Content</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteFilesManager;
