 import { useState } from 'react';
 import { Button } from '@/components/ui/button';
 import { ArrowRight } from 'lucide-react';
 import { Link } from 'react-router-dom';
 import { useTranslation } from '@/contexts/TranslationContext';
 
 interface Entity {
   code: string;
   name: string;
   flag: string;
   partner?: string;
 }
 
 const EntitySelector = () => {
   const { isRTL } = useTranslation();
   const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
 
   const entities: Entity[] = [
     { code: 'usa', name: 'USA', flag: '🇺🇸', partner: 'FoundStart' },
     { code: 'uk', name: 'UK', flag: '🇬🇧', partner: 'FoundStart' },
     { code: 'canada', name: 'Canada', flag: '🇨🇦', partner: 'FoundStart' },
     { code: 'estonia', name: 'Estonia', flag: '🇪🇪', partner: '1office' },
     { code: 'finland', name: 'Finland', flag: '🇫🇮', partner: '1office' },
     { code: 'sweden', name: 'Sweden', flag: '🇸🇪', partner: '1office' },
     { code: 'latvia', name: 'Latvia', flag: '🇱🇻', partner: '1office' },
     { code: 'lithuania', name: 'Lithuania', flag: '🇱🇹', partner: '1office' },
     { code: 'egypt', name: 'Egypt', flag: '🇪🇬', partner: 'FoundStart' },
   ];
 
   return (
     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
       <div className="container mx-auto max-w-5xl">
         <div className={`text-center mb-10 ${isRTL ? 'text-right' : ''}`}>
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             {isRTL ? 'اختر دولة التأسيس' : 'Choose Your Jurisdiction'}
           </h2>
           <p className="text-lg text-muted-foreground">
             {isRTL 
               ? 'اختر الدولة التي ترغب في تأسيس شركتك فيها'
               : 'Select the country where you want to form your company'
             }
           </p>
         </div>
 
         <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
           {entities.map((entity) => (
             <button
               key={entity.code}
               onClick={() => setSelectedEntity(entity.code)}
               className={`
                 relative flex items-center justify-center gap-2 p-3 md:p-4 
                 rounded-xl border-2 transition-all duration-200
                 ${selectedEntity === entity.code 
                   ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                   : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                 }
               `}
             >
               <span className="text-xl md:text-2xl">{entity.flag}</span>
               <span className="font-medium text-sm md:text-base">{entity.name}</span>
               {entity.partner && (
                 <span className="absolute -top-2 -right-2 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full hidden md:block">
                   {entity.partner}
                 </span>
               )}
             </button>
           ))}
         </div>
 
         {selectedEntity && (
           <div className="flex justify-center animate-fade-in">
             <Button size="lg" className="text-lg px-8 py-6 group" asChild>
               <Link to={`/auth?country=${selectedEntity}`}>
                 {isRTL ? 'ابدأ التأسيس الآن' : 'Start Formation Now'}
                 <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
               </Link>
             </Button>
           </div>
         )}
 
         {!selectedEntity && (
           <p className="text-center text-muted-foreground text-sm">
             {isRTL ? 'اختر دولة للمتابعة' : 'Select a country to continue'}
           </p>
         )}
       </div>
     </section>
   );
 };
 
 export default EntitySelector;