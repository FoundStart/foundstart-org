import usePromotionPool from './usePromotionPool';
import ArticlePartnerBanners from './ArticlePartnerBanners';
import StaticPartnerRails from './StaticPartnerRails';
import {useEffect,useMemo,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {useLocation} from 'react-router-dom';
import {ArrowUpRight,ChevronLeft,ChevronRight,Pause,Play,X,Building2,Globe,Sparkles} from 'lucide-react';
import {useTranslation} from '@/contexts/TranslationContext';
import {railPromotionCount,contentPromotions,contentRoute,promotionContext,cairoSchedule,promotionPolicy} from '@/data/contentPromotions';
import {isLive} from '@/utils/integrationSettings';
let memoryUntil=0;
const CAP='fs:content-promo:until:v1',NEXT='fs:content-promo:next:v1';
const read=(k:string)=>{try{return Number(localStorage.getItem(k)||0)}catch{return 0}};
const write=(k:string,v:number)=>{try{localStorage.setItem(k,String(v))}catch{}};
export default function ContentPartnerPromotions(){
 const {pathname}=useLocation();const {language}=useTranslation();const ar=language==='ar';const t=(en:string,arabic:string)=>ar?arabic:en;const schedule=cairoSchedule();const lane=promotionContext(pathname)||schedule.lane;
 const pool=usePromotionPool();
 const [index,setIndex]=useState(0),[paused,setPaused]=useState(false),[hover,setHover]=useState(false),[open,setOpen]=useState(false),[dismissed,setDismissed]=useState(false);const [popup,setPopup]=useState(pool[0]);const bannerRef=useRef<HTMLElement>(null);const closeRef=useRef<HTMLButtonElement>(null);const priorFocus=useRef<HTMLElement|null>(null);const ad=pool[index%pool.length];const allowed=contentRoute(pathname)&&isLive('partnerAds');
 useEffect(()=>{setIndex(0);setOpen(false);setDismissed(false)},[pathname]);
 useEffect(()=>{if(!allowed||!pool.length)return;let engaged=false,progress=false,shown=false;const tryShow=()=>{if(shown||!engaged||!progress||document.hidden||Math.max(read(CAP),memoryUntil)>Date.now())return;const el=document.activeElement as HTMLElement|null;if(el?.matches('input,textarea,select,[contenteditable=true]')||document.fullscreenElement||[...document.querySelectorAll('video')].some(v=>!v.paused)||document.querySelector('[role=dialog][data-state=open],dialog[open]'))return;shown=true;memoryUntil=Date.now()+promotionPolicy.cooldownMs;write(CAP,memoryUntil);const n=read(NEXT);write(NEXT,n+1);setPopup(pool[pool.length-1]);priorFocus.current=document.activeElement as HTMLElement;setOpen(true)};const scroll=()=>{progress=(scrollY+innerHeight)/Math.max(document.documentElement.scrollHeight,1)>=promotionPolicy.minReadProgress;tryShow()};const timer=window.setTimeout(()=>{engaged=true;scroll()},promotionPolicy.delayMs);window.addEventListener('scroll',scroll,{passive:true});return()=>{clearTimeout(timer);window.removeEventListener('scroll',scroll)}},[allowed,pathname,pool]);
 const close=()=>{setOpen(false);priorFocus.current?.focus({preventScroll:true})};
 useEffect(()=>{if(!open)return;closeRef.current?.focus({preventScroll:true});const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();close()}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[open]);
 if(!allowed||!pool.length)return null;const Icon=ad.lane==='formation'?Building2:ad.lane==='payments'?Globe:Sparkles;
 const disclosure=t('Partner promotion. Some links may earn us a commission.','ترويج لشركاء. بعض الروابط قد تمنحنا عمولة.');
 return <><StaticPartnerRails pool={pool.slice(0,railPromotionCount(pool.length))} ar={ar}/><ArticlePartnerBanners/>
 {open&&createPortal(<aside data-content-partner-popup role="region" aria-label={t('Partner promotion','ترويج لشريك')} dir={ar?'rtl':'ltr'} className="fixed bottom-24 start-4 z-40 w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-purple-300/35 bg-[#151025] p-5 text-white shadow-2xl sm:bottom-5 sm:start-5"><button ref={closeRef} type="button" onClick={close} aria-label={t('Close promotion for 24 hours','إغلاق الترويج لمدة 24 ساعة')} className="absolute end-2 top-2 rounded-lg p-3 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300"><X className="h-4 w-4"/></button><p className="pe-10 text-[10px] uppercase tracking-widest text-purple-200">{popup.owned?t('Promotion · Our platform','ترويج · من منصاتنا'):t('Advertisement · Partner','إعلان · شريك')}</p><p className="mt-3 text-2xl font-bold" dir="ltr">{popup.name}</p><h2 className="mt-2 text-lg font-semibold">{popup.title[ar?1:0]}</h2><p className="mt-2 text-sm leading-relaxed text-white/65">{popup.body[ar?1:0]}</p><p className="mt-3 text-[11px] leading-relaxed text-white/55">{popup.note[ar?1:0]}</p><a href={popup.url} target="_blank" rel="sponsored nofollow noopener noreferrer" onClick={close} className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-purple-500 px-4 py-3 text-sm font-semibold hover:bg-purple-400">{t('Explore','استكشف')} {popup.name}<ArrowUpRight className="h-4 w-4"/></a><button type="button" onClick={close} className="mt-2 w-full rounded-lg p-2 text-xs text-white/65 hover:bg-white/10">{t('Not now','ليس الآن')}</button><p className="mt-2 text-[10px] leading-relaxed text-white/45">{popup.owned?t('Promotion for our own platform.','ترويج لإحدى منصاتنا.'):disclosure}</p></aside>,document.body)}</>;
}
