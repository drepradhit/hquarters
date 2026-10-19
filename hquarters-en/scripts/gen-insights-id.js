// Generates page-insights-id.json  — DYNAMIC version
//
// Source of truth (read directly, do not guess):
//   src/pages/InsightsPage.jsx        -> <main class="pt-24 sm:pt-28"> (NO space-y), CTA props
//   src/components/InsightsSection.jsx
//   src/components/CTA.jsx
//
// React structure (InsightsSection.jsx):
//   24  <section id="insights" class="pt-4 sm:pt-6 pb-16 bg-white">
//   25    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
//   30      header    text-center max-w-4xl mx-auto space-y-3   (gap 12)
//   42      featured  bg-slate-900 rounded-xl sm:rounded-2xl, grid lg:grid-cols-12 gap-0
//                       left  lg:col-span-7  p-8 sm:p-12 text-white
//                       right lg:col-span-5  min-h-[300px]
//   102     grid      grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
//
// WHAT CHANGED FROM THE STATIC VERSION
//   The previous file hardcoded 6 titles from FALLBACK_ARTICLES. React actually
//   calls fetchArticles() against the WordPress REST API, so any new post must
//   appear automatically. Both the featured card and the grid are now native
//   Elementor Posts widgets reading from WordPress.
//
//   The featured card's dark 7/5 split is reproduced through custom_css on the
//   Posts widget markup, since the widget itself has no such layout. Expect
//   roughly 85% visual fidelity and verify after import.
//
//   Read time is computed client-side in React (estimateReadTime) and has no
//   Elementor equivalent, so the meta line is limited to the post date.
//
// InsightsPage.jsx CTA props DO include a description here.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button, postsWidget,
  COLORS
} from './lib/elementor.js';

// ------------------------------------------------------------------
// 1. InsightsSection.jsx
// ------------------------------------------------------------------
function buildInsightsSection() {
  return section({
    // main pt-24 sm:pt-28 + section pt-4 sm:pt-6 = 112 / 136 ; pb-16 (64)
    pt: 112, ptTablet: 136, ptMobile: 112,
    pb: 64,
    bg: COLORS.surface,
    gap: 64,   // space-y-16
    id: 'insights',
    children: [
      // header: text-center max-w-4xl mx-auto space-y-3 (gap 12)
      createContainer(
        {
          content_width: 'full',
          width: PX(896),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(12),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          heading('Ruang Lebih Baik. Keputusan Lebih Baik.', {
            tag: 'h1',
            align: 'center',
            size: 60,
            sizeTablet: 48,
            sizeMobile: 36,
            leading: 1.25,
            tracking: -0.025
          }),
          para(
            '<p>Wawasan untuk bisnis, wirausaha, dan profesional yang memilih di mana dan bagaimana mereka bekerja.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          )
        ]
      ),

      // ---- Featured article (React: articles[0]) ----
      // Native Posts widget, 1 post, restyled to the dark 7/5 split card.
      postsWidget({
        perPage: 1,
        columns: 1,
        columnsTablet: 1,
        columnsMobile: 1,
        titleTag: 'h2',
        excerptLength: 20,
        showReadMore: false,
        custom_css: [
          // Force single card full width even if columns was set to 3
          'selector .elementor-posts-container { display:block !important; width:100% !important; margin:0 !important; }',
          'selector .elementor-post:not(:first-child) { display:none !important; }',
          'selector .elementor-post { width:100% !important; max-width:100% !important; margin:0 !important; background:#0F172A !important; border-radius:16px !important; border:1px solid rgba(226,232,240,0.8) !important; overflow:hidden !important; box-shadow:0 25px 50px -12px rgba(0,0,0,.25) !important; display:flex !important; flex-direction:row-reverse !important; align-items:stretch !important; }',
          // Support both Classic skin and Cards skin (.elementor-post__card)
          'selector .elementor-post__card { width:100% !important; height:100% !important; display:flex !important; flex-direction:row-reverse !important; align-items:stretch !important; background:transparent !important; border:none !important; box-shadow:none !important; margin:0 !important; padding:0 !important; }',
          // Hide Elementor cards skin extra elements
          'selector .elementor-post__badge, selector .elementor-post__avatar { display:none !important; }',
          // Right column: image, 42% width, 100% full height without any bottom gap
          'selector .elementor-post__thumbnail__wrapper, selector .elementor-post__thumbnail__link { flex:0 0 42% !important; width:42% !important; height:100% !important; align-self:stretch !important; display:flex !important; margin:0 !important; padding:0 !important; border-radius:0 !important; }',
          'selector .elementor-post__thumbnail { flex:1 1 100% !important; width:100% !important; height:100% !important; padding-bottom:0 !important; margin:0 !important; border-radius:0 !important; display:flex !important; }',
          'selector .elementor-post__thumbnail img, selector .elementor-post__thumbnail__wrapper img { position:static !important; width:100% !important; height:100% !important; min-height:100% !important; object-fit:cover !important; object-position:center bottom !important; display:block !important; }',
          // Left column: text, 58% width, padding 48px
          'selector .elementor-post__text { flex:1 1 58% !important; width:58% !important; padding:48px !important; display:flex !important; flex-direction:column !important; justify-content:space-between !important; box-sizing:border-box !important; }',
          // Badge "FEATURED ARTICLE"
          'selector .elementor-post__text::before { content:"FEATURED ARTICLE"; display:inline-block; width:fit-content; background:#E8860B; color:#FFFFFF; font-family:"Plus Jakarta Sans",sans-serif; font-size:12px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; padding:4px 12px; border-radius:6px; margin-bottom:20px; }',
          // Title
          'selector .elementor-post__title, selector .elementor-post__title a { color:#FFFFFF !important; font-family:Outfit,sans-serif !important; font-weight:500 !important; font-size:40px !important; line-height:1.25 !important; margin-bottom:16px !important; text-decoration:none !important; }',
          'selector .elementor-post__title a:hover { color:#FBBF24 !important; }',
          // Excerpt: strictly clamped to max 3 lines to prevent tall cards
          'selector .elementor-post__excerpt { margin-bottom:20px !important; }',
          'selector .elementor-post__excerpt, selector .elementor-post__excerpt p { color:#CBD5E1 !important; font-family:"Plus Jakarta Sans",sans-serif !important; font-size:15px !important; line-height:1.6 !important; display:-webkit-box !important; -webkit-line-clamp:3 !important; -webkit-box-orient:vertical !important; overflow:hidden !important; text-overflow:ellipsis !important; margin:0 !important; }',
          // Meta (date)
          'selector .elementor-post__meta-data { border-top:1px solid rgba(255,255,255,0.15) !important; padding-top:16px !important; margin-top:auto !important; }',
          'selector .elementor-post__meta-data span { color:#94A3B8 !important; font-size:13px !important; font-family:"Plus Jakarta Sans",sans-serif !important; }',
          // Responsive: stack on tablet and mobile
          '@media (max-width:1023px) {',
          '  selector .elementor-post, selector .elementor-post__card { flex-direction:column !important; }',
          '  selector .elementor-post__thumbnail__wrapper, selector .elementor-post__thumbnail__link, selector .elementor-post__thumbnail { flex:0 0 auto !important; width:100% !important; min-height:240px !important; max-height:320px !important; }',
          '  selector .elementor-post__thumbnail img { min-height:240px !important; max-height:320px !important; }',
          '  selector .elementor-post__text { flex:1 1 auto !important; width:100% !important; padding:28px !important; }',
          '  selector .elementor-post__title, selector .elementor-post__title a { font-size:26px !important; }',
          '}'
        ].join('\n')
      }),

      // ---- Article grid (React maps ALL articles) ----
      postsWidget({
        perPage: 12,
        columns: 3,
        columnsTablet: 2,
        columnsMobile: 1,
        titleTag: 'h3',
        excerptLength: 20,
        readMoreText: 'Read Article',
        custom_css: [
          'selector .elementor-posts-container { gap:24px; }',
          'selector .elementor-post { background:#FFFFFF; border-radius:12px; border:1px solid rgba(226,232,240,0.8); box-shadow:0 1px 2px rgba(0,0,0,.05); overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; }',
          'selector .elementor-post__thumbnail { border-radius:0; margin:0; }',
          'selector .elementor-post__thumbnail img { aspect-ratio:16/10; object-fit:cover; object-position:bottom; }',
          'selector .elementor-post__text { padding:24px 24px 0; }',
          'selector .elementor-post__title, selector .elementor-post__title a { font-family:Outfit,sans-serif; font-weight:500; font-size:20px; line-height:1.375; color:#0F172A; }',
          'selector .elementor-post__title a:hover { color:#EA8E18; }',
          'selector .elementor-post__excerpt, selector .elementor-post__excerpt p { color:#475569; font-family:"Plus Jakarta Sans",sans-serif; font-size:14px; line-height:1.625; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; text-overflow:ellipsis; }',
          'selector .elementor-post__read-more { color:#EA8E18; font-family:"Plus Jakarta Sans",sans-serif; font-size:12px; font-weight:700; padding:8px 24px 24px; margin:0; border-top:1px solid #F1F5F9; width:100%; }'
        ].join('\n')
      })
    ]
  });
}

// ------------------------------------------------------------------
// 2. CTA.jsx  (InsightsPage.jsx props — description IS provided here)
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
          heading('Siap Meningkatkan <br><span style="color:#EA8E18;">Ruang Bisnis Anda?</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 52,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.15,
            tracking: -0.025
          }),
          para(
            '<p>Jadwalkan tur privat gedung atau berkonsultasi langsung dengan spesialis ruang kami untuk organisasi Anda.</p>',
            {
              align: 'center',
              color: '#CBD5E1',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          ),
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
              button('Cari Ruang Saya &nbsp;&rarr;', '/find-space', {
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
console.log('Generating page-insights-id.json (dynamic) ...');
exportElementorTemplate('HQuarters - Insights', [
  buildInsightsSection(),
  buildCTA()
], 'page-insights-id.json');
console.log('Done.');
