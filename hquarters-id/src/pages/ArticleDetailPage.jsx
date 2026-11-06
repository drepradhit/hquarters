import React, { useEffect, useState } from 'react';
import {
  ChevronRight,
  Home,
  ArrowRight,
  Share2,
  Check,
  ChevronDown,
  Building2,
  Calendar,
  Clock,
  User,
  Zap,
  Maximize2,
  Weight
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { ARTICLES_ID, ARTICLES_EN } from '../lib/articlesData.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { stripHtml } from '../lib/wp.js';

export default function ArticleDetailPage({ setCurrentPage, articleId = '6012', setSelectedArticleId }) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const currentList = isId ? ARTICLES_ID : ARTICLES_EN;
  const article = currentList.find((a) => String(a.id) === String(articleId)) || currentList[0];
  const related = currentList.filter((a) => String(a.id) !== String(article.id)).slice(0, 3);

  // Reading progress scroll tracker (Brief Hal. 17)
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articleId]);

  const cleanTitle = stripHtml(article.title || '');
  const waPrefill = encodeURIComponent(`Halo, saya baca artikel "${cleanTitle}" dan ingin tanya soal kantor di HQuarters.`);
  const waLink = `https://wa.me/628111908319?text=${waPrefill}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cleanTitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = isId ? [
    {
      q: 'Apakah SOHO sama dengan apartemen?',
      a: 'Bukan. HQuarters adalah gedung bisnis resmi di CBD Asia Afrika Bandung. Unit SOHO dirancang khusus dan memiliki izin zonasi komersial sehingga sah digunakan untuk operasional kantor perusahaan sekaligus tempat tinggal.'
    },
    {
      q: 'Bisakah alamatnya dipakai untuk akta pendirian PT atau CV?',
      a: 'Bisa. Semua unit di HQuarters (SOHO, Serviced Office, Premium Office, maupun Virtual Office) berada di zona komersial CBD Asia Afrika yang memenuhi seluruh persyaratan legalitas KBLI dan domisili usaha resmi.'
    },
    {
      q: 'Siapa yang mendapat akses gym, sauna, dan kolam renang?',
      a: 'Seluruh tenant dan penghuni unit SOHO serta tenant kantor di HQuarters mendapatkan akses penuh ke fasilitas eksklusif di rooftop, termasuk kolam renang dengan pemandangan kota, dry cedar sauna, dan fitness center.'
    },
    {
      q: 'Apakah ada promo atau penawaran khusus saat ini?',
      a: 'Tersedia berbagai skema pembayaran fleksibel dan promo seasonal untuk sewa maupun kepemilikan strata title. Silakan hubungi tim sales kami via WhatsApp untuk penawaran unit terbaru.'
    },
    {
      q: 'Bisa survei lihat unit langsung sebelum memutuskan?',
      a: 'Tentu. Show unit dan seluruh fasilitas gedung siap dikunjungi setiap hari kerja dan akhir pekan pukul 08.00–19.00 WIB dengan perjanjian terlebih dahulu.'
    }
  ] : [
    {
      q: 'Is a SOHO unit identical to a residential apartment?',
      a: 'No. HQuarters is a licensed commercial corporate building. SOHO units possess dedicated commercial zoning approval, permitting fully legal enterprise operations alongside residential accommodation.'
    },
    {
      q: 'Can the address be utilized for legal entity incorporation (PT/CV)?',
      a: 'Yes. All suites across HQuarters comply with Bandung CBD commercial zoning regulations required for corporate tax (NPWP) and legal business domicile licensing.'
    },
    {
      q: 'Who is eligible to access the rooftop pool, sauna, and gym?',
      a: 'All registered enterprise tenants and SOHO residents enjoy complimentary executive access to rooftop amenities including heated pools, cedar saunas, and fitness centers.'
    },
    {
      q: 'Can we schedule a private building tour prior to committing?',
      a: 'Absolutely. Private guided inspections of available suites and amenities can be scheduled 7 days a week, 08:00–19:00 WIB.'
    }
  ];

  const displayFaqs = (article.faqs && article.faqs.length > 0) ? article.faqs : faqs;

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-white text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      
      {/* 1. READING PROGRESS BAR 4px #B45F06 (Brief Hal. 17) */}
      <div
        id="hq-reading-progress"
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[4px] bg-[#B45F06] z-[99999] transition-all duration-75 ease-out"
      />

      <Navbar currentPage="insights" setCurrentPage={setCurrentPage} />

      <main className="pt-24 sm:pt-28 flex-1 bg-white">
        
        {/* 2. BREADCRUMB & HEADER (Brief Hal. 10, 17) */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 flex-wrap">
            <button
              id="btn-article-breadcrumb-home"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('home');
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-1 hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{isId ? 'Beranda' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              id="btn-article-breadcrumb-insights"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('insights');
                window.scrollTo(0, 0);
              }}
              className="hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              {isId ? 'Artikel' : 'Insights'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#EA8E18] font-semibold">{article.categoryLabel}</span>
          </nav>

          {/* Headline + Metadata + Two-Column Split (Brief Hal. 10, 17) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
            
            {/* Left: Title, Excerpt, Metadata & Share */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-[#B45F06] font-semibold text-xs uppercase tracking-wider">
                {article.categoryLabel}
              </span>

              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold font-heading text-[#0F172A] leading-[1.2] tracking-tight">
                {cleanTitle}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                {stripHtml(article.excerpt)}
              </p>

              {/* Author & Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-500 font-medium">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    HQ
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Tim HQuarters</span>
                    <span className="mx-1.5 text-slate-300">·</span>
                    <span>{article.date}</span>
                    <span className="mx-1.5 text-slate-300">·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer text-slate-600"
                    title="Bagikan ke WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer text-slate-600 relative"
                    title="Salin Tautan"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <span className="text-xs font-semibold px-1">Copy Link</span>}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Featured Photo (Brief Hal. 10) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-slate-100 border border-slate-200/80">
                <img
                  src={article.image}
                  alt={cleanTitle}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center italic">
                Unit HQuarters di Jl. Asia Afrika No. 158, Bandung
              </p>
            </div>

          </div>
        </section>

        {/* 3. MAIN ARTICLE BODY + STICKY SIDEBAR (Brief Hal. 10, 11, 18) */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Reading Column (Max 720px width per brief Hal. 16, 18) */}
            <div className="lg:col-span-8 max-w-[720px] space-y-10 text-slate-700 text-[18px] leading-[1.75] font-normal">
              
              {/* Ringkasan 30 Detik Box (Brief Hal. 10, 18) */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 space-y-3.5">
                <h3 className="text-base font-bold text-[#0F172A] tracking-wide uppercase font-heading">
                  {isId ? 'Ringkasan 30 Detik' : '30-Second Summary'}
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700">
                  {article.summary && article.summary.length > 0 ? (
                    article.summary.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#EA8E18] font-bold">·</span>
                        <span><strong>{item.label}:</strong> {item.text}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-2">
                      <span className="text-[#EA8E18] font-bold">·</span>
                      <span>{stripHtml(article.excerpt)}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Dynamic Article Content Sections */}
              {article.sections && article.sections.length > 0 ? (
                article.sections.map((sec, sIdx) => (
                  <div key={sec.id || sIdx} id={sec.id} className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold font-heading text-[#0F172A] tracking-tight">
                      {sec.heading}
                    </h2>
                    {sec.intro && <p>{sec.intro}</p>}

                    {sec.points && sec.points.length > 0 && (
                      <div className="space-y-4 pt-2">
                        {sec.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3.5">
                            <div className="w-7 h-7 rounded-full bg-[#0F172A] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                              {pIdx + 1}
                            </div>
                            <div>
                              <strong className="text-slate-900 block">{pt.title}</strong>
                              <span className="text-sm text-slate-600">{pt.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.quote && (
                      <blockquote className="text-xl sm:text-2xl font-medium text-[#EA8E18] font-heading border-l-4 border-[#EA8E18] pl-4 italic my-4">
                        “{sec.quote}”
                      </blockquote>
                    )}

                    {sec.stats && sec.stats.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2 my-4">
                        {sec.stats.map((st, stIdx) => (
                          <div key={stIdx} className="bg-[#0F172A] text-white p-4 sm:p-5 rounded-xl text-center space-y-1">
                            <div className="text-xl sm:text-2xl font-bold font-heading text-[#EA8E18]">{st.value}</div>
                            <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">{st.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div
                  className="prose max-w-none text-slate-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
                />
              )}

              {/* Dynamic Product Recommendation Card */}
              {article.recommendation && (
                <div
                  id="btn-article-product"
                  onClick={() => {
                    if (setCurrentPage) setCurrentPage(article.recommendation.target || 'space-soho-duplex');
                    window.scrollTo(0, 0);
                  }}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50 hover:bg-white hover:border-[#EA8E18] hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                      <img
                        src={article.recommendation.img || 'https://hquarters.co.id/SPACES/SOHO/SOHO%2001.webp'}
                        alt={article.recommendation.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#EA8E18] uppercase tracking-wider block">
                        {article.recommendation.tag || (isId ? 'LANJUT LIHAT' : 'EXPLORE SUITE')}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#EA8E18] transition-colors">
                        {article.recommendation.title}
                      </h4>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#EA8E18] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              )}

              {/* FAQ Accordion (Brief Hal. 11, 15) */}
              <div id="section-faq" className="space-y-4 pt-4 border-t border-slate-200">
                <h2 className="text-2xl sm:text-3xl font-semibold font-heading text-[#0F172A] tracking-tight">
                  {isId ? 'Pertanyaan yang sering muncul' : 'Frequently Asked Questions'}
                </h2>

                <div className="space-y-3">
                  {displayFaqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Penutup (Brief Hal. 12, 18) */}
              <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-semibold font-heading text-white">
                    {isId ? 'Lihat langsung sebelum memutuskan' : 'Experience the space before deciding'}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {isId
                      ? 'Kunjungi gedung, cek unit, dan bandingkan pilihan bersama tim representatif kami di Jl. Asia Afrika No. 158.'
                      : 'Schedule a private guided tour of HQuarters on Jl. Asia Afrika No. 158 with our commercial specialists.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    id="btn-article-end-wa"
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>{isId ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      if (setCurrentPage) setCurrentPage('find-space');
                      window.scrollTo(0, 0);
                    }}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    {isId ? 'Jadwalkan Kunjungan' : 'Schedule Building Tour'}
                  </button>
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar (Desktop >= 1100px) (Brief Hal. 10, 18) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
              
              {/* Table of Contents */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {isId ? 'DI ARTIKEL INI' : 'IN THIS ARTICLE'}
                </span>
                <nav className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                  {article.sections && article.sections.map((sec, idx) => (
                    <a key={idx} href={`#${sec.id}`} className="block hover:text-[#EA8E18] transition-colors">
                      {idx + 1}. {sec.heading}
                    </a>
                  ))}
                  {article.recommendation && (
                    <a href="#btn-article-product" className="block hover:text-[#EA8E18] transition-colors">
                      {(article.sections?.length || 0) + 1}. {article.recommendation.title}
                    </a>
                  )}
                  <a href="#section-faq" className="block hover:text-[#EA8E18] transition-colors">
                    {(article.sections?.length || 0) + (article.recommendation ? 2 : 1)}. {isId ? 'Pertanyaan umum (FAQ)' : 'Frequently Asked Questions'}
                  </a>
                </nav>
              </div>

              {/* Sidebar Sticky WhatsApp CTA (Brief Hal. 10, 18) */}
              <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-md space-y-4">
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base font-heading">
                    {isId ? 'Mau lihat unitnya langsung?' : 'Tour the units in person?'}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isId
                      ? 'Tim sales membalas setiap hari, pukul 08.00–19.00 WIB.'
                      : 'Our leasing team replies daily from 08:00 to 19:00 WIB.'}
                  </p>
                </div>

                <a
                  id="btn-article-side-wa"
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-xs text-center flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>{isId ? 'Chat WhatsApp' : 'Chat via WhatsApp'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* 4. BACA JUGA (RELATED ARTICLES) (Brief Hal. 12, 18) */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              {isId ? 'Baca Juga' : 'Read Next'}
            </h2>
            <button
              onClick={() => {
                if (setCurrentPage) setCurrentPage('insights');
                window.scrollTo(0, 0);
              }}
              className="text-xs sm:text-sm font-bold text-[#EA8E18] hover:underline cursor-pointer"
            >
              {isId ? 'Semua Artikel →' : 'All Articles →'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (setSelectedArticleId) setSelectedArticleId(item.id);
                  window.scrollTo(0, 0);
                }}
                className="group cursor-pointer space-y-3"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#EA8E18] uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#EA8E18] transition-colors line-clamp-2 leading-snug">
                    {stripHtml(item.title)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer setCurrentPage={setCurrentPage} />

      {/* 5. MOBILE BOTTOM STICKY BAR (Brief Hal. 12, 18, 20) */}
      <div
        id="hq-article-mobile-bar"
        className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-50 flex items-center justify-between gap-3 shadow-2xl"
      >
        <a
          id="btn-article-bar-wa"
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 rounded-full bg-[#EA8E18] active:bg-[#d88010] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Chat WhatsApp</span>
        </a>

        <button
          id="btn-article-share"
          onClick={handleShare}
          className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 transition-colors"
          title="Bagikan"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
