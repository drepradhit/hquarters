import React, { useEffect, useState } from 'react';
import {
  ChevronRight,
  Home,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import CTA from '../components/CTA.jsx';
import Footer from '../components/Footer.jsx';
import { fetchArticle, fetchArticles, stripHtml } from '../lib/wp.js';
import {
  FALLBACK_ARTICLE_DETAILS,
  FALLBACK_ARTICLES,
  FALLBACK_ARTICLE_DETAILS_ID,
  FALLBACK_ARTICLES_ID
} from '../lib/archivePlaceholderData.js';
import { ARTICLES_ID, ARTICLES_EN } from '../lib/articlesData.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function ArticleDetailPage({ setCurrentPage, articleId = 'art-1', setSelectedArticleId }) {
  const { language, t } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    const isFallbackId = String(articleId).startsWith('art-') || String(articleId) === 'featured';
    const fallbackDetails = language === 'id' ? FALLBACK_ARTICLE_DETAILS_ID : FALLBACK_ARTICLE_DETAILS;
    const fallbackArticles = language === 'id' ? FALLBACK_ARTICLES_ID : FALLBACK_ARTICLES;

    const currentList = language === 'id' ? ARTICLES_ID : ARTICLES_EN;
    const foundArticle = currentList.find((a) => String(a.id) === String(articleId));
    setRelated(currentList.filter((a) => String(a.id) !== String(articleId)).slice(0, 3));

    if (language === 'en') {
      if (foundArticle) {
        setArticle(foundArticle);
        setLoading(false);
        return;
      }
      if (isFallbackId) {
        const fallback = fallbackDetails[articleId] || fallbackDetails['art-1'];
        setArticle(fallback);
        setRelated(fallbackArticles.filter((a) => String(a.id) !== String(fallback.id)).slice(0, 3));
        setLoading(false);
        return;
      }
    }

    if (isFallbackId) {
      const fallback = fallbackDetails[articleId] || fallbackDetails['art-1'];
      setArticle(fallback);
      setRelated(fallbackArticles.filter((a) => String(a.id) !== String(fallback.id)).slice(0, 3));
      setLoading(false);
      return;
    }

    fetchArticle(articleId, language)
      .then((data) => {
        setArticle(data);
      })
      .catch(() => {
        setArticle(foundArticle || fallbackDetails['art-1']);
      })
      .finally(() => setLoading(false));
  }, [articleId, language]);

  if (loading || !article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-500 font-semibold">{t.insightsPage.loading}</p>
      </div>
    );
  }

  const subtitle = stripHtml(article.subtitle || article.excerpt || '');
  const cleanTitle = stripHtml(article.title || '');

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="insights" setCurrentPage={setCurrentPage} />

      <main className="pt-24 sm:pt-28 space-y-16 bg-white flex-1">
        
        {/* Breadcrumb & Article Header */}
        <section className="max-w-[1040px] mx-auto px-4 sm:px-6 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
            <button
              id="btn-article-breadcrumb-home"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('home');
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-1.5 hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.nav.home || 'Home'}</span>
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
              {t.nav.insights || 'Insights'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900 line-clamp-1">{cleanTitle}</span>
          </nav>

          <div>
            <button
              id="btn-article-back-to-insights"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('insights');
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#EA8E18] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>{t.insightsPage.backToArticles}</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium font-heading text-slate-900 tracking-tight leading-[1.14]">
            {cleanTitle}
          </h1>

          {subtitle && (
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal">
              {subtitle}
            </p>
          )}

        </section>

        {/* Featured Image */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 aspect-[16/9] shadow-2xl bg-slate-900">
            <img
              src={article.image}
              alt={cleanTitle}
              className="w-full h-full object-cover object-bottom"
            />
          </div>
          {article.imageCaption && (
            <p className="text-center text-xs text-slate-500 mt-3 font-normal">
              {article.imageCaption}
            </p>
          )}
        </section>

        {/* Article Body Content */}
        <section className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-10 text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
          
          {article.contentHtml ? (
            <div className="article-body wp-article-content space-y-6" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          ) : language === 'id' ? (
            <>
              {/* Indonesian Fallback Content */}
              <div className="bg-[#FAF8F5] rounded-xl p-6 sm:p-8 border border-slate-200/80 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#EA8E18] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.insightsPage.executiveSummary}</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#EA8E18] shrink-0 mt-2" />
                    <span>Lokasi prima di CBD Asia Afrika menghadirkan kredibilitas instan dan nilai merek bagi mitra bisnis domestik maupun internasional.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#EA8E18] shrink-0 mt-2" />
                    <span>Ruang komersial modern mengedepankan fleksibilitas kerja hibrida, insulasi akustik, serta fasilitas gaya hidup terintegrasi.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#EA8E18] shrink-0 mt-2" />
                    <span>Menempati infrastruktur Grade-A mereduksi friksi operasional jangka panjang sekaligus meningkatkan retensi talenta terbaik perusahaan.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                  1. Pergeseran Strategis dalam Properti Komersial
                </h2>
                <p>
                  Dalam lanskap bisnis yang terus berkembang, pemilihan ruang kantor telah melampaui perhitungan luas meter persegi semata. Para pemimpin korporat masa kini menyadari bahwa ruang fisik adalah cerminan langsung dari budaya kerja, visi eksekutif, dan keunggulan operasional.
                </p>
                <p>
                  Di koridor finansial bersejarah Jalan Asia Afrika Bandung, pasar properti komersial tengah mengalami revitalisasi pesat. Perusahaan kini mencari ruang yang mengombinasikan konektivitas digital berdensitas tinggi dengan desain arsitektur yang berpusat pada manusia.
                </p>
              </div>

              <div className="my-8 bg-slate-950 text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                <div className="w-1.5 h-12 bg-[#EA8E18] rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
                <blockquote className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug italic">
                  "Kantor bukan lagi sekadar tempat bekerja — ia merupakan manifesto fisik dari visi perusahaan dan budaya eksekutif."
                </blockquote>
                <cite className="block text-xs font-semibold text-[#EA8E18] not-italic uppercase tracking-wider">
                  — HQuarters Architectural & Real Estate Advisory
                </cite>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                  2. Menyeimbangkan Fokus Akustik & Ruang Kolaborasi
                </h2>
                <p>
                  Tantangan utama dalam desain kantor modern adalah mengelola kebisingan dan kelelahan kognitif. Meskipun tata letak terbuka mendorong pertukaran ide spontan, hal ini sering kali mengorbankan fokus mendalam.
                </p>
                <p>
                  Solusinya terletak pada zonasi spasial progresif: memisahkan area kolaborasi dinamis dari ruang fokus berinsulasi akustik. Melalui partisi kaca ganda dan material plafon kedap suara, para eksekutif dapat berpindah secara mulus antara sesi tim dan panggilan klien penting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2">
                  <h4 className="font-medium text-slate-900 font-heading text-base">
                    Pencahayaan Biofilik & Filtrasi Udara
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Panel kaca vertikal floor-to-ceiling memaksimalkan pencahayaan alami matahari didukung filter HVAC mutakhir.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2">
                  <h4 className="font-medium text-slate-900 font-heading text-base">
                    Fasilitas Berstandar Hospitalitas
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Akses eksklusif ke kolam renang hangat rooftop, sauna kayu cedar, dan layanan concierge profesional.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                  3. Penciptaan Nilai Jangka Panjang bagi Penyewa Korporat
                </h2>
                <p>
                  Membangun kehadiran kantor di HQuarters Business Residence menempatkan perusahaan Anda berdampingan dengan institusi keuangan papan atas, konsultan hukum terkemuka, dan inovator teknologi terpercaya.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* English Fallback Content */}
              <div className="bg-[#FAF8F5] rounded-xl p-6 sm:p-8 border border-slate-200/80 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#EA8E18] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>{t.insightsPage.executiveSummary}</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#EA8E18] shrink-0 mt-2" />
                    <span>Prime location in Asia Afrika CBD delivers instantaneous trust and brand equity for domestic & international partners.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#EA8E18] shrink-0 mt-2" />
                    <span>Modern commercial spaces prioritize hybrid flexibility, acoustic insulation, and integrated lifestyle amenities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#EA8E18] shrink-0 mt-2" />
                    <span>Occupying Grade-A infrastructure reduces long-term operational friction and boosts high-caliber talent retention.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                  1. The Strategic Shift in Commercial Real Estate
                </h2>
                <p>
                  In today's evolving business landscape, office selection has transcended simple square footage calculations. Modern enterprise leaders recognize that physical space is a direct reflection of corporate culture, executive vision, and operational excellence.
                </p>
                <p>
                  At Bandung's historic financial center along Jalan Asia Afrika, commercial real estate is undergoing a rapid renaissance. Corporations are seeking spaces that combine high-density digital infrastructure with human-centered architectural design.
                </p>
              </div>

              <div className="my-8 bg-slate-950 text-white rounded-xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
                <div className="w-1.5 h-12 bg-[#EA8E18] rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
                <blockquote className="text-xl sm:text-2xl font-bold font-heading text-white leading-snug italic">
                  "An office is no longer just a place where work happens — it is the physical manifesto of a company's vision and executive culture."
                </blockquote>
                <cite className="block text-xs font-semibold text-[#EA8E18] not-italic uppercase tracking-wider">
                  — HQuarters Architectural & Real Estate Advisory
                </cite>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                  2. Balancing Acoustic Focus & Collaborative Hubs
                </h2>
                <p>
                  One of the primary challenges in contemporary office design is managing noise and cognitive fatigue. While open layouts encourage spontaneous idea exchange, they frequently compromise deep focus.
                </p>
                <p>
                  The solution lies in progressive spatial zoning: separating high-vibrancy collaboration zones from acoustically insulated focus suites. By pairing double-glazed glass partitions with sound-absorbing ceiling geometries, executives can switch effortlessly between team workshops and high-stakes client calls.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2">
                  <h4 className="font-medium text-slate-900 font-heading text-base">
                    Biophilic Lighting & Air Filtration
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Integrated floor-to-ceiling glass paneling maximizes natural daylighting while advanced HVAC filters purify indoor air.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2">
                  <h4 className="font-medium text-slate-900 font-heading text-base">
                    Hospitality-Grade Amenities
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct access to rooftop heated pools, dry cedar saunas, and concierge services elevates the daily work experience.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                  3. Long-Term Value Creation for Enterprise Tenants
                </h2>
                <p>
                  Establishing a presence at HQuarters Business Residence positions your company among top financial institutions, legal consultancies, and tech innovators. The power of proximity creates organic business opportunities and elevates your brand status in the eyes of clients and stakeholders alike.
                </p>
              </div>
            </>
          )}

        </section>

        {/* Related Articles & Insights */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#EA8E18] uppercase tracking-wider">
                {t.insightsPage.continueReading}
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                {t.insightsPage.relatedTitle}
              </h2>
            </div>

            <button
              id="btn-article-view-all-insights"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('insights');
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#EA8E18] hover:text-[#d88010] transition-colors cursor-pointer group"
            >
              <span>{t.insightsPage.allArticles}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  if (setSelectedArticleId) setSelectedArticleId(rel.id);
                  if (setCurrentPage) setCurrentPage('article-detail');
                  window.scrollTo(0, 0);
                }}
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={rel.image}
                      alt={stripHtml(rel.title)}
                      className="w-full h-full object-cover object-bottom group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-medium text-slate-900 font-heading leading-snug group-hover:text-[#EA8E18] transition-colors line-clamp-2">
                      {stripHtml(rel.title)}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                      {stripHtml(rel.subtitle || rel.excerpt || '')}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#EA8E18]">
                  <span>{t.insightsPage.readArticle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CTA
          setCurrentPage={setCurrentPage}
          titlePrefix={t.insightsPage.ctaTitlePrefix}
          titleHighlight={t.insightsPage.ctaTitleHighlight}
          description={t.insightsPage.ctaDesc}
          buttonText={t.insightsPage.ctaButton}
          pageTarget="find-space"
        />
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
