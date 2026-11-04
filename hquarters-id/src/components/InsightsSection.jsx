import React, { useState } from 'react';
import { ArrowRight, Search, MapPin, Phone, Mail, Building2, CheckCircle2 } from 'lucide-react';
import { ARTICLES_ID, ARTICLES_EN } from '../lib/articlesData.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { stripHtml } from '../lib/wp.js';

export default function InsightsSection({ setCurrentPage, setSelectedArticleId }) {
  const { language, t } = useLanguage();
  const isId = language === 'id';

  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const articles = isId ? ARTICLES_ID : ARTICLES_EN;

  const categories = isId
    ? ['Semua', 'Memilih Kantor', 'Investasi & Pembiayaan', 'Desain Kantor', 'Bisnis di Bandung']
    : ['All', 'Choosing Office', 'Investment & Finance', 'Office Design', 'Business in Bandung'];

  // Category mapping
  const categoryMap = {
    '6012': isId ? 'Bisnis di Bandung' : 'Business in Bandung',
    '5522': isId ? 'Bisnis di Bandung' : 'Business in Bandung',
    '5423': isId ? 'Bisnis di Bandung' : 'Business in Bandung',
    '5355': isId ? 'Bisnis di Bandung' : 'Business in Bandung',
    '3758': isId ? 'Desain Kantor' : 'Office Design',
    '3483': isId ? 'Desain Kantor' : 'Office Design',
    '3369': isId ? 'Desain Kantor' : 'Office Design',
    '2806': isId ? 'Memilih Kantor' : 'Choosing Office',
    '2840': isId ? 'Memilih Kantor' : 'Choosing Office',
  };

  const enrichedArticles = articles.map(a => ({
    ...a,
    displayCategory: categoryMap[a.id] || a.categoryLabel
  }));

  // Filtering
  const filteredArticles = enrichedArticles.filter((article) => {
    const matchCategory =
      activeCategory === 'Semua' ||
      activeCategory === 'All' ||
      article.displayCategory.toLowerCase() === activeCategory.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.displayCategory.toLowerCase().includes(q);

    return matchCategory && matchSearch;
  });

  const featuredArticle = filteredArticles[0] || enrichedArticles[0];
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles;

  const handleArticleClick = (articleId) => {
    if (setSelectedArticleId) setSelectedArticleId(articleId);
    if (setCurrentPage) setCurrentPage('article-detail');
    window.scrollTo(0, 0);
  };

  return (
    <section id="insights" className="pt-6 sm:pt-10 pb-20 sm:pb-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* 1. HERO RATA TENGAH (Brief Hal. 5, 17) */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pt-4 sm:pt-8">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold text-slate-900 font-heading tracking-tight leading-[1.15]">
            <span>{isId ? 'Artikel dan Informasi ' : 'Insights & Business '}</span>
            <span className="text-[#EA8E18]">{isId ? 'Ruang Bisnis' : 'Journal'}</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {isId
              ? 'Kumpulan artikel seputar pilihan ruang kantor, pengelolaan tempat kerja, dan informasi properti komersial.'
              : 'Curated perspectives on modern workspaces, corporate property, and enterprise strategy in Bandung.'}
          </p>

          {/* Kotak Cari (Brief Hal. 5) */}
          <div className="pt-2 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={isId ? 'Q mis. SOHO, sewa kantor, KPA' : 'Search SOHO, serviced office, lease...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-[#EA8E18] transition-colors shadow-xs"
              />
            </div>
          </div>

          {/* Chip Kategori Filter (Brief Hal. 5) */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. ARTIKEL UNGGULAN / FEATURED (Brief Hal. 5, 17) */}
        {featuredArticle && !searchQuery && activeCategory === (isId ? 'Semua' : 'All') && (
          <div
            onClick={() => handleArticleClick(featuredArticle.id)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group cursor-pointer border border-slate-200/80 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
          >
            {/* Story Content */}
            <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded bg-slate-900 text-white uppercase tracking-wider text-[11px]">
                  {isId ? 'PILIHAN EDITOR' : "EDITOR'S PICK"}
                </span>
                <span className="text-[#EA8E18]">{featuredArticle.displayCategory}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{featuredArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-heading text-slate-900 leading-[1.2] tracking-tight group-hover:text-[#EA8E18] transition-colors">
                {stripHtml(featuredArticle.title)}
              </h2>

              <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
                {stripHtml(featuredArticle.excerpt)}
              </p>

              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {isId ? 'Oleh Tim HQuarters' : 'By HQuarters Editorial'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#EA8E18] group-hover:translate-x-1 transition-transform">
                  <span>{isId ? 'Baca selengkapnya' : 'Read full article'}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Story Photograph */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                <img
                  loading="lazy"
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. GRID ARTIKEL TERBARU (Brief Hal. 5, 17) */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl sm:text-2xl font-semibold font-heading text-slate-900">
              {isId ? 'Artikel terbaru' : 'Latest Articles'}
            </h2>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              {filteredArticles.length} {isId ? 'artikel' : 'articles'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {gridArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="group cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Article Image */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 shadow-xs">
                    <img
                      loading="lazy"
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="text-[#EA8E18] font-semibold">{article.displayCategory}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 font-heading leading-snug group-hover:text-[#EA8E18] transition-colors tracking-tight line-clamp-2">
                    {stripHtml(article.title)}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {stripHtml(article.excerpt)}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#EA8E18] transition-colors">
                  <span>{isId ? 'Baca artikel' : 'Read article'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 4. BLOK CARI KANTOR SESUAI KEBUTUHAN (Brief Hal. 6, 17) */}
        <div className="pt-8 sm:pt-12 border-t border-slate-200 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold font-heading text-slate-900">
                {isId ? 'Cari kantor sesuai kebutuhan' : 'Find Workspace Suited to Your Needs'}
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                {isId
                  ? 'Empat pilihan ruang dalam satu gedung di Jl. Asia Afrika, Bandung'
                  : 'Four flexible commercial tiers under one landmark address in Asia Afrika'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Virtual Office */}
            <div
              onClick={() => {
                if (setCurrentPage) setCurrentPage('space-virtual-office');
                window.scrollTo(0, 0);
              }}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {isId ? 'Tanpa ruang tetap' : 'No physical room'}
                </span>
                <h3 className="text-xl font-semibold font-heading text-slate-900">
                  Virtual Office
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {isId
                    ? 'Alamat CBD prestisius, penerimaan surat resmi, dan legalitas domisili usaha paket Standard & Plus.'
                    : 'Prestigious CBD corporate address, mail handling, and business domicile registration.'}
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-[#EA8E18] flex items-center gap-1">
                <span>{isId ? 'Lihat paket' : 'Explore packages'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Serviced Office */}
            <div
              onClick={() => {
                if (setCurrentPage) setCurrentPage('space-serviced-office');
                window.scrollTo(0, 0);
              }}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  1–20+ {isId ? 'orang' : 'people'}
                </span>
                <h3 className="text-xl font-semibold font-heading text-slate-900">
                  Serviced Office
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {isId
                    ? 'Langsung pakai: meja, kursi ergonomis, internet berkecepatan tinggi, resepsionis, dan pembersihan harian.'
                    : 'Turnkey private suites: ergonomic desks, fiber internet, front desk concierge, and daily housekeeping.'}
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-[#EA8E18] flex items-center gap-1">
                <span>{isId ? 'Lihat ruang' : 'Explore suites'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* SOHO */}
            <div
              onClick={() => {
                if (setCurrentPage) setCurrentPage('space-soho-duplex');
                window.scrollTo(0, 0);
              }}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  3–6 {isId ? 'orang' : 'people'}
                </span>
                <h3 className="text-xl font-semibold font-heading text-slate-900">
                  SOHO (Duplex)
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {isId
                    ? 'Unit strata title untuk kerja dan tinggal (bisa beli / sewa) dengan fleksibilitas 24 jam.'
                    : 'Strata-title duplex suites blending executive workspace and residence with 24/7 access.'}
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-[#EA8E18] flex items-center gap-1">
                <span>{isId ? 'Lihat unit' : 'Explore SOHO'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Premium Office */}
            <div
              onClick={() => {
                if (setCurrentPage) setCurrentPage('space-premium-office');
                window.scrollTo(0, 0);
              }}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {isId ? 'Mulai 6 orang' : 'From 6 people'}
                </span>
                <h3 className="text-xl font-semibold font-heading text-slate-900">
                  Premium Office
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {isId
                    ? 'Kantor pusat atau regional perusahaan dengan spesifikasi komersial prestisius di Asia Afrika.'
                    : 'Bespoke corporate floor plates designed for regional HQs and expanding enterprises.'}
                </p>
              </div>
              <div className="pt-2 text-xs font-bold text-[#EA8E18] flex items-center gap-1">
                <span>{isId ? 'Lihat kantor' : 'Explore offices'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. BLOK CTA WHATSAPP (Brief Hal. 6, 17) */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-heading text-white tracking-tight">
                {isId ? 'Belum tahu butuh kantor seperti apa?' : 'Not sure which office suits you best?'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {isId
                  ? 'Sebutkan ukuran tim Anda, kami cocokkan dengan unit yang tersedia, setiap hari 08.00–19.00 WIB.'
                  : 'Tell us your team size and operational needs; our space consultants will recommend the ideal unit.'}
              </p>
              <div className="pt-2">
                <a
                  id="btn-insights-cta-wa"
                  href="https://wa.me/628111908319?text=Halo%20HQuarters%20Bandung%2C%20saya%20ingin%20berkonsultasi%20mengenai%20ruang%20bisnis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  <span>{isId ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  loading="lazy"
                  src="https://hquarters.co.id/BUILDING/Lobby-1.webp"
                  alt="HQuarters Lobby & Spaces"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6. BLOK KONTAK (Brief Hal. 6, 17) */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-semibold font-heading text-slate-900">
                {isId ? 'Punya Pertanyaan Mengenai Pilihan Ruang?' : 'Have Questions About Space Selection?'}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                {isId
                  ? 'Datang langsung ke gedung atau hubungi tim representatif kami.'
                  : 'Visit our building lobby directly or get in touch with our leasing advisory team.'}
              </p>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EA8E18] shrink-0 mt-0.5" />
                <span>Jl. Asia Afrika No. 158, Bandung, Jawa Barat 40261</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EA8E18] shrink-0" />
                <a href="tel:+628111908319" className="hover:text-[#EA8E18] transition-colors font-medium">
                  +62 811-1908-319
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EA8E18] shrink-0" />
                <a href="mailto:info@hquarters.co.id" className="hover:text-[#EA8E18] transition-colors font-medium">
                  info@hquarters.co.id
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
