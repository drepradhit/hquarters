import React from "react";
import Navbar from "./Navbar.jsx";

import { ChevronRight, Home, Image as ImageIcon } from "lucide-react";

export default function PageSkeleton({ currentPage = "spaces", setCurrentPage }) {
  const isSpaceDetail = [
    "space-premium-office",
    "space-soho-duplex",
    "space-soho",
    "space-serviced-office",
    "space-virtual-office",
    "space-event",
    "event",
    "events",
    "function-room",
    "space-function-room",
  ].includes(currentPage);

  const isPremiumOffice = currentPage === "space-premium-office";
  const isSpacesHub = currentPage === "spaces" || currentPage === "skeleton";
  const isBuilding = currentPage === "building";
  const isLocation = currentPage === "location";
  const isCompanies = currentPage === "companies";
  const isFindSpace = currentPage === "find-space";

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      {/* 1. Sleek indeterminate top loading line */}
      <div
        className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-slate-100/40 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-full bg-gradient-to-r from-transparent via-[#EA8E18] to-transparent w-full animate-[shimmer_1.2s_infinite]" />
      </div>

      {/* 2. Real Navbar in exact position with active nav indicator */}
      <Navbar currentPage={currentPage === "skeleton" ? "spaces" : currentPage} setCurrentPage={setCurrentPage} />

      {/* 3. Main Content Area matching exact pt-24 sm:pt-28 of real pages */}
      <main className="pt-24 sm:pt-28 pb-16 flex-1 bg-white">
        {/* Render contextual skeleton layout based on destination */}
        {isSpaceDetail ? (
          <div className="space-y-16 sm:space-y-24">
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              {/* Breadcrumb skeleton */}
              <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-slate-500">Spaces</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <div className="h-4 w-28 bg-slate-200 rounded animate-shimmer" />
              </nav>

              {/* Hero Card Container: Dark for Premium Office, Crisp White for SOHO/Serviced/Virtual */}
              {isPremiumOffice ? (
                <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden shadow-xl">
                  {/* Left Column */}
                  <div className="lg:col-span-6 space-y-4 z-10 flex flex-col justify-center">
                    <div className="h-10 sm:h-12 lg:h-14 w-4/5 bg-[#EA8E18]/30 rounded-xl animate-shimmer" />
                    <div className="h-6 sm:h-7 w-3/4 bg-slate-800 rounded-lg animate-shimmer" />
                    <div className="space-y-2 pt-1 max-w-lg">
                      <div className="h-3.5 w-full bg-slate-800 rounded animate-shimmer" />
                      <div className="h-3.5 w-5/6 bg-slate-800 rounded animate-shimmer" />
                      <div className="h-3.5 w-2/3 bg-slate-800 rounded animate-shimmer" />
                    </div>
                    <div className="pt-2 flex flex-wrap gap-4">
                      <div className="h-11 w-44 rounded-full bg-[#EA8E18]/40 animate-shimmer" />
                    </div>
                    <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
                      <div className="h-3 w-32 bg-slate-800 rounded animate-shimmer" />
                      <span className="text-slate-700">•</span>
                      <div className="h-3 w-36 bg-slate-800 rounded animate-shimmer" />
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="lg:col-span-6 relative z-10">
                    <div className="rounded-xl sm:rounded-2xl border border-white/10 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full bg-slate-800 animate-shimmer flex items-center justify-center text-slate-700">
                      <ImageIcon className="w-12 h-12 opacity-30" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column */}
                  <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
                    <div className="h-10 sm:h-12 lg:h-14 w-3/5 bg-[#EA8E18]/30 rounded-xl animate-shimmer" />
                    <div className="h-6 sm:h-7 w-4/5 bg-slate-200 rounded-lg animate-shimmer" />
                    <div className="space-y-2 pt-1 max-w-lg">
                      <div className="h-3.5 w-full bg-slate-100 rounded animate-shimmer" />
                      <div className="h-3.5 w-5/6 bg-slate-100 rounded animate-shimmer" />
                      <div className="h-3.5 w-2/3 bg-slate-100 rounded animate-shimmer" />
                    </div>
                    <div className="pt-2 flex flex-wrap gap-4">
                      <div className="h-11 w-44 rounded-full bg-[#EA8E18]/30 animate-shimmer" />
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="lg:col-span-6">
                    <div className="rounded-xl sm:rounded-2xl border border-slate-200 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full bg-slate-100 animate-shimmer flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-12 h-12 opacity-40" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Feature Cards Grid (4 items) */}
            <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="h-8 sm:h-9 w-64 max-w-full mx-auto bg-slate-200 rounded-lg animate-shimmer" />
                <div className="h-4 w-96 max-w-full mx-auto bg-slate-100 rounded animate-shimmer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FEF3E2] animate-shimmer" />
                    <div className="h-5 w-3/4 bg-slate-200 rounded animate-shimmer" />
                    <div className="space-y-2 pt-1">
                      <div className="h-3.5 w-full bg-slate-100 rounded animate-shimmer" />
                      <div className="h-3.5 w-5/6 bg-slate-100 rounded animate-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : isSpacesHub ? (
          /* Spaces Hub Section Skeleton */
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Centered Editorial Title */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="h-10 sm:h-12 lg:h-14 w-80 max-w-full mx-auto bg-slate-200 rounded-xl animate-shimmer" />
              <div className="h-8 sm:h-10 w-64 max-w-full mx-auto bg-[#EA8E18]/25 rounded-lg animate-shimmer" />
              <div className="h-4 w-96 max-w-full mx-auto bg-slate-100 rounded animate-shimmer pt-2" />
            </div>

            {/* 2x2 Space Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-4 shadow-xs">
                  <div className="aspect-[16/10] rounded-xl bg-slate-100 border border-slate-200/50 animate-shimmer relative overflow-hidden flex items-center justify-center text-slate-300">
                    <ImageIcon className="w-10 h-10 opacity-30" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-20 bg-[#EA8E18]/25 rounded-full animate-shimmer" />
                    <div className="h-7 w-2/3 bg-slate-200 rounded-lg animate-shimmer" />
                    <div className="h-3.5 w-full bg-slate-100 rounded animate-shimmer" />
                  </div>
                  <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                    <div className="h-4 w-24 bg-slate-100 rounded animate-shimmer" />
                    <div className="h-8 w-28 rounded-full bg-[#EA8E18]/25 animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isBuilding ? (
          /* Building & Facilities Skeleton */
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="h-10 sm:h-12 lg:h-14 w-96 max-w-full mx-auto bg-slate-200 rounded-xl animate-shimmer" />
              <div className="h-4 w-80 max-w-full mx-auto bg-slate-100 rounded animate-shimmer" />
            </div>
            {/* Gallery Media */}
            <div className="aspect-[16/10] sm:aspect-[16/9] max-h-[580px] w-full rounded-2xl bg-slate-900 border border-slate-800 animate-shimmer flex items-center justify-center text-slate-700">
              <ImageIcon className="w-14 h-14 opacity-25" />
            </div>
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-lg bg-slate-100 border border-slate-200 animate-shimmer" />
              ))}
            </div>
          </div>
        ) : isLocation ? (
          /* Location & Neighborhood Skeleton */
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="h-10 sm:h-12 lg:h-14 w-96 max-w-full mx-auto bg-slate-200 rounded-xl animate-shimmer" />
              <div className="h-4 w-80 max-w-full mx-auto bg-slate-100 rounded animate-shimmer" />
            </div>
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl bg-slate-100 border border-slate-200 animate-shimmer flex items-center justify-center text-slate-400">
              <span className="text-sm font-medium">Loading location map...</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 animate-shimmer shrink-0" />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="h-3.5 w-3/4 bg-slate-200 rounded animate-shimmer" />
                    <div className="h-2.5 w-1/2 bg-slate-100 rounded animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isCompanies ? (
          /* Companies & Partners Skeleton */
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="h-10 sm:h-12 lg:h-14 w-80 max-w-full mx-auto bg-slate-200 rounded-xl animate-shimmer" />
              <div className="h-4 w-96 max-w-full mx-auto bg-slate-100 rounded animate-shimmer" />
            </div>
            {[1, 2].map((s) => (
              <div key={s} className="space-y-4">
                <div className="h-5 w-48 bg-slate-200 rounded animate-shimmer" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-20 rounded-xl border border-slate-200/80 bg-white p-3 flex items-center justify-center">
                      <div className="h-8 w-20 bg-slate-100 rounded animate-shimmer" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : isFindSpace ? (
          /* Find Space Form Skeleton */
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <div className="h-10 sm:h-12 w-80 max-w-full mx-auto bg-slate-200 rounded-xl animate-shimmer" />
              <div className="h-4 w-96 max-w-full mx-auto bg-slate-100 rounded animate-shimmer" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-3.5 w-24 bg-slate-200 rounded animate-shimmer" />
                  <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-lg animate-shimmer" />
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-24 bg-slate-200 rounded animate-shimmer" />
                  <div className="h-11 w-full bg-slate-50 border border-slate-200 rounded-lg animate-shimmer" />
                </div>
              </div>
              <div className="h-11 w-48 rounded-full bg-[#EA8E18]/30 animate-shimmer mx-auto" />
            </div>
          </div>
        ) : (
          /* Universal Fallback Skeleton */
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="h-10 sm:h-12 lg:h-14 w-80 max-w-full mx-auto bg-slate-200 rounded-xl animate-shimmer" />
              <div className="h-4 w-96 max-w-full mx-auto bg-slate-100 rounded animate-shimmer" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
                  <div className="aspect-[16/10] rounded-xl bg-slate-100 animate-shimmer" />
                  <div className="h-5 w-3/4 bg-slate-200 rounded animate-shimmer" />
                  <div className="h-3.5 w-full bg-slate-100 rounded animate-shimmer" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Skeleton Footer */}
      <footer className="w-full bg-[#181516] border-t border-slate-800 py-12 px-5 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-6 w-32 bg-slate-800 rounded animate-shimmer" />
          <div className="h-4 w-48 bg-slate-800/60 rounded animate-shimmer" />
        </div>
      </footer>
    </div>
  );
}
