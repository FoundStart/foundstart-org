import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  MapPin,
  Users,
  FileCheck,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';

const countries = [
  { code: 'usa', name: 'United States', flag: '🇺🇸', entities: ['llc', 'c_corp', 's_corp'] },
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', entities: ['ltd', 'llp'] },
  { code: 'germany', name: 'Germany', flag: '🇩🇪', entities: ['gmbh'] },
  { code: 'netherlands', name: 'Netherlands', flag: '🇳🇱', entities: ['bv'] },
  { code: 'spain', name: 'Spain', flag: '🇪🇸', entities: ['sl'] },
  { code: 'france', name: 'France', flag: '🇫🇷', entities: ['sarl', 'sas'] },
];

const entityTypes: Record<string, { name: string; description: string }> = {
  llc: { name: 'LLC', description: 'Limited Liability Company - Flexible structure with pass-through taxation' },
  c_corp: { name: 'C-Corporation', description: 'Standard corporation with separate taxation' },
  s_corp: { name: 'S-Corporation', description: 'Pass-through taxation with corporate structure' },
  ltd: { name: 'LTD', description: 'Private Limited Company - Standard UK business structure' },
  llp: { name: 'LLP', description: 'Limited Liability Partnership' },
  gmbh: { name: 'GmbH', description: 'Gesellschaft mit beschränkter Haftung - German LLC equivalent' },
  bv: { name: 'BV', description: 'Besloten Vennootschap - Dutch private limited company' },
  sl: { name: 'SL', description: 'Sociedad Limitada - Spanish limited company' },
  sarl: { name: 'SARL', description: 'Société à responsabilité limitée - French LLC equivalent' },
  sas: { name: 'SAS', description: 'Société par actions simplifiée - Simplified joint-stock company' },
};

const steps = [
  { id: 1, title: 'Country', icon: MapPin },
  { id: 2, title: 'Entity Type', icon: Building2 },
  { id: 3, title: 'Business Details', icon: Users },
  { id: 4, title: 'Add-ons', icon: FileCheck },
  { id: 5, title: 'Review', icon: CreditCard },
];

const FormationWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    country: '',
    entityType: '',
    companyName: '',
    businessAddress: '',
    businessDescription: '',
    owners: [{ name: '', email: '', ownership: '100' }],
    addons: [] as string[],
  });

  const selectedCountry = countries.find(c => c.code === formData.country);

  const addons = [
    { id: 'registered_agent', name: 'Registered Agent', price: 149, description: 'Required for most states' },
    { id: 'virtual_office', name: 'Virtual Office', price: 199, description: 'Professional business address' },
    { id: 'ein', name: 'EIN Registration', price: 99, description: 'Federal Tax ID number' },
    { id: 'bank_assist', name: 'Bank Account Assistance', price: 249, description: 'Help opening a business bank account' },
    { id: 'operating_agreement', name: 'Operating Agreement', price: 79, description: 'Custom legal document' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addOwner = () => {
    setFormData({
      ...formData,
      owners: [...formData.owners, { name: '', email: '', ownership: '' }],
    });
  };

  const removeOwner = (index: number) => {
    if (formData.owners.length > 1) {
      setFormData({
        ...formData,
        owners: formData.owners.filter((_, i) => i !== index),
      });
    }
  };

  const updateOwner = (index: number, field: string, value: string) => {
    const newOwners = [...formData.owners];
    newOwners[index] = { ...newOwners[index], [field]: value };
    setFormData({ ...formData, owners: newOwners });
  };

  const toggleAddon = (addonId: string) => {
    setFormData({
      ...formData,
      addons: formData.addons.includes(addonId)
        ? formData.addons.filter(id => id !== addonId)
        : [...formData.addons, addonId],
    });
  };

  const calculateTotal = () => {
    const basePrice = 299;
    const addonsTotal = addons
      .filter(a => formData.addons.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return basePrice + addonsTotal;
  };

  const handleSubmit = () => {
    // TODO: Submit to API
    console.log('Submitting:', formData);
    navigate('/dashboard/formation');
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30 text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span className="mt-2 text-xs font-medium hidden sm:block">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {/* Step 1: Country Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Choose Your Country</h2>
                <p className="text-muted-foreground">Select where you want to form your company</p>
              </div>
              <RadioGroup
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value, entityType: '' })}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {countries.map((country) => (
                  <Label
                    key={country.code}
                    htmlFor={country.code}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                      formData.country === country.code
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={country.code} id={country.code} className="sr-only" />
                    <span className="text-3xl">{country.flag}</span>
                    <span className="font-medium">{country.name}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 2: Entity Type */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Select Entity Type</h2>
                <p className="text-muted-foreground">Choose the business structure for {selectedCountry?.name}</p>
              </div>
              <RadioGroup
                value={formData.entityType}
                onValueChange={(value) => setFormData({ ...formData, entityType: value })}
                className="grid gap-4 sm:grid-cols-2"
              >
                {selectedCountry?.entities.map((entityCode) => {
                  const entity = entityTypes[entityCode];
                  return (
                    <Label
                      key={entityCode}
                      htmlFor={entityCode}
                      className={`flex cursor-pointer flex-col gap-2 rounded-lg border-2 p-4 transition-colors ${
                        formData.entityType === entityCode
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={entityCode} id={entityCode} className="sr-only" />
                      <span className="font-semibold">{entity.name}</span>
                      <span className="text-sm text-muted-foreground">{entity.description}</span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Business Details</h2>
                <p className="text-muted-foreground">Provide information about your company</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    placeholder="Enter your business address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Business Description</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                    placeholder="Describe your business activities"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Owners / Members</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOwner}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Owner
                    </Button>
                  </div>
                  
                  {formData.owners.map((owner, index) => (
                    <div key={index} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={owner.name}
                          onChange={(e) => updateOwner(index, 'name', e.target.value)}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={owner.email}
                          onChange={(e) => updateOwner(index, 'email', e.target.value)}
                          placeholder="Email address"
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1 space-y-2">
                          <Label>Ownership %</Label>
                          <Input
                            type="number"
                            value={owner.ownership}
                            onChange={(e) => updateOwner(index, 'ownership', e.target.value)}
                            placeholder="Ownership %"
                            min="0"
                            max="100"
                          />
                        </div>
                        {formData.owners.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOwner(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Add-ons */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Additional Services</h2>
                <p className="text-muted-foreground">Select optional services to add to your formation</p>
              </div>
              
              <div className="grid gap-4">
                {addons.map((addon) => (
                  <Label
                    key={addon.id}
                    htmlFor={addon.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-colors ${
                      formData.addons.includes(addon.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={addon.id}
                        checked={formData.addons.includes(addon.id)}
                        onCheckedChange={() => toggleAddon(addon.id)}
                      />
                      <div>
                        <span className="font-medium">{addon.name}</span>
                        <p className="text-sm text-muted-foreground">{addon.description}</p>
                      </div>
                    </div>
                    <span className="font-semibold">${addon.price}</span>
                  </Label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Review Your Order</h2>
                <p className="text-muted-foreground">Please review your company formation details</p>
              </div>

              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Entity Type</span>
                  <span className="font-medium">{entityTypes[formData.entityType]?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company Name</span>
                  <span className="font-medium">{formData.companyName || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owners</span>
                  <span className="font-medium">{formData.owners.length}</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Formation Fee</span>
                    <span className="font-medium">$299</span>
                  </div>
                  {formData.addons.map((addonId) => {
                    const addon = addons.find(a => a.id === addonId);
                    return addon && (
                      <div key={addonId} className="flex justify-between">
                        <span className="text-muted-foreground">{addon.name}</span>
                        <span className="font-medium">${addon.price}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {currentStep < 5 ? (
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !formData.country) ||
              (currentStep === 2 && !formData.entityType) ||
              (currentStep === 3 && !formData.companyName)
            }
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <CreditCard className="mr-2 h-4 w-4" />
            Proceed to Payment
          </Button>
        )}
      </div>
    </div>
  );
};

const CompanyFormation = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Company Formation</h1>
        <p className="text-muted-foreground">Start your business in USA, UK, or Europe</p>
      </div>
      
      <FormationWizard />
    </div>
  );
};

export default CompanyFormation;
