import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, Globe, Building2, Package, ArrowRight, Sparkles, Check, Lock } from 'lucide-react';
import { pricingData, getCountryPricing, calculateTotal } from '@/data/pricingCalculatorData';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';

const PricingCalculator: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedEntityType, setSelectedEntityType] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const countryPricing = useMemo(() => 
    selectedCountry ? getCountryPricing(selectedCountry) : null,
    [selectedCountry]
  );

  const selectedEntity = useMemo(() => 
    countryPricing?.entityTypes.find(e => e.id === selectedEntityType),
    [countryPricing, selectedEntityType]
  );

  const calculation = useMemo(() => {
    if (!selectedCountry || !selectedEntityType) return null;
    return calculateTotal(selectedCountry, selectedEntityType, selectedAddOns);
  }, [selectedCountry, selectedEntityType, selectedAddOns]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedEntityType('');
    setSelectedAddOns([]);
  };

  const handleEntityTypeChange = (value: string) => {
    setSelectedEntityType(value);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const formatPrice = (price: number, symbol: string) => {
    return `${symbol}${price.toLocaleString()}`;
  };

  const handleGetStarted = () => {
    if (user) {
      // Navigate to dashboard with selected options
      navigate('/dashboard/formation', { 
        state: { 
          country: selectedCountry, 
          entityType: selectedEntityType, 
          addOns: selectedAddOns 
        } 
      });
    } else {
      // Navigate to auth with redirect
      navigate('/auth', { 
        state: { 
          redirectTo: '/dashboard/formation',
          formationData: {
            country: selectedCountry, 
            entityType: selectedEntityType, 
            addOns: selectedAddOns 
          }
        } 
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Country Selection */}
          <Card className="border-2 transition-colors hover:border-primary/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Select Country</CardTitle>
                  <CardDescription>Choose where you want to form your company</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Select value={selectedCountry} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Choose a country..." />
                </SelectTrigger>
                <SelectContent>
                  {pricingData.map((country) => (
                    <SelectItem key={country.countryId} value={country.countryId}>
                      <span className="flex items-center gap-2">
                        <span className="text-xl">{country.flag}</span>
                        <span>{country.countryName}</span>
                        <span className="text-muted-foreground text-sm">({country.currency})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Entity Type Selection */}
          <Card className={`border-2 transition-all ${!selectedCountry ? 'opacity-50 pointer-events-none' : 'hover:border-primary/50'}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Select Entity Type</CardTitle>
                  <CardDescription>Choose your business structure</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {countryPricing ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {countryPricing.entityTypes.map((entity) => (
                    <div
                      key={entity.id}
                      onClick={() => handleEntityTypeChange(entity.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedEntityType === entity.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{entity.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{entity.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedEntityType === entity.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}>
                          {selectedEntityType === entity.id && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-lg font-bold text-primary">
                        {formatPrice(entity.basePrice, countryPricing.currencySymbol)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Please select a country first
                </p>
              )}
            </CardContent>
          </Card>

          {/* Add-ons Selection */}
          <Card className={`border-2 transition-all ${!selectedEntityType ? 'opacity-50 pointer-events-none' : 'hover:border-primary/50'}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Add-on Services</CardTitle>
                  <CardDescription>Enhance your formation package</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {countryPricing && selectedEntityType ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {countryPricing.addOns.map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() => handleAddOnToggle(addon.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAddOns.includes(addon.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          checked={selectedAddOns.includes(addon.id)}
                          className="mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-medium text-sm">{addon.name}</h4>
                            {addon.popular && (
                              <Badge variant="secondary" className="text-xs">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{addon.description}</p>
                          <div className="mt-2 font-semibold text-primary">
                            +{formatPrice(addon.price, countryPricing.currencySymbol)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Please select an entity type first
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <CardTitle>Price Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {calculation ? (
                  <>
                    {/* Country & Entity */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{countryPricing?.flag}</span>
                        <span className="font-medium">{countryPricing?.countryName}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedEntity?.name}
                      </div>
                    </div>

                    <Separator />

                    {/* Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base Formation</span>
                        <span className="font-medium">
                          {formatPrice(selectedEntity?.basePrice || 0, countryPricing?.currencySymbol || '$')}
                        </span>
                      </div>
                      
                      {selectedAddOns.length > 0 && (
                        <>
                          <div className="text-xs text-muted-foreground font-medium mt-3 mb-2">
                            Selected Add-ons ({selectedAddOns.length})
                          </div>
                          {countryPricing?.addOns
                            .filter(a => selectedAddOns.includes(a.id))
                            .map(addon => (
                              <div key={addon.id} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{addon.name}</span>
                                <span>+{formatPrice(addon.price, countryPricing.currencySymbol)}</span>
                              </div>
                            ))
                          }
                        </>
                      )}
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(calculation.total, calculation.currencySymbol)}
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground text-center">
                      {calculation.currency} • One-time payment
                    </div>

                    <Button 
                      className="w-full mt-4" 
                      size="lg"
                      onClick={handleGetStarted}
                    >
                      {user ? 'Continue to Dashboard' : 'Sign Up to Continue'}
                      {user ? <ArrowRight className="ml-2 h-4 w-4" /> : <Lock className="ml-2 h-4 w-4" />}
                    </Button>
                    
                    {!user && (
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        Already have an account?{' '}
                        <Link to="/auth" className="text-primary hover:underline">Sign in</Link>
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <Calculator className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Select options to see pricing</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Choose a country and entity type to calculate your formation cost
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="mt-4 p-4 rounded-lg bg-muted/50 text-center space-y-2">
              <p className="text-sm font-medium">Trusted by 1000+ entrepreneurs</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>Money-back guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
