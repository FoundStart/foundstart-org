import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import PartnerCard from '@/components/partners/PartnerCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DigitalPartners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const partners = [
    // Business Company Formation
    { category: "Business Company Formation", platform: "Privatily", url: "https://privatily.com/ref/Deeemoz/", niche: "Company formation in USA" },
    { category: "Business Company Formation", platform: "ITIN", url: "https://theitin.com/ref/80", niche: "Company formation in USA" },
    { category: "Business Company Formation", platform: "Clemta", url: "https://clemta.com/?ref=njbhzwf", niche: "Company formation in USA" },
    { category: "Business Company Formation", platform: "Startglobal", url: "http://startglobal.co/?via=mohamed-sayed", niche: "Company formation in USA" },
    { category: "Business Company Formation", platform: "doola", url: "https://partnersps.doola.com/yukcm0gd526a", niche: "Company formation in USA" },
    { category: "Business Company Formation", platform: "Privatily", url: "https://privatily.com/ref/Deeemoz/", niche: "Company formation in Canada" },
    { category: "Business Company Formation", platform: "Firstbase", url: "https://firstbase.pxf.io/RGaDzX", niche: "Company formation in UK" },
    { category: "Business Company Formation", platform: "1stFormations", url: "https://1st-formations-limited.sjv.io/4GKB30", niche: "Company formation in UK" },
    { category: "Business Company Formation", platform: "Privatily", url: "https://privatily.com/ref/Deeemoz/", niche: "Company formation in UK" },
    { category: "Business Company Formation", platform: "Rapid Formation", url: "https://rapid-formations.sjv.io/XmEo53", niche: "Company formation in UK" },
    { category: "Business Company Formation", platform: "1office", url: "https://my1office.co/en/company/register?ref=mdzknzu", niche: "Company formation in (UK-Estonia-Finland-Sweden-Latvia-Lithuania)" },

    // Telecommunication
    { category: "Telecommunication", platform: "Bnesim", url: "https://bnes.im/PHV3", niche: "eSIM Telecommunication" },
    { category: "Telecommunication", platform: "esim me", url: "https://esim.me/esim-me-card-for-android?tracking=uNTexiT4sVLlxvvReENXMkAuUAMnyL60fRxBqMvmfSfUMUYCd6vNYXOsTKfmyWtB", niche: "eSIM Telecommunication" },

    // Finance
    { category: "Finance", platform: "Stripe", url: "https://stripe.com", niche: "Payment Gateway" },
    { category: "Finance", platform: "Mercury", url: "https://mercury.com/r/deeemoz-llc", niche: "USA Bank" },
    { category: "Finance", platform: "Wise", url: "https://wise.com/invite/u/mohamedsayeda7", niche: "Bank/Wallet" },
    { category: "Finance", platform: "Refresh me", url: "https://get.refresh.me/0jswhxxxuxd4", niche: "The all-in-one personal financial management tool" },
    { category: "Finance", platform: "Redotpay", url: "https://url.hk/i/en/q1xmy", niche: "Virtual cards" },
    { category: "Finance", platform: "Airtm", url: "https://app.airtm.com/ivt/msa2023", niche: "Bank/Wallet" },
    { category: "Finance", platform: "Payeer", url: "https://payeer.com/?session=29670378", niche: "Digital Wallet" },
    { category: "Finance", platform: "Novel bank", url: "https://trynovel.com/?lmref=HaLvsA", niche: "Bank/Wallet" },
    { category: "Finance", platform: "Gate", url: "https://www.gate.com/signup/BAJHU1EJ?ref_type=103", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Finance", platform: "Binance", url: "https://www.binance.com/referral/mystery-box/2025-pizza-day/claim?ref=GRO_16987_J6YH9", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Finance", platform: "ByBit", url: "https://www.bybit.com/invite?ref=NY47LOY", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Finance", platform: "BingX", url: "https://bingx.com/invite/WXBU1R/", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Finance", platform: "Bitget", url: "https://newshare.bwb.global/en/invite_earn_coin?inviteCode=nQXZQE", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Finance", platform: "OKX", url: "https://okx.com/join/98141578", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Finance", platform: "KuCoin", url: "https://www.kucoin.com/r/rf/QBSAE7HF", niche: "Crypto Wallet - Exchange P2P" },
    { category: "Finance", platform: "HTX", url: "https://www.htx.com/invite/en-us/1f?invite_code=643gc223", niche: "Crypto Wallet - Exchange P2P" },

    // Large Language Model
    { category: "Large Language Model", platform: "Claude", url: "https://claude.ai/referral/kOoRtNzkSg", niche: "Claude LLM" },
    { category: "Large Language Model", platform: "Manus", url: "https://manus.im/invitation/XDECAJVSG9VE", niche: "Manus LLMs" },

    // AI Videos-UGC
    { category: "AI Videos-UGC", platform: "TagsShop", url: "https://tagshop.ai?via=momo", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Creatify", url: "https://creatify.ai/?via=momo", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Makereels", url: "https://makereels.ai/?via=momo-sa", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Heygen", url: "https://heygen.com", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Topviews", url: "https://www.topview.ai/", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Arcads", url: "https://arcads.ai/?via=mohamed-sayed", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "MakeUGCAI", url: "https://www.makeugc.ai/?ref=mohamed", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Adcreative", url: "https://free-trial.adcreative.ai/lqp6txbhnoa6", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Veed", url: "https://veed.cello.so/PiYocZYTYQ1", niche: "AI UGC" },
    { category: "AI Videos-UGC", platform: "Invideo", url: "https://invideo.sjv.io/yqovdV", niche: "AI Videos" },

    // Business Automation
    { category: "Business Automation", platform: "Pabbly", url: "https://payments.pabbly.com/api/affurl/RVYZ07kQyUZ0Z1HUKZ1m/HyZ0KsMikOjASVp2p?target=b1BHyhSldo6RN1Fn", niche: "Business Automation" },
    { category: "Business Automation", platform: "Flowise", url: "https://cloud.flowiseai.com/register?via=momo", niche: "Build AI Agents Visually" },
    { category: "Business Automation", platform: "Axiom", url: "https://axiom.ai/a?afmc=6k", niche: "Automation Platform" },
    { category: "Business Automation", platform: "Wiza", url: "https://wiza.co/?via=deeemoz", niche: "Automation Platform" },
    { category: "Business Automation", platform: "Phantombuster", url: "https://phantombuster.com/?deal=mohamed80", niche: "Business Automation" },
    { category: "Business Automation", platform: "FlockSocial", url: "https://flocksocial.com/?ref=ntjkymu", niche: "Instagram grow real audiences" },
    { category: "Business Automation", platform: "Notifier SO", url: "http://notifier.so/?via=mohamed", niche: "Leads Generation" },
    { category: "Business Automation", platform: "Repurpose", url: "https://repurpose.io/?aff=87211", niche: "Repost SMM tool" },
    { category: "Business Automation", platform: "Postiz", url: "https://postiz.com/?ref=mohamed", niche: "Social scheduling" },
    { category: "Business Automation", platform: "Closer AI", url: "https://start.closerx.ai/home-9979?am_id=mohamed1262", niche: "AI calling" },
    { category: "Business Automation", platform: "GHL", url: "https://www.gohighlevel.com/?fp_ref=deeemoz", niche: "Marketing Automation Platform" },
    { category: "Business Automation", platform: "Blotato", url: "https://blotato.com/?ref=mohamedp5", niche: "Social scheduling" },
    { category: "Business Automation", platform: "buddypunch", url: "https://try.buddypunch.com/momo", niche: "HR Employee Tracking" },

    // HR Management
    { category: "HR Management", platform: "Multiplier", url: "https://affiliate.usemultiplier.com/o6vjx1bpd2lm", niche: "HR Management" },
    { category: "HR Management", platform: "Postiz", url: "https://postiz.com/?ref=mohamedem", niche: "Social media scheduling tool" },

    // AI Sales
    { category: "AI Sales", platform: "laxis", url: "https://get.laxis.com/l36gor8s8ptl", niche: "AI Sales Copilot" },

    // AI Videos
    { category: "AI Videos", platform: "Video Ad Vault", url: "http://deeemoz.monsterrobot.zaxaa.com/s/3616643859792", niche: "AI Video ads" },
    { category: "AI Videos", platform: "Syllabe", url: "https://syllaby.io/?via=momo89", niche: "Video Creation" },
    { category: "AI Videos", platform: "Fliki", url: "https://fliki.ai/?via=mohamed-sayed", niche: "AI Video creation" },
    { category: "AI Videos", platform: "Pictory", url: "https://pictory.ai/?ref=mohamed49", niche: "AI Video creation" },
    { category: "AI Videos", platform: "VidIQ", url: "https://vidiq.com/deeemoz", niche: "AI Video optimization tool" },
    { category: "AI Videos", platform: "Get Munch", url: "https://www.getmunch.com/?utm_campaign=influencers&utm_medium=website&utm_source=rewardful&via=Deeemoz", niche: "AI video repurposing platform" },
    { category: "AI Videos", platform: "Video Robot", url: "https://paykstrt.com/9690/145081", niche: "Video AI tool" },
    { category: "AI Videos", platform: "Video Creator", url: "https://paykstrt.com/27513/145081", niche: "Video AI tool" },
    { category: "AI Videos", platform: "ChatterPal", url: "https://paykstrt.com/14753/145081", niche: "ChatterPal" },
    { category: "AI Videos", platform: "Video Robot VR2", url: "https://paykstrt.com/19004/145081", niche: "Video AI tool" },
    { category: "AI Videos", platform: "DoodleMaker", url: "https://paykstrt.com/21278/145081", niche: "DoodleMaker" },
    { category: "AI Videos", platform: "DoodleMaker2", url: "https://paykstrt.com/21462/145081", niche: "DoodleMaker2" },
    { category: "AI Videos", platform: "Syllaby", url: "https://syllaby.io/?via=momo89", niche: "Turn any Idea into Faceless VideosAI Avatar VideosB-Roll Videos" },
    { category: "AI Videos", platform: "AvatarBuilder", url: "https://paykstrt.com/24810/145081", niche: "AvatarBuilder" },
    { category: "AI Videos", platform: "Vidyo AI", url: "https://vidyo.ai?via=409w3", niche: "AI Video long to short" },
    { category: "AI Videos", platform: "Quso AI", url: "https://quso.ai?via=409w3", niche: "AI Video long to short" },
    { category: "AI Videos", platform: "Videogen", url: "https://videogen.io?fpr=mohamed35", niche: "AI videos" },
    { category: "AI Videos", platform: "Awesomescreenshot", url: "https://www.awesomescreenshot.com/workspace/invite/8ec75fbbc0305d8d0aa422d9d2a4276b", niche: "Video screen recording & Editing" },
    { category: "AI Videos", platform: "OpusClip", url: "OpusClip", niche: "Video clip into shorts" },
    { category: "AI Videos", platform: "captions.ai", url: "captions.ai", niche: "" },
    { category: "AI Videos", platform: "videohunt.ai", url: "videohunt.ai", niche: "" },
    { category: "AI Videos", platform: "Autoshorts AI", url: "https://autoshorts.ai/?ref=momosa", niche: "AI Video shorts" },

    // Mobile APP developments
    { category: "Mobile APP developments", platform: "Rork AI", url: "https://rork.com/?ref=mohamedvj", niche: "No Code AI-Full stack AI" },
    { category: "Mobile APP developments", platform: "Andromo", url: "https://builder.andromo.com/?aaii=1591544.17f7e9", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "Appsgeyser", url: "https://appsgeyser.com/r/nfSXk", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "FlutterFlow", url: "https://app.flutterflow.io/create-account?referral_id=8bJB9qKgJkMDB1a9EBKgm4JjIS52", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "Mobeasy", url: "https://subscribe.mobeasy.com/?ref=7717", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "Mobella", url: "https://mobella.app/register?code=QV01139R5I1683751175", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "Passion", url: "https://passion.io/?_go=deeemoz", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "Twinr", url: "https://builder.twinr.dev/?affiliate_id=83MoDE16912", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "Appypie", url: "https://snappy.appypie.com/app-builder/creator-software/?ref=ngq5nwf&utm_source=tapfiliate&utm_medium=Affiliate&utm_campaign=FreeTrial", niche: "No Code Apps builder" },
    { category: "Mobile APP developments", platform: "Start App", url: "https://portal.start.io/#/signup?referredby=302751d1-fffc-47a4-3a1a-f521c7ded4d8&preferredsite=pub&source=directURL", niche: "APP monetization" },
    { category: "Mobile APP developments", platform: "Softr", url: "https://get.softr.io/bgiafdhexz82", niche: "Create Web,APP from Airtable& Sheets" },

    // Web Hosting
    { category: "Web Hosting", platform: "Hostinger", url: "https://hostinger.com?REFERRALCODE=823ALLAHWQ5J", niche: "Web Hosting" },
    { category: "Web Hosting", platform: "Hostinger Premium", url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_premium&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c52c-a114-736d-ba93-122d009b3763", niche: "Premium Web Hosting" },
    { category: "Web Hosting", platform: "Hostinger Business", url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_business&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c52c-c728-7091-bcd4-8e69937a9060", niche: "Business Web Hosting" },
    { category: "Web Hosting", platform: "Hostinger Cloud Startup", url: "https://www.hostinger.com/cart?product=hosting%3Acloud_economy&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c52c-eb69-72ef-8526-3a0f7839858d", niche: "Cloud Startup" },
    { category: "Web Hosting", platform: "Plesk", url: "https://try.plesk.com/la8gncfyj9za", niche: "Web hosting" },

    // Business Email
    { category: "Business Email", platform: "Hostinger Business Starter email", url: "https://www.hostinger.com/cart?product=hostinger_mail%3Apro&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c522-55b1-7265-be78-34fd5d24a51b", niche: "Business Starter email" },
    { category: "Business Email", platform: "Hostinger Business Premium email", url: "https://www.hostinger.com/cart?product=hostinger_mail%3Apremium&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c52a-57fd-7087-9f8f-69da15dcfbb8", niche: "Business Premium email" },

    // Cloud Hosting
    { category: "Cloud Hosting", platform: "Hostinger Cloud Startup", url: "https://www.hostinger.com/cart?product=hosting%3Acloud_economy&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c52f-dd23-71ed-9053-135cd18f8efd", niche: "Cloud Startup" },
    { category: "Cloud Hosting", platform: "Hostinger Cloud Professional", url: "https://www.hostinger.com/cart?product=hosting%3Acloud_professional&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c530-015c-72b5-8e2b-1bcd6fac941a", niche: "Cloud Professional" },
    { category: "Cloud Hosting", platform: "Hostinger Cloud Enterprise", url: "https://www.hostinger.com/cart?product=hosting%3Acloud_enterprise&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c530-1b20-7280-8e67-cfe4226045e9", niche: "Cloud Enterprise" },

    // VPS Hosting
    { category: "VPS Hosting", platform: "Hostinger VPS KVM 1", url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_1&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c532-94aa-71ce-894d-d878e0cb7565", niche: "VPS KVM 1" },
    { category: "VPS Hosting", platform: "Hostinger VPS KVM 2", url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_2&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c532-b55c-72e2-8453-e924207ef41e", niche: "VPS KVM 2" },
    { category: "VPS Hosting", platform: "Hostinger VPS KVM 4", url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_4&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c532-d622-7290-be8c-65d3be89d8c9", niche: "VPS KVM 4" },
    { category: "VPS Hosting", platform: "Hostinger VPS KVM 8", url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_8&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c532-fedb-73ae-9100-5e8d369fb06e", niche: "VPS KVM 8" },

    // RDP/VPS Servers
    { category: "RDP/VPS Servers", platform: "RDP Hostings", url: "https://rdphostings.com/rdp/aff.php?aff=2412", niche: "RDP Hosting" },
    { category: "RDP/VPS Servers", platform: "Data base Mart", url: "https://clients.databasemart.com/aff.php?aff=2007", niche: "RDP Hosting" },

    // Security
    { category: "Security", platform: "ExpressVPN", url: "https://www.expressrefer.com/refer-a-friend/30-days-free/?referrer_id=94486288&utm_campaign=refer_a_friend&utm_campaign=referrals&utm_medium=email&utm_source=customer_email", niche: "VPN" },
    { category: "Security", platform: "Proxy seller", url: "https://proxy-seller.com/?partner=BJLV3W376I4NLQ", niche: "VPN Proxy" },
    { category: "Security", platform: "Proxy sale", url: "https://proxy-sale.com/?partner_link=IKZvgpF6pz", niche: "VPN Proxy" },

    // Web developments
    { category: "Web developments", platform: "Lovable AI", url: "https://lovable.dev/?via=momo", niche: "No Code AI-Full stack AI" },
    { category: "Web developments", platform: "Hostinger Premium Website Builder", url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_premium&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c534-87a8-734e-8df1-e0b1624db8ff&product_type=website-builder", niche: "Premium Website Builder" },
    { category: "Web developments", platform: "Hostinger Business Website Builder", url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_business&period=12&referral_type=cart_link&REFERRALCODE=823ALLAHWQ5J&referral_id=0197c534-9936-7250-8d56-8fb5c42a2c07&product_type=website-builder", niche: "Business Website Builder" },
    { category: "Web developments", platform: "Purelanderas", url: "https://purelanderas.com/a/click.php?refid=s4qXbrSuxy", niche: "No code landing pages" },
    { category: "Web developments", platform: "FastComet", url: "https://affiliate.fastcomet.com/scripts/2wc9ym?a_aid=633f9f44789f0", niche: "Web Developments-No Coding" },
    { category: "Web developments", platform: "Strikingly", url: "https://www.strikingly.com/a/YtunJy", niche: "Web domains , hosting & Emails" },
    { category: "Web developments", platform: "Hetacloud", url: "https://hetacloud.com/aff.php?aff=4", niche: "Web domains , hosting & Emails" },
    { category: "Web developments", platform: "Whmcs", url: "https://www.whmcs.com/members/aff.php?aff=44417", niche: "Web domains , hosting & Emails" },
    { category: "Web developments", platform: "Cookieyes", url: "https://www.cookieyes.com/welcome/?ref=m2qzzda", niche: "Web" },

    // Digital marketplace
    { category: "Digital marketplace", platform: "Photosdeposit", url: "https://depositphotos.com/?ref=77717584&utm_source=linkCopy&utm_medium=referral", niche: "Digital Marketplace (Photos-Videos-Audio) Stock" },
    { category: "Digital marketplace", platform: "Codester", url: "https://www.codester.com/?ref=deeemoz", niche: "Digital marketplace APP-Web-Themes Source code" },
    { category: "Digital marketplace", platform: "Envato Market", url: "https://1.envato.market/deeemoz2023", niche: "Digital marketplace APP-Web-Themes Source code" },
    { category: "Digital marketplace", platform: "Envato Elements", url: "https://1.envato.market/deeemoz", niche: "Digital Marketplace" },
    { category: "Digital marketplace", platform: "Envato Placeit", url: "https://1.envato.market/21VJ3G", niche: "Digital Marketplace" },
    { category: "Digital marketplace", platform: "Appsumo", url: "https://appsumo.8odi.net/k0JNXv", niche: "Business & marketing tools deals" },
    { category: "Digital marketplace", platform: "Joinsecret", url: "https://www.joinsecret.com/?via=momo", niche: "Software deals Tech Lab SAS" },
    { category: "Digital marketplace", platform: "Whop", url: "https://whop.com/?a=mortallyinterview3c7b", niche: "S/W & Courses" },
    { category: "Digital marketplace", platform: "PLR", url: "https://www.plr.me/friends?h=zakGpP", niche: "Digital marketplace" },
    { category: "Digital marketplace", platform: "Masterresellrights", url: "https://www.masterresellrights.com/", niche: "Digital marketplace" },
    { category: "Digital marketplace", platform: "Apify", url: "https://www.apify.com?fpr=7bskp", niche: "full‑stack platform for web scraping & API" },

    // Dropshipping
    { category: "Dropshipping", platform: "Ecomhunt", url: "https://www.ecomhunt.com/?afmc=41s", niche: "Dropshipping tool winning products" },
    { category: "Dropshipping", platform: "Etsy Shop", url: "https://www.etsyshop.ai/?ref=DEEEMOZ", niche: "#1 Etsy product research & seo keyword tool" },
    { category: "Dropshipping", platform: "Everbee", url: "https://www.everbee.io/?via=deeemoz", niche: "Etsy product research & seo keyword tool" },
    { category: "Dropshipping", platform: "Alura", url: "https://www.alura.io/?via=Deeemoz", niche: "Etsy product research & seo keyword tool" },
    { category: "Dropshipping", platform: "Salehoo", url: "https://78b6e0s6rh-j0k1mmgte2l0n2s.hop.clickbank.net/", niche: "Suppliers" },
    { category: "Dropshipping", platform: "Dropship", url: "https://dropship.io/?fpr=mohamed27", niche: "Dropshipping tool" },
    { category: "Dropshipping", platform: "Nichscraper", url: "https://www.nichescraper.com/?ref=deeemoz", niche: "Spy winning product" },
    { category: "Dropshipping", platform: "Profitl", url: "https://profitl.app/register?via=Deeemoz", niche: "Dropshipping FBA tool" },
    { category: "Dropshipping", platform: "Alidropship", url: "https://alidropship.com/?via=19584", niche: "Aliexpress dropshipping" },
    { category: "Dropshipping", platform: "CJ Dropshipping", url: "https://cjdropshipping.com/?token=444ac085-56bd-423c-88fd-9621f7dbbe36", niche: "Dropshipping tool" },
    { category: "Dropshipping", platform: "CJ Dropshipping Shopify", url: "https://cjdropshipping.com/tempPage.html?token=444ac085-56bd-423c-88fd-9621f7dbbe36", niche: "Dropshipping tool" },
    { category: "Dropshipping", platform: "AMZ Monitor", url: "https://amzmonitor.com/", niche: "Amazon Products listing tool" },
    { category: "Dropshipping", platform: "Price archeive", url: "https://www.pricearchive.org/", niche: "AliexpressPrices" },
    { category: "Dropshipping", platform: "Referral Candy", url: "https://try.referralcandy.com/referral-marketing-2023/?ref=mohamed57", niche: "Shopify tool" },

    // Print on Demand
    { category: "Print on Demand", platform: "Picjam AI", url: "https://www.picjam.ai/?via=mohamed-sayed", niche: "AI Fashion" },
    { category: "Print on Demand", platform: "Printful", url: "www.printful.com/a/msa", niche: "POD marketplace" },
    { category: "Print on Demand", platform: "Printify", url: "https://try.printify.com/gkucbh235rb9", niche: "POD marketplace" },
    { category: "Print on Demand", platform: "Merchdominator", url: "https://merchdominator.com/pricing?ref=zdyxmju", niche: "POD tools" },
    { category: "Print on Demand", platform: "My Design", url: "https://paykstrt.com/48873/145081", niche: "POD Design" },

    // Design
    { category: "Design", platform: "Design Beast", url: "https://paykstrt.com/31302/145081", niche: "AI design" },
    { category: "Design", platform: "Logo AI", url: "https://www.logoai.com/?coupon=Momo", niche: "AI Logo" },
    { category: "Design", platform: "Canva", url: "https://canva.com", niche: "Digital design" },
    { category: "Design", platform: "Mimicpc", url: "https://mimicpc.com?fpr=mohamed25", niche: "AI Platform" },
    { category: "Design", platform: "CloudPano", url: "https://www.cloudpano.com/", niche: "360° virtual tour software" },

    // Learning & Courses
    { category: "Learning & Courses", platform: "Alison", url: "https://alison.com/?utm_source=alison_user&utm_medium=affiliates&utm_campaign=36291744", niche: "Courses Platforms" },
    { category: "Learning & Courses", platform: "Skool", url: "https://www.skool.com/signup?ref=590bc640438242309b9db325bb847540", niche: "Learning communities" },

    // Publisher & Advertising
    { category: "Publisher & Advertising", platform: "Ezoic", url: "https://ezoic.com/?tap_a=6182-5778c2&tap_s=1686444-442fd0", niche: "Adsense Optimizer" },
    { category: "Publisher & Advertising", platform: "Adsterra Referal", url: "https://publishers.adsterra.com/referral/yKTXyWw6Z7", niche: "Advertiser Platform" },
    { category: "Publisher & Advertising", platform: "Monetag", url: "https://monetag.com/?ref_id=n5ZH", niche: "Advertiser Platform" },
    { category: "Publisher & Advertising", platform: "Roller ads & The Sender", url: "https://my.rollerads.com/ref/fc463ddb0-99f87fbaf6f05", niche: "Advertiser Platform" },

    // Email Outreach
    { category: "Email Outreach", platform: "Adoutreach", url: "http://adoutreach.com/", niche: "Outreach - Cold E-mail" },
    { category: "Email Outreach", platform: "Snov.io", url: "Snov.io", niche: "Outreach - Cold E-mail" },
    { category: "Email Outreach", platform: "Emelia", url: "https://emelia.io/?_by=mohamed35", niche: "Outreach - Cold E-mail" },
    { category: "Email Outreach", platform: "Wiza", url: "https://wiza.co/?via=deeemoz", niche: "Outreach -B2B Database" },

    // Email Marketing
    { category: "Email Marketing", platform: "transpond", url: "https://get.capsulenow.io/elp9l1lse4le", niche: "Email campaigns" },

    // AI Tools
    { category: "AI Tools", platform: "A/B Testing AI", url: "https://abtesting.ai/?via=deeemoz", niche: "AI A/B Testing" },
    { category: "AI Tools", platform: "AI Art Shop", url: "https://aiartshop.com/?ref=cYmUGbAcUr37IP", niche: "AI Art" },
    { category: "AI Tools", platform: "Sheet AI", url: "https://sheetai.app/?via=mohamed-sayed", niche: "AI Business" },
    { category: "AI Tools", platform: "Botnation", url: "https://part.botnation.ai/BN-MGDC0S", niche: "AI Chatbot" },
    { category: "AI Tools", platform: "Orimon AI", url: "https://orimon.ai/?ref=ztvmnzb5", niche: "AI chatbot Builders" },
    { category: "AI Tools", platform: "Wati", url: "https://www.wati.io/?ref=ndvknwz", niche: "AI chatbot Builders" },
    { category: "AI Tools", platform: "stammer", url: "https://stammer.ai/?via=mohamed", niche: "AI chatbot Builders" },
    { category: "AI Tools", platform: "Avian", url: "https://avian.io/?via=momo", niche: "AI Data chatbots" },
    { category: "AI Tools", platform: "Pinecobe", url: "http://pinecone.io/", niche: "AI Memory" },
    { category: "AI Tools", platform: "Prompt Perfect", url: "https://www.blog.promptperfect.xyz/subscribe?ref=heMpwtwCXO", niche: "AI Prompts" },
    { category: "AI Tools", platform: "Browse AI", url: "https://browse.ai/?via=deeemoz", niche: "AI Robotic bot" },
    { category: "AI Tools", platform: "IdeaBuddy", url: "https://ideabuddy.com/?via=mohamed", niche: "AI Start up" },
    { category: "AI Tools", platform: "Tome Teller", url: "https://ideabuddy.com/?via=mohamed", niche: "AI Storytelling" },
    { category: "AI Tools", platform: "AI tools Arena", url: "https://aitoolsarena.com/", niche: "AI Tools blogs" },
    { category: "AI Tools", platform: "PromeAI", url: "https://www.promeai.com/?vsource=i_8w5ttqndp7", niche: "AI design" },
    { category: "AI Tools", platform: "Vondy", url: "https://vondy.com/?via=deeemoz", niche: "AI Apps" },
    { category: "AI Tools", platform: "EduBirdie", url: "https://edubirdie.com/referral/516c75652f4e79343355633d", niche: "AI Writing assist" },
    { category: "AI Tools", platform: "Jasper", url: "https://jasper.ai/?utm_source=partner&fpr=ai-money", niche: "AI writing assistant" },
    { category: "AI Tools", platform: "WordHero", url: "https://wordhero.co/?via=deeemoz", niche: "AI writing assistant" },
    { category: "AI Tools", platform: "Writesonic", url: "https://writesonic.com/?via=mohamed33", niche: "AI writing assistant" },
    { category: "AI Tools", platform: "Descript", url: "https://www.descript.com/?lmref=Rr6Cdw", niche: "Audio AI tool" },
    { category: "AI Tools", platform: "Gotranscript", url: "https://gotranscript.com/r/4670481", niche: "Audio AI tool" },
    { category: "AI Tools", platform: "ChatPDF", url: "https://www.chatpdf.com/?via=mohamed-sayed", niche: "PDF AI chatbot" },
    { category: "AI Tools", platform: "Gravitywrite", url: "https://gravitywrite.com/?via=deeemoz", niche: "AI writing assistant" },
    { category: "AI Tools", platform: "Tiny Einstein", url: "https://www.tinyeinstein.ai/?fpr=deeemoz", niche: "AI Marketing manager Shopify" },
    { category: "AI Tools", platform: "Human Bot Funnel", url: "https://paykstrt.com/45641/145081", niche: "Human Bot Funnel" },
    { category: "AI Tools", platform: "Human talk", url: "https://paykstrt.com/43678/145081", niche: "Audio human Ai" },
    { category: "AI Tools", platform: "Toons.ai Funnels", url: "https://paykstrt.com/46773/145081", niche: "Toons.ai Funnels" },
    { category: "AI Tools", platform: "SketchGenius Funnel", url: "https://paykstrt.com/33577/145081", niche: "SketchGenius Funnel" },
    { category: "AI Tools", platform: "Sketch Persinalizer", url: "https://paykstrt.com/44740/145081", niche: "Sketch Persinalizer" },
    { category: "AI Tools", platform: "HumanPal Funnel", url: "https://paykstrt.com/41479/145081", niche: "HumanPal Funnel" },
    { category: "AI Tools", platform: "Zonkafeedback", url: "https://get.zonkafeedback.com/o9n0i8o9vtx1", niche: "AI Feedback Intelligence" },

    // Digital Business tool
    { category: "Digital Business tool", platform: "Zoho", url: "https://directory.zoho.com/directory/deeemoz/adminhome#/getting-started", niche: "CRM & Automation" },
    { category: "Digital Business tool", platform: "Bright data", url: "https://get.brightdata.com/joddfwf11ee9", niche: "Proxies & web scraping" },
    { category: "Digital Business tool", platform: "Tally affiliate", url: "https://tally.so/?ref=msa", niche: "Form & Survey creation" },
    { category: "Digital Business tool", platform: "Airtable", url: "https://airtable.com/invite/r/KAoGUyC4", niche: "WorkFlow/Workspace" },
    { category: "Digital Business tool", platform: "Hive", url: "https://hiveonboard.com/?ref=deeemoz", niche: "WorkFlow/Workspace" },
    { category: "Digital Business tool", platform: "Monday.com", url: "http://monday.com/", niche: "WorkFlow/Workspace" },
    { category: "Digital Business tool", platform: "Notion", url: "https://notionforms.io/?via=mohamed", niche: "WorkFlow/Workspace" },
    { category: "Digital Business tool", platform: "Startinfinity", url: "https://startinfinity.com/?ref=njm1mtz", niche: "WorkFlow/Workspace" },
    { category: "Digital Business tool", platform: "Lemonsqueezy", url: "https://lemonsqueezy.com/", niche: "Saas Managements" },
    { category: "Digital Business tool", platform: "QuillBot", url: "https://try.quillbot.com/cztbzgeudjiq", niche: "Ai detection" },
    { category: "Digital Business tool", platform: "Systeme", url: "https://systeme.io/?sa=sa0124703368f6932c1b1fbf58680f517eb81af476", niche: "All-In-One Marketing Platform" },
    { category: "Digital Business tool", platform: "Nuelink", url: "http://nuelink.com/?via=deeemoz", niche: "Social Media Scheduling and Automation Tool" },
    { category: "Digital Business tool", platform: "Onafollow", url: "https://onafollow.com/ref/6g9q8", niche: "Digital marketing SMM" },
    { category: "Digital Business tool", platform: "Secsers", url: "https://secsers.com/ref/xj0o0", niche: "Digital marketing SMM" },
    { category: "Digital Business tool", platform: "Smmino", url: "https://smmino.com/ref/790ae", niche: "Digital marketing SMM" },
    { category: "Digital Business tool", platform: "SMM Raja", url: "https://www.smmraja.com/ref/NF0bB", niche: "Digital marketing SMM" },
    { category: "Digital Business tool", platform: "BotSailor", url: "https://2tinyurl.com/?aff_track=3530353136", niche: "Digital marketing SMM" },
    { category: "Digital Business tool", platform: "ConvertKit", url: "https://convertkit.com/", niche: "Email Marketing" },
    { category: "Digital Business tool", platform: "Leadswift", url: "https://leadswift.com/account/aff/go/mohamed_ahmed", niche: "SMMA Platform" },
    { category: "Digital Business tool", platform: "Soc Panel SMM", url: "https://socpanel.com/ref59274", niche: "Soc Panel SMM" },
    { category: "Digital Business tool", platform: "Amazing Panel", url: "https://amazingpanel.com/offer?a=resell&u=9e33b5", niche: "Soc Panel SMM" },
    { category: "Digital Business tool", platform: "Sonuker", url: "https://www.sonuker.com/?ref=7468", niche: "Youtube Bot" },
    { category: "Digital Business tool", platform: "Stormviews", url: "https://www.stormviews.net/?ref=647c478e2c4a6", niche: "Youtube Bot" },
    { category: "Digital Business tool", platform: "SubPals", url: "https://www.subpals.com/?ref=12954", niche: "YouTube subscribers growth platform" },
    { category: "Digital Business tool", platform: "Tubebuddy", url: "https://www.tubebuddy.com/pricing?a=deeemoz", niche: "Manage Youtube channel" },
    { category: "Digital Business tool", platform: "A Themes", url: "https://athemes.com/?ref=2547", niche: "Digital WP Themes Marketplace" },
    { category: "Digital Business tool", platform: "Pond5", url: "https://www.pond5.com/?ref=mohamedsayedtel763", niche: "Digital Marketplace Videos Library Stock" },
    { category: "Digital Business tool", platform: "Cloud Campaign", url: "https://www.cloudcampaign.com/?fpr=deeemoz62", niche: "SMM platform" },
    { category: "Digital Business tool", platform: "Clickera", url: "https://msayed.clickera.com/95a381c29d91", niche: "Landing pages Platform" },
    { category: "Digital Business tool", platform: "Task Magic", url: "https://make.taskmagic.com/?via=mohamed-sayed", niche: "Million Task magic" },
    { category: "Digital Business tool", platform: "Monkey Digital", url: "https://www.monkeydigital.org?ref=103530", niche: "Marketing Services" },
    { category: "Digital Business tool", platform: "Kingmaster", url: "https://dev.kingmaster.info/signup?ref=474363387852094", niche: "Marketing tools" },
    { category: "Digital Business tool", platform: "Buddy Punch", url: "https://try.buddypunch.com/5ueay0w8xj0j", niche: "Employee Time Clock Software" },
    { category: "Digital Business tool", platform: "Shippo", url: "https://try.shippo.com/9t23gu3f7wvv", niche: "Shipping Software" },
    { category: "Digital Business tool", platform: "Optery", url: "https://get.optery.com/ydav2kr7ra5c", niche: "Remove your home address, phone and other private info from Google, and 640+ sites" },
    { category: "Digital Business tool", platform: "Trainual", url: "https://start.trainual.com/j5xegesmjgqr", niche: "Train employees 2X faster" },

    // SEO tools - Traffic
    { category: "SEO tools - Traffic", platform: "SEO Store", url: "https://panel.seoestore.net/?ref=Deeemoz", niche: "Backlink SEO" },
    { category: "SEO tools - Traffic", platform: "SigmaSEO", url: "https://sigmaseo.io/?ref=mohamed", niche: "SEO content" },
    { category: "SEO tools - Traffic", platform: "Babylon", url: "https://www.babylontraffic.com/to/174607", niche: "Website Traffic" },
    { category: "SEO tools - Traffic", platform: "diib", url: "https://www.diib.com?ref=zmqznwn", niche: "Website Traffic+SEO" },
    { category: "SEO tools - Traffic", platform: "Money Robot SEO SW", url: "https://www.moneyrobot.com/Deeemoz", niche: "Website SEO" },
    { category: "SEO tools - Traffic", platform: "Secsers", url: "https://secsers.com/ref/xj0o0", niche: "All Traffic" },
    { category: "SEO tools - Traffic", platform: "Link Collider", url: "https://www.linkcollider.com/page/register?r=519327&aff=1", niche: "All Traffic" },
    { category: "SEO tools - Traffic", platform: "Peakerr", url: "https://peakerr.com/ref/sw26d", niche: "All Traffic" },
    { category: "SEO tools - Traffic", platform: "vitasmm", url: "https://vitasmm.store/ref/657ed", niche: "All services" },
    { category: "SEO tools - Traffic", platform: "sellerfollow", url: "https://sellerfollow.com/ref/10ddi", niche: "All services" },
    { category: "SEO tools - Traffic", platform: "Traffup", url: "https://traffup.net/free/?rf=417555238", niche: "All Traffic" },
    { category: "SEO tools - Traffic", platform: "10K Hits", url: "https://www.10khits.com/?ref=710728", niche: "Website Traffic" },
    { category: "SEO tools - Traffic", platform: "Traffic Exchange", url: "https://trafficg.com/my-promotions.php?member=Deeemoz", niche: "Solo Traffic" },
    { category: "SEO tools - Traffic", platform: "Blog Clicker", url: "http://blogclicker.com/?username=Deeemoz", niche: "Solo Blog" },
    { category: "SEO tools - Traffic", platform: "Udimi", url: "https://udimi.com/a/36yh5", niche: "Solo Ads" },
    { category: "SEO tools - Traffic", platform: "madgicx", url: "https://madgicx.com?fpr=momo82", niche: "AI Media buyer-AI Ads" },
    { category: "SEO tools - Traffic", platform: "SEOClerks", url: "https://www.seoclerk.com/linkin/2811768", niche: "Digital SEO Marketplace" },
    { category: "SEO tools - Traffic", platform: "Serpclix", url: "https://serpclix.com/users/referrals/5MMBWPTR1VFMY4JRE1JSDGJ40", niche: "Traffic SEO" },
    { category: "SEO tools - Traffic", platform: "Mangools", url: "https://mangools.com/#a64ce90b76aee08b3f68a3e67", niche: "SEO" },
    { category: "SEO tools - Traffic", platform: "Money Robot", url: "https://www.moneyrobot.com/Deeemoz", niche: "SEO" },
    { category: "SEO tools - Traffic", platform: "Phrasly", url: "https://phrasly.ai/?via=f4ns7", niche: "SEO AI Writing" },
    { category: "SEO tools - Traffic", platform: "SEOWriting", url: "https://seowriting.ai?fp_ref=mohamed15", niche: "SEO AI Writing" },
    { category: "SEO tools - Traffic", platform: "Brandpush", url: "https://www.brandpush.co/?ref=53410", niche: "Publisher News Platform-Press release" },
    { category: "SEO tools - Traffic", platform: "EIN Press Wire", url: "https://www.einpresswire.com/pricing?via=io0ed", niche: "Publisher News Platform-Press release" },

    // Affiliates
    { category: "Affiliates", platform: "Partnerstack", url: "https://try.partnerstack.com/a2g85z3yn5q0", niche: "Affiliates & publisher platform" },

    // Data
    { category: "Data", platform: "File upload", url: "https://www.file-upload.org/free649021.html", niche: "File upload" },
    { category: "Data", platform: "Mega4upload", url: "https://mega4upload.com/free93360.html", niche: "File upload" },
    { category: "Data", platform: "Up-4ever", url: "https://www.up-4ever.net/free2433907.html", niche: "File upload" },

    // Automotive
    { category: "Automative", platform: "Discover cars", url: "https://www.discovercars.com/?a_aid=Deeemoz", niche: "Automative" },

    // Health
    { category: "Health", platform: "Daily Gem", url: "http://dailygem.co/GEM-A-SFYFCTWH", niche: "Health" }
  ];

  const categories = ['All', ...Array.from(new Set(partners.map(p => p.category)))];

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.niche?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-16 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold">
                Digital <span className="gradient-text">Partners</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover 400+ trusted partners across all business categories to help grow your venture.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 space-y-4 animate-slide-in">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search partners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 hover-scale"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="hover-scale"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="text-center">
                <Badge variant="outline" className="text-lg px-4 py-2 animate-pulse">
                  {filteredPartners.length} Partners Found
                </Badge>
              </div>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPartners.map((partner, index) => (
                <div
                  key={index}
                  className="animate-scale-in hover-scale"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <PartnerCard partner={partner} />
                </div>
              ))}
            </div>

            {filteredPartners.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <p className="text-muted-foreground">No partners found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalPartners;
