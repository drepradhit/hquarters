// Generates page-building-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/BuildingPage.jsx        -> <main class="pt-24 sm:pt-28"> (NO space-y), CTA props
//   src/components/BuildingSection.jsx
//   src/components/CTA.jsx
//
// React structure (BuildingSection.jsx):
//   157  <section id="building" class="pt-4 sm:pt-6 pb-16 bg-white">
//   158    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
//   163      header      max-w-3xl space-y-4
//   177      4 feature blocks, space-y-16, each with id + lg:order-1/2 image swap
//   245      id="building-amenities" — Facilities carousel
//
// Then BuildingPage.jsx renders CTA with description="" (so no paragraph)
// and buttonText="Find A Space".
//
// Tailwind scale: 4=16 6=24 8=32 10=40 12=48 14=56 16=64 20=80 24=96 28=112
// Vertical: main pt-24 sm:pt-28 (96/112) + section pt-4 sm:pt-6 (16/24) = 112 / 136

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button,
  COLORS
} from './lib/elementor.js';

// BuildingSection.jsx:11-54
const WELLNESS_GALLERY = [
  { src: '/BUILDING/gym 5_4.webp', title: 'Studio Kebugaran & Conditioning' },
  { src: '/BUILDING/sauna 5_4 new.webp', title: 'Ruang Relaksasi & Pemulihan' },
  { src: '/BUILDING/kolam renang 5_4 new.webp', title: 'Kolam Renang & Area Santai' },
  { src: '/BUILDING/lounge.webp', title: 'Area Lounge' },
  { src: '/BUILDING/teras-g.webp', title: 'Teras Lantai Dasar' },
  { src: '/BUILDING/teras-ug.webp', title: 'Teras Upper Ground' }
];

// BuildingSection.jsx:99-154
const BUILDING_FEATURES = [
  {
    id: 'infrastructure',
    titleHtml: 'Semua yang Dibutuhkan <span style="color:#EA8E18;">Bisnis.</span>',
    description: null,
    items: [
      'Lobby & Concierge',
      'Fasilitas Rapat',
      'Lift KONE Destination Control',
      'Konektivitas Fiber',
      'Manajemen Gedung Profesional'
    ],
    footnote: null,
    image: '/BUILDING/lobby-utama.webp',
    imageLeft: false
  },
  {
    id: 'security',
    titleHtml: 'Rasa Aman Datang dari <span style="color:#EA8E18;">Ketenangan.</span>',
    description: null,
    items: [
      'Keamanan 24 Jam',
      'CCTV',
      'Akses Terkendali',
      'Sistem Keselamatan Kebakaran',
      'Rekayasa Gedung'
    ],
    footnote: 'Dirancang dan dibangun sesuai standar struktur dan kegempaan bangunan yang berlaku.',
    image: '/BUILDING/security-new.webp',
    imageLeft: true
  },
  {
    id: 'parking',
    titleHtml: 'Datang Tanpa <span style="color:#EA8E18;">Ribet.</span>',
    description: 'Kapasitas parkir besar yang didukung sistem parkir mekanikal.',
    items: [],
    footnote: null,
    image: '/LOGO/parking-lift.webp',
    imageLeft: false
  },
  {
    id: 'wellness',
    titleHtml: 'Bekerja Lebih Baik. <span style="color:#EA8E18;">Isi Ulang Energi.</span>',
    description: '',
    items: ['Gym', 'Sauna', 'Kolam Renang Air Hangat', 'Fasilitas Rooftop'],
    footnote: null,
    image: '/BUILDING/teras-ug.webp',
    imageLeft: true
  }
];

// ------------------------------------------------------------------
// 1. BuildingSection.jsx
// ------------------------------------------------------------------
function buildBuildingSection() {
  return section({
    // main pt-24 sm:pt-28 + section pt-4 sm:pt-6 = 112 / 136 ; pb-16 (64)
    pt: 112, ptTablet: 136, ptMobile: 112,
    pb: 64,
    bg: COLORS.surface,
    gap: 64,   // space-y-16
    id: 'building',
    children: [
      // header: text-center max-w-3xl mx-auto space-y-4
      createContainer(
        {
          content_width: 'full',
          width: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          // h1 text-4xl sm:text-5xl lg:text-6xl leading-[1.12]
          heading('Dibangun untuk Bisnis. <br><span style="color:#EA8E18;">Dirancang untuk Hidup.</span>', {
            tag: 'h1',
            align: 'center',
            size: 60,
            sizeTablet: 48,
            sizeMobile: 36,
            leading: 1.12,
            tracking: -0.025
          }),
          // p text-base sm:text-lg max-w-xl
          para(
            '<p>HQuarters menggabungkan infrastruktur profesional, keamanan, dan fasilitas gaya hidup dalam satu lingkungan bisnis modern.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:576px; margin-left:auto; margin-right:auto; }'
            }
          )
        ]
      ),

      // 4 feature blocks, space-y-16
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(64)
        },
        BUILDING_FEATURES.map((b) => buildFeatureBlock(b))
      ),

      // id="building-amenities" — Facilities carousel
      buildAmenitiesBlock()
    ]
  });
}

// One feature block (BuildingSection.jsx:178-238)
function buildFeatureBlock(b) {
  const imageCol = createContainer(
    {
      // lg:col-span-6 with gap-10 (40) = 50% - 20px
      width: CUSTOM('calc(50% - 20px)'),
      width_tablet: PCT(100),
      width_mobile: PCT(100),
      flex_direction: 'row',
      align_items: 'stretch'
    },
    [
      // rounded-[24px] sm:rounded-2xl aspect-[16/11] bg-slate-900
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          min_height: PX(360),
          min_height_tablet: PX(320),
          min_height_mobile: PX(240),
          border_radius: RAD(16),
          border_radius_mobile: RAD(24),
          overflow: 'hidden',
          background_background: 'classic',
          background_color: '#0F172A',
          background_image: { url: b.image },
          background_position: 'center bottom',
          background_size: 'cover',
          ...BORDER(1, COLORS.borderSoft),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,0.1)' },
          custom_css: 'selector { aspect-ratio: 16 / 11; }'
        },
        []
      )
    ]
  );

  const textChildren = [
    // space-y-3
    createContainer(
      {
        content_width: 'full',
        flex_direction: 'column',
        flex_gap: GAP(12)
      },
      [
        // h2 text-3xl sm:text-4xl lg:text-[42px] leading-[1.16]
        heading(b.titleHtml, {
          tag: 'h2',
          align: 'left',
          size: 42,
          sizeTablet: 36,
          sizeMobile: 30,
          leading: 1.16,
          tracking: -0.025
        }),
        b.description
          ? para(`<p>${b.description}</p>`, {
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:576px; }'
            })
          : null
      ].filter(Boolean)
    )
  ];

  // items: ul space-y-3.5 pt-4 border-t border-slate-200/60
  if (b.items.length > 0) {
    textChildren.push(
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'column',
          flex_gap: GAP(14),
          padding: PAD(16, 0, 0, 0),
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false },
          border_color: 'rgba(226,232,240,0.6)'
        },
        b.items.map((item) =>
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              align_items: 'flex-start',
              flex_gap: GAP(14)   // gap-3.5
            },
            [
              // w-5 h-[2px] bg-[#EA8E18] rounded-full mt-3
              createContainer(
                {
                  width: PX(20),
                  min_height: PX(2),
                  flex_direction: 'row',
                  background_background: 'classic',
                  background_color: COLORS.orange,
                  border_radius: RAD(9999),
                  _margin: MARGIN(12, '', '', '')
                },
                []
              ),
              // text-base sm:text-lg font-semibold text-slate-800 leading-snug
              heading(item, {
                tag: 'span',
                align: 'left',
                color: '#1E293B',
                size: 18,
                sizeMobile: 16,
                weight: '600',
                leading: 1.375
              })
            ]
          )
        )
      )
    );
  }

  // footnote: pt-4 border-t, inner bg-white/90 p-4.5 rounded-2xl flex gap-3
  if (b.footnote) {
    textChildren.push(
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'column',
          padding: PAD(16, 0, 0, 0),
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false },
          border_color: 'rgba(226,232,240,0.6)'
        },
        [
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              align_items: 'flex-start',
              flex_gap: GAP(12),   // gap-3
              background_background: 'classic',
              background_color: 'rgba(255,255,255,0.9)',
              border_radius: RAD(16),
              padding: PAD(18, 18, 18, 18, true),   // p-4.5 = 18
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // w-1.5 h-10 bar
              createContainer(
                {
                  width: PX(6),
                  min_height: PX(40),
                  flex_direction: 'row',
                  background_background: 'classic',
                  background_color: COLORS.orange,
                  border_radius: RAD(9999)
                },
                []
              ),
              para(`<p>${b.footnote}</p>`, {
                size: 14,
                sizeMobile: 12,
                color: '#475569',
                weight: '500'
              })
            ]
          )
        ]
      )
    );
  }

  const textCol = createContainer(
    {
      // lg:col-span-6 with gap-10 (40) = 50% - 20px
      width: CUSTOM('calc(50% - 20px)'),
      width_tablet: PCT(100),
      width_mobile: PCT(100),
      flex_direction: 'column',
      justify_content: 'center',
      flex_gap: GAP(24)   // space-y-6
    },
    textChildren
  );

  // React: image is first in DOM; lg:order-1/2 swaps sides at lg.
  // imageLeft=false -> image lg:order-2 (right)  -> flex row-reverse
  // imageLeft=true  -> image lg:order-1 (left)   -> flex row
  // On tablet/mobile the DOM order applies, so the image sits on top.
  return createContainer(
    {
      content_width: 'full',
      width: PCT(100),
      flex_direction: b.imageLeft ? 'row' : 'row-reverse',
      flex_direction_tablet: 'column',
      flex_direction_mobile: 'column',
      align_items: 'center',
      flex_gap: GAP(40),   // gap-10
      flex_gap_tablet: GAP(32),
      flex_gap_mobile: GAP(32),
      background_background: 'classic',
      background_color: 'rgba(248,250,252,0.7)',
      border_radius: RAD(44),
      border_radius_mobile: RAD(16),
      padding: PAD(56, 56, 56, 56, true),
      padding_tablet: PAD(48, 48, 48, 48, true),
      padding_mobile: PAD(32, 32, 32, 32, true),
      ...BORDER(1, COLORS.borderSoft),
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' },
      _element_id: b.id,
      custom_css: 'selector { transition: background-color .3s ease, border-color .3s ease, box-shadow .3s ease; }\nselector:hover { background-color:#FFFFFF !important; border-color: rgba(234,142,24,.4) !important; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); }'
    },
    [imageCol, textCol]
  );
}

// id="building-amenities" — Facilities carousel (BuildingSection.jsx:245-317)
function buildAmenitiesBlock() {
  return createContainer(
    {
      content_width: 'full',
      width: PCT(100),
      flex_direction: 'column',
      flex_gap: GAP(32),   // space-y-8
      background_background: 'classic',
      background_color: COLORS.surfaceCream,
      border_radius: RAD(44),
      border_radius_mobile: RAD(16),
      padding: PAD(56, 56, 56, 56, true),
      padding_tablet: PAD(48, 48, 48, 48, true),
      padding_mobile: PAD(32, 32, 32, 32, true),
      ...BORDER(1, COLORS.borderSoft),
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' },
      _element_id: 'building-amenities'
    },
    [
      // heading row: border-b border-slate-200/80 pb-4, space-y-1.5
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          justify_content: 'space-between',
          align_items: 'flex-end',
          flex_gap: GAP(16),
          padding: PAD(0, 0, 16, 0),
          ...BORDER_SIDE('bottom', COLORS.borderSoft)
        },
        [
          createContainer(
            {
              flex_direction: 'column',
              flex_gap: GAP(6)   // space-y-1.5
            },
            [
              // h2 text-2xl sm:text-3xl lg:text-4xl
              heading('Facilities', {
                tag: 'h2',
                align: 'left',
                size: 36,
                sizeTablet: 30,
                sizeMobile: 24,
                tracking: -0.025
              })
            ]
          )
        ]
      ),

      // carousel body
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(0)
        },
        [
          // main image: aspect-[16/10] sm:aspect-[16/9] max-h-[640px] rounded-[24px] sm:rounded-2xl
          createContainer(
            {
              content_width: 'full',
              width: PCT(100),
              min_height: PX(380),
              min_height_tablet: PX(340),
              min_height_mobile: PX(230),
              border_radius: RAD(16),
              border_radius_mobile: RAD(24),
              overflow: 'hidden',
              background_background: 'classic',
              background_color: '#0F172A',
              background_image: { url: WELLNESS_GALLERY[0].src },
              background_position: 'center center',
              background_size: 'cover',
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)' },
              custom_css: 'selector { aspect-ratio: 16 / 10; max-height: 640px; }\n@media (min-width: 768px) { selector { aspect-ratio: 16 / 9; } }'
            },
            []
          ),
          // thumbnails: mt-6 flex gap-3, w-20 h-16 sm:w-28 sm:h-20
          createContainer(
            {
              content_width: 'full',
              width: PCT(100),
              flex_direction: 'row',
              flex_wrap: 'wrap',
              align_items: 'center',
              flex_gap: GAP(12),
              padding: PAD(4, 0, 8, 0),
              _margin: MARGIN(24, '', '', '')
            },
            WELLNESS_GALLERY.map((g, i) =>
              createContainer(
                {
                  width: PX(112),
                  width_mobile: PX(80),
                  min_height: PX(80),
                  min_height_mobile: PX(64),
                  border_radius: RAD(8),
                  overflow: 'hidden',
                  background_background: 'classic',
                  background_image: { url: g.src },
                  background_position: 'center center',
                  background_size: 'cover',
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '2', right: '2', bottom: '2', left: '2', isLinked: true },
                  border_color: i === 0 ? COLORS.orange : 'rgba(0,0,0,0)',
                  custom_css: i === 0 ? 'selector { opacity:1; }' : 'selector { opacity:.6; }'
                },
                []
              )
            )
          )
        ]
      )
    ]
  );
}

// ------------------------------------------------------------------
// 2. CTA.jsx  (BuildingPage.jsx props: description="" so no paragraph)
// ------------------------------------------------------------------
function buildCTA() {
  return section({
    // pt-20 sm:pt-28 (80/112), pb-12 sm:pb-16 (48/64)
    pt: 112, ptMobile: 80,
    pb: 64, pbMobile: 48,
    bg: COLORS.dark,
    id: 'contact',
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
          flex_gap: GAP(24)
        },
        [
          // text-3xl sm:text-5xl lg:text-[52px] leading-[1.15]
          heading('Inilah Rasanya Tempat Kerja Modern <br><span style="color:#EA8E18;">yang Seharusnya.</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 52,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.15,
            tracking: -0.025
          }),
          // React: description="" -> paragraph is NOT rendered
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
              button('Cari Ruang &nbsp;&rarr;', '/find-space', {
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
console.log('Generating page-building-id.json ...');
exportElementorTemplate('HQuarters - Building', [
  buildBuildingSection(),
  buildCTA()
], 'page-building-id.json');
console.log('Done.');
