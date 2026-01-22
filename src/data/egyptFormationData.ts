
export const egyptFormationTypes = [
  {
    id: 'sole-proprietorship',
    name: 'Sole Proprietorship',
    arabicName: 'منشأة فردية',
    minCapital: 'EGP 100,000',
    owners: '1 (Natural Person)',
    liability: 'Unlimited Personal',
    payment: '100% at establishment',
    foreignOwnership: '100% allowed*',
    description: 'Individual ownership with full personal liability',
    requirements: [
      'Single natural person owner',
      '21 years old with full legal capacity',
      'Considered a trader under law',
      'Full payment required at establishment'
    ]
  },
  {
    id: 'general-partnership',
    name: 'General Partnership',
    arabicName: 'شركة التضامن',
    minCapital: 'EGP 300,000',
    owners: '2 or more partners',
    liability: 'Unlimited Joint & Several',
    payment: '100% at establishment',
    foreignOwnership: '100% allowed*',
    description: 'Partnership with unlimited liability for all partners',
    requirements: [
      '2 or more partners',
      '21 years old (or 18 with court permission)',
      'All partners considered traders',
      'Company name must include partners names + "& Partners"'
    ]
  },
  {
    id: 'limited-partnership',
    name: 'Limited Partnership',
    arabicName: 'شركة التوصية البسيطة',
    minCapital: 'EGP 300,000',
    owners: '2 or more (General + Limited)',
    liability: 'General: Unlimited, Limited: Limited to capital',
    payment: '100% at establishment',
    foreignOwnership: '100% allowed*',
    description: 'Mixed partnership with general and limited partners',
    requirements: [
      'General partners with unlimited liability',
      'Limited partners with limited liability',
      'Only general partners can manage',
      'Company name includes general partners names only'
    ]
  },
  {
    id: 'partnership-by-shares',
    name: 'Partnership Limited by Shares',
    arabicName: 'شركة التوصية بالأسهم',
    minCapital: 'EGP 250,000',
    owners: '2 minimum (Natural/Legal)',
    liability: 'General: Unlimited, Shareholders: Limited',
    payment: '10% at establishment, 25% within 3 months',
    foreignOwnership: '100% allowed*',
    description: 'Partnership with share-based structure',
    requirements: [
      'Minimum 2 founders (natural or legal persons)',
      'At least 1 general partner with unlimited liability',
      'Supervisory board with minimum 3 members',
      'Share value: 10 piasters - EGP 1,000'
    ]
  },
  {
    id: 'limited-liability',
    name: 'Limited Liability Company',
    arabicName: 'الشركة ذات المسئولية المحدودة',
    minCapital: 'Determined by partners',
    owners: '2-50 partners',
    liability: 'Limited to capital contribution',
    payment: '100% at establishment',
    foreignOwnership: '100% allowed*',
    description: 'Most flexible structure with limited liability',
    requirements: [
      'Minimum 2, Maximum 50 partners',
      'At least 1 Egyptian manager required',
      'Equal value shares, fully paid at establishment',
      'Supervisory board required if more than 10 partners'
    ]
  },
  {
    id: 'joint-stock',
    name: 'Joint Stock Company',
    arabicName: 'الشركة المساهمة',
    minCapital: 'EGP 250,000',
    owners: '3 minimum (Natural/Legal)',
    liability: 'Limited to share value',
    payment: '10% at establishment, 25% within 3 months',
    foreignOwnership: '100% allowed*',
    description: 'Corporate structure suitable for large businesses',
    requirements: [
      'Minimum 3 founders (natural or legal persons)',
      'Board of Directors with minimum 3 members',
      'Share value: 10 piasters - EGP 1,000',
      'Maximum in-kind shares: 75% of total capital'
    ]
  }
];

export const egyptCompanyPackages = [
  {
    id: 'export-company',
    name: 'Export Company',
    arabicName: 'شركة التصدير',
    price: 16000,
    currency: 'EGP',
    description: 'Free permanent export card',
    arabicDescription: 'بطاقة تصديرية دائمة مجانًا',
    features: ['Company Formation', 'Commercial Registration', 'Tax Registration', 'Export Card']
  },
  {
    id: 'contracting-supply',
    name: 'Contracting & Supply Company',
    arabicName: 'شركة المقاولات و التوريدات',
    price: 25000,
    currency: 'EGP',
    description: 'Insurance file + Construction Federation registration',
    arabicDescription: 'فتح ملف تاميني + التسجيل في اتحاد التشييد و البناء',
    features: ['Company Formation', 'Insurance File', 'Federation Registration', 'Commercial Registration']
  },
  {
    id: 'trade-manufacturing',
    name: 'Trade & Manufacturing Company',
    arabicName: 'شركة التجاره و التصنيع',
    price: 15000,
    currency: 'EGP',
    description: 'Factory license assistance',
    arabicDescription: 'مساعدة في حصول على ترخيص المصنع',
    features: ['Company Formation', 'Factory License Support', 'Commercial Registration', 'Tax Registration']
  },
  {
    id: 'real-estate-marketing',
    name: 'Real Estate Marketing Company',
    arabicName: 'شركة تسويق عقاري',
    price: 17000,
    currency: 'EGP',
    description: 'Export/Import subscription',
    arabicDescription: 'اشتراك في الصادرات و الواردات',
    features: ['Company Formation', 'Export/Import Subscription', 'Commercial Registration', 'Tax Registration']
  },
  {
    id: 'agricultural-investment',
    name: 'Agricultural & Livestock Investment',
    arabicName: 'شركة استثمار زراعي و داجني و حيواني',
    price: 20500,
    currency: 'EGP',
    description: 'Activity certificate',
    arabicDescription: 'شهادة مزولة نشاط',
    features: ['Company Formation', 'Activity Certificate', 'Commercial Registration', 'Tax Registration']
  },
  {
    id: 'tourism-investment',
    name: 'Tourism Investment & Marketing',
    arabicName: 'شركة استثمار و تسويق السياحي',
    price: 12500,
    currency: 'EGP',
    description: 'Activity certificate',
    arabicDescription: 'شهادة مزاولة',
    features: ['Company Formation', 'Tourism License', 'Commercial Registration', 'Tax Registration']
  },
  {
    id: 'import-company',
    name: 'Import Company',
    arabicName: 'شركة الاستيراد',
    price: 55500,
    currency: 'EGP',
    description: 'Import card facilitation',
    arabicDescription: 'بنقدم لك تسهيلات البطاقة الاستيرادية',
    features: ['Company Formation', 'Import Card', 'Commercial Registration', 'Tax Registration', 'Bank Account Support']
  },
  {
    id: 'labor-supply',
    name: 'Labor Supply Company',
    arabicName: 'شركة الحاق عماله',
    price: 51000,
    currency: 'EGP',
    description: 'Domestic & International + Ministry of Manpower License',
    arabicDescription: 'بالداخل و الخارج + ترخيص من القوى العاملة',
    features: ['Company Formation', 'Manpower License', 'Commercial Registration', 'Tax Registration']
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing & Advertising',
    arabicName: 'شركة تسويق الكتروني و دعاية و اعلان',
    price: 16500,
    currency: 'EGP',
    description: 'Export/Import subscription',
    arabicDescription: 'أشتراك في الصادرات و الواردات',
    features: ['Company Formation', 'Export/Import Subscription', 'Commercial Registration', 'Tax Registration']
  },
  {
    id: 'software-company',
    name: 'Software Company',
    arabicName: 'شركة برمجة',
    price: 14500,
    currency: 'EGP',
    description: 'Ministry of Communications License',
    arabicDescription: 'ترخيص وزارة التصالات',
    features: ['Company Formation', 'Communications License', 'Commercial Registration', 'Tax Registration']
  }
];

export const egyptLegalFramework = {
  primaryLaws: [
    'Investment Law No. 72 of 2017',
    'Companies Law No. 159 of 1981'
  ],
  regulatoryAuthority: 'General Authority for Investment and Free Zones (GAFI)',
  investmentFeatures: [
    'Mix of incentives and customs exemptions',
    'Investment guarantees and investor protection',
    'Streamlined registration process'
  ]
};

export const egyptFormationServices = [
  'Legal consultation and structure selection',
  'GAFI registration and licensing',
  'Commercial registration',
  'Tax registration and VAT setup',
  'Banking assistance and account opening',
  'Office lease and address services',
  'Ongoing compliance support',
  'Annual return filing'
];
