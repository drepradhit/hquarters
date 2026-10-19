// Generates page-space-soho-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/SpaceSohoDuplexPage.jsx
//   src/components/FindSpaceSection.jsx   (initialSpace="SOHO")
//
// React section order (SpaceSohoDuplexPage.jsx):
//   185  <main class="pt-24 sm:pt-28 pb-0 space-y-28 sm:space-y-36">
//   188  1.  breadcrumb + LIGHT hero card (bg-[#FAF8F5], rounded-2xl sm:rounded-[44px])
//   262  2.  statement   "Life Changes. Business Changes. / Your Space Should Change Too."  max-w-4xl
//   276  3.  SOHO Details gallery — 3 images                                                space-y-6
//   415  4.  SIGNATURE "One SOHO. Different Lives." — 4 cards p-7                           space-y-8
//   443  5.  Facilities gallery — 4 images                                                   space-y-6
//   521  6.  callout "Start Small. Look Professional."                                      max-w-4xl
//   538  7.  two-col "Not Just A Home Address." + "Why Pay For Two Places?" card
//   586  8.  dark card "Why Keep Renting Your Space?"                                       bg-slate-900
//   598  9.  COMPARE table "Apartment? Office? SOHO?"                                       space-y-6
//   666 10.  WHO IT'S FOR pills                                                             space-y-6
//   689 11.  FindSpaceSection
//   692 12.  dark closing CTA  (!mt-14 sm:!mt-20)
//
// Vertical rhythm: space-y-28 (112) mobile, sm:space-y-36 (144) tablet+desktop.
//
// The comparison table is rendered with an HTML widget: Elementor has no table
// widget, and the React table needs colgroup-level control to stay faithful.
//
// Product names stay in English. Everything else is Indonesian.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button, interactiveGallerySection,
  COLORS
} from './lib/elementor.js';

const WA_NUMBER = '628111908319';
const SPACE = 'SOHO';

// SpaceSohoDuplexPage.jsx:50-69  (3 images)
const GALLERY = [
  { src: '/SPACES/SOHO/SOHO 01.webp', title: 'Tampak Mezzanine SOHO' },
  { src: '/SPACES/SOHO/SOHO 02.webp', title: 'Ruang Kerja Utama' },
  { src: '/SPACES/SOHO/SOHO 08.webp', title: 'Area Tinggal Privat' }
];

// SpaceSohoDuplexPage.jsx:27-48  (4 images)
const FACILITIES = [
  { src: '/BUILDING/gym 01.webp', title: 'Pusat Kebugaran Modern' },
  { src: '/BUILDING/gym 5_4.webp', title: 'Studio Latihan & Kondisi' },
  { src: '/BUILDING/sauna 5_4.webp', title: 'Ruang Relaksasi & Sauna' },
  { src: '/BUILDING/kolam renang 5_4.webp', title: 'Kolam Renang & Area Santai' }
];

// SpaceSohoDuplexPage.jsx:151-156
const SOHO_LIVES = [
  { title: 'STARTUP MODE', desc: 'Ruang kerja, sudut rapat, pantry — untuk tim kecil.' },
  { title: 'HOME OFFICE MODE', desc: 'Ruang kerja profesional di depan, area tinggal privat di belakang.' },
  { title: 'PROFESSIONAL MODE', desc: 'Resepsionis, ruang rapat, kantor privat.' },
  { title: 'LIVING MODE', desc: 'Berubah menjadi lingkungan tinggal privat sesuai kebutuhan.*' }
];

// SpaceSohoDuplexPage.jsx:158-168
const TARGET_PILLS = [
  'Pendiri Startup',
  'Wirausaha',
  'Konsultan',
  'Desainer',
  'Arsitek',
  'Pengacara',
  'Profesional Keuangan',
  'Agensi Digital',
  'Bisnis Keluarga'
];

// SpaceSohoDuplexPage.jsx:170-179
// '?' = check icon, '—' = dash, else literal text
const COMPARISON_ROWS = [
  { feature: 'Tinggal', apt: '?', office: '—', soho: '?' },
  { feature: 'Ruang Kerja Profesional', apt: 'Terbatas', office: '?', soho: '?' },
  { feature: 'Lingkungan Bisnis', apt: '—', office: '?', soho: '?' },
  { feature: 'Alamat Bisnis*', apt: 'Terbatas', office: '?', soho: '?' },
  { feature: 'Fasilitas Gaya Hidup', apt: '?', office: 'Terbatas', soho: '?' },
  { feature: 'Akses 24/7 & Fleksibilitas', apt: '?', office: '—', soho: '?' },
  { feature: 'Kepemilikan', apt: '?', office: 'Bervariasi', soho: '?' },
  { feature: 'Kerja + Tinggal', apt: 'Terbatas', office: '—', soho: '?' }
];

// ------------------------------------------------------------------
// 1. Breadcrumb + LIGHT hero card
// ------------------------------------------------------------------
function buildHero() {
  return section({
    pt: 112, ptMobile: 96,   // main pt-24 sm:pt-28 only (section has no vertical padding)
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
          '<span style="color:#0F172A;font-weight:700;">SOHO</span>'
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
      //                 grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch
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
          // LEFT lg:col-span-6 -> 6/12 with lg:gap-8 (32) = 50% - 16px, space-y-6
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
              heading('SOHO', {
                tag: 'span',
                align: 'left',
                color: COLORS.orange,
                size: 18,
                weight: '700',
                tracking: 0.05,
                transform: 'uppercase'
              }),
              // h1 text-4xl sm:text-5xl lg:text-6xl leading-[1.12]
              heading('Kerja? Tinggal? <br><span style="color:#EA8E18;">Kenapa Harus Pilih?</span>', {
                tag: 'h1',
                align: 'left',
                size: 60,
                sizeTablet: 48,
                sizeMobile: 36,
                leading: 1.12,
                tracking: -0.025
              }),
              // p text-base sm:text-lg font-semibold text-slate-900 font-heading
              heading('Kerja. Tinggal. Miliki. &mdash; #FleksibelAja', {
                tag: 'p',
                align: 'left',
                size: 18,
                sizeMobile: 16,
                weight: '600',
                leading: 1.625
              }),
              // p text-slate-600 text-base sm:text-lg max-w-xl
              para(
                '<p>Satu ruang yang mengikuti hidup dan bisnis Anda.</p>',
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
                  button('Lihat Ketersediaan SOHO &nbsp;&rarr;', '/find-space', {
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
                  background_image: { url: '/SPACES/SOHO/SOHO 01.webp' },
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
// 2. Statement
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
// Gallery block (3. SOHO Details / 5. Facilities)
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
// 4. SIGNATURE "One SOHO. Different Lives." — 4 cards
// ------------------------------------------------------------------
function buildSignature() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 32,   // space-y-8
    center: true,
    id: 'soho-signature',
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
          heading('SIGNATURE', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          heading('Satu SOHO. Berbagai Cara Hidup.', {
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
        SOHO_LIVES.map((item) =>
          createContainer(
            {
              width: GRID(4, 24),
              width_tablet: GRID(2, 24),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(12),   // space-y-3
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(12),
              padding: PAD(28, 28, 28, 28, true),   // p-7
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              heading(item.title, {
                tag: 'span',
                align: 'left',
                color: COLORS.orange,
                size: 12,
                weight: '700',
                tracking: 0.1,
                transform: 'uppercase'
              }),
              para(`<p>${item.desc}</p>`, { size: 14, sizeMobile: 14, color: '#475569' })
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 6. Callout "Start Small. Look Professional."
// ------------------------------------------------------------------
function buildCallout() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      // bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 text-center
      // border max-w-4xl space-y-4
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_mobile: PCT(100),
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
          heading('Mulai Kecil. Tetap Terlihat Profesional.', {
            tag: 'h2',
            align: 'center',
            size: 36,
            sizeTablet: 36,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          para(
            '<p>Perusahaan Anda mungkin baru memulai. Bukan berarti harus terlihat kecil. Temui klien di lingkungan bisnis yang representatif dan bangun citra bisnis Anda sejak hari pertama.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          ),
          // font-bold text-slate-900 text-base font-heading
          heading('Perusahaan besar juga memulai dari kecil.', {
            tag: 'span',
            align: 'center',
            color: COLORS.heading,
            size: 16,
            weight: '700'
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 7. Two column: "Not Just A Home Address." + "Why Pay For Two Places?"
// ------------------------------------------------------------------
function buildDomicileBlock() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          align_items: 'center',
          flex_gap: GAP(32)
        },
        [
          // LEFT lg:col-span-6 -> 50% - 16px (gap-8 = 32), space-y-4
          createContainer(
            {
              width: CUSTOM('calc(50% - 16px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(16)
            },
            [
              heading('Bukan Sekadar Alamat Tinggal. <br><span style="color:#EA8E18;">Ini Bisa Menjadi Alamat Bisnis Anda.</span>', {
                tag: 'h2',
                align: 'left',
                size: 36,
                sizeTablet: 36,
                sizeMobile: 30,
                leading: 1.25,
                tracking: -0.025
              }),
              para(
                '<p>Satu hal yang membedakan SOHO dari apartemen biasa: unitnya dapat digunakan sebagai alamat bisnis, ruang kerja, home office, dan basis privat, sesuai ketentuan yang berlaku.</p>',
                { size: 16, sizeMobile: 16 }
              ),
              // inline-flex font-bold text-[#EA8E18] text-base pt-1
              heading('<a href="#find-space" style="color:#EA8E18;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">Tanyakan Alamat Bisnis<span aria-hidden="true">&rarr;</span></a>', {
                tag: 'span',
                align: 'left',
                color: COLORS.orange,
                size: 16,
                weight: '700',
                custom_css: 'selector { padding-top:4px; }'
              })
            ]
          ),

          // RIGHT lg:col-span-6 -> 50% - 16px, bg-[#FAF8F5] p-8 sm:p-10 rounded-2xl
          // space-y-5 text-center shadow-sm
          createContainer(
            {
              width: CUSTOM('calc(50% - 16px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              align_items: 'center',
              text_align: 'center',
              flex_gap: GAP(20),
              background_background: 'classic',
              background_color: COLORS.surfaceCream,
              border_radius: RAD(16),
              padding: PAD(40, 40, 40, 40, true),
              padding_mobile: PAD(32, 32, 32, 32, true),
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // text-2xl sm:text-3xl
              heading('Kenapa Harus Bayar Dua Tempat?', {
                tag: 'h3',
                align: 'center',
                size: 30,
                sizeMobile: 24,
                leading: 1.25,
                tracking: -0.025
              }),
              // p text-sm sm:text-base max-w-lg
              para(
                '<p>Kantor (sewa, utilitas, perjalanan) + Rumah (sewa/cicilan, utilitas, perjalanan)</p>',
                {
                  align: 'center',
                  size: 16,
                  sizeMobile: 14,
                  custom_css: 'selector .elementor-widget-container { max-width:512px; margin-left:auto; margin-right:auto; }'
                }
              ),
              // ArrowDown animate-bounce
              createWidget('icon', {
                selected_icon: { value: 'fas fa-arrow-down', library: 'fa-solid' },
                primary_color: COLORS.orange,
                size: PX(20),
                align: 'center',
                custom_css: 'selector .elementor-icon { animation: hqBounce 1s infinite; }\n@keyframes hqBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(25%)} }'
              }),
              // space-y-1
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'column',
                  align_items: 'center',
                  flex_gap: GAP(4)
                },
                [
                  heading('HQuarters SOHO &mdash; Kerja + Tinggal', {
                    tag: 'h4',
                    align: 'center',
                    size: 30,
                    sizeMobile: 24,
                    leading: 1.25,
                    tracking: -0.025
                  }),
                  para('<p>Satu ruang. Satu lokasi. Satu aset. #FleksibelAja</p>', {
                    align: 'center',
                    size: 16,
                    sizeMobile: 14
                  })
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
// 8. Dark card "Why Keep Renting Your Space?"
// ------------------------------------------------------------------
function buildDarkCard() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    center: true,
    children: [
      // bg-slate-900 text-white rounded-2xl sm:rounded-[40px] p-8 sm:p-14
      // text-center border-slate-800 space-y-4
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
          // text-3xl sm:text-4xl text-white
          heading('Kenapa Terus Menyewa Ruang Anda?', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 36,
            sizeTablet: 36,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          // p text-slate-300 text-base sm:text-lg max-w-xl
          para(
            '<p>HQuarters SOHO memberi Anda kesempatan untuk memiliki ruang yang bekerja untuk hidup dan bisnis Anda.</p>',
            {
              align: 'center',
              color: '#CBD5E1',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:576px; margin-left:auto; margin-right:auto; }'
            }
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 9. COMPARE table — rendered as HTML for exact fidelity
// ------------------------------------------------------------------
function buildComparison() {
  const cell = (value, isSoho) => {
    if (value === '?') {
      const color = isSoho ? '#EA8E18' : '#334155';
      return `<td style="padding:12px 16px;text-align:center;${isSoho ? 'background:rgba(254,243,226,0.3);' : ''}"><span style="color:${color};font-weight:700;">&#10003;</span></td>`;
    }
    if (value === '&mdash;' || value === '—') {
      return `<td style="padding:12px 16px;text-align:center;${isSoho ? 'background:rgba(254,243,226,0.3);' : ''}"><span style="color:#94A3B8;font-weight:400;">&mdash;</span></td>`;
    }
    const color = isSoho ? '#EA8E18' : '#475569';
    const weight = isSoho ? '700' : '400';
    return `<td style="padding:12px 16px;text-align:center;color:${color};font-weight:${weight};${isSoho ? 'background:rgba(254,243,226,0.3);' : ''}">${value}</td>`;
  };

  const rows = COMPARISON_ROWS.map((r) => `
      <tr style="border-top:1px solid #F1F5F9;">
        <td style="padding:12px 16px;color:#0F172A;font-weight:400;">${r.feature}</td>
        ${cell(r.apt, false)}
        ${cell(r.office, false)}
        ${cell(r.soho, true)}
      </tr>`).join('');

  const tableHtml = `<div style="overflow-x:auto;">
  <table style="width:100%;min-width:550px;border-collapse:collapse;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:500;">
    <thead>
      <tr style="background:#FAF8F5;border-bottom:1px solid rgba(226,232,240,0.8);font-size:14px;font-weight:700;color:#1E293B;">
        <th style="padding:14px 20px;font-weight:400;"></th>
        <th style="padding:14px 20px;text-align:center;font-weight:700;color:#1E293B;">Apartment</th>
        <th style="padding:14px 20px;text-align:center;font-weight:700;color:#1E293B;">Conventional Office</th>
        <th style="padding:14px 20px;text-align:center;font-weight:700;color:#EA8E18;background:rgba(254,243,226,0.4);">HQuarters SOHO</th>
      </tr>
    </thead>
    <tbody>${rows}
    </tbody>
  </table>
</div>
<div style="padding:16px 24px;background:#FAF8F5;text-align:center;border-top:1px solid rgba(226,232,240,0.8);font-weight:700;color:#0F172A;font-size:16px;font-family:Outfit,sans-serif;">
  Kenapa harus memaksa hidup Anda masuk ke satu kategori?
</div>`;

  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 24,   // space-y-6
    center: true,
    id: 'soho-compare',
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
          heading('COMPARE', {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          heading('Apartment? Office? SOHO?', {
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
      // bg-white rounded-xl border shadow-md overflow-hidden
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          background_background: 'classic',
          background_color: '#FFFFFF',
          border_radius: RAD(12),
          overflow: 'hidden',
          ...BORDER(1, COLORS.borderSoft),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,0.1)' }
        },
        [
          createWidget('html', { html: tableHtml })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 10. WHO IT'S FOR pills
// ------------------------------------------------------------------
function buildTargetPills() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 144, mbMobile: 112,
    gap: 24,   // space-y-6
    center: true,
    id: 'soho-who-its-for',
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
          heading("WHO IT'S FOR", {
            tag: 'span',
            align: 'center',
            color: COLORS.orange,
            size: 12,
            weight: '700',
            tracking: 0.1,
            transform: 'uppercase'
          }),
          heading('Dibuat untuk Mereka yang Sedang Membangun Sesuatu.', {
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
        TARGET_PILLS.map((pill) =>
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
              padding: PAD(12, 28, 12, 28, true),
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
                leading: 1.625
              })
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 11. FindSpaceSection.jsx  (initialSpace="SOHO")
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
          // LEFT lg:w-2/5, bg-slate-900, justify-end, p-6 sm:p-10
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
              background_image: { url: '/SPACES/SOHO/SOHO 01.webp' },
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
                  heading('TEMUKAN SOHO ANDA', {
                    tag: 'span',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 10,
                    weight: '800',
                    tracking: 0.05,
                    transform: 'uppercase',
                    custom_css: 'selector .elementor-heading-title { display:inline-block; background:#EA8E18; padding:4px 12px; border-radius:6px; }'
                  }),
                  heading('Beri Tahu Kami Kebutuhan Anda.', {
                    tag: 'h2',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 30,
                    sizeMobile: 24,
                    weight: '500',
                    leading: 1.25
                  }),
                  para(
                    '<p>Kami akan membantu Anda memilih unit SOHO yang sesuai untuk tinggal, bekerja, atau keduanya.</p>',
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
                    form_name: 'HQuarters SOHO',
                    form_fields: [
                      { _id: 'space_type', field_type: 'hidden', field_value: SPACE },
                      { _id: 'name', field_type: 'text', field_label: 'Full Name *', placeholder: 'John Doe', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'whatsapp', field_type: 'tel', field_label: 'WhatsApp *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'company', field_type: 'text', field_label: 'Company Name (Optional)', placeholder: 'mis. PT Enterprise Nusantara', required: 'false', width: '100' },
                      { _id: 'notes', field_type: 'textarea', field_label: 'Additional Requirements (Optional)', placeholder: 'Permintaan khusus, waktu, atau pertanyaan...', rows: 3, required: 'false', width: '100' }
                    ],
                    button_text: 'Cari Unit SOHO Saya',
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
                    redirect_to: `https://wa.me/${WA_NUMBER}?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*SOHO*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
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
// 12. Dark closing CTA  (!mt-14 sm:!mt-20 pt-16 sm:pt-24 pb-12 sm:pb-16)
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
          heading('Kerja di Sini. Tinggal di Sini. <br><span style="color:#EA8E18;">Miliki di Sini.</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 48,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          para('<p>HQuarters SOHO &mdash; #FleksibelAja</p>', {
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
console.log('Generating page-space-soho-id.json ...');
exportElementorTemplate('HQuarters - Space SOHO Duplex', [
  buildHero(),
  buildStatement(
    'Hidup Berubah. Bisnis Berubah. <br><span style="color:#EA8E18;">Ruang Anda Juga Harus Berubah.</span>',
    '<p>Hari ini kantor startup. Besok home office. Nanti ruang tinggal privat. Atau semuanya sekaligus. Kenapa harus membeli properti yang hanya bisa melakukan satu hal?</p>',
    'Satu Ruang. Banyak Kemungkinan.'
  ),
  buildGalleryBlock('SOHO <span style="color:#EA8E18;">Details</span>', GALLERY, { id: 'soho-details' }),
  buildSignature(),
  buildGalleryBlock('Facilities', FACILITIES, { id: 'soho-facilities' }),
  buildCallout(),
  buildDomicileBlock(),
  buildDarkCard(),
  buildComparison(),
  buildTargetPills(),
  buildFindSpace(),
  buildClosingCTA()
], 'page-space-soho-id.json');
console.log('Done.');
