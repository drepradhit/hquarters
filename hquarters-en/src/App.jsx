import React, { useState, useRef, lazy, Suspense } from 'react';
import HomePage from './pages/HomePage.jsx';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton.jsx';

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
  const p = (pathname || '/').replace(/\/+$/, '') || '/';
  if (p.startsWith('/insights/')) {
    return { page: 'article-detail', articleId: decodeURIComponent(p.slice('/insights/'.length)) };
  }
  for (const [key, path] of Object.entries(PAGE_PATHS)) {
    if (p === path) return { page: key };
  }
  return { page: 'home' };
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
    setCurrentPage(page);
    const path = page === 'article-detail' ? `/insights/${articleIdRef.current}` : PAGE_PATHS[page] || '/';
    window.history.pushState({}, '', path);
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
    <Suspense fallback={null}>
      {currentPage === 'space-premium-office' ? (
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

      
      <FloatingWhatsAppButton />
    </Suspense>
  );
}
