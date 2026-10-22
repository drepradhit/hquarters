import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDownRight, ChevronRight, Home, Check, X } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import FindSpaceSection from '../components/FindSpaceSection.jsx';

export default function SpaceVirtualOfficePage({ setCurrentPage }) {
  const [selectedPackage, setSelectedPackage] = useState('Virtual Office Standard');
  const [selectedPackageNote, setSelectedPackageNote] = useState('');

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg.title);
    setSelectedPackageNote(`Virtual Office Package: ${pkg.title} (${pkg.price})`);
    const formElem = document.getElementById('find-space');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const includedItems = [
    'Alamat Domisili Resmi di Jl. Asia Afrika No. 158',
    'Penerimaan & Pengelolaan Surat/Paket Masuk',
    'Resepsionis Gedung Profesional Penyambut Tamu',
    'Kuota Ruang Rapat & Meeting Suite Modern',
    'Nomor Telepon Kantor Dedicated (022)*',
    'Dukungan Dokumen Legalitas & Domisili PT/CV*',
  ];

  const perfectForPills = [
    'Wirausahawan Mandiri', 'Perusahaan Baru / PT / CV', 'Konsultan Profesional',
    'Bisnis Berbasis Remote', 'Kantor Cabang Representasi', 'Praktisi Kreatif'
  ];

  const packages = [
    {
      id: 'business-address',
      title: 'Business Address',
      price: 'Rp 413,000',
      period: '/ bulan',
      popular: false,
      features: [
        { name: 'Alamat Bisnis Prestisius di CBD (Non-domisili legalitas)', included: true },
        { name: 'Layanan Penerimaan & Pengelolaan Surat/Paket', included: true },
        { name: 'Nomor Telepon Khusus Perusahaan Lokal', included: false },
        { name: 'Layanan Operator Penerimaan Panggilan atas Nama Perusahaan', included: false },
        { name: 'Akses Business Lounge Tanpa Batas (Jaringan Global)', included: false },
        { name: 'Penggunaan Meeting Room Komunitas (2 jam/hari)', included: false },
        { name: 'Akses Ruang Kerja Privat (1 workstation 5 hari/bulan)', included: false },
      ],
    },
    {
      id: 'phone-answering',
      title: 'Phone Answering',
      price: 'Rp 530,000',
      period: '/ bulan',
      popular: false,
      features: [
        { name: 'Alamat Bisnis Prestisius di CBD', included: false },
        { name: 'Layanan Penerimaan & Pengelolaan Surat/Paket', included: false },
        { name: 'Nomor Telepon Khusus Perusahaan Lokal', included: true },
        { name: 'Layanan Operator Penerimaan Panggilan atas Nama Perusahaan', included: true },
        { name: 'Akses Business Lounge Tanpa Batas (Jaringan Global)', included: false },
        { name: 'Penggunaan Meeting Room Komunitas (2 jam/hari)', included: false },
        { name: 'Akses Ruang Kerja Privat (1 workstation 5 hari/bulan)', included: false },
      ],
    },
    {
      id: 'virtual-office-standard',
      title: 'Virtual Office Standard',
      price: 'Rp 883,000',
      period: '/ bulan',
      badge: 'TERPOPULER',
      popular: true,
      features: [
        { name: 'Alamat Bisnis Prestisius CBD (Dapat untuk Domisili Legalitas Usaha)', included: true },
        { name: 'Layanan Penerimaan & Pengelolaan Surat/Paket', included: true },
        { name: 'Nomor Telepon Khusus Perusahaan Lokal', included: true },
        { name: 'Layanan Operator Penerimaan Panggilan atas Nama Perusahaan', included: true },
        { name: 'Akses Business Lounge Tanpa Batas (Jaringan Global)', included: true },
        { name: 'Penggunaan Meeting Room Komunitas (2 jam/hari)', included: true },
        { name: 'Akses Ruang Kerja Privat (1 workstation 5 hari/bulan)', included: false },
      ],
    },
    {
      id: 'virtual-office-plus',
      title: 'Virtual Office Plus',
      price: 'Rp 1,354,000',
      period: '/ bulan',
      popular: false,
      features: [
        { name: 'Alamat Bisnis Prestisius CBD (Dapat untuk Domisili Legalitas Usaha)', included: true },
        { name: 'Layanan Penerimaan & Pengelolaan Surat/Paket', included: true },
        { name: 'Nomor Telepon Khusus Perusahaan Lokal', included: true },
        { name: 'Layanan Operator Penerimaan Panggilan atas Nama Perusahaan', included: true },
        { name: 'Akses Business Lounge Tanpa Batas (Jaringan Global)', included: true },
        { name: 'Penggunaan Meeting Room Komunitas (2 jam/hari)', included: true },
        { name: 'Akses Ruang Kerja Privat (1 workstation 5 hari/bulan)', included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#231F20] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      <Navbar currentPage="spaces" setCurrentPage={setCurrentPage} />

      <main className="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36 bg-white flex-1">
        
        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
            <button
              id="btn-vo-breadcrumb-home"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('home');
                window.scrollTo(0, 0);
              }}
              className="flex items-center gap-1.5 hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              id="btn-vo-breadcrumb-spaces"
              onClick={() => {
                if (setCurrentPage) setCurrentPage('spaces');
                window.scrollTo(0, 0);
              }}
              className="hover:text-[#EA8E18] transition-colors cursor-pointer"
            >
              Spaces
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">Virtual Office</span>
          </nav>

          
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wider uppercase flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-slate-400 inline-block"></span>
                <span>HQUARTERS — CBD BANDUNG</span>
              </div>

              {/* Product Name as the MAIN HIGHLIGHT */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-[#EA8E18] tracking-tight leading-[1.08]">
                VIRTUAL OFFICE
              </h1>

              {/* Description constrained so it aligns with headline width */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[440px] font-normal pt-1 [text-wrap:pretty]">
                Alamat kantor resmi di CBD Jl. Asia Afrika Bandung untuk domisili usaha dan surat-menyurat tanpa sewa ruang fisik.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  id="btn-vo-hero-view-packages"
                  onClick={() => {
                    const pkgElem = document.getElementById("vo-packages");
                    if (pkgElem) pkgElem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 group shrink-0 cursor-pointer"
                >
                  <span>Pilih paket domisili</span>
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full shadow-sm group bg-slate-100">
                <img
                  src="/SPACES/SERVICED OFFICE/6.webp?v=20260825"
                  alt="HQuarters Virtual Office Domicile"
                  className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Specs / Highlights Strip */}
          <div className="mt-4 bg-[#F8F8F7] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-200">
            <div className="pt-2 sm:pt-0 lg:px-4 first:lg:pl-2">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Zonasi Perkantoran
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                IZIN DOMISILI RESMI PT / CV
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Jl. Asia Afrika No. 158
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                ALAMAT PRESTISIUS CBD BANDUNG
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <div className="text-slate-900 font-bold font-heading text-base sm:text-lg">
                Mail & Receptionist
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                PENGELOLAAN SURAT & PAKET
              </div>
            </div>

            <div className="pt-2 sm:pt-0 lg:px-4">
              <button
                onClick={() => {
                  const pkgElem = document.getElementById("vo-packages");
                  if (pkgElem) pkgElem.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left group cursor-pointer w-full"
              >
                <div className="text-slate-900 group-hover:text-[#EA8E18] font-bold font-heading text-base sm:text-lg transition-colors flex items-center justify-between">
                  <span>Pilih Paket Domisili</span>
                  <ArrowRight className="w-4 h-4 text-[#EA8E18] group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                  MULAI DARI RP 300RB-AN / BULAN
                </div>
              </button>
            </div>
          </div>
        </section>

        
        <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-medium font-heading text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Domisili Resmi di CBD Asia Afrika Bandung
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal [text-wrap:balance]">
            Tingkatkan kredibilitas bisnis Anda dengan alamat komersial prestisius di pusat kota Bandung.
          </p>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 border border-slate-200/80 space-y-8 max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA8E18] inline-block">
                RINCIAN FASILITAS
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">
                Layanan yang sudah termasuk dalam paket
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {includedItems.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white p-4.5 rounded-xl border border-slate-200/80 shadow-sm">
                  <span className="w-5 h-[2px] bg-[#EA8E18] rounded-full shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 text-center font-medium">
              *Fasilitas disesuaikan dengan rincian paket yang dipilih.
            </p>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-2xl sm:rounded-[40px] p-8 sm:p-14 text-center border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-medium font-heading text-white tracking-tight">
              Penerimaan surat & paket dokumen
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-normal">
              Surat dinas, dokumen legal, dan paket barang diterima serta dicatat secara rapi oleh tim resepsionis gedung, lalu diteruskan kepada Anda.
            </p>
          </div>
        </section>

        
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium font-heading text-slate-900 tracking-tight">Solusi Tepat untuk Bisnis Modern</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {perfectForPills.map((pill) => (
              <div
                key={pill}
                className="py-2.5 sm:py-3 px-6 sm:px-7 rounded-full bg-white border border-slate-200/80 text-slate-800 font-medium text-xs sm:text-sm shadow-sm flex items-center justify-center whitespace-nowrap"
              >
                {pill}
              </div>
            ))}
          </div>
        </section>

        
        <section id="vo-packages" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#EA8E18] uppercase tracking-widest inline-block">
              TABEL RINCIAN PAKET
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-slate-900 tracking-tight">
              Bandingkan Fasilitas & Biaya per Paket.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Biaya transparan per bulan, nett.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {packages.map((pkg, index) => (
              <div
                key={pkg.title}
                onClick={() => handlePackageClick(pkg)}
                className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative cursor-pointer group hover:-translate-y-2 hover:shadow-2xl ${
                  pkg.popular
                    ? 'bg-[#FAF8F5] border-2 border-[#EA8E18] shadow-xl ring-1 ring-[#EA8E18]/30 hover:ring-2 hover:ring-[#EA8E18]/50'
                    : 'bg-white border border-slate-200/90 shadow-sm hover:border-[#EA8E18]/60'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#EA8E18] text-white text-[10px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  
                  <div className="space-y-2 pt-1">
                    <h3 className="text-lg sm:text-xl font-medium font-heading text-slate-900 min-h-[56px] flex items-center group-hover:text-[#EA8E18] transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-medium font-heading text-slate-900 tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-slate-500 font-normal">
                        {pkg.period}
                      </span>
                    </div>
                  </div>

                  <hr className="border-slate-200/70" />

                  
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included Facilities
                    </div>
                    <ul className="space-y-3">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          {feat.included ? (
                            <Check className="w-4 h-4 text-[#EA8E18] shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                          )}
                          <span
                            className={`leading-snug ${
                              feat.included
                                ? 'text-slate-800 font-normal'
                                : 'text-slate-400 font-normal opacity-50'
                            }`}
                          >
                            {feat.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/70">
                  <button
                    id={`btn-vo-select-package-${pkg.id || index}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageClick(pkg);
                    }}
                    className={`w-full py-3 px-4 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:scale-[1.02] ${
                      pkg.popular
                        ? 'bg-[#EA8E18] group-hover:bg-[#d88010] text-white shadow-md'
                        : 'bg-slate-900 group-hover:bg-[#EA8E18] text-white shadow-sm'
                    }`}
                  >
                    <span>Pilih Paket Ini</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-4 pt-2">
            <p className="text-xs text-slate-500 max-w-2xl mx-auto font-normal italic">
              Ketentuan harga dan promo mengikuti ketersediaan kuota serta konfirmasi tim konsultan HQuarters. Silakan hubungi tim kami untuk konsultasi perizinan domisili usaha.
            </p>
            <div>
              <button
                id="btn-vo-book-now"
                onClick={() => {
                  const formElem = document.getElementById('find-space');
                  if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#EA8E18]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
              >
                <span>Konsultasi Paket Virtual Office</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        <FindSpaceSection 
          initialSpace="Virtual Office" 
          initialNotes={selectedPackageNote} 
        />

        
        <section className="!mt-14 sm:!mt-20 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#231F20] text-white text-center relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-medium font-heading text-white tracking-tight">
              Miliki alamat bisnis prestisius di pusat Bandung
            </h2>
            <div className="pt-2 sm:pt-4">
              <button
                id="btn-vo-cta-begin"
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('find-space');
                  window.scrollTo(0, 0);
                }}
                className="px-9 py-4 rounded-full bg-[#EA8E18] hover:bg-[#d88010] text-white font-semibold text-sm sm:text-base shadow-lg shadow-[#EA8E18]/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5 group"
              >
                <span>Konsultasi Bersama Tim</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
