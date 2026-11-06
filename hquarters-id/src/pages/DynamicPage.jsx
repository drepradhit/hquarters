import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import BlockRenderer from '../components/BlockRenderer.jsx';
import PageSkeleton from '../components/PageSkeleton.jsx';
import { usePageBlocks } from '../hooks/usePageBlocks.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function DynamicPage({ slug, setCurrentPage }) {
  const { blocks, loading } = usePageBlocks(slug);
  const { language } = useLanguage();
  const isId = language === 'id';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <PageSkeleton currentPage="spaces" setCurrentPage={setCurrentPage} />;
  }

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage={slug} setCurrentPage={setCurrentPage} />
      <main className="flex-1 bg-white pt-24 sm:pt-28">
        {hasBlocks ? (
          <BlockRenderer blocks={blocks} setCurrentPage={setCurrentPage} />
        ) : (
          <div className="py-24 px-6 max-w-xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold font-heading text-slate-900">
              {isId ? 'Halaman Tidak Ditemukan' : 'Page Not Found'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {isId 
                ? 'Halaman yang Anda cari belum memiliki konten atau telah dipindahkan.' 
                : 'The page you are looking for has no published blocks yet or has been moved.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('home');
                  else window.location.href = isId ? '/id/' : '/en/';
                }}
                className="px-6 py-2.5 rounded-full bg-[#EA8E18] text-white font-semibold text-sm hover:bg-[#d88010] transition-colors cursor-pointer"
              >
                {isId ? 'Kembali ke Beranda' : 'Back to Home'}
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
