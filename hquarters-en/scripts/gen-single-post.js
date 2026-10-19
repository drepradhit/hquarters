// Generates theme-single-post.json  — Elementor Theme Builder template
//
// Source of truth (read directly, do not guess):
//   src/pages/ArticleDetailPage.jsx   (331 lines)
//   src/components/CTA.jsx
//   src/lib/wp.js
//
// React section order (ArticleDetailPage.jsx):
//   73   <main class="pt-24 sm:pt-28 space-y-16">
//   78   1. header    max-w-[1040px] px-4 sm:px-6 space-y-6   (gap 24)
//          · breadcrumb  text-xs sm:text-sm font-medium text-slate-500
//          · "Back to Insights" button  text-xs font-bold text-slate-600
//          · h1 text-3xl sm:text-5xl lg:text-6xl leading-[1.14]
//          · subtitle   text-lg sm:text-xl text-slate-600
//   134  2. image     max-w-[1200px] rounded-2xl aspect-[16/9] border shadow-2xl
//   152  3. content   max-w-[800px] space-y-10 text-slate-700 text-base sm:text-lg
//   256  4. related   max-w-[1440px] space-y-8 pt-8 border-t border-slate-200/80
//   318  5. CTA       "Ready to Upgrade Your / Business Space?" -> "Explore Spaces"
//
// DYNAMIC DATA
//   Post Title     -> __dynamic__ post-title
//   Post Excerpt   -> __dynamic__ post-excerpt
//   Featured Image -> __dynamic__ post-featured-image
//   Post Content   -> __dynamic__ post-content
//
// The static values are kept as fallbacks so nothing renders blank if a
// dynamic tag is unavailable (Elementor Free, or tag renamed).
//
// IMPORTANT — not expressible in JSON, set manually after import:
//   1. Display condition:  Templates > Theme Builder > Single > set to "All Posts"
//   2. Dynamic tags are Elementor Pro only.
//
// NOT ported (deliberate):
//   · handleCopyLink / `copied` state  — declared in React but never called
//   · authorRole                       — declared but never rendered
//   · FALLBACK_ARTICLE_DETAILS branch  — static demo content, superseded by real posts
//
// Related Articles uses the native Posts widget (skin: cards) rather than a
// Loop Item template, per the "keep it simple" decision. Visual fidelity to the
// React cards is roughly 85%.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button,
  dynamic, withDynamic, postsWidget,
  COLORS
} from './lib/elementor.js';

// Breadcrumb (ArticleDetailPage.jsx:80-103)
// React renders: Home › Insights › {title}
// The title is split into its own widget so it can carry a dynamic tag
// (a dynamic tag replaces a whole control, so it cannot sit inside the
// static breadcrumb markup).
function buildBreadcrumb() {
  return createContainer(
    {
      content_width: 'full',
      width: PCT(100),
      flex_direction: 'row',
      flex_wrap: 'wrap',
      align_items: 'center',
      flex_gap: GAP(8)
    },
    [
      createWidget('heading', {
        title: [
          '<a href="/" style="color:#64748B;text-decoration:none;">Home</a>',
          '<span style="color:#CBD5E1;">&rsaquo;</span>',
          '<a href="/insights" style="color:#64748B;text-decoration:none;">Insights</a>',
          '<span style="color:#CBD5E1;">&rsaquo;</span>'
        ].join(' &nbsp; '),
        header_size: 'span',
        align: 'left',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: PX(14),
        typography_font_size_mobile: PX(12)
      }),
      createWidget('heading', withDynamic({
        title: 'Post Title',
        header_size: 'span',
        align: 'left',
        title_color: COLORS.heading,
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: PX(14),
        typography_font_size_mobile: PX(12),
        typography_font_weight: '700',
        // React: line-clamp-1
        custom_css: 'selector .elementor-heading-title { display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:520px; }\n@media (max-width:767px){ selector .elementor-heading-title { max-width:200px; } }'
      }, 'title', 'post-title'))
    ]
  );
}

// ------------------------------------------------------------------
// 1. Header section
// ------------------------------------------------------------------
function buildHeaderSection() {
  return section({
    pt: 112, ptMobile: 96,   // main pt-24 sm:pt-28
    pb: 0,
    bg: COLORS.surface,
    gap: 64,                 // main space-y-16
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PX(1040),
          width_mobile: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(24),   // section space-y-6
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          buildBreadcrumb(),
          // "Back to Insights" — link styled as a button (ArticleDetailPage.jsx:107-116)
          createWidget('button', {
            text: '&larr; Back to Insights',
            link: { url: '/insights' },
            align: 'left',
            size: 'xs',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(12),
            typography_font_weight: '700',
            button_text_color: '#475569',
            background_color: 'rgba(0,0,0,0)',
            button_background_hover_color: 'rgba(0,0,0,0)',
            padding: PAD(0, 0, 0, 0)
          }),
          // h1 text-3xl sm:text-5xl lg:text-6xl leading-[1.14]
          createWidget('heading', withDynamic({
            title: 'Post Title',
            header_size: 'h1',
            align: 'left',
            title_color: COLORS.heading,
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: PX(60),
            typography_font_size_tablet: PX(48),
            typography_font_size_mobile: PX(30),
            typography_font_weight: '500',
            typography_line_height: EM(1.14),
            typography_letter_spacing: EM(-0.025)
          }, 'title', 'post-title')),
          // subtitle: React uses `article.subtitle || article.excerpt`
          createWidget('text-editor', withDynamic({
            editor: '<p>Post excerpt appears here.</p>',
            align: 'left',
            text_color: '#475569',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(20),
            typography_font_size_mobile: PX(18),
            typography_line_height: EM(1.625)
          }, 'editor', 'post-excerpt'))
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 2. Featured image  (ArticleDetailPage.jsx:134-147)
// ------------------------------------------------------------------
function buildImageSection() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PX(1200),
          width_mobile: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(0),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          // rounded-2xl overflow-hidden border border-slate-200/80 aspect-[16/9] shadow-2xl bg-slate-900
          createContainer(
            {
              content_width: 'full',
              width: PCT(100),
              min_height: PX(560),
              min_height_tablet: PX(420),
              min_height_mobile: PX(240),
              border_radius: RAD(16),
              overflow: 'hidden',
              background_background: 'classic',
              background_color: '#0F172A',
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' },
              custom_css: 'selector { aspect-ratio: 16 / 9; }'
            },
            [
              // object-cover object-bottom, filled by the featured image dynamic tag
              createWidget('image', withDynamic({
                image: { url: '/LOGO/hquarters-logo-wordmark.webp' },
                image_size: 'full',
                align: 'center',
                width: PCT(100),
                custom_css: 'selector { width:100%; height:100%; }\nselector img { width:100%; height:100%; object-fit:cover; object-position:bottom; display:block; }'
              }, 'image', 'post-featured-image'))
            ]
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 3. Post content
// ------------------------------------------------------------------
function buildContentSection() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PX(800),
          width_mobile: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(0),
          custom_css: [
            'selector { margin-left:auto; margin-right:auto; }',
            // article-body typography, matching text-slate-700 text-base sm:text-lg leading-relaxed
            'selector .elementor-widget-text-editor p { color:#334155; font-size:18px; line-height:1.625; margin-bottom:24px; }',
            'selector .elementor-widget-text-editor h2 { font-family:Outfit,sans-serif; font-weight:500; font-size:30px; line-height:1.25; color:#0F172A; margin:40px 0 16px; }',
            'selector .elementor-widget-text-editor h3 { font-family:Outfit,sans-serif; font-weight:500; font-size:24px; color:#0F172A; margin:32px 0 12px; }',
            'selector .elementor-widget-text-editor ul, selector .elementor-widget-text-editor ol { padding-left:24px; margin-bottom:24px; }',
            'selector .elementor-widget-text-editor li { color:#334155; font-size:18px; line-height:1.625; margin-bottom:8px; }',
            'selector .elementor-widget-text-editor img { border-radius:12px; margin:32px 0; }',
            'selector .elementor-widget-text-editor a { color:#EA8E18; text-decoration:underline; }',
            'selector .elementor-widget-text-editor blockquote { border-left:4px solid #EA8E18; padding-left:20px; font-style:italic; color:#475569; margin:32px 0; }',
            '@media (max-width:767px) { selector .elementor-widget-text-editor p, selector .elementor-widget-text-editor li { font-size:16px; } }'
          ].join('\n')
        },
        [
          createWidget('text-editor', withDynamic({
            editor: '<p>Post content appears here.</p>',
            align: 'left',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(18),
            typography_line_height: EM(1.625)
          }, 'editor', 'post-content'))
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 4. Related articles  — native Posts widget (skin: cards)
// ------------------------------------------------------------------
function buildRelatedSection() {
  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    children: [
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(32),   // space-y-8
          padding: PAD(32, 0, 0, 0),
          ...BORDER_SIDE('top', COLORS.borderSoft)
        },
        [
          // header row: flex-col sm:flex-row justify-between gap-4 border-b pb-4
          createContainer(
            {
              content_width: 'full',
              width: PCT(100),
              flex_direction: 'row',
              flex_direction_mobile: 'column',
              justify_content: 'space-between',
              align_items: 'flex-end',
              align_items_mobile: 'flex-start',
              flex_gap: GAP(16),
              padding: PAD(0, 0, 16, 0),
              ...BORDER_SIDE('bottom', COLORS.borderSoft)
            },
            [
              createContainer(
                {
                  flex_direction: 'column',
                  flex_gap: GAP(4)   // space-y-1
                },
                [
                  // text-xs font-bold text-[#EA8E18] uppercase tracking-wider
                  heading('CONTINUE READING', {
                    tag: 'span',
                    align: 'left',
                    color: COLORS.orange,
                    size: 12,
                    weight: '700',
                    tracking: 0.05,
                    transform: 'uppercase'
                  }),
                  // text-2xl sm:text-3xl
                  heading('Related Articles & Insights', {
                    tag: 'h2',
                    align: 'left',
                    size: 30,
                    sizeMobile: 24,
                    weight: '500',
                    tracking: -0.025
                  })
                ]
              ),
              // "View All Articles" link
              createWidget('button', {
                text: 'View All Articles &nbsp;&rarr;',
                link: { url: '/insights' },
                align: 'right',
                size: 'xs',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(12),
                typography_font_weight: '700',
                button_text_color: COLORS.orange,
                background_color: 'rgba(0,0,0,0)',
                button_background_hover_color: 'rgba(0,0,0,0)',
                padding: PAD(0, 0, 0, 0)
              })
            ]
          ),
          // Native Posts widget — card styling tuned to approach the React cards
          postsWidget({
            perPage: 3,
            columns: 3,
            columnsTablet: 2,
            columnsMobile: 1,
            titleTag: 'h3',
            excerptLength: 18,
            readMoreText: 'Read Article',
            custom_css: [
              'selector .elementor-post { background:#FFFFFF; border-radius:12px; border:1px solid rgba(226,232,240,0.8); box-shadow:0 1px 2px rgba(0,0,0,.05); overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; }',
              'selector .elementor-post__thumbnail { border-radius:0; margin:0; }',
              'selector .elementor-post__thumbnail img { aspect-ratio:16/10; object-fit:cover; object-position:bottom; }',
              'selector .elementor-post__text { padding:24px; }',
              'selector .elementor-post__title, selector .elementor-post__title a { font-family:Outfit,sans-serif; font-weight:500; font-size:20px; line-height:1.375; color:#0F172A; }',
              'selector .elementor-post__title a:hover { color:#EA8E18; }',
              'selector .elementor-post__excerpt p { color:#475569; font-family:"Plus Jakarta Sans",sans-serif; font-size:14px; line-height:1.625; }',
              'selector .elementor-post__read-more { color:#EA8E18; font-family:"Plus Jakarta Sans",sans-serif; font-size:12px; font-weight:700; padding:8px 24px 24px; margin:0; }',
              'selector .elementor-posts-container { gap:24px; }'
            ].join('\n')
          })
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 5. CTA  (ArticleDetailPage.jsx:318-325 -> CTA.jsx)
// ------------------------------------------------------------------
function buildCTA() {
  return section({
    pt: 112, ptMobile: 80,
    pb: 64, pbMobile: 48,
    bg: COLORS.dark,
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
          heading('Ready to Upgrade Your <br><span style="color:#EA8E18;">Business Space?</span>', {
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
            '<p>Schedule a private building tour or consult directly with our space specialists for your organization.</p>',
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
            // props: buttonText="Explore Spaces" pageTarget="spaces"
            [button('Explore Spaces &nbsp;&rarr;', '/spaces', {
              fontSize: 16,
              fontSizeMobile: 14,
              weight: '600',
              radius: 9999,
              py: 16,
              px: 36,
              shadow: { y: 10, blur: 15, spread: -3, color: 'rgba(234,142,24,0.25)' }
            })]
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// Export as a Theme Builder "single" template
// ------------------------------------------------------------------
const elements = [
  buildHeaderSection(),
  buildImageSection(),
  buildContentSection(),
  buildRelatedSection(),
  buildCTA()
];

import fs from 'fs';
fs.writeFileSync(
  'theme-single-post.json',
  JSON.stringify({ version: '0.4', title: 'HQuarters - Article Detail', type: 'single', content: elements }, null, 2),
  'utf-8'
);
console.log('  theme-single-post.json');
console.log('Done.');
