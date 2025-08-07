
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle, FileText, Users, Scale, Building, ExternalLink } from 'lucide-react';
import { egyptFormationTypes, egyptLegalFramework, egyptFormationServices } from '@/data/egyptFormationData';
import { Link } from 'react-router-dom';

const EgyptFormationGuide = () => {
  const [selectedType, setSelectedType] = useState(egyptFormationTypes[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="text-6xl animate-bounce">🇪🇬</div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Egypt Company Formation</h1>
            <p className="text-xl text-muted-foreground">Investment Law No. 72 of 2017 & Companies Law No. 159 of 1981</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="outline" className="px-4 py-2">
            <Building className="w-4 h-4 mr-2" />
            6 Company Types
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            GAFI Registered
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Scale className="w-4 h-4 mr-2" />
            100% Foreign Ownership*
          </Badge>
        </div>
      </div>

      {/* Legal Framework */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Legal Framework
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Primary Laws</h4>
              <ul className="space-y-1">
                {egyptLegalFramework.primaryLaws.map((law, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{law}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Regulatory Authority</h4>
              <p className="text-sm text-muted-foreground">{egyptLegalFramework.regulatoryAuthority}</p>
              
              <h4 className="font-semibold mb-2 mt-4">Investment Features</h4>
              <ul className="space-y-1">
                {egyptLegalFramework.investmentFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="types" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="types">Company Types</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="services">Our Services</TabsTrigger>
        </TabsList>

        <TabsContent value="types" className="space-y-6">
          {/* Company Type Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {egyptFormationTypes.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedType.id === type.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedType(type)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{type.arabicName}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Min Capital:</span>
                      <span className="font-semibold text-sm">{type.minCapital}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Owners:</span>
                      <span className="font-semibold text-sm">{type.owners}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Type Details */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">{selectedType.name}</CardTitle>
              <p className="text-lg text-muted-foreground">{selectedType.arabicName}</p>
              <p className="text-muted-foreground">{selectedType.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg text-primary">{selectedType.minCapital}</div>
                  <div className="text-sm text-muted-foreground">Minimum Capital</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg text-primary">{selectedType.owners}</div>
                  <div className="text-sm text-muted-foreground">Owners/Partners</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg text-primary">{selectedType.payment}</div>
                  <div className="text-sm text-muted-foreground">Payment Terms</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-lg text-primary">{selectedType.foreignOwnership}</div>
                  <div className="text-sm text-muted-foreground">Foreign Ownership</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Key Requirements</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedType.requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Liability Notice</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      {selectedType.liability}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Company Types Comparison</CardTitle>
              <p className="text-muted-foreground">Compare all Egypt company formation options</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Min Capital</th>
                      <th className="text-left p-3 font-semibold">Owners</th>
                      <th className="text-left p-3 font-semibold">Liability</th>
                      <th className="text-left p-3 font-semibold">Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {egyptFormationTypes.map((type, index) => (
                      <tr key={type.id} className={`border-b ${index % 2 === 0 ? 'bg-muted/30' : ''}`}>
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-sm text-muted-foreground">{type.arabicName}</div>
                          </div>
                        </td>
                        <td className="p-3 font-medium text-green-600">{type.minCapital}</td>
                        <td className="p-3">{type.owners}</td>
                        <td className="p-3 text-sm">{type.liability}</td>
                        <td className="p-3 text-sm">{type.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>*Foreign Ownership:</strong> 100% foreign ownership is allowed for most activities, 
                  except for specific sectors reserved for Egyptians or requiring minimum Egyptian participation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Our Egypt Formation Services</CardTitle>
              <p className="text-muted-foreground">Complete company formation assistance</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {egyptFormationServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="glass-card bg-gradient-to-r from-primary/10 to-purple-500/10">
        <CardContent className="text-center space-y-6 p-8">
          <h3 className="text-2xl font-bold">Ready to Start Your Egypt Company?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get expert guidance on Egypt company formation with our comprehensive consultation service. 
            We'll help you choose the right structure and handle all legal requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/message/UQZ6STBLDXKPD1" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="hover-scale bg-green-600 hover:bg-green-700">
                Contact via WhatsApp
                <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline" className="hover-scale">
                Get Quote for Egypt Formation
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="hover-scale">
                View All Services
              </Button>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            ✅ Free consultation • ✅ GAFI registered agents • ✅ 100% compliance guaranteed
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgyptFormationGuide;
