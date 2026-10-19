// Generates page-space-virtual-office-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/SpaceVirtualOfficePage.jsx
//   src/components/FindSpaceSection.jsx   (initialSpace="Virtual Office")
//
// React section order (SpaceVirtualOfficePage.jsx):
//   107  <main class="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36">
//   110  1.  breadcrumb + LIGHT hero card (bg-[#FAF8F5], rounded-2xl sm:rounded-[44px])
//   180  2.  statement   "You Don't Always Need An Office. / But Your Business Still Needs A Presence."
//   191  3.  INCLUDED cream card "More Than Just An Address." — 6 items + footnote
//   218  4.  dark card   "Work From Anywhere. Be Present Here."                bg-slate-900 shadow-xl
//   233  5.  "Perfect For" — 6 pills
//   251  6.  PACKAGES "Choose Your Package." — 4 pricing cards + footnote + Book Now
//   368  7.  FindSpaceSection
//   374  8.  dark closing CTA with button  (!mt-14 sm:!mt-20, space-y-6)
//
// Vertical rhythm: space-y-28 (112) mobile, sm:space-y-36 (144) tablet+desktop.
//
// NOTE on the package grid: React uses `xl:grid-cols-4`, and Tailwind xl = 1280px.
// Elementor's largest breakpoint is desktop >= 1024px, so the 4-column layout is
// applied via custom_css media query at 1280px to stay faithful.
//
// Product names and package names stay in English. Everything else is Indonesian.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button,
  COLORS
} from './lib/elementor.js';

const WA_NUMBER = '628111908319';
const SPACE = 'Virtual Office';

// SpaceVirtualOfficePage.jsx:25-32
const INCLUDED_ITEMS = [
  'Alamat Bisnis Profesional',
  'Penanganan Surat',
  'Dukungan Resepsionis',
  'Akses Ruang Rapat',
  'Penanganan Panggilan*',
  'Dukungan Domisili Usaha*'
];

// SpaceVirtualOfficePage.jsx:34-37
const PERFECT_FOR = [
  'Wirausaha',
  'Perusahaan Baru',
  'Konsultan',
  'Bisnis Remote',
  'Perwakilan Regional',
  'Profesional Independen'
];

// SpaceVirtualOfficePage.jsx:39-101  (prices kept exactly as in source)
const PACKAGES = [
  {
    title: 'Business Address',
    price: 'Rp 413,000',
    period: '/ bulan',
    popular: false,
    features: [
      { name: 'Alamat Bisnis Profesional (tidak memenuhi syarat Alamat Legal)', included: true },
      { name: 'Penanganan Surat', included: true },
      { name: 'Nomor Telepon Lokal', included: false },
      { name: 'Penanganan Panggilan Atas Nama Perusahaan Anda', included: false },
      { name: 'Akses Business Lounge Tanpa Batas (120 negara)', included: false },
      { name: 'Penggunaan Community Meeting Room (2 jam/hari)', included: false },
      { name: 'Akses Private Office (1 workstation) 5 hari/bulan', included: false }
    ]
  },
  {
    title: 'Phone Answering',
    price: 'Rp 530,000',
    period: '/ bulan',
    popular: false,
    features: [
      { name: 'Alamat Bisnis Profesional', included: false },
      { name: 'Penanganan Surat', included: false },
      { name: 'Nomor Telepon Lokal', included: true },
      { name: 'Penanganan Panggilan Atas Nama Perusahaan Anda', included: true },
      { name: 'Akses Business Lounge Tanpa Batas (120 negara)', included: false },
      { name: 'Penggunaan Community Meeting Room (2 jam/hari)', included: false },
      { name: 'Akses Private Office (1 workstation) 5 hari/bulan', included: false }
    ]
  },
  {
    title: 'Virtual Office Standard',
    price: 'Rp 883,000',
    period: '/ bulan',
    badge: 'POPULAR',
    popular: true,
    features: [
      { name: 'Alamat Bisnis Profesional (memenuhi syarat Alamat Legal)', included: true },
      { name: 'Penanganan Surat', included: true },
      { name: 'Nomor Telepon Lokal', included: true },
      { name: 'Penanganan Panggilan Atas Nama Perusahaan Anda', included: true },
      { name: 'Akses Business Lounge Tanpa Batas (120 negara)', included: true },
      { name: 'Penggunaan Community Meeting Room (2 jam/hari)', included: true },
      { name: 'Akses Private Office (1 workstation) 5 hari/bulan', included: false }
    ]
  },
  {
    title: 'Virtual Office Plus',
    price: 'Rp 1,354,000',
    period: '/ bulan',
    popular: false,
    features: [
      { name: 'Alamat Bisnis Profesional (memenuhi syarat Alamat Legal)', included: true },
      { name: 'Penanganan Surat', included: true },
      { name: 'Nomor Telepon Lokal', included: true },
      { name: 'Penanganan Panggilan Atas Nama Perusahaan Anda', included: true },
      { name: 'Akses Business Lounge Tanpa Batas (120 negara)', included: true },
      { name: 'Penggunaan Community Meeting Room (2 jam/hari)', included: true },
      { name: 'Akses Private Office (1 workstation) 5 hari/bulan', included: true }
    ]
  }
];

// ------------------------------------------------------------------
// 1. Breadcrumb + LIGHT hero card
// ------------------------------------------------------------------
function buildHero() {
  return section({
    pt: 112, ptMobile: 96,   // main pt-24 sm:pt-28 only
    pb: 0,
    bg: COLORS.surface,
    gap: 16,                 // section space-y-4
    mb: 144, mbMobile: 112,
    id: 'space-hero',
    children: [
      // nav text-xs sm:text-sm font-medium text-slate-500
      createWidget('heading', {
        title: [
          '<a href="/" style="color:#64748B;text-decoration:none;">Beranda</a>',
          '<span style="color:#CBD5E1;">&rsaquo;</span>',
          '<a href="/spaces" style="color:#64748B;text-decoration:none;">Ruang Usaha</a>',
          '<span style="color:#CBD5E1;">&rsaquo;</span>',
          '<span style="color:#0F172A;font-weight:700;">Virtual Office</span>'
        ].join(' &nbsp; '),
        header_size: 'span',
        align: 'left',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: PX(14),
        typography_font_size_mobile: PX(12)
      }),

      // LIGHT hero card: bg-[#FAF8F5] rounded-2xl sm:rounded-[44px]
      //                 p-8 sm:p-14 lg:p-16 border-slate-200/80
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          align_items: 'stretch',
          flex_gap: GAP(32),
          flex_gap_tablet: GAP(24),
          flex_gap_mobile: GAP(24),
          border_radius: RAD(44),
          border_radius_mobile: RAD(16),
          background_background: 'classic',
          background_color: COLORS.surfaceCream,
          ...BORDER(1, COLORS.borderSoft),
          overflow: 'hidden',
          padding: PAD(64, 64, 64, 64, true),
          padding_tablet: PAD(56, 56, 56, 56, true),
          padding_mobile: PAD(32, 32, 32, 32, true)
        },
        [
          // LEFT lg:col-span-6, space-y-6
          createContainer(
            {
              width: CUSTOM('calc(50% - 16px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              justify_content: 'center',
              flex_gap: GAP(24)
            },
            [
              // px-2 py-1 rounded-full text-[#EA8E18] text-lg font-bold uppercase tracking-wider
              heading('VIRTUAL OFFICE', {
                tag: 'span',
                align: 'left',
                color: COLORS.orange,
                size: 18,
                weight: '700',
                tracking: 0.05,
                transform: 'uppercase'
              }),
              // h1 text-4xl sm:text-5xl lg:text-6xl leading-[1.12]
              heading('Alamat yang Lebih Baik untuk <br><span style="color:#EA8E18;">Bisnis Anda.</span>', {
                tag: 'h1',
                align: 'left',
                size: 60,
                sizeTablet: 48,
                sizeMobile: 36,
                leading: 1.12,
                tracking: -0.025
              }),
              // p text-slate-600 text-base sm:text-lg max-w-xl
              para(
                '<p>Bangun kehadiran profesional Anda di HQuarters tanpa harus memelihara kantor permanen.</p>',
                {
                  size: 18,
                  sizeMobile: 16,
                  custom_css: 'selector .elementor-widget-container { max-width:576px; }'
                }
              ),
              // pt-2 flex flex-wrap items-center gap-4
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  align_items: 'center',
                  flex_gap: GAP(16),
                  padding: PAD(8, 0, 0, 0)
                },
                [
                  button('Lihat Paket Virtual Office &nbsp;&rarr;', '#vo-packages', {
                    fontSize: 16,
                    fontSizeMobile: 14,
                    weight: '700',
                    radius: 9999,
                    py: 14,
                    px: 32,
                    shadow: { y: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,0.1)' }
                  })
                ]
              )
            ]
          ),

          // RIGHT lg:col-span-6 -> image card rounded-xl border-slate-200/80 min-h-[280px] bg-slate-100
          createContainer(
            {
              width: CUSTOM('calc(50% - 16px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'row',
              align_items: 'stretch'
            },
            [
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  min_height: PX(480),
                  min_height_tablet: PX(400),
                  min_height_mobile: PX(280),
                  border_radius: RAD(12),
                  overflow: 'hidden',
                  background_background: 'classic',
                  background_color: '#F1F5F9',
                  background_image: { url: '/SPACES/SERVICED OFFICE/6.webp' },
                  background_position: 'center bottom',
                  background_size: 'cover',
                  ...BORDER(1, COLORS.borderSoft),
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)' }
                },
                []
              )
            ]
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 2. Statement  (no accent footer in React)
// ------------------------------------------------------------------
function buildStatement() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_tablet: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16)
        },
        [
          heading('Anda Tidak Selalu Butuh Kantor. <br><span style="color:#EA8E18;">Tapi Bisnis Anda Tetap Butuh Kehadiran.</span>', {
            tag: 'h2',
            align: 'center',
            size: 48,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          para(
            '<p>Bisnis remote? Perusahaan baru? Profesional independen? Perwakilan cabang? Bangun kredibilitas dengan alamat bisnis profesional di HQuarters.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 3. INCLUDED cream card "More Than Just An Address." — 6 items + footnote
// ------------------------------------------------------------------
function buildIncluded() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      // bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14
      // border space-y-8 max-w-4xl mx-auto
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          flex_gap: GAP(32),   // space-y-8
          background_background: 'classic',
          background_color: COLORS.surfaceCream,
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          padding: PAD(56, 56, 56, 56, true),
          padding_mobile: PAD(32, 32, 32, 32, true),
          ...BORDER(1, COLORS.borderSoft)
        },
        [
          // text-center max-w-xl mx-auto space-y-2
          createContainer(
            {
              content_width: 'full',
              width: PX(576),
              width_mobile: PCT(100),
              flex_direction: 'column',
              align_items: 'center',
              text_align: 'center',
              flex_gap: GAP(8)
            },
            [
              heading('INCLUDED', {
                tag: 'span',
                align: 'center',
                color: COLORS.orange,
                size: 12,
                weight: '700',
                tracking: 0.1,
                transform: 'uppercase'
              }),
              heading('Lebih dari Sekadar Alamat.', {
                tag: 'h2',
                align: 'center',
                size: 36,
                sizeTablet: 36,
                sizeMobile: 30,
                leading: 1.25,
                tracking: -0.025
              })
            ]
          ),
          // grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto
          createContainer(
            {
              content_width: 'full',
              width: PX(672),
              width_mobile: PCT(100),
              flex_direction: 'row',
              flex_wrap: 'wrap',
              justify_content: 'space-between',
              align_items: 'stretch',
              flex_gap: GAP(16),
              custom_css: 'selector { margin-left:auto; margin-right:auto; }'
            },
            INCLUDED_ITEMS.map((item) =>
              createContainer(
                {
                  width: GRID(2, 16),
                  width_tablet: GRID(2, 16),
                  width_mobile: PCT(100),
                  flex_direction: 'row',
                  align_items: 'center',
                  flex_gap: GAP(12),   // gap-3
                  background_background: 'classic',
                  background_color: '#FFFFFF',
                  border_radius: RAD(12),
                  padding: PAD(18, 18, 18, 18, true),   // p-4.5 = 18px
                  ...BORDER(1, COLORS.borderSoft),
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
                },
                [
                  // w-5 h-[2px] bg-[#EA8E18] rounded-full
                  createContainer(
                    {
                      width: PX(20),
                      min_height: PX(2),
                      flex_direction: 'row',
                      background_background: 'classic',
                      background_color: COLORS.orange,
                      border_radius: RAD(9999)
                    },
                    []
                  ),
                  // text-sm font-semibold text-slate-800
                  heading(item, {
                    tag: 'span',
                    align: 'left',
                    color: '#1E293B',
                    size: 14,
                    sizeMobile: 14,
                    weight: '600',
                    leading: 1.625
                  })
                ]
              )
            )
          ),
          // footnote text-xs text-slate-500 text-center font-medium
          para('<p style="text-align:center;margin:0;">*Tersedia tergantung paket yang dipilih.</p>', {
            align: 'center',
            size: 12,
            sizeMobile: 12,
            color: '#64748B',
            weight: '500'
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 4. Dark card "Work From Anywhere. Be Present Here."
// ------------------------------------------------------------------
function buildDarkCard() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      // bg-slate-900 rounded-2xl sm:rounded-[40px] p-8 sm:p-14
      // border-slate-800 space-y-4 shadow-xl
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          background_background: 'classic',
          background_color: '#0F172A',
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          padding: PAD(56, 56, 56, 56, true),
          padding_mobile: PAD(32, 32, 32, 32, true),
          ...BORDER(1, '#1E293B'),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)' }
        },
        [
          heading('Bekerja dari Mana Saja. Tetap Hadir di Sini.', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 36,
            sizeTablet: 36,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          para(
            '<p>Tim Anda mungkin bekerja remote. Alamat bisnis Anda tidak harus terlihat sementara.</p>',
            {
              align: 'center',
              color: '#CBD5E1',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:576px; margin-left:auto; margin-right:auto; }'
            }
          ),
          // font-bold text-[#EA8E18] text-base sm:text-lg
          heading('Kehadiran profesional tanpa biaya tetap kantor.', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 18,
            sizeMobile: 16,
            weight: '700'
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 5. "Perfect For" — 6 pills
// ------------------------------------------------------------------
function buildPerfectFor() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 24,   // space-y-6
    center: true,
    id: 'vo-perfect-for',
    children: [
      heading('Perfect For', {
        tag: 'h2',
        align: 'center',
        size: 36,
        sizeTablet: 36,
        sizeMobile: 30,
        leading: 1.25,
        tracking: -0.025
      }),
      // grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_mobile: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          flex_gap: GAP(16),
          flex_gap_mobile: GAP(12),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        PERFECT_FOR.map((pill) =>
          createContainer(
            {
              width: GRID(3, 16),
              width_tablet: GRID(3, 16),
              width_mobile: GRID(2, 12),
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(9999),
              padding: PAD(12, 28, 12, 28, true),   // py-2.5 sm:py-3 px-6 sm:px-7
              padding_mobile: PAD(10, 24, 10, 24, true),
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              heading(pill, {
                tag: 'span',
                align: 'center',
                color: '#1E293B',
                size: 14,
                sizeMobile: 12,
                weight: '500',
                leading: 1.625,
                custom_css: 'selector .elementor-heading-title { white-space:nowrap; }'
              })
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 6. PACKAGES "Choose Your Package." — 4 pricing cards
// ------------------------------------------------------------------
function buildPackages() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 40,   // space-y-10
    center: true,
    id: 'vo-packages',
    children: [
      // text-center max-w-xl mx-auto space-y-2
      createContainer(
        {
          content_width: 'full',
          width: PX(576),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(8)
        },
        [
          heading('PACKAGES', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          // text-3xl sm:text-5xl
          heading('Pilih Paket Anda.', {
            tag: 'h2',
            align: 'center',
            size: 48,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          // text-slate-500 text-sm sm:text-base
          para('<p>Harga bulanan, nett.</p>', {
            align: 'center',
            size: 16,
            sizeMobile: 14,
            color: '#64748B'
          })
        ]
      ),

      // grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch
      // xl = 1280px has no Elementor breakpoint, so the 4-col layout is applied
      // through a media query in custom_css to stay faithful.
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          flex_gap: GAP(24),
          custom_css: [
            'selector > .e-con { width: calc((100% - 24px) / 2) !important; }',
            '@media (min-width: 1280px) { selector > .e-con { width: calc((100% - 72px) / 4) !important; } }',
            '@media (max-width: 767px) { selector > .e-con { width: 100% !important; } }'
          ].join('\n')
        },
        PACKAGES.map((pkg) => buildPackageCard(pkg))
      ),

      // footnote + Book Now
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          padding: PAD(8, 0, 0, 0)
        },
        [
          para(
            '<p style="text-align:center;margin:0;font-style:italic;">Harga dapat berubah tanpa pemberitahuan sebelumnya. Silakan hubungi kami untuk harga dan detail paket terbaru.</p>',
            {
              align: 'center',
              size: 12,
              sizeMobile: 12,
              color: '#64748B',
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          ),
          // px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-[#EA8E18]/25
          button('Pesan Sekarang &nbsp;&rarr;', '#find-space', {
            fontSize: 16,
            fontSizeMobile: 14,
            weight: '600',
            radius: 9999,
            py: 14,
            px: 32,
            shadow: { y: 10, blur: 15, spread: -3, color: 'rgba(234,142,24,0.25)' }
          })
        ]
      )
    ]
  });
}

function buildPackageCard(pkg) {
  const popular = pkg.popular;

  // feature row: check (orange) or X (slate-300), text 12/14px
  const featureRows = pkg.features.map((feat) =>
    createContainer(
      {
        content_width: 'full',
        flex_direction: 'row',
        align_items: 'flex-start',
        flex_gap: GAP(10)   // gap-2.5
      },
      [
        createWidget('icon', {
          selected_icon: { value: feat.included ? 'fas fa-check' : 'fas fa-times', library: 'fa-solid' },
          primary_color: feat.included ? COLORS.orange : '#CBD5E1',
          size: PX(16),
          custom_css: 'selector .elementor-icon { margin-top:2px; }'
        }),
        heading(feat.name, {
          tag: 'span',
          align: 'left',
          color: feat.included ? '#1E293B' : '#94A3B8',
          size: 14,
          sizeMobile: 12,
          weight: '400',
          leading: 1.375,
          custom_css: feat.included ? '' : 'selector { opacity:.5; }'
        })
      ]
    )
  );

  const cardChildren = [
    // upper: space-y-5
    createContainer(
      {
        content_width: 'full',
        flex_direction: 'column',
        flex_gap: GAP(20)
      },
      [
        // title + price: space-y-2 pt-1
        createContainer(
          {
            content_width: 'full',
            flex_direction: 'column',
            flex_gap: GAP(8),
            padding: PAD(4, 0, 0, 0)
          },
          [
            // h3 text-lg sm:text-xl min-h-[56px] flex items-center
            heading(pkg.title, {
              tag: 'h3',
              align: 'left',
              size: 20,
              sizeMobile: 18,
              weight: '500',
              leading: 1.375,
              custom_css: 'selector .elementor-widget-container { min-height:56px; display:flex; align-items:center; }'
            }),
            // price row: flex items-baseline gap-1
            createContainer(
              {
                content_width: 'full',
                flex_direction: 'row',
                align_items: 'baseline',
                flex_gap: GAP(4)
              },
              [
                // text-2xl sm:text-3xl
                heading(pkg.price, {
                  tag: 'span',
                  align: 'left',
                  size: 30,
                  sizeMobile: 24,
                  weight: '500',
                  leading: 1.25,
                  tracking: -0.025
                }),
                // text-xs text-slate-500
                heading(pkg.period, {
                  tag: 'span',
                  align: 'left',
                  color: '#64748B',
                  size: 12,
                  sizeMobile: 12,
                  weight: '400'
                })
              ]
            )
          ]
        ),
        // hr border-slate-200/70
        createWidget('divider', {
          style: 'solid',
          weight: PX(1),
          color: 'rgba(226,232,240,0.7)',
          gap: PX(0)
        }),
        // facilities: space-y-3
        createContainer(
          {
            content_width: 'full',
            flex_direction: 'column',
            flex_gap: GAP(12)
          },
          [
            // text-[11px] font-bold text-slate-400 uppercase tracking-wider
            heading('Included Facilities', {
              tag: 'div',
              align: 'left',
              color: '#94A3B8',
              size: 11,
              sizeMobile: 11,
              weight: '700',
              tracking: 0.05,
              transform: 'uppercase'
            }),
            createContainer(
              {
                content_width: 'full',
                flex_direction: 'column',
                flex_gap: GAP(12)   // ul space-y-3
              },
              featureRows
            )
          ]
        )
      ]
    ),
    // footer: pt-6 mt-6 border-t
    createContainer(
      {
        content_width: 'full',
        flex_direction: 'column',
        padding: PAD(24, 0, 0, 0),
        _margin: MARGIN(24, '', '', ''),
        ...BORDER_SIDE('top', 'rgba(226,232,240,0.7)')
      },
      [
        // w-full py-3 px-4 rounded-full font-bold text-xs sm:text-sm
        button('Select Package &nbsp;&rarr;', '#find-space', {
          fontSize: 14,
          fontSizeMobile: 12,
          weight: '700',
          radius: 9999,
          py: 12,
          px: 16,
          bg: popular ? COLORS.orange : '#0F172A',
          bgHover: popular ? COLORS.orangeDark : COLORS.orange,
          custom_css: 'selector { width:100%; }'
        })
      ]
    )
  ];

  // popular badge: absolute -top-3.5 left-1/2 -translate-x-1/2
  if (popular) {
    cardChildren.unshift(
      createContainer(
        {
          flex_direction: 'row',
          justify_content: 'center',
          align_items: 'center',
          custom_css: 'selector { position:absolute; top:-14px; left:50%; transform:translateX(-50%); }',
          padding: PAD(0, 0, 0, 0)
        },
        [
          createContainer(
            {
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              background_background: 'classic',
              background_color: COLORS.orange,
              border_radius: RAD(9999),
              padding: PAD(4, 14, 4, 14, true),   // py-1 px-3.5
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,0.1)' }
            },
            [
              heading(pkg.badge, {
                tag: 'span',
                align: 'center',
                color: '#FFFFFF',
                size: 10,
                sizeMobile: 10,
                weight: '800',
                tracking: 0.05,
                transform: 'uppercase'
              })
            ]
          )
        ]
      )
    );
  }

  return createContainer(
    {
      // Width is fully driven by the parent's custom_css media query
      // (grid-cols-1 md:grid-cols-2 xl:grid-cols-4). Do not set content_width
      // or width here — Elementor would override the media query.
      flex_direction: 'column',
      justify_content: 'space-between',
      border_radius: RAD(12),
      padding: PAD(28, 28, 28, 28, true),
      padding_mobile: PAD(24, 24, 24, 24, true),
      background_background: 'classic',
      background_color: popular ? COLORS.surfaceCream : '#FFFFFF',
      border_border: 'solid',
      border_width: { unit: 'px', top: popular ? '2' : '1', right: popular ? '2' : '1', bottom: popular ? '2' : '1', left: popular ? '2' : '1', isLinked: true },
      border_color: popular ? COLORS.orange : 'rgba(226,232,240,0.9)',
      ...(popular
        ? {
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)' }
          }
        : {
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
          }),
      custom_css: popular
        ? 'selector { position:relative; transition: box-shadow .3s ease, transform .3s ease; }'
        : 'selector { transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease; }'
    },
    cardChildren
  );
}

// ------------------------------------------------------------------
// 7. FindSpaceSection.jsx  (initialSpace="Virtual Office")
// ------------------------------------------------------------------
function buildFindSpace() {
  const chips = ['Premium Office', 'SOHO', 'Serviced Office', 'Virtual Office', 'Ruangan Acara'];

  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    id: 'find-space',
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PX(1200),
          width_mobile: PCT(100),
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          align_items: 'stretch',
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          background_background: 'classic',
          background_color: '#FFFFFF',
          overflow: 'hidden',
          ...BORDER(1, 'rgba(226,232,240,0.6)'),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' }
        },
        [
          // LEFT lg:w-2/5
          createContainer(
            {
              width: PCT(40),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              min_height: PX(480),
              min_height_mobile: PX(380),
              flex_direction: 'column',
              justify_content: 'flex-end',
              background_background: 'classic',
              background_color: '#0F172A',
              background_image: { url: '/SPACES/SERVICED OFFICE/6.webp' },
              background_position: 'center center',
              background_size: 'cover',
              background_overlay_background: 'classic',
              background_overlay_color: 'rgba(15,23,42,0.6)',
              padding: PAD(40, 40, 40, 40, true),
              padding_mobile: PAD(24, 24, 24, 24, true)
            },
            [
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  flex_direction: 'column',
                  flex_gap: GAP(12),
                  background_background: 'classic',
                  background_color: 'rgba(22,26,37,0.95)',
                  border_radius: RAD(16),
                  padding: PAD(32, 32, 32, 32, true),
                  padding_mobile: PAD(24, 24, 24, 24, true),
                  ...BORDER(1, 'rgba(255,255,255,0.1)')
                },
                [
                  heading('ALAMAT PRESTISE', {
                    tag: 'span',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 10,
                    weight: '800',
                    tracking: 0.05,
                    transform: 'uppercase',
                    custom_css: 'selector .elementor-heading-title { display:inline-block; background:#EA8E18; padding:4px 12px; border-radius:6px; }'
                  }),
                  heading('Bangun Kehadiran Korporat Anda.', {
                    tag: 'h2',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 30,
                    sizeMobile: 24,
                    weight: '500',
                    leading: 1.25
                  }),
                  para(
                    '<p>Dapatkan alamat CBD Asia Afrika yang prestisius, penanganan surat, penerimaan panggilan, dan akses ruang rapat untuk memperkuat kredibilitas perusahaan Anda.</p>',
                    { size: 14, color: '#CBD5E1' }
                  )
                ]
              )
            ]
          ),

          // RIGHT lg:w-3/5
          createContainer(
            {
              width: PCT(60),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(32),
              padding: PAD(48, 48, 48, 48, true),
              padding_tablet: PAD(40, 40, 40, 40, true),
              padding_mobile: PAD(24, 24, 24, 24, true)
            },
            [
              createContainer(
                { content_width: 'full', flex_direction: 'column', flex_gap: GAP(12) },
                [
                  createContainer(
                    {
                      content_width: 'full',
                      flex_direction: 'row',
                      justify_content: 'space-between',
                      align_items: 'center',
                      flex_gap: GAP(8)
                    },
                    [
                      heading('1. Select Space Type', { tag: 'h3', align: 'left', size: 20, sizeMobile: 18, weight: '500' }),
                      heading(SPACE, {
                        tag: 'span',
                        align: 'right',
                        color: COLORS.orange,
                        size: 12,
                        weight: '700',
                        tracking: 0.05,
                        transform: 'uppercase'
                      })
                    ]
                  ),
                  createContainer(
                    {
                      content_width: 'full',
                      width: PCT(100),
                      flex_direction: 'row',
                      flex_wrap: 'wrap',
                      justify_content: 'space-between',
                      flex_gap: GAP(8)
                    },
                    chips.map((c) =>
                      createContainer(
                        {
                          width: GRID(5, 8),
                          width_tablet: GRID(3, 8),
                          width_mobile: GRID(2, 8),
                          flex_direction: 'row',
                          justify_content: 'center',
                          align_items: 'center',
                          border_radius: RAD(12),
                          padding: PAD(10, 12, 10, 12, true),
                          background_background: 'classic',
                          background_color: c === SPACE ? COLORS.orangeTint : '#FFFFFF',
                          ...BORDER(1, c === SPACE ? COLORS.orange : COLORS.border)
                        },
                        [
                          heading(c, {
                            tag: 'span',
                            align: 'center',
                            color: c === SPACE ? COLORS.orange : '#334155',
                            size: 12,
                            weight: '700',
                            custom_css: 'selector .elementor-heading-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }'
                          })
                        ]
                      )
                    )
                  )
                ]
              ),

              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'column',
                  flex_gap: GAP(16),
                  padding: PAD(8, 0, 0, 0),
                  ...BORDER_SIDE('top', '#F1F5F9')
                },
                [
                  createContainer(
                    { content_width: 'full', flex_direction: 'column', flex_gap: GAP(2) },
                    [
                      heading('2. Complete Your Details', { tag: 'h3', align: 'left', size: 20, sizeMobile: 18, weight: '500' }),
                      para('<p>Bagikan data Anda dan tim kami akan segera menghubungi Anda.</p>', { size: 12, sizeMobile: 12, color: '#64748B' })
                    ]
                  ),
                  createWidget('form', {
                    form_name: 'HQuarters Virtual Office',
                    form_fields: [
                      { _id: 'space_type', field_type: 'hidden', field_value: SPACE },
                      { _id: 'name', field_type: 'text', field_label: 'Full Name *', placeholder: 'John Doe', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'whatsapp', field_type: 'tel', field_label: 'WhatsApp *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'company', field_type: 'text', field_label: 'Company Name (Optional)', placeholder: 'mis. PT Enterprise Nusantara', required: 'false', width: '100' },
                      { _id: 'notes', field_type: 'textarea', field_label: 'Additional Requirements (Optional)', placeholder: 'Permintaan khusus, waktu, atau pertanyaan...', rows: 3, required: 'false', width: '100' }
                    ],
                    button_text: 'Ajukan Paket Virtual Office',
                    button_size: 'md',
                    button_width: '100',
                    button_typography_typography: 'custom',
                    button_typography_font_family: 'Plus Jakarta Sans',
                    button_typography_font_size: PX(14),
                    button_typography_font_weight: '800',
                    button_typography_text_transform: 'uppercase',
                    button_text_color: '#FFFFFF',
                    button_background_color: COLORS.orange,
                    button_background_hover_color: COLORS.orangeDark,
                    button_border_radius: RAD(12),
                    button_padding: PAD(16, 24, 16, 24, true),
                    submit_actions: ['redirect'],
                    redirect_to: `https://wa.me/${WA_NUMBER}?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*Virtual%20Office*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
                    label_typography_typography: 'custom',
                    label_typography_font_family: 'Plus Jakarta Sans',
                    label_typography_font_size: PX(10),
                    label_typography_font_weight: '800',
                    label_typography_line_height: EM(1),
                    label_text_color: '#475569',
                    field_typography_typography: 'custom',
                    field_typography_font_family: 'Plus Jakarta Sans',
                    field_typography_font_size: PX(14),
                    field_text_color: '#0F172A',
                    field_background_color: '#FFFFFF',
                    field_border_border: 'solid',
                    field_border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                    field_border_color: COLORS.border,
                    field_border_radius: RAD(12),
                    field_padding: PAD(10, 14, 10, 14, true),
                    custom_css: [
                      'selector .elementor-field-label { text-transform:uppercase; letter-spacing:.05em; font-weight:800; font-size:10px; color:#475569; display:flex; align-items:center; gap:6px; }',
                      'selector .elementor-field-group-name .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f007"; color:#EA8E18; font-size:12px; }',
                      'selector .elementor-field-group-whatsapp .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f095"; color:#EA8E18; font-size:12px; }',
                      'selector .elementor-field-group-company .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f1ad"; color:#94A3B8; font-size:12px; }',
                      'selector .elementor-field-group-notes .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f075"; color:#94A3B8; font-size:12px; }',
                      'selector .elementor-field-group { margin-bottom: 14px; }'
                    ].join('\n')
                  }),
                  para(
                    '<p style="text-align:center;font-size:10px;color:#94A3B8;margin:0;">Informasi Anda aman dan hanya digunakan oleh manajemen HQuarters.</p>',
                    { align: 'center', size: 10, sizeMobile: 10, color: '#94A3B8' }
                  )
                ]
              )
            ]
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 8. Dark closing CTA with button  (space-y-6)
// ------------------------------------------------------------------
function buildClosingCTA() {
  return section({
    pt: 96, ptMobile: 64,
    pb: 64, pbMobile: 48,
    mt: 80, mtMobile: 56,
    bg: COLORS.dark,
    center: true,
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(24)   // space-y-6
        },
        [
          heading('Setiap Bisnis Butuh <br><span style="color:#EA8E18;">Tempat untuk Memulai.</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 48,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              padding: PAD(16, 0, 0, 0),
              padding_mobile: PAD(8, 0, 0, 0)
            },
            [
              button('Mulai di HQuarters &nbsp;&rarr;', '/find-space', {
                fontSize: 16,
                fontSizeMobile: 14,
                weight: '600',
                radius: 9999,
                py: 16,
                px: 36,
                shadow: { y: 10, blur: 15, spread: -3, color: 'rgba(234,142,24,0.25)' }
              })
            ]
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
console.log('Generating page-space-virtual-office-id.json ...');
exportElementorTemplate('HQuarters - Space Virtual Office', [
  buildHero(),
  buildStatement(),
  buildIncluded(),
  buildDarkCard(),
  buildPerfectFor(),
  buildPackages(),
  buildFindSpace(),
  buildClosingCTA()
], 'page-space-virtual-office-id.json');
console.log('Done.');
