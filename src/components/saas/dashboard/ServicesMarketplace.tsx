import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, ShoppingCart, Check, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    id: '1',
    name: 'Registered Agent',
    category: 'compliance',
    country: 'usa',
    price: 149,
    description: 'Professional registered agent service in any US state',
    features: ['Mail forwarding', 'Compliance alerts', 'Document scanning'],
  },
  {
    id: '2',
    name: 'Virtual Office',
    category: 'address',
    country: 'usa',
    price: 199,
    description: 'Professional business address with mail handling',
    features: ['Prestigious address', 'Mail handling', 'Meeting room access'],
  },
  {
    id: '3',
    name: 'EIN Registration',
    category: 'tax',
    country: 'usa',
    price: 99,
    description: 'Obtain your Federal Tax ID number',
    features: ['Fast processing', 'IRS filing', 'Support included'],
  },
  {
    id: '4',
    name: 'Bank Account Assistance',
    category: 'banking',
    country: 'usa',
    price: 249,
    description: 'Help opening a US business bank account',
    features: ['Bank selection', 'Application support', 'Document prep'],
  },
  {
    id: '5',
    name: 'Annual Report Filing',
    category: 'compliance',
    country: 'usa',
    price: 99,
    description: 'Annual compliance filing service',
    features: ['State filing', 'Reminder alerts', 'On-time guarantee'],
  },
  {
    id: '6',
    name: 'UK VAT Registration',
    category: 'tax',
    country: 'uk',
    price: 199,
    description: 'Register for UK Value Added Tax',
    features: ['HMRC registration', 'VAT number', 'Compliance support'],
  },
  {
    id: '7',
    name: 'Confirmation Statement',
    category: 'compliance',
    country: 'uk',
    price: 79,
    description: 'Annual confirmation statement filing',
    features: ['Companies House filing', 'Director updates', 'Share tracking'],
  },
  {
    id: '8',
    name: 'German Tax Number',
    category: 'tax',
    country: 'germany',
    price: 299,
    description: 'Obtain your German Steuernummer',
    features: ['Tax office registration', 'Business tax ID', 'Expert support'],
  },
];

const categories = [
  { id: 'all', name: 'All Services' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'tax', name: 'Tax & Registration' },
  { id: 'address', name: 'Address Services' },
  { id: 'banking', name: 'Banking' },
];

const countryFlags: Record<string, string> = {
  usa: '🇺🇸',
  uk: '🇬🇧',
  germany: '🇩🇪',
  netherlands: '🇳🇱',
  spain: '🇪🇸',
  france: '🇫🇷',
};

const ServicesMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const { toast } = useToast();

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesCountry = selectedCountry === 'all' || service.country === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const handleOrder = () => {
    toast({
      title: 'Service Added',
      description: `${selectedService?.name} has been added to your cart.`,
    });
    setSelectedService(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Services Marketplace</h1>
        <p className="text-muted-foreground">Browse and order business services</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="usa">🇺🇸 United States</SelectItem>
            <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
            <SelectItem value="germany">🇩🇪 Germany</SelectItem>
            <SelectItem value="netherlands">🇳🇱 Netherlands</SelectItem>
            <SelectItem value="spain">🇪🇸 Spain</SelectItem>
            <SelectItem value="france">🇫🇷 France</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Services Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="mb-2">
                  {countryFlags[service.country]} {service.country.toUpperCase()}
                </Badge>
                <span className="text-xl font-bold text-primary">${service.price}</span>
              </div>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setSelectedService(service)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No services found matching your criteria.</p>
        </div>
      )}

      {/* Order Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order {selectedService?.name}</DialogTitle>
            <DialogDescription>
              Review the service details before proceeding to checkout.
            </DialogDescription>
          </DialogHeader>
          
          {selectedService && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{countryFlags[selectedService.country]} {selectedService.country.toUpperCase()}</span>
              </div>
              <p className="text-muted-foreground">{selectedService.description}</p>
              <ul className="space-y-2">
                {selectedService.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t pt-4">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">${selectedService.price}</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedService(null)}>
              Cancel
            </Button>
            <Button onClick={handleOrder}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesMarketplace;
