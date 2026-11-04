import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ARTICLES_ID, ARTICLES_EN } from '../lib/articlesData.js';
import { useLanguage } from '../context/LanguageContext.jsx';
import { stripHtml } from '../lib/wp.js';

export default function InsightsSection({ setCurrentPage, setSelectedArticleId }) {
  const { language, t } = useLanguage();

  const articles = language === 'id' ? ARTICLES_ID : ARTICLES_EN;
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  const ARTICLE_SLUGS = {
    'art-1': '/studio-foto-senjakara-jadi-salah-satu-tenant-di-hquarters/',
    'art-2': '/garuda-indonesia-resmi-buka-kantor-penjualan-di-hquarters/',
    'art-3': '/7-alasan-bisnis-kreatif-edukasi-cocok-sewa-kantor-di-bandung-cbd/',
    'art-4': '/sewa-ruang-kantor-bandung-pilihan-alternatif-selain-jakarta/',
    'art-5': '/elemen-penting-dalam-perencanaan-design-untuk-ruang-kantor/',
    'art-6': '/7-tips-design-ruang-kantor-yang-fungsional-dan-nyaman/',
    'art-7': '/8-tips-desain-ruang-kantor-kecil-minimalis-yang-efektif/',
    'art-8': '/msig-indonesia-pilihan-tepat-berkantor-di-pusat-bisnis/',
    'art-9': '/wajib-tahu-7-tips-memilih-lokasi-kantor-terbaik-bagi-perusahaan/',
    '6012': '/studio-foto-senjakara-jadi-salah-satu-tenant-di-hquarters/',
    '5522': '/garuda-indonesia-resmi-buka-kantor-penjualan-di-hquarters/',
    '5423': '/7-alasan-bisnis-kreatif-edukasi-cocok-sewa-kantor-di-bandung-cbd/',
    '5355': '/sewa-ruang-kantor-bandung-pilihan-alternatif-selain-jakarta/',
    '3758': '/elemen-penting-dalam-perencanaan-design-untuk-ruang-kantor/',
    '3483': '/7-tips-design-ruang-kantor-yang-fungsional-dan-nyaman/',
    '3369': '/8-tips-desain-ruang-kantor-kecil-minimalis-yang-efektif/',
    '2806': '/msig-indonesia-pilihan-tepat-berkantor-di-pusat-bisnis/',
    '2840': '/wajib-tahu-7-tips-memilih-lokasi-kantor-terbaik-bagi-perusahaan/',
  };

  const handleArticleClick = (articleId) => {
    const slug = ARTICLE_SLUGS[articleId] || '/insights/';
    window.location.href = slug;
  };

  return (
    <section id="insights" className="pt-6 sm:pt-10 pb-20 sm:pb-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Section Header (Clean 2-line Headline, No Eyebrows) */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-slate-900 font-heading tracking-tight leading-[1.12]">
            <span>{t.insightsPage.titlePrefix || 'Better space. '}</span>
            <span className="text-[#EA8E18]">{t.insightsPage.titleHighlight || 'Better decisions.'}</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            {t.insightsPage.desc}
          </p>
        </div>

        {/* Featured Story: Grand Editorial Split Layout */}
        {featuredArticle && (
          <div
            onClick={() => handleArticleClick(featuredArticle.id)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group cursor-pointer"
          >
            {/* Story Content */}
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="text-[#EA8E18] font-semibold">{featuredArticle.categoryLabel}</span>
                <span>·</span>
                <span>{featuredArticle.date}</span>
                <span>·</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium font-heading text-slate-900 leading-[1.18] tracking-tight group-hover:text-[#EA8E18] transition-colors">
                {stripHtml(featuredArticle.title)}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed line-clamp-4">
                {stripHtml(featuredArticle.excerpt)}
              </p>

              {featuredArticle.author && (
                <p className="text-xs text-slate-500 pt-1">
                  By {featuredArticle.author}
                </p>
              )}

              <div className="pt-2">
                <button
                  id="btn-insights-featured-read"
                  onClick={() => handleArticleClick(featuredArticle.id)}
                  className="px-5 py-2.5 rounded-full bg-slate-900 group-hover:bg-[#EA8E18] text-white text-xs sm:text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <span>{t.insightsPage.readArticle}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Story Photograph */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
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

        {/* Editorial Articles Grid */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {gridArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article.id)}
                className="group cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Article Image */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100">
                    <img
                      loading="lazy"
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="text-[#EA8E18] font-semibold">{article.categoryLabel}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-slate-900 font-heading leading-snug group-hover:text-[#EA8E18] transition-colors tracking-tight line-clamp-2">
                    {stripHtml(article.title)}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {stripHtml(article.excerpt)}
                  </p>
                </div>

                {/* Direct Action Link */}
                <div className="pt-2 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-900 group-hover:text-[#EA8E18] transition-colors">
                  <span>{t.insightsPage.readArticle}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
