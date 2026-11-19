import {contentPromotions, type ContentPromotion} from './contentPromotions';
// Fixed lead slot requested by the owner. Other catalog/ad placements stay intact.
export const featuredPartnerIds = new Set(['doola','katteb','efham','flyhermes','grey']);
const grey: ContentPromotion = {
  id:'grey',name:'Grey',lane:'payments',url:'https://shortet.com/Grey',
  title:['Explore global account options','استكشف خيارات الحسابات الدولية'],
  body:['Review Grey accounts and international payments. Check supported countries, verification requirements and current fees.','راجع حسابات Grey والمدفوعات الدولية. تحقق من الدول المدعومة ومتطلبات التحقق والرسوم الحالية.'],
  note:['Availability and features depend on your country and account approval.','يعتمد توفر الخدمة والمزايا على بلدك والموافقة على الحساب.'],color:'#a4caff'
};
export function featuredContentPartners(language:string):ContentPromotion[]{
  const ids=language==='ar'?['doola','katteb','efham']:['doola','flyhermes','grey'];
  return ids.map(id=>{
    const p=id==='grey'?grey:contentPromotions.find(p=>p.id===id)!;
    return {...p,name:id==='doola'?'Doola':id==='efham'?'Efham-AI':id==='flyhermes'?'Flyhermes':p.name};
  });
}
