// Generates page-space-premium-office-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/SpacePremiumOfficePage.jsx
//   src/components/FindSpaceSection.jsx   (initialSpace="Premium Office")
//
// React section order (SpacePremiumOfficePage.jsx):
//   201  <main class="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36">
//   204  1.  breadcrumb + dark hero card
//   282  2.  statement   "Your Company Has Grown. / Your Office Should Too."      max-w-4xl space-y-4
//   293  3.  details gallery "Premium Office Details" + 4 thumbs                  space-y-6
//   432  4.  callout box "Before The Meeting Starts..."                           bg-[#FAF8F5] max-w-4xl
//   448  5.  facilities gallery "Facilities" + 4 thumbs                           space-y-6
//   526  6.  features "WHAT'S INCLUDED" — 6 white cards                           space-y-10
//   560  7.  "SIZED TO YOUR TEAM" — cream card, 4 team sizes                      space-y-10
//   591  8.  statement   "Lease The Space. / Keep Your Capital Working."           max-w-3xl space-y-5
//   604  9.  "YOU'RE IN GOOD COMPANY" cream card                                  max-w-4xl
//   617 10.  FindSpaceSection
//   620 11.  dark closing CTA  (!mt-14 sm:!mt-20)
//
// Vertical rhythm: space-y-28 (112) mobile, sm:space-y-36 (144) tablet+desktop.
// Implemented as margin-bottom on sections 1-9; section 10 has none; section 11
// overrides with !mt-14 (56) / sm:!mt-20 (80).
//
// Product names stay in English. Everything else is Indonesian.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button, interactiveGallerySection,
  COLORS
} from './lib/elementor.js';

const WA_NUMBER = '628111908319';
const SPACE = 'Premium Office';

// Gallery images (SpacePremiumOfficePage.jsx:58-83)
const GALLERY = [
  { src: '/SPACES/PREMIUM OFFICE/Premium Office.webp', title: 'Lantai Korporat Eksekutif' },
  { src: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp', title: 'Ruang Direksi & Rapat' },
  { src: '/SPACES/PREMIUM OFFICE/Premium Office 03.webp', title: 'Kantor Eksekutif Sudut' },
  { src: '/SPACES/PREMIUM OFFICE/Premium Office 04.webp', title: 'Pusat Kolaborasi Tim' }
];

// Facilities gallery (SpacePremiumOfficePage.jsx:25-48)
const FACILITIES = [
  { src: '/BUILDING/gym 01.webp', title: 'Pusat Kebugaran Modern' },
  { src: '/BUILDING/gym 5_4.webp', title: 'Studio Latihan & Kondisi' },
  { src: '/BUILDING/sauna 5_4.webp', title: 'Ruang Relaksasi & Sauna' },
  { src: '/BUILDING/kolam renang 5_4.webp', title: 'Kolam Renang & Area Santai' }
];

// Features (SpacePremiumOfficePage.jsx:164-195)
const FEATURES = [
  { title: 'Citra Profesional', desc: 'Area bersama premium dan lingkungan bisnis yang mencerminkan kredibilitas korporat.', icon: 'fas fa-building' },
  { title: 'Ruang untuk Bertumbuh', desc: 'Pilihan unit dan tata letak untuk organisasi dengan ukuran berbeda.', icon: 'fas fa-users' },
  { title: 'Konektivitas Bisnis', desc: 'Infrastruktur fiber dan dukungan konektivitas untuk bisnis modern.', icon: 'fas fa-wifi' },
  { title: 'Aksesibilitas', desc: 'Berada di pusat aktivitas kota Bandung.', icon: 'fas fa-map-marker-alt' },
  { title: 'Keamanan', desc: 'Keamanan profesional 24 jam dan akses gedung berlapis.', icon: 'fas fa-shield-alt' },
  { title: 'Pengalaman Karyawan', desc: 'Gym, sauna, dan kolam renang air hangat yang meningkatkan kualitas tempat kerja.', icon: 'fas fa-heart' }
];

// Team sizes (SpacePremiumOfficePage.jsx:157-162)
const TEAM_SIZES = [
  { size: '10 — 20 Orang', desc: 'Kantor korporat kompak' },
  { size: '20 — 40 Orang', desc: 'Tata letak kantor fleksibel.' },
  { size: '40 — 80 Orang', desc: 'Solusi kantor gabungan lebih besar.' },
  { size: '80 — 150+ Orang', desc: 'Konfigurasi korporat khusus.' }
];

// ------------------------------------------------------------------
// 1. Breadcrumb + dark hero card
// ------------------------------------------------------------------
function buildHero() {
  return section({
    pt: 112, ptMobile: 96,   // main pt-24 sm:pt-28 (section itself has no vertical padding)
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
          '<span style="color:#0F172A;font-weight:700;">Premium Office</span>'
        ].join(' &nbsp; '),
        header_size: 'span',
        align: 'left',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: PX(14),
        typography_font_size_mobile: PX(12)
      }),

      // dark hero card
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
          background_color: '#0F172A',
          ...BORDER(1, '#1E293B'),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' },
          overflow: 'hidden',
          padding: PAD(56, 56, 56, 56, true),
          padding_tablet: PAD(48, 48, 48, 48, true),
          padding_mobile: PAD(32, 32, 32, 32, true)
        },
        [
          // LEFT lg:col-span-6 -> 6/12 with lg:gap-8 (32) = 50% - 16px
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
              // text-lg font-bold uppercase tracking-wider text-amber-400
              heading('Premium Office', {
                tag: 'span',
                align: 'left',
                color: '#FBBF24',
                size: 18,
                weight: '700',
                tracking: 0.05,
                transform: 'uppercase'
              }),
              // h1 text-4xl sm:text-5xl lg:text-6xl leading-[1.12]
              heading('HQuarters Berikutnya <br><span style="color:#EA8E18;">Sudah Siap.</span>', {
                tag: 'h1',
                align: 'left',
                color: '#FFFFFF',
                size: 60,
                sizeTablet: 48,
                sizeMobile: 36,
                leading: 1.12,
                tracking: -0.025
              }),
              // p text-base sm:text-lg max-w-xl
              para(
                '<p>Ruang kantor premium di CBD Bandung untuk perusahaan yang siap memasuki babak berikutnya.</p>',
                {
                  size: 18,
                  sizeMobile: 16,
                  color: '#CBD5E1',
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
                  button('Cari Kantor Saya &nbsp;&rarr;', '/find-space', {
                    fontSize: 16,
                    fontSizeMobile: 14,
                    weight: '700',
                    radius: 9999,
                    py: 14,
                    px: 32,
                    shadow: { y: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,0.1)' }
                  })
                ]
              ),
              // pt-4 border-t border-slate-800 text-xs text-slate-400
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  align_items: 'center',
                  flex_gap: GAP(12),
                  padding: PAD(16, 0, 0, 0),
                  ...BORDER_SIDE('top', '#1E293B')
                },
                ['Ukuran Kantor Fleksibel', 'Lingkungan Bisnis Premium', 'Siap Fit-Out / Ditempati'].reduce((acc, label, i) => {
                  if (i > 0) {
                    acc.push(heading('&mdash;', { tag: 'span', align: 'left', color: '#64748B', size: 12, sizeMobile: 11 }));
                  }
                  acc.push(heading(label, { tag: 'span', align: 'left', color: '#94A3B8', size: 12, sizeMobile: 11, weight: '500' }));
                  return acc;
                }, [])
              )
            ]
          ),

          // RIGHT lg:col-span-6 -> image card
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
                  background_color: '#1E293B',
                  background_image: { url: '/SPACES/PREMIUM OFFICE/Premium Office.webp' },
                  background_position: 'center bottom',
                  background_size: 'cover',
                  ...BORDER(1, 'rgba(255,255,255,0.15)'),
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' }
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
// 2 & 8. Statement blocks
// ------------------------------------------------------------------
function buildStatement(headingHtml, descHtml, opts = {}) {
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
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// Gallery block (used by 3. details and 5. facilities)
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
// 4. Callout box
// ------------------------------------------------------------------
function buildCallout() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      // bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 max-w-4xl space-y-4
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_mobile: PCT(100),
          align_self: 'center',
          custom_css: 'selector { margin-left:auto !important; margin-right:auto !important; }',
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          background_background: 'classic',
          background_color: COLORS.surfaceCream,
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          padding: PAD(56, 56, 56, 56, true),
          padding_mobile: PAD(32, 32, 32, 32, true),
          ...BORDER(1, COLORS.borderSoft)
        },
        [
          // text-2xl sm:text-4xl tracking-tight
          heading('Sebelum Rapat Dimulai, Kantor Anda Sudah Berbicara.', {
            tag: 'h2',
            align: 'center',
            size: 36,
            sizeTablet: 36,
            sizeMobile: 24,
            leading: 1.25,
            tracking: -0.025
          }),
          para(
            '<p>Lobby yang representatif. Pengalaman kedatangan yang profesional. Lingkungan bisnis yang kredibel &mdash; yang menunjukkan kepada klien dan mitra bahwa mereka berurusan dengan perusahaan yang serius.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          ),
          // pt-2 font-bold text-[#EA8E18] text-lg sm:text-xl
          heading('Pastikan kantor Anda menyampaikan hal yang tepat.', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 20,
            sizeMobile: 18,
            weight: '700',
            custom_css: 'selector { padding-top:8px; }'
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 6. WHAT'S INCLUDED — 6 white cards
// ------------------------------------------------------------------
function buildFeatures() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 40,
    center: true,
    children: [
      // text-center max-w-2xl mx-auto space-y-2
      createContainer(
        {
          content_width: 'full',
          width: PX(672),
          width_mobile: PCT(100),
          align_self: 'center',
          custom_css: 'selector { margin-left:auto !important; margin-right:auto !important; }',
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(8)
        },
        [
          heading("WHAT'S INCLUDED", {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          heading('Semua yang Diperlukan Perusahaan Modern.', {
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
      // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'flex-start',
          align_items: 'stretch',
          flex_gap: GAP(24)
        },
        FEATURES.map((f) =>
          createContainer(
            {
              width: GRID(3, 24),
              width_tablet: GRID(2, 24),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(16),
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(12),
              padding: PAD(32, 32, 32, 32, true),
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // w-12 h-12 rounded-xl bg-[#FEF3E2] text-[#B86807]
              createContainer(
                {
                  width: PX(48),
                  min_height: PX(48),
                  flex_direction: 'row',
                  justify_content: 'center',
                  align_items: 'center',
                  border_radius: RAD(12),
                  background_background: 'classic',
                  background_color: COLORS.orangeTint
                },
                [
                  createWidget('icon', {
                    selected_icon: { value: f.icon, library: 'fa-solid' },
                    primary_color: COLORS.orangeIcon,
                    size: PX(24)
                  })
                ]
              ),
              // text-xl font-medium font-heading
              heading(f.title, { tag: 'h3', align: 'left', size: 20, weight: '500', leading: 1.375 }),
              // text-sm text-slate-600 leading-relaxed
              para(`<p>${f.desc}</p>`, { size: 14, sizeMobile: 14, color: '#475569' })
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 7. SIZED TO YOUR TEAM — cream card
// ------------------------------------------------------------------
function buildTeamSizes() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    children: [
      // bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 space-y-8
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(32),
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
              align_self: 'center',
              custom_css: 'selector { margin-left:auto !important; margin-right:auto !important; }',
              flex_direction: 'column',
              align_items: 'center',
              text_align: 'center',
              flex_gap: GAP(8)
            },
            [
              heading('SESUAI UKURAN TIM ANDA', {
                tag: 'span',
                align: 'center',
                color: COLORS.orange,
                size: 12,
                weight: '700',
                tracking: 0.1,
                transform: 'uppercase'
              }),
              heading('Seberapa Besar Tim Anda?', {
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
          // grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6
          createContainer(
            {
              content_width: 'full',
              width: PCT(100),
              flex_direction: 'row',
              flex_wrap: 'wrap',
              justify_content: 'space-between',
              align_items: 'stretch',
              flex_gap: GAP(24),
              flex_gap_mobile: GAP(16)
            },
            TEAM_SIZES.map((t) =>
              createContainer(
                {
                  width: GRID(4, 24),
                  width_tablet: GRID(2, 24),
                  width_mobile: PCT(100),
                  flex_direction: 'column',
                  align_items: 'center',
                  text_align: 'center',
                  flex_gap: GAP(6),
                  background_background: 'classic',
                  background_color: '#FFFFFF',
                  border_radius: RAD(16),
                  padding: PAD(24, 16, 24, 16, true),
                  padding_mobile: PAD(20, 16, 20, 16, true),
                  ...BORDER(1, COLORS.borderSoft),
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
                },
                [
                  // text-xl sm:text-2xl font-medium font-heading
                  heading(t.size, {
                    tag: 'h3',
                    align: 'center',
                    size: 24,
                    sizeMobile: 20,
                    weight: '500',
                    leading: 1.375
                  }),
                  // text-xs text-slate-500
                  para(`<p style="text-align:center;margin:0;">${t.desc}</p>`, {
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
      )
    ]
  });
}

// ------------------------------------------------------------------
// 9. YOU'RE IN GOOD COMPANY card
// ------------------------------------------------------------------
function buildGoodCompany() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      // bg-[#FAF8F5] rounded-xl sm:rounded-2xl py-10 sm:py-14 px-6 sm:px-12 max-w-4xl space-y-3
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(12),
          background_background: 'classic',
          background_color: COLORS.surfaceCream,
          border_radius: RAD(16),
          border_radius_mobile: RAD(12),
          padding: PAD(56, 48, 56, 48, true),
          padding_mobile: PAD(40, 24, 40, 24, true),
          ...BORDER(1, COLORS.borderSoft),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
        },
        [
          heading("ANDA DI PERUSAHAAN YANG TEPAT", {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 14,
            sizeMobile: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          // text-xl sm:text-2xl lg:text-3xl leading-snug
          heading('Bergabung dengan komunitas perusahaan terhormat <br>yang beroperasi dari HQuarters.', {
            tag: 'p',
            align: 'center',
            size: 30,
            sizeTablet: 24,
            sizeMobile: 20,
            weight: '500',
            leading: 1.375
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 10. FindSpaceSection.jsx
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
          // LEFT lg:w-2/5, bg-slate-900, p-6 sm:p-10, justify-end
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
              background_image: { url: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp' },
              background_position: 'center center',
              background_size: 'cover',
              background_overlay_background: 'classic',
              background_overlay_color: 'rgba(15,23,42,0.6)',
              padding: PAD(40, 40, 40, 40, true),
              padding_mobile: PAD(24, 24, 24, 24, true)
            },
            [
              // bg-[#161a25]/95 rounded-2xl p-6 sm:p-8 border-white/10 space-y-3
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
                  heading('TEMUKAN KANTOR BERIKUTNYA', {
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
                    '<p>Kami akan mencocokkan Anda dengan unit yang tersedia berdasarkan luas, lantai, dan waktu kepindahan &mdash; beserta proposal sewa yang disesuaikan.</p>',
                    { size: 14, color: '#CBD5E1' }
                  )
                ]
              )
            ]
          ),

          // RIGHT lg:w-3/5, p-6 sm:p-10 lg:p-12
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
              // 1. Select Space Type
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
                  // grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2
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

              // 2. Complete Your Details
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
                    form_name: 'HQuarters Premium Office',
                    form_fields: [
                      { _id: 'space_type', field_type: 'hidden', field_value: SPACE },
                      { _id: 'name', field_type: 'text', field_label: 'Full Name *', placeholder: 'John Doe', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'whatsapp', field_type: 'tel', field_label: 'WhatsApp *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'company', field_type: 'text', field_label: 'Company Name (Optional)', placeholder: 'mis. PT Enterprise Nusantara', required: 'false', width: '100' },
                      { _id: 'notes', field_type: 'textarea', field_label: 'Additional Requirements (Optional)', placeholder: 'Permintaan khusus, waktu, atau pertanyaan...', rows: 3, required: 'false', width: '100' }
                    ],
                    button_text: 'Minta Proposal & Denah Lantai',
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
                    redirect_to: `https://wa.me/${WA_NUMBER}?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*Premium%20Office*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
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
// 11. Dark closing CTA  (!mt-14 sm:!mt-20 pt-16 sm:pt-24 pb-12 sm:pb-16)
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
          flex_gap: GAP(16)
        },
        [
          // text-3xl sm:text-5xl
          heading('Babak Berikutnya Anda Layak Mendapatkan <br><span style="color:#EA8E18;">Alamat yang Tepat.</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 48,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          para('<p>HQuarters Premium Office &mdash; Asia Afrika, Bandung</p>', {
            align: 'center',
            color: '#94A3B8',
            size: 18,
            sizeMobile: 16,
            custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
console.log('Generating page-space-premium-office-id.json ...');
exportElementorTemplate('HQuarters - Space Premium Office', [
  buildHero(),
  buildStatement(
    'Perusahaan Anda Sudah Bertumbuh. <br><span style="color:#EA8E18;">Kantornya Harus Ikut Bertumbuh.</span>',
    '<p>Setiap perusahaan mencapai titik ketika kantor lama tidak lagi mencerminkan bisnis yang telah menjadi dirinya. Tim bertumbuh. Klien bertumbuh. Ekspektasi meningkat. Kantor menjadi bagian dari identitas korporat Anda.</p>',
    { maxWidth: 896, gap: 16 }
  ),
  buildGalleryBlock('Premium Office <span style="color:#EA8E18;">Details</span>', GALLERY, { id: 'premium-office-details' }),
  buildCallout(),
  buildGalleryBlock('Facilities', FACILITIES, { id: 'premium-office-facilities' }),
  buildFeatures(),
  buildTeamSizes(),
  buildStatement(
    'Sewa Ruangnya. <br><span style="color:#EA8E18;">Jaga Modal Tetap Bekerja.</span>',
    "<p>Membeli kantor korporat tidak selalu menjadi penggunaan modal terbaik. Sewa di HQuarters dan fokuskan sumber daya Anda pada hal yang memberi dampak terbesar: orang, produk, dan bisnis Anda.</p>",
    { maxWidth: 768, gap: 20 }
  ),
  buildGoodCompany(),
  buildFindSpace(),
  buildClosingCTA()
], 'page-space-premium-office-id.json');
console.log('Done.');
