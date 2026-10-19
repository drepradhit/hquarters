// Generates homepage-id.json — faithful to the React source.
//
// Source of truth (read directly, do not guess):
//   src/components/Hero.jsx
//   src/components/BusinessJourney.jsx
//   src/components/AddressStatement.jsx
//   src/components/Partners.jsx
//   src/components/BuildingHighlights.jsx
//   src/components/CTA.jsx
//
// Tailwind -> Elementor breakpoint mapping
//   base (<640)      -> mobile  (<768)
//   sm  (>=640)      -> tablet  (768-1023)   [640-767 window has no Elementor equivalent]
//   md  (>=768)      -> tablet  (768-1023)
//   lg  (>=1024)     -> desktop (>=1024)
//
// Tailwind scale used: 1=4px 2=8px 3=12px 4=16px 5=20px 6=24px 7=28px 8=32px
//                      9=36px 10=40px 12=48px 14=56px 16=64px 20=80px 24=96px 28=112px 32=128px

import fs from 'fs';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function createContainer(settings = {}, elements = []) {
  return { id: generateId(), elType: 'container', isInner: false, settings, elements };
}

function createWidget(widgetType, settings = {}) {
  return { id: generateId(), elType: 'widget', widgetType, settings, elements: [] };
}

function exportElementorTemplate(title, elements, filename) {
  fs.writeFileSync(filename, JSON.stringify({ version: '0.4', title, type: 'page', content: elements }, null, 2), 'utf-8');
  console.log(`  ${filename}`);
}

// ------------------------------------------------------------------ helpers
const PX = (v) => ({ unit: 'px', size: v });
const PCT = (v) => ({ unit: '%', size: v });
const EM = (v) => ({ unit: 'em', size: v });
const REM = (v) => ({ unit: 'rem', size: v });
const CUSTOM = (v) => ({ unit: 'custom', size: v });
const GAP = (c, r = c) => ({ column: String(c), row: String(r), unit: 'px' });
const PAD = (t, r, b, l, linked = false) => ({ unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: linked });
const RAD = (v) => ({ unit: 'px', top: String(v), right: String(v), bottom: String(v), left: String(v), isLinked: true });
const BORDER = (v, color) => ({
  border_border: 'solid',
  border_width: { unit: 'px', top: String(v), right: String(v), bottom: String(v), left: String(v), isLinked: true },
  border_color: color
});
// Only emit the sides that are actually set — Elementor treats missing keys as unset.
function MARGIN(t, r, b, l) {
  const m = { unit: 'px', isLinked: false };
  if (t !== undefined && t !== '') m.top = String(t);
  if (r !== undefined && r !== '') m.right = String(r);
  if (b !== undefined && b !== '') m.bottom = String(b);
  if (l !== undefined && l !== '') m.left = String(l);
  return m;
}

// Outer page section: boxed 1440, px-4 / sm:px-6 / lg:px-8 + explicit vertical padding
function section(opts) {
  const s = {
    content_width: 'boxed',
    boxed_width: PX(1440),
    flex_direction: 'column',
    padding: PAD(opts.pt, 32, opts.pb, 32),
    padding_tablet: PAD(opts.ptTablet !== undefined ? opts.ptTablet : opts.pt, 24, opts.pbTablet !== undefined ? opts.pbTablet : opts.pb, 24),
    padding_mobile: PAD(opts.ptMobile !== undefined ? opts.ptMobile : opts.pt, 16, opts.pbMobile !== undefined ? opts.pbMobile : opts.pb, 16)
  };
  if (opts.gap !== undefined) {
    s.flex_gap = GAP(opts.gap);
  }
  if (opts.borderBottom) {
    s.border_border = 'solid';
    s.border_width = { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false };
    s.border_color = opts.borderBottom;
  }
  if (opts.bg) {
    s.background_background = 'classic';
    s.background_color = opts.bg;
  }
  if (opts.id) {
    s._element_id = opts.id;
  }
  if (opts.css) {
    s.custom_css = opts.css;
  }
  if (opts.center) {
    s.align_items = 'center';
    s.text_align = 'center';
  }
  return createContainer(s, opts.children);
}

// Centered section header: badge + heading (+ optional description)
function headerBlock(badge, headingHtml, descHtml, opts = {}) {
  const kids = [];
  if (badge) {
    kids.push(createWidget('heading', {
      title: badge,
      header_size: 'span',
      align: 'center',
      title_color: '#EA8E18',
      typography_typography: 'custom',
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: PX(12),
      typography_font_weight: '700',
      typography_text_transform: 'uppercase',
      typography_letter_spacing: opts.badgeTracking || EM(0.1)
    }));
  }
  kids.push(createWidget('heading', {
    title: headingHtml,
    header_size: opts.tag || 'h2',
    align: 'center',
    title_color: '#0F172A',
    typography_typography: 'custom',
    typography_font_family: 'Outfit',
    typography_font_size: PX(opts.hSize || 48),
    typography_font_size_tablet: PX(opts.hSizeTablet || opts.hSize || 48),
    typography_font_size_mobile: PX(opts.hSizeMobile || 30),
    typography_font_weight: '500',
    typography_line_height: EM(opts.hLeading || 1.25),
    typography_letter_spacing: EM(-0.025)
  }));
  if (descHtml) {
    kids.push(createWidget('text-editor', {
      editor: descHtml,
      align: 'center',
      text_color: '#475569',
      typography_typography: 'custom',
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: PX(18),
      typography_font_size_tablet: PX(18),
      typography_font_size_mobile: PX(16),
      typography_line_height: EM(1.625)
    }));
  }
  const c = {
    content_width: 'full',
    flex_direction: 'column',
    align_items: 'center',
    text_align: 'center',
    flex_gap: GAP(opts.gap || 12)
  };
  if (opts.maxWidth) {
    c.width = PX(opts.maxWidth);
    c.width_mobile = PCT(100);
  }
  return createContainer(c, kids);
}

// Inline text link + arrow, matching `text-sm font-bold text-[#EA8E18]` + ArrowRight
function arrowLink(text, url, opts = {}) {
  return createWidget('heading', {
    title: `<a href="${url}" style="color:#EA8E18;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">${text}<span aria-hidden="true">&rarr;</span></a>`,
    header_size: 'span',
    align: opts.align || 'left',
    title_color: '#EA8E18',
    typography_typography: 'custom',
    typography_font_family: 'Plus Jakarta Sans',
    typography_font_size: PX(opts.size || 14),
    typography_font_size_mobile: PX(opts.sizeMobile || opts.size || 14),
    typography_font_weight: opts.weight || '700'
  });
}

// ==================================================================
// 1. HERO  (src/components/Hero.jsx)
// ==================================================================
function buildHero() {
  return section({
    pt: 96, ptMobile: 80, pb: 16,
    bg: '#FFFFFF',
    css: 'selector { min-height: calc(100vh - 1rem); justify-content: center; }',
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          min_height: PX(680),
          min_height_tablet: PX(620),
          min_height_mobile: PX(580),
          flex_direction: 'row',
          flex_direction_mobile: 'column',
          justify_content: 'flex-start',
          justify_content_mobile: 'flex-end',
          align_items: 'center',
          align_items_mobile: 'stretch',
          border_radius: RAD(48),
          border_radius_tablet: RAD(44),
          border_radius_mobile: RAD(12),
          overflow: 'hidden',
          background_background: 'classic',
          background_color: '#FFFFFF',
          background_image: { url: '/BUILDING/ChatGPT Image Jul 29, 2026, 03_09_51 PM-800.webp' },
          background_position: 'right top',
          background_position_mobile: 'center top',
          background_size: 'cover',
          background_overlay_background: 'classic',
          background_overlay_color: 'rgba(255,255,255,0.75)',
          ...BORDER(1, 'rgba(226,232,240,0.6)'),
          // React: object-cover object-top scale-100 md:scale-125 md:translate-x-[24%] md:translate-y-[3%]
          // React desktop overlay: bg-gradient-to-r from-white via-white/95 (35%) via-white/40 (65%) to-transparent
          // React mobile overlay:  bg-gradient-to-t from-slate-950/90 via-slate-950/40 (50%) to-transparent
          custom_css: [
            'selector { background-size: 125% auto !important; background-position: 78% top !important; }',
            'selector .elementor-background-overlay {',
            '  background-image: linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0.40) 65%, rgba(255,255,255,0) 100%) !important;',
            '}',
            '@media (max-width: 767px) {',
            '  selector { background-size: cover !important; background-position: center top !important; background-color: #0F172A !important; }',
            '  selector .elementor-background-overlay { background-image: linear-gradient(to top, rgba(2,6,23,0.90) 0%, rgba(2,6,23,0.40) 50%, rgba(2,6,23,0) 100%) !important; }',
            '}'
          ].join('\n')
        },
        [
          // Text column: max-w-2xl lg:max-w-3xl, p-5 pt-24 / sm:p-8 pt-28 / md:p-10 / lg:p-14 / xl:p-16
          createContainer(
            {
              width: PX(768),
              width_tablet: PX(672),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(0),
              padding: PAD(56, 56, 56, 56, true),
              padding_tablet: PAD(40, 40, 40, 40, true),
              padding_mobile: PAD(96, 20, 20, 20)
            },
            [
              // h1 text-3xl sm:text-5xl lg:text-[66px] mb-4 sm:mb-6
              createWidget('heading', {
                title: 'Ruang untuk Setiap <br><span>Perjalanan Bisnis.</span>',
                header_size: 'h1',
                align: 'left',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: PX(66),
                typography_font_size_tablet: PX(48),
                typography_font_size_mobile: PX(30),
                typography_font_weight: '500',
                typography_line_height: EM(1.1),
                typography_letter_spacing: EM(-0.025),
                _margin: MARGIN('', '', 24),
                _margin_mobile: MARGIN('', '', 16),
                // text-white md:text-slate-900, accent text-[#FBA93C] md:text-[#EA8E18]
                custom_css: [
                  'selector .elementor-heading-title { color: #0F172A; }',
                  'selector .elementor-heading-title span { color: #EA8E18; }',
                  '@media (max-width: 767px) {',
                  '  selector .elementor-heading-title { color: #FFFFFF; text-shadow: 0 2px 8px rgba(0,0,0,0.7); }',
                  '  selector .elementor-heading-title span { color: #FBA93C; }',
                  '}'
                ].join('\n')
              }),
              // p text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl, text-slate-100 md:text-slate-600
              createWidget('text-editor', {
                editor: '<p>Dari alamat bisnis pertama hingga kantor pusat perusahaan, HQuarters menyediakan ruang untuk memulai, bekerja, memiliki, dan bertumbuh &mdash; <br>di jantung Asia Afrika, Bandung.</p>',
                align: 'left',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(18),
                typography_font_size_tablet: PX(18),
                typography_font_size_mobile: PX(14),
                typography_font_weight: '400',
                typography_line_height: EM(1.625),
                _element_custom_width: PCT(100),
                _margin: MARGIN('', '', 32),
                _margin_mobile: MARGIN('', '', 24),
                custom_css: [
                  'selector .elementor-widget-container { max-width: 576px; }',
                  'selector, selector p { color: #475569; }',
                  '@media (max-width: 767px) {',
                  '  selector, selector p { color: #F1F5F9; text-shadow: 0 1px 4px rgba(0,0,0,0.6); }',
                  '}'
                ].join('\n')
              }),
              // Buttons: flex flex-wrap gap-3 sm:gap-4 mb-8, buttons w-full sm:w-auto
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  align_items: 'center',
                  flex_gap: GAP(16),
                  flex_gap_mobile: GAP(12),
                  _margin: MARGIN('', '', 32)
                },
                [
                  createWidget('button', {
                    text: 'Jelajahi Ruang Usaha',
                    link: { url: '/spaces' },
                    align: 'center',
                    size: 'md',
                    width_mobile: PCT(100),
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(16),
                    typography_font_size_mobile: PX(14),
                    typography_font_weight: '600',
                    button_text_color: '#FFFFFF',
                    background_color: '#EA8E18',
                    button_background_hover_color: '#D88010',
                    border_radius: RAD(12),
                    padding: PAD(14, 28, 14, 28, true),
                    box_shadow_box_shadow_type: 'yes',
                    box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,0.1)' }
                  }),
                  createWidget('button', {
                    text: 'Kunjungi HQuarters',
                    link: { url: '/find-space' },
                    align: 'center',
                    size: 'md',
                    width_mobile: PCT(100),
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(16),
                    typography_font_size_mobile: PX(14),
                    typography_font_weight: '600',
                    border_radius: RAD(12),
                    padding: PAD(14, 28, 14, 28, true),
                    // desktop: bg-transparent border-slate-300 text-slate-800
                    button_text_color: '#1E293B',
                    background_color: 'rgba(255,255,255,0)',
                    ...BORDER(1, '#CBD5E1'),
                    // mobile: bg-white/15 border-white/30 text-white
                    custom_css: [
            '@media (min-width: 768px) { selector { height: calc(100vh - 6rem); max-height: 780px; } }',
            '@media (max-width: 767px) {',
                      '  selector .elementor-button { color: #FFFFFF !important; background-color: rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.30) !important; }',
                      '}'
                    ].join('\n')
                  })
                ]
              ),
              // Social proof: flex items-center gap-3 text-xs sm:text-sm
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  align_items: 'center',
                  flex_gap: GAP(12)
                },
                [
                  createWidget('heading', {
                    title: '&#9733;&#9733;&#9733;&#9733;&#9733;',
                    header_size: 'span',
                    align: 'left',
                    title_color: '#EA8E18',
                    typography_typography: 'custom',
                    typography_font_size: PX(16),
                    typography_letter_spacing: EM(0)
                  }),
                  createWidget('heading', {
                    title: 'Dipercayai oleh Perusahaan Nasional &amp; Multinasional Terkemuka',
                    header_size: 'span',
                    align: 'left',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(14),
                    typography_font_size_mobile: PX(12),
                    typography_font_weight: '500',
                    // text-slate-200 md:text-slate-600
                    custom_css: [
                      'selector .elementor-heading-title { color: #475569; }',
                      '@media (max-width: 767px) { selector .elementor-heading-title { color: #E2E8F0; } }'
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

// ==================================================================
// 2. BUSINESS JOURNEY  (src/components/BusinessJourney.jsx)
// ==================================================================
function buildBusinessJourney() {
  const cards = [
    {
      cat: 'VIRTUAL OFFICE',
      title: 'Mulai di Sini.',
      desc: 'Kehadiran bisnis profesional tanpa kantor permanen.',
      cta: 'Jelajahi Virtual Office',
      url: '/spaces/virtual-office',
      icon: 'fas fa-building'
    },
    {
      cat: 'SERVICED OFFICE',
      title: 'Bekerja di Sini.',
      desc: 'Ruang kerja siap pakai dengan fasilitas dan layanan sudah termasuk.',
      cta: 'Jelajahi Serviced Office',
      url: '/spaces/serviced-office',
      icon: 'fas fa-briefcase'
    },
    {
      cat: 'SOHO',
      title: 'Miliki di Sini.',
      desc: 'Kantor. Home office. Ruang tinggal. Satu ruang yang tumbuh bersama Anda. #FleksibelAja',
      cta: 'Jelajahi SOHO',
      url: '/spaces/soho',
      icon: 'fas fa-home'
    },
    {
      cat: 'PREMIUM OFFICE',
      title: 'Bertumbuh di Sini.',
      desc: 'Ruang profesional yang representatif, dibangun untuk mendukung babak berikutnya.',
      cta: 'Jelajahi Premium Office',
      url: '/spaces/premium-office',
      icon: 'fas fa-layer-group'
    }
  ];

  return section({
    pt: 128, ptMobile: 96, pb: 128, pbMobile: 96,
    bg: '#FFFFFF',
    borderBottom: 'rgba(226,232,240,0.8)',
    gap: 48,
    center: true,
    id: 'business-journey',
    children: [
      headerBlock(
        'SATU GEDUNG. BANYAK KEMUNGKINAN.',
        'Di Mana Posisi <br><span style="color:#EA8E18;">Bisnis Anda Sekarang?</span>',
        '<p>Apa pun tahap berikutnya, selalu ada ruang untuk Anda di HQuarters.</p>',
        { hSize: 48, hSizeTablet: 48, hSizeMobile: 30, hLeading: 1.25, maxWidth: 768, badgeTracking: EM(0.05) }
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          width: PCT(100),
          flex_gap: GAP(24)
        },
        cards.map((c) =>
          createContainer(
            {
              // React: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
              width: CUSTOM('calc((100% - 72px) / 4)'),
              width_tablet: CUSTOM('calc((100% - 24px) / 2)'),
              width_mobile: PCT(100),
              flex_direction: 'column',
              justify_content: 'space-between',
              flex_gap: GAP(0),
              padding: PAD(28, 28, 28, 28, true),
              border_radius: RAD(24),
              background_background: 'classic',
              background_color: 'rgba(248,250,252,0.8)',
              ...BORDER(1, 'rgba(226,232,240,0.8)'),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' },
              // hover -> bg #EA8E18 (React: hover:bg-[#EA8E18]) — hover fidelity is optional per brief
              custom_css: [
                'selector { transition: background-color .3s ease, border-color .3s ease, box-shadow .3s ease; }',
                'selector:hover { background-color: #EA8E18 !important; border-color: #EA8E18 !important; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }',
                'selector:hover h3, selector:hover p, selector:hover a, selector:hover span { color: #FFFFFF !important; }',
                'selector:hover .elementor-icon { color: #FFFFFF !important; }'
              ].join('\n')
            },
            [
              // space-y-4 wrapper
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'column',
                  flex_gap: GAP(16)
                },
                [
                  // top row: flex items-center justify-between
                  createContainer(
                    {
                      content_width: 'full',
                      flex_direction: 'row',
                      justify_content: 'space-between',
                      align_items: 'center',
                      flex_gap: GAP(10)
                    },
                    [
                      createWidget('heading', {
                        title: c.cat,
                        header_size: 'span',
                        align: 'left',
                        title_color: '#EA8E18',
                        typography_typography: 'custom',
                        typography_font_family: 'Plus Jakarta Sans',
                        typography_font_size: PX(11),
                        typography_font_weight: '800',
                        typography_text_transform: 'uppercase',
                        typography_letter_spacing: EM(0.05)
                      }),
                      // w-9 h-9 rounded-xl bg-white border border-slate-200/60
                      createContainer(
                        {
                          width: PX(36),
                          min_height: PX(36),
                          flex_direction: 'row',
                          justify_content: 'center',
                          align_items: 'center',
                          border_radius: RAD(12),
                          background_background: 'classic',
                          background_color: '#FFFFFF',
                          ...BORDER(1, 'rgba(226,232,240,0.6)'),
                          box_shadow_box_shadow_type: 'yes',
                          box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
                        },
                        [
                          createWidget('icon', {
                            selected_icon: { value: c.icon, library: 'fa-solid' },
                            primary_color: '#334155',
                            size: PX(16)
                          })
                        ]
                      )
                    ]
                  ),
                  // title + desc block
                  createContainer(
                    {
                      content_width: 'full',
                      flex_direction: 'column',
                      flex_gap: GAP(0)
                    },
                    [
                      createWidget('heading', {
                        title: c.title,
                        header_size: 'h3',
                        align: 'left',
                        title_color: '#0F172A',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: PX(24),
                        typography_font_weight: '500',
                        typography_line_height: EM(1.375),
                        _margin: MARGIN('', '', 8)
                      }),
                      createWidget('text-editor', {
                        editor: `<p>${c.desc}</p>`,
                        align: 'left',
                        text_color: '#475569',
                        typography_typography: 'custom',
                        typography_font_family: 'Plus Jakarta Sans',
                        typography_font_size: PX(14),
                        typography_font_weight: '400',
                        typography_line_height: EM(1.625)
                      })
                    ]
                  )
                ]
              ),
              // footer: pt-6 mt-6 border-t flex items-center justify-between text-xs font-bold text-slate-800
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  justify_content: 'space-between',
                  align_items: 'center',
                  padding: PAD(24, 0, 0, 0),
                  _margin: MARGIN(24, '', '', ''),
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false },
                  border_color: 'rgba(226,232,240,0.6)'
                },
                [
                  createWidget('heading', {
                    title: c.cta,
                    header_size: 'span',
                    align: 'left',
                    title_color: '#1E293B',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(12),
                    typography_font_weight: '700'
                  }),
                  createWidget('icon', {
                    selected_icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
                    primary_color: '#1E293B',
                    size: PX(16),
                    align: 'right'
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

// ==================================================================
// 3. ADDRESS STATEMENT  (src/components/AddressStatement.jsx)
// ==================================================================
function buildAddressStatement() {
  return section({
    pt: 128, ptMobile: 96, pb: 128, pbMobile: 96,
    bg: '#FFFFFF',
    borderBottom: 'rgba(226,232,240,0.8)',
    gap: 64,
    center: true,
    id: 'address-statement',
    children: [
      // text-center max-w-4xl mx-auto space-y-4
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
          createWidget('heading', {
            title: 'HQUARTERS &mdash; ASIA AFRIKA &mdash; BANDUNG',
            header_size: 'span',
            align: 'center',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(12),
            typography_font_weight: '700',
            typography_text_transform: 'uppercase',
            typography_letter_spacing: EM(0.1)
          }),
          // text-4xl sm:text-5xl lg:text-6xl leading-[1.15]
          createWidget('heading', {
            title: 'Alamat Anda Menyatakan Sesuatu <br><span style="color:#EA8E18;">Tentang Bisnis Anda.</span>',
            header_size: 'h2',
            align: 'center',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: PX(60),
            typography_font_size_tablet: PX(48),
            typography_font_size_mobile: PX(36),
            typography_font_weight: '500',
            typography_line_height: EM(1.15),
            typography_letter_spacing: EM(-0.025)
          }),
          createWidget('text-editor', {
            editor: '<p>Saat klien, mitra, atau kandidat datang, mereka membentuk kesan sebelum rapat dimulai. HQuarters menawarkan lingkungan bisnis yang modern dan profesional di distrik paling ikonik di Bandung.</p>',
            align: 'center',
            text_color: '#475569',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(18),
            typography_font_size_mobile: PX(16),
            typography_line_height: EM(1.625),
            custom_css: 'selector .elementor-widget-container { max-width: 672px; margin-left: auto; margin-right: auto; }'
          }),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              padding: PAD(8, 0, 0, 0)
            },
            [arrowLink('Lihat Lokasi', '/location', { size: 14, weight: '800' })]
          )
        ]
      ),

      // Building image: aspect-[16/9] sm:aspect-[21/9], rounded-xl sm:rounded-2xl
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          min_height: PX(300),
          min_height_tablet: PX(400),
          min_height_mobile: PX(300),
          border_radius: RAD(16),
          border_radius_mobile: RAD(12),
          overflow: 'hidden',
          flex_direction: 'row',
          align_items: 'flex-end',
          background_background: 'classic',
          background_color: '#0F172A',
          background_image: { url: '/addressstatement/21;9.webp' },
          background_position: 'center bottom',
          background_size: 'cover',
          ...BORDER(1, 'rgba(226,232,240,0.8)'),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' },
          custom_css: [
            'selector { aspect-ratio: 16 / 9; }',
            '@media (min-width: 640px) { selector { aspect-ratio: 21 / 9; } }',
            'selector .elementor-background-overlay {',
            '  background-image: linear-gradient(to top, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.20) 50%, rgba(2,6,23,0) 100%) !important;',
            '}'
          ].join('\n'),
          background_overlay_background: 'classic',
          background_overlay_color: 'rgba(2,6,23,0.4)',
          padding: PAD(40, 40, 40, 40, true),
          padding_mobile: PAD(24, 24, 24, 24, true)
        },
        [
          // Overlay bar: hidden sm:flex -> only from 640px up
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              flex_direction_mobile: 'column',
              justify_content: 'space-between',
                align_items: 'center',
                flex_gap: GAP(16),
                css: '@media (max-width: 639px) { selector { display: none !important; } }'
              },
            [
              createContainer(
                {
                  flex_direction: 'row',
                  align_items: 'center',
                  flex_gap: GAP(10)
                },
                [
                  createWidget('heading', {
                    title: '&#9679;',
                    header_size: 'span',
                    title_color: '#EA8E18',
                    typography_typography: 'custom',
                    typography_font_size: PX(14)
                  }),
                  createWidget('heading', {
                    title: 'HQUARTERS BUSINESS RESIDENCE &mdash; ASIA AFRIKA CBD',
                    header_size: 'span',
                    align: 'left',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: PX(14),
                    typography_font_size_mobile: PX(12),
                    typography_font_weight: '800',
                    typography_text_transform: 'uppercase',
                    typography_letter_spacing: EM(0.05)
                  })
                ]
              ),
              createWidget('button', {
                text: 'Lihat Lokasi',
                link: { url: '/location' },
                align: 'center',
                size: 'sm',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(12),
                typography_font_weight: '700',
                typography_text_transform: 'uppercase',
                typography_letter_spacing: EM(0.05),
                button_text_color: '#0F172A',
                background_color: 'rgba(255,255,255,0.9)',
                button_background_hover_color: '#FFFFFF',
                border_radius: RAD(9999),
                padding: PAD(10, 20, 10, 20, true)
              })
            ]
          )
        ]
      ),

      // Make The Right First Impression: rounded-2xl sm:rounded-[44px] p-8 sm:p-14 lg:p-16, max-w-4xl
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_tablet: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          padding: PAD(64, 64, 64, 64, true),
          padding_tablet: PAD(56, 56, 56, 56, true),
          padding_mobile: PAD(32, 32, 32, 32, true),
          border_radius: RAD(44),
          border_radius_mobile: RAD(16),
          background_background: 'classic',
          background_color: '#FFFFFF'
        },
        [
          createWidget('heading', {
            title: 'Buat <br><span style="color:#EA8E18;">Kesan Pertama yang Tepat.</span>',
            header_size: 'h3',
            align: 'center',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: PX(48),
            typography_font_size_tablet: PX(48),
            typography_font_size_mobile: PX(30),
            typography_font_weight: '500',
            typography_line_height: EM(1.25),
            typography_letter_spacing: EM(-0.025)
          }),
          createWidget('text-editor', {
            editor: '<p>Gedung yang baik bukan sekadar tampak bagus. Ia membuat klien merasa yakin, tim merasa bangga, dan bisnis terlihat siap untuk sesuatu yang lebih besar.</p>',
            align: 'center',
            text_color: '#475569',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(18),
            typography_font_size_mobile: PX(16),
            typography_line_height: EM(1.625),
            custom_css: 'selector .elementor-widget-container { max-width: 672px; margin-left: auto; margin-right: auto; }'
          })
        ]
      )
    ]
  });
}

// ==================================================================
// 4. PARTNERS  (src/components/Partners.jsx)
// ==================================================================
function buildPartners() {
  const logos = [
    'GF allianz', '7de axa', '9ef MSIG', '7i mitsubishi', '16j roche', '6FGH fwd',
    '19r avrist', '19 OP Dana-Logo', 'UG his travel', '16E henan sekuritas', 'huawei', 'GF B garuda'
  ];

  return section({
    pt: 56, pb: 56,
    bg: '#FFFFFF',
    borderBottom: 'rgba(226,232,240,0.8)',
    gap: 32,
    center: true,
    children: [
      // space-y-3 max-w-3xl mx-auto
      createContainer(
        {
          content_width: 'full',
          width: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(12)
        },
        [
          createWidget('heading', {
            title: "ANDA DI PERUSAHAAN YANG TEPAT",
            header_size: 'span',
            align: 'center',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(12),
            typography_font_weight: '700',
            typography_text_transform: 'uppercase',
            typography_letter_spacing: EM(0.1)
          }),
          createWidget('heading', {
            title: 'Dipercayai oleh Bisnis yang Memahami Nilai Alamat yang Tepat.',
            header_size: 'h2',
            align: 'center',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: PX(36),
            typography_font_size_tablet: PX(36),
            typography_font_size_mobile: PX(24),
            typography_font_weight: '500',
            typography_line_height: EM(1.25),
            typography_letter_spacing: EM(-0.025)
          })
        ]
      ),

      // flex flex-wrap justify-center gap-4 sm:gap-6 py-2 max-w-6xl
      createContainer(
        {
          content_width: 'full',
          width: PX(1152),
          width_tablet: PCT(100),
          width_mobile: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'center',
          align_items: 'center',
          flex_gap: GAP(24),
          flex_gap_mobile: GAP(16),
          padding: PAD(8, 0, 8, 0)
        },
        logos.map((name) =>
          createContainer(
            {
              // React: h-28 sm:h-32 (112 / 128), w-[calc(50%-0.5rem)] sm:w-56 (224), p-3 sm:p-4
              width: PX(224),
              width_mobile: CUSTOM('calc(50% - 0.5rem)'),
              min_height: PX(128),
              min_height_mobile: PX(112),
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              padding: PAD(16, 16, 16, 16, true),
              padding_mobile: PAD(12, 12, 12, 12, true),
              border_radius: RAD(16),
              overflow: 'hidden',
              background_background: 'classic',
              background_color: 'rgba(248,250,252,0.7)',
              ...BORDER(1, 'rgba(226,232,240,0.8)'),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  min_height: PX(96),
                  min_height_mobile: PX(88),
                  background_background: 'classic',
                  background_image: { url: `/homepagelogobaru/${name}.webp` },
                  background_position: 'center center',
                  background_size: 'contain',
                  background_repeat: 'no-repeat'
                },
                []
              )
            ]
          )
        )
      ),

      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          justify_content: 'center',
          align_items: 'center',
          padding: PAD(8, 0, 0, 0)
        },
        [arrowLink('Kenali Komunitas Bisnis HQuarters', '/companies', { size: 16, sizeMobile: 14, weight: '600', align: 'center' })]
      )
    ]
  });
}

// ==================================================================
// 5. BUILDING HIGHLIGHTS  (src/components/BuildingHighlights.jsx)
// ==================================================================
function buildBuildingHighlights() {
  const items = [
    { title: 'Kedatangan Premium', desc: 'Lobby representatif & lingkungan profesional.', icon: 'fas fa-star', url: '/building#infrastructure' },
    { title: 'Siap Bisnis', desc: 'Fasilitas rapat, konektivitas, dan manajemen gedung profesional.', icon: 'fas fa-briefcase', url: '/building#infrastructure' },
    { title: 'Keamanan 24/7', desc: 'Keamanan gedung berlapis dan akses terkendali.', icon: 'fas fa-shield-alt', url: '/building#security' },
    { title: 'Parkir Mudah', desc: 'Parkir berkapasitas besar didukung sistem parkir mekanikal.', icon: 'fas fa-car', url: '/building#parking' },
    { title: 'Kesehatan & Kebugaran', desc: 'Gym, sauna, dan kolam renang air hangat.', icon: 'fas fa-water', url: '/building#building-amenities' },
    { title: 'Terhubung', desc: 'Di pusat aktivitas bisnis dan kota Bandung.', icon: 'fas fa-map-marker-alt', url: '/location' }
  ];

  return section({
    pt: 128, ptMobile: 96, pb: 128, pbMobile: 96,
    bg: '#FFFFFF',
    borderBottom: 'rgba(226,232,240,0.8)',
    gap: 48,
    center: true,
    id: 'building-highlights',
    children: [
      headerBlock(
        'GEDUNG',
        'Dibangun untuk Bisnis. <br><span style="color:#EA8E18;">Dirancang untuk Hidup.</span>',
        null,
        { hSize: 48, hSizeTablet: 48, hSizeMobile: 36, hLeading: 1.25, maxWidth: 768, badgeTracking: EM(0.1) }
      ),
      // grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          width: PCT(100),
          flex_gap: GAP(24)
        },
        items.map((it) =>
          createContainer(
            {
              // React: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
              width: CUSTOM('calc((100% - 48px) / 3)'),
              width_tablet: CUSTOM('calc((100% - 24px) / 2)'),
              width_mobile: PCT(100),
              flex_direction: 'column',
              justify_content: 'space-between',
              flex_gap: GAP(0),
              padding: PAD(32, 32, 32, 32, true),
              border_radius: RAD(16),
              background_background: 'classic',
              background_color: 'rgba(248,250,252,0.8)',
              ...BORDER(1, 'rgba(226,232,240,0.8)')
            },
            [
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'column',
                  flex_gap: GAP(0)
                },
                [
                  // w-12 h-12 rounded-xl bg-white border border-slate-200 mb-6
                  createContainer(
                    {
                      width: PX(48),
                      min_height: PX(48),
                      flex_direction: 'row',
                      justify_content: 'center',
                      align_items: 'center',
                      border_radius: RAD(12),
                      background_background: 'classic',
                      background_color: '#FFFFFF',
                      ...BORDER(1, '#E2E8F0'),
                      _margin: MARGIN('', '', 24)
                    },
                    [
                      createWidget('icon', {
                        selected_icon: { value: it.icon, library: 'fa-solid' },
                        primary_color: '#1E293B',
                        size: PX(24)
                      })
                    ]
                  ),
                  createWidget('heading', {
                    title: it.title,
                    header_size: 'h3',
                    align: 'left',
                    title_color: '#0F172A',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: PX(20),
                    typography_font_weight: '500',
                    typography_line_height: EM(1.375),
                    _margin: MARGIN('', '', 8)
                  }),
                  createWidget('text-editor', {
                    editor: `<p>${it.desc}</p>`,
                    align: 'left',
                    text_color: '#475569',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(14),
                    typography_font_weight: '400',
                    typography_line_height: EM(1.625)
                  })
                ]
              ),
              // pt-5 mt-4 border-t flex items-center gap-1.5 text-xs font-bold text-[#EA8E18]
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  align_items: 'center',
                  flex_gap: GAP(6),
                  padding: PAD(20, 0, 0, 0),
                  _margin: MARGIN(16, '', '', ''),
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false },
                  border_color: 'rgba(226,232,240,0.6)'
                },
                [
                  createWidget('heading', {
                    title: 'Lihat Fitur',
                    header_size: 'span',
                    align: 'left',
                    title_color: '#EA8E18',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(12),
                    typography_font_weight: '700'
                  }),
                  createWidget('icon', {
                    selected_icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
                    primary_color: '#EA8E18',
                    size: PX(14)
                  })
                ]
              )
            ]
          )
        )
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          justify_content: 'center',
          align_items: 'center',
          padding: PAD(8, 0, 0, 0)
        },
        [arrowLink('Jelajahi Gedung', '/building', { size: 14, weight: '700' })]
      )
    ]
  });
}

// ==================================================================
// 6. BOTTOM CTA  (src/components/CTA.jsx)
// ==================================================================
function buildCTA() {
  return section({
    pt: 112, ptMobile: 80, pb: 64, pbMobile: 48,
    bg: '#231F20',
    id: 'contact',
    center: true,
    gap: 24,
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
          createWidget('heading', {
            title: 'Ke Mana Bisnis Anda <br><span style="color:#EA8E18;">Akan Melangkah?</span>',
            header_size: 'h2',
            align: 'center',
            title_color: '#FFFFFF',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: PX(52),
            typography_font_size_tablet: PX(48),
            typography_font_size_mobile: PX(30),
            typography_font_weight: '500',
            typography_line_height: EM(1.15),
            typography_letter_spacing: EM(-0.025)
          }),
          createWidget('text-editor', {
            editor: '<p>Mulai dari sebuah alamat. Bangun tim Anda. Miliki ruang Anda. Atau pindahkan perusahaan Anda ke kantor pusat berikutnya. Apa pun tahap berikutnya, mulai dari HQuarters.</p>',
            align: 'center',
            text_color: '#CBD5E1',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(18),
            typography_font_size_mobile: PX(16),
            typography_line_height: EM(1.625),
            custom_css: 'selector .elementor-widget-container { max-width: 672px; margin-left: auto; margin-right: auto; }'
          }),
          // button wrapper pt-2 sm:pt-4
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
              createWidget('button', {
                text: 'Cari Ruang Saya &nbsp;&rarr;',
                link: { url: '/find-space' },
                align: 'center',
                size: 'md',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(16),
                typography_font_size_mobile: PX(14),
                typography_font_weight: '600',
                button_text_color: '#FFFFFF',
                background_color: '#EA8E18',
                button_background_hover_color: '#D88010',
                border_radius: RAD(9999),
                padding: PAD(16, 36, 16, 36, true),
                box_shadow_box_shadow_type: 'yes',
                box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 15, spread: -3, color: 'rgba(234,142,24,0.25)' }
              })
            ]
          )
        ]
      )
    ]
  });
}

// ==================================================================
// ASSEMBLE  (src/pages/HomePage.jsx order)
// ==================================================================
console.log('Generating homepage-id.json ...');
exportElementorTemplate('HQuarters - Homepage', [
  buildHero(),
  buildBusinessJourney(),
  buildAddressStatement(),
  buildPartners(),
  buildBuildingHighlights(),
  buildCTA()
], 'homepage-id.json');
console.log('Done.');
