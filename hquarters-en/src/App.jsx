import React, { useState, useRef, lazy, Suspense } from 'react';
import HomePage from './pages/HomePage.jsx';
import PageSkeleton from './components/PageSkeleton.jsx';

const FloatingWhatsAppButton = lazy(() => import('./components/FloatingWhatsAppButton.jsx'));
const PromoModal = lazy(() => import('./components/PromoModal.jsx'));

import { useLanguage } from './context/LanguageContext.jsx';
import { updatePageSEO } from './lib/seo.js';

const SpacesPage = lazy(() => import('./pages/SpacesPage.jsx'));
const BuildingPage = lazy(() => import('./pages/BuildingPage.jsx'));
const LocationPage = lazy(() => import('./pages/LocationPage.jsx'));
const CompaniesPage = lazy(() => import('./pages/CompaniesPage.jsx'));
const InsightsPage = lazy(() => import('./pages/InsightsPage.jsx'));
const FindSpacePage = lazy(() => import('./pages/FindSpacePage.jsx'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage.jsx'));
const SpacePremiumOfficePage = lazy(() => import('./pages/SpacePremiumOfficePage.jsx'));
const SpaceSohoDuplexPage = lazy(() => import('./pages/SpaceSohoDuplexPage.jsx'));
const SpaceServicedOfficePage = lazy(() => import('./pages/SpaceServicedOfficePage.jsx'));
const SpaceVirtualOfficePage = lazy(() => import('./pages/SpaceVirtualOfficePage.jsx'));
const EventFunctionRoomPage = lazy(() => import('./pages/EventFunctionRoomPage.jsx'));

const PAGE_PATHS = {
  skeleton: '/skeleton',
  home: '/',
  spaces: '/spaces',
  'space-premium-office': '/spaces/premium-office',
  'space-soho-duplex': '/spaces/soho',
  'space-soho': '/spaces/soho',
  'space-serviced-office': '/spaces/serviced-office',
  'space-virtual-office': '/spaces/virtual-office',
  'space-event': '/events',
  event: '/events',
  events: '/events',
  'function-room': '/events',
  'space-function-room': '/events',
  'find-space': '/find-space',
  insights: '/insights',
  companies: '/companies',
  location: '/location',
  building: '/building',
};

function pageFromPath(pathname) {
  let p = (pathname || '/').replace(/\/+$/, '') || '/';
  if (p === '/id' || p === '/en') p = '/';
  else if (p.startsWith('/id/')) p = p.slice(3) || '/';
  else if (p.startsWith('/en/')) p = p.slice(3) || '/';
  if (p.startsWith('/insights/')) {
    return { page: 'article-detail', articleId: decodeURIComponent(p.slice('/insights/'.length)) };
  }
  for (const [key, path] of Object.entries(PAGE_PATHS)) {
    if (p === path) return { page: key };
  }
  return { page: 'home' };
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen min-h-[100dvh] flex flex-col items-center justify-center bg-white text-slate-900 px-6 text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">Oops, something went wrong</h2>
            <p className="text-sm text-slate-600">Terjadi kendala saat memuat halaman ini. Silakan muat ulang atau kembali ke beranda.</p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-full bg-[#EA8E18] text-white font-semibold text-sm hover:bg-[#d88010] transition-colors cursor-pointer"
              >
                Muat Ulang
              </button>
              <button
                onClick={() => { window.location.href = "/"; }}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const initial = pageFromPath(window.location.pathname);
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [selectedArticleId, setSelectedArticleId] = useState(initial.articleId || 'art-1');
  const articleIdRef = useRef(selectedArticleId);

  React.useEffect(() => {
    const onPopState = () => {
      const r = pageFromPath(window.location.pathname);
      setCurrentPage(r.page);
      if (r.articleId) {
        articleIdRef.current = r.articleId;
        setSelectedArticleId(r.articleId);
      }
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (page) => {
    const rawPath = page === 'article-detail' ? `/insights/${articleIdRef.current}` : PAGE_PATHS[page] || '/';
    const isId = window.location.pathname.startsWith('/id');
    const isEn = window.location.pathname.startsWith('/en');
    const prefix = isId ? '/id' : (isEn ? '/en' : '');
    const path = prefix ? (rawPath === '/' ? `${prefix}/` : `${prefix}${rawPath}`) : rawPath;
    window.history.pushState({}, '', path);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const selectArticle = (id) => {
    articleIdRef.current = id;
    setSelectedArticleId(id);
  };

  const { language } = useLanguage();

  React.useEffect(() => {
    updatePageSEO(currentPage, language);
  }, [currentPage, language]);

  return (
    <ErrorBoundary>
    <Suspense fallback={<PageSkeleton currentPage={currentPage} setCurrentPage={navigate} />}>
      {currentPage === 'skeleton' ? (
        <PageSkeleton currentPage="spaces" setCurrentPage={navigate} />
      ) : currentPage === 'space-premium-office' ? (
        <SpacePremiumOfficePage setCurrentPage={navigate} />
      ) : currentPage === 'space-soho-duplex' ? (
        <SpaceSohoDuplexPage setCurrentPage={navigate} />
      ) : currentPage === 'space-soho' ? (
        <SpaceSohoDuplexPage setCurrentPage={navigate} />
      ) : currentPage === 'space-serviced-office' ? (
        <SpaceServicedOfficePage setCurrentPage={navigate} />
      ) : currentPage === 'space-virtual-office' ? (
        <SpaceVirtualOfficePage setCurrentPage={navigate} />
      ) : currentPage === 'space-event' || currentPage === 'event' || currentPage === 'events' || currentPage === 'function-room' || currentPage === 'space-function-room' ? (
        <EventFunctionRoomPage setCurrentPage={navigate} />
      ) : currentPage === 'find-space' ? (
        <FindSpacePage setCurrentPage={navigate} />
      ) : currentPage === 'article-detail' ? (
        <ArticleDetailPage
          setCurrentPage={navigate}
          articleId={selectedArticleId}
          setSelectedArticleId={selectArticle}
        />
      ) : currentPage === 'insights' ? (
        <InsightsPage
          setCurrentPage={navigate}
          setSelectedArticleId={selectArticle}
        />
      ) : currentPage === 'companies' ? (
        <CompaniesPage setCurrentPage={navigate} />
      ) : currentPage === 'location' ? (
        <LocationPage setCurrentPage={navigate} />
      ) : currentPage === 'building' ? (
        <BuildingPage setCurrentPage={navigate} />
      ) : currentPage === 'spaces' ? (
        <SpacesPage setCurrentPage={navigate} />
      ) : (
        <HomePage setCurrentPage={navigate} />
      )}

      
      {currentPage !== "skeleton" && <PromoModal setCurrentPage={navigate} />}
      <FloatingWhatsAppButton />

    </Suspense>
    </ErrorBoundary>
  );
}
