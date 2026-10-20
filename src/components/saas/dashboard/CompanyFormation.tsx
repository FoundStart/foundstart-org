import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
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
  Loader2,
} from 'lucide-react';

import { useL } from '@/hooks/useL';
import { useTranslation } from '@/contexts/TranslationContext';
import { catalogT } from '@/data/formationCatalogAr';
import { formationCountries, formationAddons, minPrice } from '@/data/formationCatalog';

const steps = [
  { id: 1, title: 'Country', icon: MapPin },
  { id: 2, title: 'Entity Type', icon: Building2 },
  { id: 3, title: 'Business Details', icon: Users },
  { id: 4, title: 'Add-ons', icon: FileCheck },
  { id: 5, title: 'Review & Pay', icon: CreditCard },
];

const addons = formationAddons;

const FormationWizard = () => {
  const L = useL();
  const { language } = useTranslation();
  const ct = (x?: string) => catalogT(x, language);
  const [searchParams] = useSearchParams();
  const preselect = (searchParams.get('country') ?? '').toLowerCase();
  const cancelled = searchParams.get('order') === 'cancelled';
  const [currentStep, setCurrentStep] = useState(formationCountries.some(c => c.code === preselect) ? 2 : 1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    country: formationCountries.some(c => c.code === preselect) ? preselect : '',
    entityType: '',
    companyName: '',
    businessAddress: '',
    businessDescription: '',
    owners: [{ name: '', email: '', ownership: '100' }],
    addons: [] as string[],
  });

  const selectedCountry = formationCountries.find(c => c.code === formData.country);
  const selectedEntity = selectedCountry?.entities.find(e => e.code === formData.entityType);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addOwner = () => {
    setFormData({ ...formData, owners: [...formData.owners, { name: '', email: '', ownership: '' }] });
  };

  const removeOwner = (index: number) => {
    if (formData.owners.length > 1) {
      setFormData({ ...formData, owners: formData.owners.filter((_, i) => i !== index) });
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
    const basePrice = selectedEntity?.price ?? 0;
    const addonsTotal = addons
      .filter(a => formData.addons.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return basePrice + addonsTotal;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-formation-order', {
        body: {
          country: formData.country,
          entityType: formData.entityType,
          companyName: formData.companyName,
          businessAddress: formData.businessAddress,
          businessDescription: formData.businessDescription,
          owners: formData.owners,
          addons: formData.addons,
        },
      });
      if (error) throw error;
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }
      throw new Error(data?.error || 'Failed to create payment');
    } catch (e: any) {
      console.error('Formation order error:', e);
      toast({
        title: L('Could not start payment', 'تعذر بدء الدفع'),
        description: e?.message || L('Please try again or contact support.', 'حاول مرة أخرى أو تواصل مع الدعم.'),
        variant: 'destructive',
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {cancelled && (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950 p-4 text-sm">
          {L('Payment was cancelled - no charge was made. Review your details and try again when ready.', 'تم إلغاء الدفع - لم يتم خصم أي مبلغ. راجع بياناتك وحاول مرة أخرى عندما تكون جاهزاً.')}
        </div>
      )}

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
              <span className="mt-2 text-xs font-medium hidden sm:block">{L(step.title, ({ Country: 'الدولة', 'Entity Type': 'نوع الكيان', 'Business Details': 'بيانات النشاط', 'Add-ons': 'إضافات', 'Review & Pay': 'مراجعة ودفع' } as Record<string,string>)[step.title])}</span>
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
                <h2 className="text-xl font-semibold">{L('Choose Your Country', 'اختر دولتك')}</h2>
                <p className="text-muted-foreground">{L('Select where you want to form your company', 'اختر الدولة التي تريد تأسيس شركتك فيها')}</p>
              </div>
              <RadioGroup
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value, entityType: '' })}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {formationCountries.map((country) => (
                  <Label
                    key={country.code}
                    htmlFor={country.code}
                    onClick={() => setFormData(f => ({ ...f, country: country.code, entityType: f.country === country.code ? f.entityType : '' }))}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors ${
                      formData.country === country.code
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={country.code} id={country.code} className="sr-only" />
                    <span className="text-3xl">{country.flag}</span>
                    <span>
                      <span className="font-medium block">{ct(country.name)}</span>
                      <span className="text-xs text-muted-foreground">{L("from", "من")} ${minPrice(country)}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
              <p className="text-center text-sm text-muted-foreground pt-2">
                {L('Prices are FoundStart service fees. Government and notary fees are separate and confirmed in your quote before work starts.', 'الأسعار هي رسوم خدمة FoundStart. الرسوم الحكومية ورسوم التوثيق منفصلة ويتم تأكيدها في عرض السعر قبل بدء العمل.')}
              </p>
            </div>
          )}

          {/* Step 2: Entity Type */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">{L('Select Entity Type', 'اختر نوع الكيان')}</h2>
                <p className="text-muted-foreground">{L('Choose the business structure for', 'اختر الهيكل القانوني في')} {ct(selectedCountry?.name)}</p>
              </div>
              <RadioGroup
                value={formData.entityType}
                onValueChange={(value) => setFormData({ ...formData, entityType: value })}
                className="grid gap-4 sm:grid-cols-2"
              >
                {selectedCountry?.entities.map((entity) => (
                  <Label
                    key={entity.code}
                    htmlFor={entity.code}
                    onClick={() => setFormData(f => ({ ...f, entityType: entity.code }))}
                    className={`flex cursor-pointer flex-col gap-2 rounded-lg border-2 p-4 transition-colors ${
                      formData.entityType === entity.code
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem value={entity.code} id={entity.code} className="sr-only" />
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold">{ct(entity.name)}</span>
                      <span className="font-semibold text-primary">${entity.price}</span>
                    </span>
                    {entity.localName && language !== 'ar' && (
                      <span className="text-sm text-muted-foreground">{entity.localName}</span>
                    )}
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-1">{L('What you need to provide', 'ما الذي عليك تقديمه')}</span>
                    <ul className="list-disc pl-4 space-y-1">
                      {entity.requirements.map((req, i) => (
                        <li key={i} className="text-sm text-muted-foreground">{ct(req)}</li>
                      ))}
                    </ul>
                  </Label>
                ))}
              </RadioGroup>
              {selectedCountry?.note && (
                <p className="text-sm text-muted-foreground rounded-lg border p-3 bg-muted/40">{ct(selectedCountry.note)}</p>
              )}
            </div>
          )}

          {/* Step 3: Business Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">{L('Business Details', 'بيانات النشاط')}</h2>
                <p className="text-muted-foreground">{L('Provide information about your company', 'اكتب معلومات عن شركتك')}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">{L('Company Name', 'اسم الشركة')}</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder={L('Enter your company name', 'اكتب اسم شركتك')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">{L('Business Address', 'عنوان النشاط')}</Label>
                  <Textarea
                    id="businessAddress"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    placeholder={L('Enter your business address', 'اكتب عنوان نشاطك')}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">{L('Business Description', 'وصف النشاط')}</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                    placeholder={L('Describe your business activities', 'اوصف أنشطة شركتك')}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{L('Owners / Members', 'الملاك / الأعضاء')}</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addOwner}>
                      <Plus className="mr-2 h-4 w-4" />
                      {L('Add Owner', 'إضافة مالك')}
                    </Button>
                  </div>

                  {formData.owners.map((owner, index) => (
                    <div key={index} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label>{L('Name', 'الاسم')}</Label>
                        <Input
                          value={owner.name}
                          onChange={(e) => updateOwner(index, 'name', e.target.value)}
                          placeholder={L('Full name', 'الاسم الكامل')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{L('Email', 'البريد الإلكتروني')}</Label>
                        <Input
                          type="email"
                          value={owner.email}
                          onChange={(e) => updateOwner(index, 'email', e.target.value)}
                          placeholder={L('Email address', 'البريد الإلكتروني')}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1 space-y-2">
                          <Label>{L('Ownership %', 'نسبة الملكية %')}</Label>
                          <Input
                            type="number"
                            value={owner.ownership}
                            onChange={(e) => updateOwner(index, 'ownership', e.target.value)}
                            placeholder={L('Ownership %', 'نسبة الملكية %')}
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
                <h2 className="text-xl font-semibold">{L('Additional Services', 'خدمات إضافية')}</h2>
                <p className="text-muted-foreground">{L('Select optional services to add to your formation', 'اختر خدمات اختيارية لإضافتها إلى التأسيس')}</p>
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
                        <span className="font-medium">{ct(addon.name)}</span>
                        <p className="text-sm text-muted-foreground">{ct(addon.description)}</p>
                      </div>
                    </div>
                    <span className="font-semibold">${addon.price}</span>
                  </Label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Review & Pay */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">{L('Review Your Order', 'راجع طلبك')}</h2>
                <p className="text-muted-foreground">{L('Please review your company formation details', 'من فضلك راجع بيانات تأسيس شركتك')}</p>
              </div>

              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{L('Country', 'الدولة')}</span>
                  <span className="font-medium">{selectedCountry?.flag} {ct(selectedCountry?.name)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{L('Entity Type', 'نوع الكيان')}</span>
                  <span className="font-medium">{ct(selectedEntity?.name)}{selectedEntity?.localName && language !== 'ar' ? ` (${selectedEntity.localName})` : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{L('Company Name', 'اسم الشركة')}</span>
                  <span className="font-medium">{formData.companyName || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{L('Owners', 'الملاك')}</span>
                  <span className="font-medium">{formData.owners.length}</span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{L('Formation Fee', 'رسوم التأسيس')} - {ct(selectedEntity?.name)} ({ct(selectedCountry?.name)})</span>
                    <span className="font-medium">${selectedEntity?.price}</span>
                  </div>
                  {formData.addons.map((addonId) => {
                    const addon = addons.find(a => a.id === addonId);
                    return addon && (
                      <div key={addonId} className="flex justify-between">
                        <span className="text-muted-foreground">{ct(addon.name)}</span>
                        <span className="font-medium">${addon.price}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-semibold">{L('Total', 'الإجمالي')}</span>
                    <span className="font-bold text-lg">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {selectedCountry?.note && (
                <p className="text-sm text-muted-foreground rounded-lg border p-3 bg-muted/40">{ct(selectedCountry.note)}</p>
              )}
              <p className="text-center text-sm text-muted-foreground">
                {L('Secure card payment via Stripe. Your company appears in your dashboard right after payment.', 'دفع آمن بالبطاقة عبر Stripe. تظهر شركتك في لوحة التحكم بعد الدفع مباشرة.')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1 || submitting}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {L('Back', 'رجوع')}
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
            {L('Next', 'التالي')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
            {submitting ? L('Opening secure checkout...', 'جاري فتح الدفع الآمن...') : L('Pay with Stripe', 'ادفع عبر Stripe')}
          </Button>
        )}
      </div>
    </div>
  );
};

const CompanyFormation = () => {
  const L = useL();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{L('Company Formation', 'تأسيس الشركات')}</h1>
        <p className="text-muted-foreground">{L('Start your business in the USA, UK, Canada, Europe, or Egypt', 'ابدأ شركتك في أمريكا أو بريطانيا أو كندا أو أوروبا أو مصر')}</p>
      </div>

      <FormationWizard />
    </div>
  );
};

export default CompanyFormation;
