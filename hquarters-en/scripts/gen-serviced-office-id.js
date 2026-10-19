// Generates page-space-serviced-office-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/SpaceServicedOfficePage.jsx
//   src/components/FindSpaceSection.jsx   (initialSpace="Serviced Office")
//
// React section order (SpaceServicedOfficePage.jsx):
//   159  <main class="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36">
//   162  1.  breadcrumb + LIGHT hero card (bg-[#FAF8F5], rounded-2xl sm:rounded-[44px])
//   232  2.  statement   "Skip The Setup. / Start The Business."                max-w-4xl space-y-4
//   246  3.  Serviced Office Details gallery — 4 images                        space-y-6
//   385  4.  PRODUCTS "Choose The Space Your Team Needs." — 4 cards p-7         space-y-8
//   414  5.  INCLUDED cream card "Everything Is Ready." — 9 amenities          p-8 sm:p-14
//   437  6.  statement   "Flexible When Your Business Needs To Be."             max-w-3xl space-y-4
//   448  7.  dark card   "Look Established From Day One."                       bg-slate-900
//   463  8.  PERFECT FOR "Use Cases" — 8 pills                                  space-y-6
//   486  9.  FindSpaceSection
//   489 10.  dark closing CTA with BUTTON  (!mt-14 sm:!mt-20, space-y-6)
//
// Vertical rhythm: space-y-28 (112) mobile, sm:space-y-36 (144) tablet+desktop.
//
// Product names stay in English. Everything else is Indonesian.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button, interactiveGallerySection,
  COLORS
} from './lib/elementor.js';

const WA_NUMBER = '628111908319';
const SPACE = 'Serviced Office';

// SpaceServicedOfficePage.jsx:32-57  (4 images)
const GALLERY = [
  { src: '/SPACES/SERVICED OFFICE/1.webp', title: 'Kantor Privat Siap Pakai' },
  { src: '/SPACES/SERVICED OFFICE/2.webp', title: 'Zona Meja Tim Khusus' },
  { src: '/SPACES/SERVICED OFFICE/3.webp', title: 'Sudut Rapat & Resepsionis' },
  { src: '/SPACES/SERVICED OFFICE/5.webp', title: 'Lounge & Pantry Modern' }
];

// SpaceServicedOfficePage.jsx:59-84
const SERVICED_SIZES = [
  { title: 'Private Office', capacity: '1×2 orang' },
  { title: 'Small Team Office', capacity: '3×5 orang' },
  { title: 'Team Office', capacity: '6×10 orang' },
  { title: 'Custom Workspace', capacity: '10+ orang' }
];

// SpaceServicedOfficePage.jsx amenities array
const AMENITIES = [
  'Ruang Kerja Berperabot',
  'Internet Kecepatan Tinggi',
  'Resepsionis',
  'Ruang Rapat',
  'Layanan Kebersihan',
  'Utilitas',
  'Keamanan Gedung',
  'Alamat Bisnis Profesional',
  'Pantry / Area Bersama'
];

// SpaceServicedOfficePage.jsx useCases array
const USE_CASES = [
  'Masuknya pasar baru',
  'Tim proyek',
  'Kantor satelit',
  'Startup',
  'Konsultan',
  'Perusahaan kecil',
  'Kantor cabang',
  'Kantor korporat sementara'
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
          '<span style="color:#0F172A;font-weight:700;">Serviced Office</span>'
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
              heading('SERVICED OFFICE', {
                tag: 'span',
                align: 'left',
                color: COLORS.orange,
                size: 18,
                weight: '700',
                tracking: 0.05,
                transform: 'uppercase'
              }),
              // h1 text-4xl sm:text-5xl lg:text-6xl leading-[1.12]
              heading('Kantor Anda. <br><span style="color:#EA8E18;">Siap Sejak Hari Pertama.</span>', {
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
                '<p>Tanpa renovasi. Tanpa pengadaan perabot. Tanpa menunggu. Bawa tim Anda dan mulai bekerja.</p>',
                {
                  size: 18,
                  sizeMobile: 16,
                  custom_css: 'selector .elementor-widget-container { max-width:576px; }'
                }
              ),
              // pt-2  (no flex wrapper in React)
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  align_items: 'center',
                  padding: PAD(8, 0, 0, 0)
                },
                [
                  button('Cek Ketersediaan &nbsp;&rarr;', '/find-space', {
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
                  background_image: { url: '/SPACES/SERVICED OFFICE/1.webp' },
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
// Statement block
// ------------------------------------------------------------------
function buildStatement(headingHtml, descHtml, footerHtml, opts = {}) {
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
          width: PX(opts.maxWidth || 896),
          width_tablet: PX(768),
          width_mobile: PCT(100),
          align_self: 'center',
          custom_css: 'selector { margin-left:auto !important; margin-right:auto !important; }',
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(opts.gap || 16)
        },
        [
          heading(headingHtml, {
            tag: 'h2',
            align: 'center',
            size: opts.size || 48,
            sizeTablet: opts.sizeTablet || 48,
            sizeMobile: opts.sizeMobile || 30,
            leading: 1.25,
            tracking: -0.025
          }),
          para(descHtml, {
            align: 'center',
            size: 18,
            sizeMobile: 16,
            custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
          }),
          footerHtml
            ? heading(footerHtml, {
                tag: 'span',
                align: 'center',
                color: COLORS.orange,
                size: 18,
                weight: '700',
                custom_css: 'selector { padding-top:8px; }'
              })
            : null
        ].filter(Boolean)
      )
    ]
  });
}

// ------------------------------------------------------------------
// 3. Serviced Office Details gallery (4 images)
// ------------------------------------------------------------------
function buildGalleryBlock(titleHtml, images, opts = {}) {
  return interactiveGallerySection({
    id: opts.id,
    titleHtml,
    images,
    mb: 144,
    mbMobile: 112
  });
}

// ------------------------------------------------------------------
// 4. PRODUCTS "Choose The Space Your Team Needs." — 4 cards p-7
// ------------------------------------------------------------------
function buildProducts() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 32,   // space-y-8
    center: true,
    id: 'serviced-products',
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
          flex_gap: GAP(8),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          heading('PRODUCTS', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          heading('Pilih Ruang Sesuai Kebutuhan Tim Anda.', {
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
      // grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          flex_gap: GAP(24)
        },
        SERVICED_SIZES.map((item) =>
          createContainer(
            {
              width: GRID(4, 24),
              width_tablet: GRID(2, 24),
              width_mobile: PCT(100),
              flex_direction: 'column',
              align_items: 'center',
              text_align: 'center',
              flex_gap: GAP(8),   // space-y-2
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(12),
              padding: PAD(28, 28, 28, 28, true),   // p-7
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // text-lg font-medium font-heading
              heading(item.title, {
                tag: 'h3',
                align: 'center',
                size: 18,
                weight: '500',
                leading: 1.375
              }),
              // text-xs text-slate-500
              para(`<p style="text-align:center;margin:0;">${item.capacity}</p>`, {
                align: 'center',
                size: 12,
                sizeMobile: 12,
                color: '#64748B'
              })
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 5. INCLUDED cream card "Everything Is Ready." — 9 amenities
// ------------------------------------------------------------------
function buildIncluded() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    children: [
      // bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 border space-y-8
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
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
              flex_gap: GAP(8),
              custom_css: 'selector { margin-left:auto; margin-right:auto; }'
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
              heading('Semuanya Sudah Siap.', {
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
          // grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto
          createContainer(
            {
              content_width: 'full',
              width: PX(896),
              width_mobile: PCT(100),
              flex_direction: 'row',
              flex_wrap: 'wrap',
              justify_content: 'space-between',
              align_items: 'stretch',
              flex_gap: GAP(24),
              custom_css: 'selector { margin-left:auto; margin-right:auto; }'
            },
            AMENITIES.map((item) =>
              createContainer(
                {
                  // grid-cols-1 md:grid-cols-3 gap-6  -> tablet (768+) is still 3 cols
                  width: GRID(3, 24),
                  width_tablet: GRID(3, 24),
                  width_mobile: PCT(100),
                  flex_direction: 'row',
                  align_items: 'center',
                  flex_gap: GAP(12),   // gap-3
                  background_background: 'classic',
                  background_color: '#FFFFFF',
                  border_radius: RAD(12),
                  padding: PAD(16, 16, 16, 16, true),   // p-4
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
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 7. Dark card "Look Established From Day One."
// ------------------------------------------------------------------
function buildDarkCard() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      // bg-slate-900 rounded-2xl sm:rounded-[40px] p-8 sm:p-14 border-slate-800 space-y-4
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
          ...BORDER(1, '#1E293B')
        },
        [
          heading('Terlihat Mapan Sejak Hari Pertama.', {
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
            '<p>Bahkan perusahaan berdua orang dapat menerima klien di lingkungan bisnis yang profesional.</p>',
            {
              align: 'center',
              color: '#CBD5E1',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:576px; margin-left:auto; margin-right:auto; }'
            }
          ),
          heading('Tim kecil. Citra serius.', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 16,
            weight: '700'
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 8. PERFECT FOR "Use Cases" — 8 pills
// ------------------------------------------------------------------
function buildUseCases() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 24,   // space-y-6
    center: true,
    id: 'serviced-use-cases',
    children: [
      // space-y-2
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(8)
        },
        [
          heading('PERFECT FOR', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          heading('Use Cases', {
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
      // grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 max-w-4xl mx-auto
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_mobile: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          flex_gap: GAP(14),
          flex_gap_mobile: GAP(12),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        USE_CASES.map((uc) =>
          createContainer(
            {
              width: GRID(4, 14),
              width_tablet: GRID(4, 14),
              width_mobile: GRID(2, 12),
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(9999),
              padding: PAD(12, 16, 12, 16, true),   // py-3 px-4
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              heading(uc, {
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
// 9. FindSpaceSection.jsx  (initialSpace="Serviced Office")
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
              background_image: { url: '/SPACES/SERVICED OFFICE/1.webp' },
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
                  heading('KANTOR SIAP PAKAI', {
                    tag: 'span',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 10,
                    weight: '800',
                    tracking: 0.05,
                    transform: 'uppercase',
                    custom_css: 'selector .elementor-heading-title { display:inline-block; background:#EA8E18; padding:4px 12px; border-radius:6px; }'
                  }),
                  heading('Beri Tahu Kami Kebutuhan Tim Anda.', {
                    tag: 'h2',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 30,
                    sizeMobile: 24,
                    weight: '500',
                    leading: 1.25
                  }),
                  para(
                    '<p>Kami akan membantu Anda memilih suite yang tepat berdasarkan jumlah tim dan waktu mulai Anda.</p>',
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
                    form_name: 'HQuarters Serviced Office',
                    form_fields: [
                      { _id: 'space_type', field_type: 'hidden', field_value: SPACE },
                      { _id: 'name', field_type: 'text', field_label: 'Full Name *', placeholder: 'John Doe', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'whatsapp', field_type: 'tel', field_label: 'WhatsApp *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'company', field_type: 'text', field_label: 'Company Name (Optional)', placeholder: 'mis. PT Enterprise Nusantara', required: 'false', width: '100' },
                      { _id: 'notes', field_type: 'textarea', field_label: 'Additional Requirements (Optional)', placeholder: 'Permintaan khusus, waktu, atau pertanyaan...', rows: 3, required: 'false', width: '100' }
                    ],
                    button_text: 'Jadwalkan Tur Kantor',
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
                    redirect_to: `https://wa.me/${WA_NUMBER}?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*Serviced%20Office*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
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
// 10. Dark closing CTA WITH BUTTON  (space-y-6)
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
          // text-3xl sm:text-5xl
          heading('Tim Anda Bisa <br><span style="color:#EA8E18;">Bekerja di Sini Besok.</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 48,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          // pt-2 sm:pt-4 button wrapper
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
              // px-9 py-4 rounded-full font-semibold shadow-lg shadow-[#EA8E18]/25
              button('Pesan Tur &nbsp;&rarr;', '/find-space', {
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
console.log('Generating page-space-serviced-office-id.json ...');
exportElementorTemplate('HQuarters - Space Serviced Office', [
  buildHero(),
  buildStatement(
    'Lewati Tahap Persiapan. <br><span style="color:#EA8E18;">Langsung Jalankan Bisnis.</span>',
    '<p>Membangun kantor berarti kontraktor, perabot, internet, utilitas, pemeliharaan, resepsionis, fasilitas rapat. Di HQuarters Serviced Office, semuanya sudah ditangani.</p>',
    'Anda fokus pada bisnis. Kami urus kantornya.'
  ),
  buildGalleryBlock('Serviced Office <span style="color:#EA8E18;">Details</span>', GALLERY, { id: 'serviced-details' }),
  buildProducts(),
  buildIncluded(),
  buildStatement(
    'Fleksibel Saat Bisnis Anda Membutuhkannya.',
    '<p>Tim bertambah? Proyek selesai? Membuka kantor sementara? Membuka perwakilan di Bandung? Serviced office membuat ruang kerja Anda berubah secepat bisnis Anda.</p>',
    null,
    { maxWidth: 768 }
  ),
  buildDarkCard(),
  buildUseCases(),
  buildFindSpace(),
  buildClosingCTA()
], 'page-space-serviced-office-id.json');
console.log('Done.');
