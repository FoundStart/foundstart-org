import {Component,type ReactNode} from 'react';
/** Keep a failed route or a stale deployment chunk from leaving an empty screen. */
export default class ContentRouteBoundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return{failed:true}}
 render(){if(!this.state.failed)return this.props.children;const ar=new URLSearchParams(location.search).get('lang')==='ar';return <main dir={ar?'rtl':'ltr'} className="flex min-h-screen items-center justify-center bg-[#080b18] px-6 text-white"><section className="w-full max-w-lg rounded-2xl border border-purple-400/30 bg-[#141225] p-8 text-center"><h1 className="text-2xl font-bold">{ar?'تعذر تحميل الصفحة':'This page could not load'}</h1><p className="mt-4 text-sm leading-7 text-white/70">{ar?'قد تكون الصفحة تغيرت أثناء التصفح أو لم يكتمل التحميل. جرب إعادة التحميل لفتح النسخة الحالية.':'The page may have changed while you were browsing, or loading may have been interrupted. Reload to try the current version.'}</p><button onClick={()=>location.reload()} className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-semibold">{ar?'إعادة تحميل الصفحة':'Reload page'}</button><a href="/blog" className="mt-5 block text-sm underline">{ar?'الرجوع إلى المدونة':'Back to the blog'}</a></section></main>}
}
