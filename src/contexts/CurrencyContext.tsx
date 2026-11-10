
import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyCode = 'EGP' | 'USD' | 'EUR' | 'GBP';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  rates: Record<CurrencyCode, number>;
  convert: (amount: number, from?: CurrencyCode) => number;
  format: (amount: number, from?: CurrencyCode) => string;
  formatBoth: (amount: number, from?: CurrencyCode) => string;
}

const defaultRates: Record<CurrencyCode, number> = {
  USD: 1,
  EGP: 50.5,
  EUR: 0.92,
  GBP: 0.79,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const symbols: Record<CurrencyCode, string> = {
  EGP: 'EGP',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('EGP');
  const [rates, setRates] = useState(defaultRates);

  // Egyptian pounds are the site default. Only an explicit visitor choice overrides it.
  useEffect(() => {
    const saved = localStorage.getItem('foundstart_currency_egp_v1') as CurrencyCode;
    if (saved && defaultRates[saved]) setCurrency(saved);
  }, []);

  const chooseCurrency = (next: CurrencyCode) => {
    setCurrency(next);
    localStorage.setItem('foundstart_currency_egp_v1', next);
  };

  const convert = (amount: number, from: CurrencyCode = 'USD') => {
    const usdAmount = amount / rates[from];
    return usdAmount * rates[currency];
  };

  const format = (amount: number, from: CurrencyCode = 'USD') => {
    const converted = convert(amount, from);
    return `${symbols[currency]} ${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const formatBoth = (amount: number, from: CurrencyCode = 'USD') => {
    const egpAmount = (amount / rates[from]) * rates.EGP;
    const usdAmount = amount / rates[from];
    return `EGP ${egpAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })} (~$${usdAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })})`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: chooseCurrency, rates, convert, format, formatBoth }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
