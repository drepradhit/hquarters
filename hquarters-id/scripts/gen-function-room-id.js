// Generates page-space-function-room-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/EventFunctionRoomPage.jsx   (1180 lines)
//
// React section order (EventFunctionRoomPage.jsx):
//   364  <main class="pt-24 sm:pt-28 pb-0 space-y-20 sm:space-y-28">
//   369  1.  LIGHT hero card (bg-[#FAF8F5] rounded-2xl sm:rounded-[44px]) + 2 buttons
//   428  2.  ROOM DETAILS "Built To Adapt To Your Event." — 4 cards p-7
//   471  3.  Function Room Details gallery
//   554  4.  ROOM SPECIFICATIONS "Room 1 & Room 2." — 8-col table (HTML widget)
//   623  5.  SEATING LAYOUTS "Find The Right Setup." — 5 cards with inline SVG
//   721  6.  MEETING PACKAGES "Pricing Per Package." — 4 price cards + footnotes
//   803  7.  INCLUDED "Everything You Need To Host." — 9 amenity chips + intro
//   844  8.  dark[#161a25] "Perfect For Any Occasion." — 6 pills
//   869  9.  BOOK THE ROOM — dark panel + form (py-12 sm:py-20 bg-slate-50)
//   1059 10. closing CTA   (pt-20 sm:pt-28 pb-12 sm:pb-16, NO !mt override)
//
// IMPORTANT: vertical rhythm here is space-y-20 (80) mobile / sm:space-y-28 (128),
// NOT the 28/36 used on the other space pages.
//
// Product names stay in English. Everything else is Indonesian.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button, interactiveGallerySection,
  COLORS
} from './lib/elementor.js';

const WA_NUMBER = '628111908319';
const SPACE = 'Function Room';

const BODY_DARK = '#3A3836';

// EventFunctionRoomPage.jsx:71-92
const FACILITIES = [
  { src: '/Function Room/Theatre.webp', title: 'Layout Theatre' },
  { src: '/Function Room/Class Room.webp', title: 'Layout Classroom' },
  { src: '/Function Room/U SHape.webp', title: 'Layout U-Shape' },
  { src: '/Function Room/Ron Table.webp', title: 'Round Table Banquet' }
];

// EventFunctionRoomPage.jsx:95-117
const SLIDES = [
  { src: '/BUILDING/FR 01.webp', title: 'Grand Function Room' },
  { src: '/BUILDING/FR 02.webp', title: 'Executive Function Hall' },
  { src: '/BUILDING/FR 03.webp', title: 'Multi-Purpose Event Space' }
];

// EventFunctionRoomPage.jsx:180-205
const ROOM_DETAILS = [
  { title: 'Kapasitas', desc: 'Hingga 150 tamu, gaya theatre', icon: 'fas fa-users' },
  { title: 'Tata Letak', desc: 'Theatre, classroom, banquet, cocktail', icon: 'fas fa-th-large' },
  { title: 'Ruang Dapat Dibagi', desc: 'Dipisah menjadi ruang lebih kecil sesuai kebutuhan', icon: 'fas fa-layer-group' },
  { title: 'Cahaya Alami', desc: 'Jendela lantai-ke-plafon, tirai blackout', icon: 'fas fa-sun' }
];

// EventFunctionRoomPage.jsx:208-249  (ids kept exactly; the cards render only
// title + desc in React — r1Capacity/r2Capacity are unused there, so omitted here)
const SEATING_LAYOUTS = [
  { id: 'theatre', title: 'Theatre', desc: 'Baris kursi menghadap ke depan — terbaik untuk presentasi.' },
  { id: 'classroom', title: 'Classroom', desc: 'Baris meja dan kursi — terbaik untuk pelatihan dan mencatat.' },
  { id: 'reception', title: 'Reception', desc: 'Ruang berdiri terbuka — terbaik untuk bersosialisasi dan acara cocktail.' },
  { id: 'u-shape', title: 'U-Shape', desc: 'Meja ditata membentuk U — terbaik untuk rapat diskusi.' },
  { id: 'round-table', title: 'Round Table', desc: 'Tamu duduk di meja bundar — terbaik untuk jamuan dan makan malam.' }
];

// EventFunctionRoomPage.jsx:252-301
const PACKAGES = [
  { name: 'Fullboard', price: 'Rp 550,000', unit: '/ pax', inclusions: '3× Coffee Break, 1× Lunch', duration: '*Maks 12 jam' },
  { name: 'Full Day', price: 'Rp 450,000', unit: '/ pax', inclusions: '2× Coffee Break, 1× Lunch atau Dinner', duration: '*Maks 8 jam' },
  { name: 'Half Day', price: 'Rp 350,000', unit: '/ pax', inclusions: '1× Coffee Break, 1× Lunch atau Dinner', duration: '*Maks 6 jam' },
  { name: 'Lunch / Dinner', price: 'Rp 200,000', unit: '/ pax', inclusions: '1× Lunch atau Dinner', duration: '' }
];

// EventFunctionRoomPage.jsx:304-314
const INCLUDED_AMENITIES = [
  { name: 'Proyektor & Layar', icon: 'fas fa-tv' },
  { name: 'Papan Tulis', icon: 'fas fa-chalkboard' },
  { name: 'Sistem Suara', icon: 'fas fa-volume-up' },
  { name: 'Wi-Fi Kecepatan Tinggi', icon: 'fas fa-wifi' },
  { name: 'Pencahayaan yang Dapat Diatur', icon: 'fas fa-lightbulb' },
  { name: 'Pendingin Ruangan', icon: 'fas fa-wind' },
  { name: 'Staf Acara di Lokasi', icon: 'fas fa-user-shield' },
  { name: 'Meja & Kursi', icon: 'fas fa-chair' },
  { name: 'Keamanan Gedung', icon: 'fas fa-shield-alt' }
];

// EventFunctionRoomPage.jsx:170-177
const OCCASION_PILLS = [
  'Seminar Korporat',
  'Peluncuran Produk',
  'Pelatihan & Workshop',
  'Rapat Direksi',
  'Perayaan Privat',
  'Pertemuan Komunitas'
];

// ------------------------------------------------------------------
// 1. LIGHT hero card + 2 buttons
// ------------------------------------------------------------------
function buildHero() {
  return section({
    pt: 112, ptMobile: 96,
    pb: 0,
    bg: COLORS.surface,
    mb: 128, mbMobile: 80,   // space-y-20 sm:space-y-28
    children: [
      // bg-[#FAF8F5] rounded-2xl sm:rounded-[44px] p-8 sm:p-12 lg:p-14 border
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
          padding: PAD(56, 56, 56, 56, true),
          padding_tablet: PAD(48, 48, 48, 48, true),
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
              // px-2 py-1 rounded-full text-[#EA8E18] text-lg font-bold uppercase
              heading('FUNCTION ROOM', {
                tag: 'span',
                align: 'left',
                color: COLORS.orange,
                size: 18,
                weight: '700',
                tracking: 0.05,
                transform: 'uppercase'
              }),
              // h1 text-4xl sm:text-5xl lg:text-[64px] leading-[1.08]
              heading('Ruang yang Dibangun untuk <br><span style="color:#EA8E18;">Acara Berikutnya.</span>', {
                tag: 'h1',
                align: 'left',
                size: 64,
                sizeTablet: 48,
                sizeMobile: 36,
                leading: 1.08,
                tracking: -0.025
              }),
              // p text-[#3a3836] text-base sm:text-[18px] leading-[1.6] max-w-xl
              para(
                "<p>Dari seminar korporat hingga perayaan privat, function room HQuarters menawarkan suasana yang fleksibel dan profesional di jantung CBD Bandung.</p>",
                {
                  size: 18,
                  sizeMobile: 16,
                  color: BODY_DARK,
                  leading: 1.6,
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
                  // px-8 py-4 rounded-full bg-[#EA8E18] font-semibold shadow-[#EA8E18]/25
                  button('Cek Ketersediaan &nbsp;&rarr;', '#book-room', {
                    fontSize: 16,
                    fontSizeMobile: 14,
                    weight: '600',
                    radius: 9999,
                    py: 16,
                    px: 32,
                    shadow: { y: 10, blur: 15, spread: -3, color: 'rgba(234,142,24,0.25)' }
                  }),
                  // px-7 py-4 rounded-full bg-white text-slate-900 border-slate-200
                  button('Lihat Spesifikasi', '#room-specs', {
                    fontSize: 16,
                    fontSizeMobile: 14,
                    weight: '600',
                    radius: 9999,
                    py: 16,
                    px: 28,
                    textColor: '#0F172A',
                    bg: '#FFFFFF',
                    bgHover: '#F8FAFC',
                    border: { width: 1, color: COLORS.border }
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
                  background_image: { url: '/Function Room/Theatre.webp' },
                  background_position: 'center center',
                  background_size: 'cover',
                  ...BORDER(1, COLORS.borderSoft)
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
// Helper: centered section header
// ------------------------------------------------------------------
function centeredHeader(badge, headingHtml, descHtml, opts = {}) {
  const kids = [];
  if (badge) {
    kids.push(heading(badge, {
      tag: 'span',
      align: 'center',
      color: COLORS.orange,
      size: opts.badgeSize || 14,
      sizeMobile: 12,
      weight: '700',
      tracking: 0.1,
      transform: 'uppercase'
    }));
  }
  kids.push(heading(headingHtml, {
    tag: 'h2',
    align: 'center',
    size: opts.size || 48,
    sizeTablet: opts.sizeTablet || 36,   // Tailwind sm:text-4xl
    sizeMobile: opts.sizeMobile || 30,   // Tailwind text-3xl
    leading: 1.25,
    tracking: -0.025
  }));
  if (descHtml) {
    kids.push(para(descHtml, {
      align: 'center',
      size: opts.dSize || 16,
      sizeMobile: opts.dSizeMobile || 14,
      color: BODY_DARK
    }));
  }
  const c = {
    content_width: 'full',
    width: PX(opts.maxWidth || 672),
    width_mobile: PCT(100),
    flex_direction: 'column',
    align_items: 'center',
    text_align: 'center',
    flex_gap: GAP(opts.gap || 8),
    custom_css: 'selector { margin-left:auto; margin-right:auto; }'
  };
  return createContainer(c, kids);
}

// ------------------------------------------------------------------
// 2. ROOM DETAILS — 4 cards p-7
// ------------------------------------------------------------------
function buildRoomDetails() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 128, mbMobile: 80,
    gap: 40,   // space-y-10
    center: true,
    children: [
      centeredHeader('ROOM DETAILS', 'Dibangun untuk Menyesuaikan Acara Anda.', null, { maxWidth: 672, size: 48, gap: 12 }),
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
        ROOM_DETAILS.map((item) =>
          createContainer(
            {
              width: GRID(4, 24),
              width_tablet: GRID(2, 24),
              width_mobile: PCT(100),
              flex_direction: 'column',
              justify_content: 'space-between',
              flex_gap: GAP(0),
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(12),
              padding: PAD(28, 28, 28, 28, true),   // p-7
              ...BORDER(1, 'rgba(226,232,240,0.9)'),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // space-y-4
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'column',
                  flex_gap: GAP(16)
                },
                [
                  // w-12 h-12 rounded-2xl bg-[#FEF3E2] text-[#EA8E18]
                  createContainer(
                    {
                      width: PX(48),
                      min_height: PX(48),
                      flex_direction: 'row',
                      justify_content: 'center',
                      align_items: 'center',
                      border_radius: RAD(16),
                      background_background: 'classic',
                      background_color: COLORS.orangeTint,
                      box_shadow_box_shadow_type: 'yes',
                      box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
                    },
                    [
                      createWidget('icon', {
                        selected_icon: { value: item.icon, library: 'fa-solid' },
                        primary_color: COLORS.orange,
                        size: PX(24)
                      })
                    ]
                  ),
                  // space-y-1.5
                  createContainer(
                    {
                      content_width: 'full',
                      flex_direction: 'column',
                      flex_gap: GAP(6)
                    },
                    [
                      // text-lg sm:text-xl
                      heading(item.title, {
                        tag: 'h3',
                        align: 'left',
                        size: 20,
                        sizeMobile: 18,
                        weight: '500',
                        leading: 1.375
                      }),
                      para(`<p>${item.desc}</p>`, {
                        size: 14,
                        sizeMobile: 14,
                        color: BODY_DARK
                      })
                    ]
                  )
                ]
              )
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 3. Function Room Details gallery
// ------------------------------------------------------------------
function buildGallery() {
  return interactiveGallerySection({
    id: 'function-room-details',
    titleHtml: 'Function Room <span style="color:#EA8E18;">Details</span>',
    images: FACILITIES,
    mb: 128,
    mbMobile: 80
  });
}

// Inline SVG seat-layout glyphs (EventFunctionRoomPage.jsx:630-702) — copied verbatim
function svgFor(layout) {
  // reception
  if (layout.id === 'reception') {
    return '<svg width="56" height="24" viewBox="0 0 54 20" fill="currentColor">'
      + '<circle cx="6" cy="5.5" r="2.6"/><circle cx="6" cy="14.5" r="2.6"/>'
      + '<circle cx="27" cy="5.5" r="2.6"/><circle cx="27" cy="14.5" r="2.6"/>'
      + '<circle cx="48" cy="5.5" r="2.6"/><circle cx="48" cy="14.5" r="2.6"/></svg>';
  }
  // u-shape
  if (layout.id === 'u-shape') {
    return '<svg width="36" height="36" viewBox="0 0 30 26" fill="currentColor">'
      + '<rect x="4" y="4" width="4.5" height="4.5" rx="1"/><rect x="4" y="11.5" width="4.5" height="4.5" rx="1"/><rect x="4" y="19" width="4.5" height="4.5" rx="1"/>'
      + '<rect x="11" y="19" width="4.5" height="4.5" rx="1"/><rect x="18" y="19" width="4.5" height="4.5" rx="1"/><rect x="25" y="19" width="4.5" height="4.5" rx="1"/>'
      + '<rect x="25" y="11.5" width="4.5" height="4.5" rx="1"/><rect x="25" y="4" width="4.5" height="4.5" rx="1"/></svg>';
  }
  // round-table
  if (layout.id === 'round-table') {
    return '<svg width="36" height="36" viewBox="0 0 30 30" fill="none">'
      + '<circle cx="15" cy="15" r="9" stroke="#EA8E18" stroke-width="2.2"/>'
      + '<circle cx="8.64" cy="8.64" r="2.2" fill="#EA8E18"/><circle cx="21.36" cy="8.64" r="2.2" fill="#EA8E18"/>'
      + '<circle cx="21.36" cy="21.36" r="2.2" fill="#EA8E18"/><circle cx="8.64" cy="21.36" r="2.2" fill="#EA8E18"/></svg>';
  }
  // classroom: three full-width rows
  if (layout.id === 'classroom') {
    return '<svg width="36" height="36" viewBox="0 0 30 26" fill="currentColor">'
      + '<rect x="2" y="3" width="26" height="4.5" rx="2.2"/><rect x="2" y="11" width="26" height="4.5" rx="2.2"/><rect x="2" y="19" width="26" height="4.5" rx="2.2"/></svg>';
  }
  // theatre: 4 x 3 grid of seats
  let out = '<svg width="36" height="36" viewBox="0 0 30 26" fill="currentColor">';
  for (const y of [2, 10.5, 19]) {
    for (const x of [2, 9.5, 17, 24.5]) {
      out += `<rect x="${x}" y="${y}" width="4.5" height="4.5" rx="1.2"/>`;
    }
  }
  return out + '</svg>';
}

// ------------------------------------------------------------------
// 4. ROOM SPECIFICATIONS table + seating layouts (one section in React)
// ------------------------------------------------------------------
function buildRoomSpecs() {
  const headerCells = ['Room', 'Ukuran', 'Dimensi', 'Theatre', 'Classroom', 'Reception', 'U-Shape', 'Round Table'];
  const rows = [
    { room: 'Room 1', size: '140.4 m²', dims: '13.5 — 10.4 m', theatre: '140', classroom: '100', reception: '180', uShape: '100', round: '70' },
    { room: 'Room 2', size: '157.5 m²', dims: '9 — 15.6 m', theatre: '100', classroom: '60', reception: '130', uShape: '60', round: '50' }
  ];

  const th = headerCells.map((c, i) =>
    `<th style="padding:16px 24px;font-weight:500;${i >= 3 ? 'text-align:center;' : ''}">${c}</th>`
  ).join('');

  const bodyRows = rows.map((r) => `
      <tr style="border-top:1px solid #F1F5F9;">
        <td style="padding:18px 24px;font-family:Outfit,sans-serif;font-weight:500;color:#0F172A;font-size:15px;">${r.room}</td>
        <td style="padding:18px 24px;color:#3A3836;font-weight:400;">${r.size}</td>
        <td style="padding:18px 24px;color:#3A3836;font-weight:400;">${r.dims}</td>
        <td style="padding:18px 24px;text-align:center;color:#EA8E18;font-weight:500;font-size:15px;">${r.theatre}</td>
        <td style="padding:18px 24px;text-align:center;color:#EA8E18;font-weight:500;font-size:15px;">${r.classroom}</td>
        <td style="padding:18px 24px;text-align:center;color:#EA8E18;font-weight:500;font-size:15px;">${r.reception}</td>
        <td style="padding:18px 24px;text-align:center;color:#EA8E18;font-weight:500;font-size:15px;">${r.uShape}</td>
        <td style="padding:18px 24px;text-align:center;color:#EA8E18;font-weight:500;font-size:15px;">${r.round}</td>
      </tr>`).join('');

  const tableHtml = `<div style="overflow-x:auto;">
  <table style="width:100%;min-width:700px;border-collapse:collapse;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;">
    <thead>
      <tr style="background:#1c1a19;color:#FFFFFF;font-size:14px;font-family:Outfit,sans-serif;">${th}</tr>
    </thead>
    <tbody>${bodyRows}
    </tbody>
  </table>
</div>`;

  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 128, mbMobile: 80,
    gap: 40,   // space-y-10
    center: true,
    id: 'room-specs',
    children: [
      // header uses space-y-2 here (gap 8), unlike ROOM DETAILS which uses space-y-3
      centeredHeader('ROOM SPECIFICATIONS', 'Room 1 &amp; Room 2.', null, { maxWidth: 672, size: 48, gap: 8 }),
      // rounded-[20px] sm:rounded-xl border shadow-md bg-white overflow-hidden
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          background_background: 'classic',
          background_color: '#FFFFFF',
          border_radius: RAD(12),
          border_radius_mobile: RAD(20),
          overflow: 'hidden',
          ...BORDER(1, COLORS.borderSoft),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,0.1)' }
        },
        [
          createWidget('html', { html: tableHtml })
        ]
      ),
      // footnote: text-center text-xs sm:text-sm text-[#3a3836] pt-1
      para(
        '<p style="text-align:center;margin:0;">Ruang dapat digabung atau dipisah dengan partisi yang dapat dipindahkan sesuai ukuran acara Anda.</p>',
        {
          align: 'center',
          size: 14,
          sizeMobile: 12,
          color: BODY_DARK,
          margin: MARGIN(4, '', '', '')
        }
      ),
      // Seating layouts live INSIDE this section (React has no separate header).
      // grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 pt-2
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          flex_gap: GAP(24),
          flex_gap_mobile: GAP(16),
          padding: PAD(8, 0, 0, 0)
        },
        SEATING_LAYOUTS.map((layout) =>
          createContainer(
            {
              width: GRID(5, 24),
              width_tablet: GRID(2, 24),
              width_mobile: PCT(100),
              min_height: PX(210),
              flex_direction: 'column',
              align_items: 'center',
              justify_content: 'center',
              text_align: 'center',
              flex_gap: GAP(16),   // space-y-4
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(12),
              padding: PAD(28, 28, 28, 28, true),
              padding_mobile: PAD(24, 24, 24, 24, true),
              ...BORDER(1, 'rgba(241,245,249,0.9)'),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // h-12 icon row — SVG only (React has no icon tile and no capacity ring)
              createContainer(
                {
                  width: PX(48),
                  min_height: PX(48),
                  flex_direction: 'row',
                  justify_content: 'center',
                  align_items: 'center'
                },
                [
                  createWidget('html', {
                    html: `<div style="color:#EA8E18;line-height:0;">${svgFor(layout)}</div>`
                  })
                ]
              ),
              // space-y-1.5
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'column',
                  align_items: 'center',
                  flex_gap: GAP(6)
                },
                [
                  heading(layout.title, {
                    tag: 'h4',
                    align: 'center',
                    size: 17,
                    sizeMobile: 16,
                    weight: '500',
                    leading: 1.375
                  }),
                  para(`<p style="text-align:center;max-width:210px;margin:0 auto;">${layout.desc}</p>`, {
                    align: 'center',
                    size: 13,
                    sizeMobile: 12,
                    color: BODY_DARK
                  })
                ]
              )
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 6. MEETING PACKAGES
// ------------------------------------------------------------------
function buildPackages() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 128, mbMobile: 80,
    gap: 40,   // space-y-10
    center: true,
    id: 'meeting-packages',
    children: [
      centeredHeader('MEETING PACKAGES', 'Harga Per Paket.', null, { maxWidth: 672, size: 48 }),
      // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          flex_gap: GAP(28),
          flex_gap_mobile: GAP(24),   // gap-6 sm:gap-7
          custom_css: 'selector > .e-con { width: calc((100% - 56px) / 3) !important; }\n@media (max-width: 1023px) { selector > .e-con { width: calc((100% - 28px) / 2) !important; } }\n@media (max-width: 767px) { selector > .e-con { width: 100% !important; } }'
        },
        PACKAGES.map((pkg) => buildPackageCard(pkg))
      ),
      // footnotes: pt-4 space-y-2.5 text-center text-xs max-w-5xl
      createContainer(
        {
          content_width: 'full',
          width: PX(1024),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          flex_gap: GAP(10),
          padding: PAD(16, 0, 0, 0),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          para(
            '<p style="text-align:center;margin:0;">Semua harga nett. Termasuk LCD &amp; layar, papan tulis, sistem suara standar, Wi-Fi gratis, dan perlengkapan rapat (pensil, notepad, air mineral).</p>',
            { align: 'center', size: 13, sizeMobile: 12, color: BODY_DARK }
          ),
          para(
            '<p style="text-align:center;margin:0;font-style:italic;">Harga dapat berubah tanpa pemberitahuan sebelumnya. Silakan hubungi kami untuk harga dan detail paket terbaru.</p>',
            { align: 'center', size: 13, sizeMobile: 12, color: '#64748B' }
          )
        ]
      )
    ]
  });
}

function buildPackageCard(pkg) {
  return createContainer(
    {
      // Width comes from the parent media query — do not set content_width/width here
      flex_direction: 'column',
      justify_content: 'space-between',
      min_height: PX(220),
      border_radius: RAD(16),
      border_radius_mobile: RAD(12),
      padding: PAD(32, 32, 32, 32, true),
      padding_mobile: PAD(28, 28, 28, 28, true),
      background_background: 'classic',
      background_color: '#FFFFFF',
      ...BORDER(1, 'rgba(226,232,240,0.9)'),
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' },
      overflow: 'hidden',
      custom_css: 'selector { position:relative; transition: background-color .3s ease, border-color .3s ease, box-shadow .3s ease, transform .3s ease; }\nselector:hover { background-color:#EA8E18 !important; border-color:#EA8E18 !important; box-shadow:0 25px 50px -12px rgba(234,142,24,.3); transform:translateY(-6px); }\nselector:hover h3, selector:hover span, selector:hover p, selector:hover i { color:#FFFFFF !important; }'
    },
    [
      // upper space-y-4
      createContainer(
        { content_width: 'full', flex_direction: 'column', flex_gap: GAP(16) },
        [
          // name + arrow row
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              justify_content: 'space-between',
              align_items: 'center',
              flex_gap: GAP(12)
            },
            [
              heading(pkg.name, {
                tag: 'h3',
                align: 'left',
                size: 24,
                sizeMobile: 20,
                weight: '500',
                leading: 1.25
              }),
              // w-9 h-9 rounded-full bg-slate-100/80
              createContainer(
                {
                  width: PX(36),
                  min_height: PX(36),
                  flex_direction: 'row',
                  justify_content: 'center',
                  align_items: 'center',
                  border_radius: RAD(9999),
                  background_background: 'classic',
                  background_color: 'rgba(241,245,249,0.8)'
                },
                [
                  createWidget('icon', {
                    selected_icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
                    primary_color: '#64748B',
                    size: PX(16)
                  })
                ]
              )
            ]
          ),
          // price row: flex items-baseline gap-1.5 pb-2 border-b border-slate-100
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              align_items: 'baseline',
              flex_gap: GAP(6),
              padding: PAD(0, 0, 8, 0),
              ...BORDER_SIDE('bottom', '#F1F5F9')
            },
            [
              // text-2xl sm:text-3xl text-[#EA8E18]
              heading(pkg.price, {
                tag: 'span',
                align: 'left',
                color: COLORS.orange,
                size: 30,
                sizeMobile: 24,
                weight: '500',
                leading: 1.25
              }),
              // text-xs sm:text-sm text-slate-400 italic
              heading(pkg.unit, {
                tag: 'span',
                align: 'left',
                color: '#94A3B8',
                size: 14,
                sizeMobile: 12,
                weight: '400'
              })
            ]
          ),
          // inclusions row with Coffee icon
          pkg.inclusions
            ? createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  align_items: 'flex-start',
                  flex_gap: GAP(8)
                },
                [
                  createWidget('icon', {
                    selected_icon: { value: 'fas fa-coffee', library: 'fa-solid' },
                    primary_color: COLORS.orange,
                    size: PX(16),
                    custom_css: 'selector .elementor-icon { margin-top:2px; }'
                  }),
                  para(`<p>${pkg.inclusions}</p>`, {
                    size: 14,
                    sizeMobile: 12,
                    color: COLORS.heading
                  })
                ]
              )
            : createContainer(
                {
                  content_width: 'full',
                  min_height: PX(20),
                  flex_direction: 'row'
                },
                []
              )
        ]
      ),
      // footer: pt-4 mt-4 border-t flex-between text-xs
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          justify_content: 'space-between',
          align_items: 'center',
          flex_gap: GAP(8),
          padding: PAD(16, 0, 0, 0),
          _margin: MARGIN(16, '', '', ''),
          ...BORDER_SIDE('top', '#F1F5F9')
        },
        [
          heading(pkg.duration || '&nbsp;', {
            tag: 'span',
            align: 'left',
            color: '#64748B',
            size: 12,
            sizeMobile: 12,
            weight: '400'
          }),
          heading('Inquire', {
            tag: 'span',
            align: 'right',
            color: COLORS.orange,
            size: 11,
            sizeMobile: 11,
            weight: '600',
            tracking: 0.05,
            transform: 'uppercase'
          })
        ]
      )
    ]
  );
}

// ------------------------------------------------------------------
// 7. INCLUDED — 9 amenity chips
// ------------------------------------------------------------------
function buildIncluded() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 128, mbMobile: 80,
    gap: 48,   // space-y-12
    center: true,
    children: [
      centeredHeader(
        'INCLUDED',
        'Semua yang Anda Butuhkan untuk Menyelenggarakan.',
        '            <p>Infrastruktur modern yang siap mendukung presentasi berdampak, jamuan, dan pertemuan eksekutif.</p>',
        { maxWidth: 672, size: 48, gap: 12 }
      ),
      // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6
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
        INCLUDED_AMENITIES.map((item) =>
          createContainer(
            {
              width: GRID(3, 24),
              width_tablet: GRID(2, 24),
              width_mobile: PCT(100),
              flex_direction: 'row',
              align_items: 'center',
              flex_gap: GAP(16),   // gap-4
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(12),
              border_radius_mobile: RAD(20),
              padding: PAD(24, 24, 24, 24, true),
              padding_mobile: PAD(20, 20, 20, 20, true),
              ...BORDER(1, 'rgba(226,232,240,0.9)'),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // w-12 h-12 rounded-2xl bg-[#FEF3E2] text-[#EA8E18] shrink-0
              createContainer(
                {
                  width: PX(48),
                  min_height: PX(48),
                  flex_direction: 'row',
                  justify_content: 'center',
                  align_items: 'center',
                  border_radius: RAD(16),
                  background_background: 'classic',
                  background_color: COLORS.orangeTint,
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
                },
                [
                  createWidget('icon', {
                    selected_icon: { value: item.icon, library: 'fa-solid' },
                    primary_color: COLORS.orange,
                    size: PX(20)
                  })
                ]
              ),
              // text-base sm:text-lg
              heading(item.name, {
                tag: 'h3',
                align: 'left',
                size: 18,
                sizeMobile: 16,
                weight: '500',
                leading: 1.375
              })
            ]
          )
        )
      )
    ]
  });
}

// ------------------------------------------------------------------
// 8. dark[#161a25] "Perfect For Any Occasion."
// ------------------------------------------------------------------
function buildOccasions() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: 128, mbMobile: 80,
    center: true,
    children: [
      // bg-[#161a25] rounded-2xl sm:rounded-[40px] p-8 sm:p-14 lg:p-16
      // border-slate-800 shadow-xl space-y-8
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(32),
          background_background: 'classic',
          background_color: COLORS.darkCard,
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          padding: PAD(64, 64, 64, 64, true),
          padding_tablet: PAD(56, 56, 56, 56, true),
          padding_mobile: PAD(32, 32, 32, 32, true),
          ...BORDER(1, '#1E293B'),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)' }
        },
        [
          createContainer(
            {
              content_width: 'full',
              width: PX(672),
              width_mobile: PCT(100),
              flex_direction: 'column',
              align_items: 'center',
              flex_gap: GAP(0)
            },
            [
              heading('Cocok untuk Segala Acara.', {
                tag: 'h2',
                align: 'center',
                color: '#FFFFFF',
                size: 48,
                sizeTablet: 36,
                sizeMobile: 30,
                leading: 1.25,
                tracking: -0.025
              })
            ]
          ),
          // grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl
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
            OCCASION_PILLS.map((pill) =>
              createContainer(
                {
                  width: GRID(3, 16),
                  width_tablet: GRID(3, 16),
                  width_mobile: GRID(2, 12),
                  flex_direction: 'row',
                  justify_content: 'center',
                  align_items: 'center',
                  background_background: 'classic',
                  background_color: 'rgba(255,255,255,0.1)',
                  border_radius: RAD(9999),
                  padding: PAD(14, 16, 14, 16, true),
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                  border_color: 'rgba(255,255,255,0.1)',
                  custom_css: 'selector { transition: background-color .3s ease, border-color .3s ease; }\nselector:hover { background-color:#EA8E18 !important; border-color:#EA8E18 !important; }\nselector:hover span { color:#FFFFFF !important; }'
                },
                [
                  heading(pill, {
                    tag: 'span',
                    align: 'center',
                    color: '#E2E8F0',
                    size: 14,
                    sizeMobile: 12,
                    weight: '500',
                    tracking: 0.025,
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
// 9. BOOK THE ROOM — dark panel + form  (py-12 sm:py-20 bg-slate-50)
// ------------------------------------------------------------------
function buildBookRoom() {
  return section({
    pt: 80, ptMobile: 48,   // py-12 sm:py-20
    pb: 80, pbMobile: 48,
    bg: '#F8FAFC',
    id: 'book-room',
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
          // LEFT lg:w-2/5, bg-slate-900, min-h-[420px], p-6 sm:p-10, justify-end
          createContainer(
            {
              width: PCT(40),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              min_height: PX(540),
              min_height_mobile: PX(420),
              flex_direction: 'column',
              justify_content: 'flex-end',
              background_background: 'classic',
              background_color: '#0F172A',
              background_image: { url: '/ballroom.webp' },
              background_position: 'center center',
              background_size: 'cover',
              background_overlay_background: 'classic',
              background_overlay_color: 'rgba(15,23,42,0.6)',
              padding: PAD(40, 40, 40, 40, true),
              padding_mobile: PAD(24, 24, 24, 24, true)
            },
            [
              // bg-[#161a25] rounded-2xl p-6 sm:p-8 border-white/5 space-y-4
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  flex_direction: 'column',
                  flex_gap: GAP(16),
                  background_background: 'classic',
                  background_color: COLORS.darkCard,
                  border_radius: RAD(16),
                  padding: PAD(32, 32, 32, 32, true),
                  padding_mobile: PAD(24, 24, 24, 24, true),
                  ...BORDER(1, 'rgba(255,255,255,0.05)'),
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)' }
                },
                [
                  // bg-[#EA8E18] px-3 py-1 text-[10px] font-semibold uppercase rounded-md
                  heading('BOOK THE ROOM', {
                    tag: 'span',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 10,
                    weight: '600',
                    tracking: 0.05,
                    transform: 'uppercase',
                    custom_css: 'selector .elementor-heading-title { display:inline-block; background:#EA8E18; padding:4px 12px; border-radius:6px; }'
                  }),
                  heading('Beri Tahu Kami Tentang Acara Anda.', {
                    tag: 'h2',
                    align: 'left',
                    color: '#FFFFFF',
                    size: 30,
                    sizeMobile: 24,
                    weight: '500',
                    leading: 1.25
                  }),
                  para(
                    '<p>Bagikan detail acara Anda dan tim kami akan mengonfirmasi ketersediaan serta harga untuk tanggal yang Anda pilih.</p>',
                    { size: 14, color: '#CBD5E1' }
                  ),
                  // pt-3 border-t border-white/10 space-y-2.5 text-xs
                  createContainer(
                    {
                      content_width: 'full',
                      flex_direction: 'column',
                      flex_gap: GAP(10),
                      padding: PAD(12, 0, 0, 0),
                      border_border: 'solid',
                      border_width: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false },
                      border_color: 'rgba(255,255,255,0.1)'
                    },
                    [
                      heading('Function Room HQuarters &mdash; Upper Ground Floor (UG)', {
                        tag: 'div',
                        align: 'left',
                        color: '#FFFFFF',
                        size: 12,
                        sizeMobile: 12,
                        weight: '500'
                      }),
                      createContainer(
                        {
                          content_width: 'full',
                          flex_direction: 'row',
                          align_items: 'flex-start',
                          flex_gap: GAP(8)
                        },
                        [
                          createWidget('icon', {
                            selected_icon: { value: 'fas fa-map-marker-alt', library: 'fa-solid' },
                            primary_color: COLORS.orange,
                            size: PX(14),
                            custom_css: 'selector .elementor-icon { margin-top:2px; }'
                          }),
                          heading('Jl. Asia Afrika No. 158, Bandung, Jawa Barat &mdash; 40261', {
                            tag: 'span',
                            align: 'left',
                            color: '#94A3B8',
                            size: 12,
                            sizeMobile: 12,
                            weight: '400',
                            leading: 1.625
                          })
                        ]
                      ),
                      createContainer(
                        {
                          content_width: 'full',
                          flex_direction: 'row',
                          align_items: 'center',
                          flex_gap: GAP(8)
                        },
                        [
                          createWidget('icon', {
                            selected_icon: { value: 'fas fa-phone', library: 'fa-solid' },
                            primary_color: COLORS.orange,
                            size: PX(14)
                          }),
                          heading('022-4205077 / 0821-2200-2268', {
                            tag: 'span',
                            align: 'left',
                            color: '#94A3B8',
                            size: 12,
                            sizeMobile: 12,
                            weight: '400'
                          })
                        ]
                      )
                    ]
                  )
                ]
              )
            ]
          ),

          // RIGHT lg:w-3/5, p-8 sm:p-12 lg:p-14
          createContainer(
            {
              width: PCT(60),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(32),
              padding: PAD(56, 56, 56, 56, true),
              padding_tablet: PAD(48, 48, 48, 48, true),
              padding_mobile: PAD(32, 32, 32, 32, true)
            },
            [
              // 1. Select Room
              createContainer(
                { content_width: 'full', flex_direction: 'column', flex_gap: GAP(16) },
                [
                  createContainer(
                    { content_width: 'full', flex_direction: 'column', flex_gap: GAP(4) },
                    [
                      heading('1. Select Room', {
                        tag: 'h3',
                        align: 'left',
                        color: '#231F20',
                        size: 20,
                        sizeMobile: 18,
                        weight: '500'
                      }),
                      para('<p>Pilih ukuran ruang untuk acara Anda.</p>', { size: 14, sizeMobile: 14, color: BODY_DARK, margin: MARGIN(4, '', '', '') })
                    ]
                  ),
                  // room select field
                  createWidget('form', {
                    form_name: 'HQuarters Function Room',
                    form_fields: [
                      {
                        _id: 'preferred_room',
                        field_type: 'select',
                        field_label: 'PREFERRED ROOM',
                        field_options: 'Room 1 & Room 2 (Combined)\nRoom 1 (140.4 m²)\nRoom 2 (157.5 m²)',
                        required: 'true',
                        width: '100'
                      },
                      // 2. Complete Your Details (EventFunctionRoomPage.jsx:977-1033)
                      { _id: 'name', field_type: 'text', field_label: 'NAME *', placeholder: 'Nama lengkap Anda', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'whatsapp', field_type: 'tel', field_label: 'WHATSAPP *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'company', field_type: 'text', field_label: 'COMPANY NAME (OPTIONAL)', placeholder: 'mis. PT Enterprise Nusantara', required: 'false', width: '100' },
                      { _id: 'notes', field_type: 'textarea', field_label: 'ADDITIONAL REQUIREMENTS (OPTIONAL)', placeholder: 'Jenis acara, tanggal, jumlah tamu, atau permintaan khusus...', rows: 4, required: 'false', width: '100' }
                    ],
                    button_text: 'SEND INQUIRY',
                    button_size: 'md',
                    button_width: '100',
                    button_typography_typography: 'custom',
                    button_typography_font_family: 'Plus Jakarta Sans',
                    button_typography_font_size: PX(14),
                    button_typography_font_weight: '600',
                    button_typography_text_transform: 'uppercase',
                    button_text_color: '#FFFFFF',
                    button_background_color: '#151A27',
                    button_background_hover_color: '#000000',
                    button_border_radius: RAD(12),
                    button_padding: PAD(16, 24, 16, 24, true),
                    submit_actions: ['redirect'],
                    redirect_to: `https://wa.me/${WA_NUMBER}?text=Halo%20HQuarters!%20Saya%20ingin%20memesan%20*Function%20Room*.%0ARuang:%20[field id="preferred_room"]%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
                    label_typography_typography: 'custom',
                    label_typography_font_family: 'Plus Jakarta Sans',
                    label_typography_font_size: PX(10),
                    label_typography_font_weight: '600',
                    label_typography_line_height: EM(1),
                    label_text_color: '#64748B',
                    field_typography_typography: 'custom',
                    field_typography_font_family: 'Plus Jakarta Sans',
                    field_typography_font_size: PX(14),
                    field_text_color: '#1E293B',
                    field_background_color: '#FFFFFF',
                    field_border_border: 'solid',
                    field_border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                    field_border_color: COLORS.border,
                    field_border_radius: RAD(8),
                    field_padding: PAD(12, 16, 12, 16, true),
                    custom_css: [
                      'selector .elementor-field-label { text-transform:uppercase; letter-spacing:.05em; font-weight:600; font-size:10px; color:#64748B; display:flex; align-items:center; gap:6px; }',
                      // Layers / User / Phone / Building / MessageSquare
                      'selector .elementor-field-group-preferred_room .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f5fd"; color:#EA8E18; font-size:12px; }',
                      'selector .elementor-field-group-name .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f007"; color:#EA8E18; font-size:12px; }',
                      'selector .elementor-field-group-whatsapp .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f095"; color:#EA8E18; font-size:12px; }',
                      'selector .elementor-field-group-company .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f1ad"; color:#94A3B8; font-size:12px; }',
                      'selector .elementor-field-group-notes .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f075"; color:#94A3B8; font-size:12px; }',
                      'selector .elementor-field-group { margin-bottom: 16px; }'
                    ].join('\n')
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
// 10. closing CTA  (no !mt override here)
// ------------------------------------------------------------------
function buildClosingCTA() {
  return section({
    pt: 112, ptMobile: 80,   // pt-20 sm:pt-28
    pb: 64, pbMobile: 48,    // pb-12 sm:pb-16
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
          heading('Pertemuan Berikutnya Layak <br><span style="color:#EA8E18;">Mendapatkan Ruang yang Tepat.</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 48,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.25,
            tracking: -0.025
          }),
          para('<p>HQuarters Function Room &mdash; Asia Afrika, Bandung</p>', {
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
console.log('Generating page-space-function-room-id.json ...');
// NOTE: React serves this page at /events (App.jsx:26-30), NOT /spaces/function-room.
// Create the WordPress page at /events and assign this template to it.
exportElementorTemplate('HQuarters - Function Room', [
  buildHero(),
  buildRoomDetails(),
  buildGallery(),
  buildRoomSpecs(),
  buildPackages(),
  buildIncluded(),
  buildOccasions(),
  buildBookRoom(),
  buildClosingCTA()
], 'page-space-function-room-id.json');
console.log('Done.');
