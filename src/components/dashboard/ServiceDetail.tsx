
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  Download,
  Upload
} from 'lucide-react';

interface ServiceDetailProps {
  serviceId: string;
}

const ServiceDetail = ({ serviceId }: ServiceDetailProps) => {
  const serviceData = {
    overview: {
      title: "Dashboard Overview",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Services</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-500">6</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-500">4</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-gray-500">2</p>
                </div>
                <AlertCircle className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    company: {
      title: "Company Formation",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>LLC Formation Status</CardTitle>
                <Badge className="bg-green-500 text-white">Completed</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Formation Progress</span>
                  <span>100%</span>
                </div>
                <Progress value={100} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Company Name</p>
                  <p className="font-medium">YourCompany LLC</p>
                </div>
                <div>
                  <p className="text-muted-foreground">State</p>
                  <p className="font-medium">Delaware</p>
                </div>
                <div>
                  <p className="text-muted-foreground">EIN</p>
                  <p className="font-medium">XX-XXXXXXX</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Formation Date</p>
                  <p className="font-medium">Dec 15, 2024</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    domain: {
      title: "Domain Registration",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Domain Status</CardTitle>
                <Badge className="bg-green-500 text-white">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Domain Name</p>
                  <p className="font-medium">yourcompany.com</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Registrar</p>
                  <p className="font-medium">Hostinger</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Registration Date</p>
                  <p className="font-medium">Dec 10, 2024</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expires</p>
                  <p className="font-medium">Dec 10, 2025</p>
                </div>
              </div>
              <Button size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Manage Domain
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    },
    virtualcards: {
      title: "Virtual Cards",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Virtual Card Management</CardTitle>
                <Badge className="bg-blue-500 text-white">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Available Cards</p>
                  <p className="font-medium">5 Cards</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Spending</p>
                  <p className="font-medium">$2,450.00</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly Limit</p>
                  <p className="font-medium">$10,000.00</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium text-green-500">All Active</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Create New Card
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Manage Cards
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    esim: {
      title: "eSIM Cards",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>eSIM Management</CardTitle>
                <Badge className="bg-purple-500 text-white">Global Coverage</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Active Plans</p>
                  <p className="font-medium">3 Plans</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Data Used</p>
                  <p className="font-medium">15.2 GB</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Countries</p>
                  <p className="font-medium">180+ Countries</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Next Renewal</p>
                  <p className="font-medium">Jan 15, 2025</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Add New Plan
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Usage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    giftcards: {
      title: "Gift Cards",
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gift Card Issuing</CardTitle>
                <Badge className="bg-orange-500 text-white">Ready to Issue</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Cards Issued</p>
                  <p className="font-medium">127 Cards</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Value</p>
                  <p className="font-medium">$12,750.00</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Redeemed</p>
                  <p className="font-medium">89 Cards</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Available Brands</p>
                  <p className="font-medium">50+ Brands</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Issue New Card
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Brands
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  };

  const currentService = serviceData[serviceId as keyof typeof serviceData] || serviceData.overview;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{currentService.title}</h1>
      {currentService.content}
    </div>
  );
};

export default ServiceDetail;
