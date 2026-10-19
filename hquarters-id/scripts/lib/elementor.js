// Shared helpers for Elementor JSON generation.
//
// Tailwind -> Elementor breakpoint mapping
//   base (<640)  -> mobile  (<768)
//   sm  (>=640)  -> tablet  (768-1023)  [640-767 window has no Elementor equivalent]
//   md  (>=768)  -> tablet  (768-1023)
//   lg  (>=1024) -> desktop (>=1024)
//
// Tailwind scale: 1=4 2=8 3=12 4=16 5=20 6=24 7=28 8=32 9=36 10=40
//                 12=48 14=56 16=64 20=80 24=96 28=112 32=128

import fs from 'fs';

export const COLORS = {
  orange: '#EA8E18',
  orangeDark: '#D88010',
  orangeDeep: '#E8860B',
  orangeSoft: '#FBA93C',
  orangeTint: '#FEF3E2',
  orangeIcon: '#B86807',
  heading: '#0F172A',
  body: '#475569',
  bodySoft: '#64748B',
  border: '#E2E8F0',
  borderSoft: 'rgba(226,232,240,0.8)',
  surface: '#FFFFFF',
  surfaceAlt: 'rgba(248,250,252,0.8)',
  surfaceCream: '#FAF8F5',
  dark: '#231F20',
  darkCard: '#161A25'
};

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function createContainer(settings = {}, elements = []) {
  const s = {
    content_width: 'full',
    ...settings
  };
  return { id: generateId(), elType: 'container', isInner: false, settings: s, elements };
}

export function createWidget(widgetType, settings = {}) {
  return { id: generateId(), elType: 'widget', widgetType, settings, elements: [] };
}

export function exportElementorTemplate(title, elements, filename) {
  fs.writeFileSync(filename, JSON.stringify({ version: '0.4', title, type: 'page', content: elements }, null, 2), 'utf-8');
  console.log(`  ${filename}`);
}

export const PX = (v) => ({ unit: 'px', size: v });
export const PCT = (v) => ({ unit: '%', size: v });
export const EM = (v) => ({ unit: 'em', size: v });
export const CUSTOM = (v) => ({ unit: 'custom', size: v });
export const GAP = (c, r = c) => ({ column: String(c), row: String(r), unit: 'px' });

export const PAD = (t, r, b, l, linked = false) => ({
  unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: linked
});

export const RAD = (v) => ({
  unit: 'px', top: String(v), right: String(v), bottom: String(v), left: String(v), isLinked: true
});

// Only emit sides that are set — Elementor treats missing keys as unset.
export function MARGIN(t, r, b, l) {
  const m = { unit: 'px', isLinked: false };
  if (t !== undefined && t !== '') m.top = String(t);
  if (r !== undefined && r !== '') m.right = String(r);
  if (b !== undefined && b !== '') m.bottom = String(b);
  if (l !== undefined && l !== '') m.left = String(l);
  return m;
}

export function BORDER(v, color) {
  return {
    border_border: 'solid',
    border_width: { unit: 'px', top: String(v), right: String(v), bottom: String(v), left: String(v), isLinked: true },
    border_color: color
  };
}

// Border only on one side (React: border-t / border-b)
export function BORDER_SIDE(side, color, width = 1) {
  const w = { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: false };
  w[side] = String(width);
  return { border_border: 'solid', border_width: w, border_color: color };
}

// Grid column width that keeps the exact Tailwind gap.
// cols = desktop column count, gapPx = Tailwind gap in px
export function GRID(cols, gapPx) {
  return CUSTOM(`calc((100% - ${(cols - 1) * gapPx}px) / ${cols})`);
}

// Outer page section: boxed 1440, px-4 / sm:px-6 / lg:px-8 (+ explicit vertical padding)
export function section(opts) {
  const s = {
    content_width: 'boxed',
    boxed_width: PX(1440),
    flex_direction: 'column',
    padding: PAD(opts.pt, 32, opts.pb, 32),
    padding_tablet: PAD(opts.ptTablet !== undefined ? opts.ptTablet : opts.pt, 24, opts.pbTablet !== undefined ? opts.pbTablet : opts.pb, 24),
    padding_mobile: PAD(opts.ptMobile !== undefined ? opts.ptMobile : opts.pt, 16, opts.pbMobile !== undefined ? opts.pbMobile : opts.pb, 16)
  };
  if (opts.gap !== undefined) s.flex_gap = GAP(opts.gap);
  if (opts.borderBottom) Object.assign(s, BORDER_SIDE('bottom', opts.borderBottom));
  if (opts.bg) { s.background_background = 'classic'; s.background_color = opts.bg; }
  if (opts.id) s._element_id = opts.id;
  if (opts.center) { s.align_items = 'center'; s.text_align = 'center'; }

  // Spacing between sections: Elementor Container uses 'margin', NOT '_margin'
  const cssRules = [];
  if (opts.custom_css) cssRules.push(opts.custom_css);

  if (opts.mb !== undefined) {
    s.margin = MARGIN(0, 0, opts.mb, 0);
    s.margin_tablet = MARGIN(0, 0, opts.mbTablet !== undefined ? opts.mbTablet : opts.mb, 0);
    s.margin_mobile = MARGIN(0, 0, opts.mbMobile !== undefined ? opts.mbMobile : opts.mb, 0);
    cssRules.push(`selector { margin-bottom: ${opts.mb}px !important; }`);
    if (opts.mbMobile !== undefined) {
      cssRules.push(`@media (max-width: 767px) { selector { margin-bottom: ${opts.mbMobile}px !important; } }`);
    }
  }
  if (opts.mt !== undefined) {
    s.margin = MARGIN(opts.mt, 0, s.margin ? s.margin.bottom : 0, 0);
    s.margin_tablet = MARGIN(opts.mtTablet !== undefined ? opts.mtTablet : opts.mt, 0, s.margin_tablet ? s.margin_tablet.bottom : 0, 0);
    s.margin_mobile = MARGIN(opts.mtMobile !== undefined ? opts.mtMobile : opts.mt, 0, s.margin_mobile ? s.margin_mobile.bottom : 0, 0);
    cssRules.push(`selector { margin-top: ${opts.mt}px !important; }`);
    if (opts.mtMobile !== undefined) {
      cssRules.push(`@media (max-width: 767px) { selector { margin-top: ${opts.mtMobile}px !important; } }`);
    }
  }
  if (cssRules.length > 0) {
    s.custom_css = cssRules.join('\n');
  }

  return { id: generateId(), elType: 'container', isInner: false, settings: s, elements: opts.children || [] };
}

// Centered section header: badge + heading (+ optional description)
export function headerBlock(badge, headingHtml, descHtml, opts = {}) {
  const kids = [];
  if (badge) {
    kids.push(createWidget('heading', {
      title: badge,
      header_size: 'span',
      align: 'center',
      title_color: COLORS.orange,
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
    title_color: COLORS.heading,
    typography_typography: 'custom',
    typography_font_family: 'Outfit',
    typography_font_size: PX(opts.hSize || 48),
    typography_font_size_tablet: PX(opts.hSizeTablet || opts.hSize || 48),
    typography_font_size_mobile: PX(opts.hSizeMobile || 30),
    typography_font_weight: opts.hWeight || '500',
    typography_line_height: EM(opts.hLeading || 1.25),
    typography_letter_spacing: EM(-0.025)
  }));
  if (descHtml) {
    kids.push(createWidget('text-editor', {
      editor: descHtml,
      align: 'center',
      text_color: COLORS.body,
      typography_typography: 'custom',
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: PX(opts.dSize || 18),
      typography_font_size_mobile: PX(opts.dSizeMobile || 16),
      typography_line_height: EM(1.625),
      ...(opts.dMaxWidth ? { custom_css: `selector .elementor-widget-container { max-width:${opts.dMaxWidth}px; margin-left:auto; margin-right:auto; }` } : {})
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
    c.align_self = 'center';
    c.custom_css = 'selector { margin-left:auto !important; margin-right:auto !important; }';
  }
  return createContainer(c, kids);
}

// Inline text link + arrow (React: font-bold text-[#EA8E18] + ArrowRight)
export function arrowLink(text, url, opts = {}) {
  return createWidget('heading', {
    title: `<a href="${url}" style="color:${COLORS.orange};text-decoration:none;display:inline-flex;align-items:center;gap:8px;">${text}<span aria-hidden="true">&rarr;</span></a>`,
    header_size: 'span',
    align: opts.align || 'left',
    title_color: COLORS.orange,
    typography_typography: 'custom',
    typography_font_family: 'Plus Jakarta Sans',
    typography_font_size: PX(opts.size || 14),
    typography_font_size_mobile: PX(opts.sizeMobile || opts.size || 14),
    typography_font_weight: opts.weight || '700'
  });
}

// Text editor paragraph helper with React defaults
export function para(html, opts = {}) {
  return createWidget('text-editor', {
    editor: html,
    align: opts.align || 'left',
    text_color: opts.color || COLORS.body,
    typography_typography: 'custom',
    typography_font_family: 'Plus Jakarta Sans',
    typography_font_size: PX(opts.size || 16),
    typography_font_size_mobile: PX(opts.sizeMobile || opts.size || 16),
    typography_font_weight: opts.weight || '400',
    typography_line_height: EM(opts.leading || 1.625),
    ...(opts.margin || {}),
    ...(opts.custom_css ? { custom_css: opts.custom_css } : {})
  });
}

// Heading helper with React defaults
export function heading(html, opts = {}) {
  const s = {
    title: html,
    header_size: opts.tag || 'h3',
    align: opts.align || 'left',
    title_color: opts.color || COLORS.heading,
    typography_typography: 'custom',
    typography_font_family: 'Outfit',
    typography_font_size: PX(opts.size || 24),
    typography_font_weight: opts.weight || '500',
    typography_line_height: EM(opts.leading || 1.25),
    ...(opts.custom_css ? { custom_css: opts.custom_css } : {})
  };
  if (opts.sizeTablet) s.typography_font_size_tablet = PX(opts.sizeTablet);
  if (opts.sizeMobile) s.typography_font_size_mobile = PX(opts.sizeMobile);
  if (opts.tracking) s.typography_letter_spacing = EM(opts.tracking);
  if (opts.transform) s.typography_text_transform = opts.transform;
  if (opts.margin) s._margin = opts.margin;
  return createWidget('heading', s);
}

// Buttons (React rounded-full / rounded-xl pills)
export function button(text, url, opts = {}) {
  const s = {
    text,
    link: { url },
    align: opts.align || 'center',
    size: opts.size || 'md',
    typography_typography: 'custom',
    typography_font_family: 'Plus Jakarta Sans',
    typography_font_size: PX(opts.fontSize || 16),
    typography_font_weight: opts.weight || '600',
    button_text_color: opts.textColor || '#FFFFFF',
    background_color: opts.bg || COLORS.orange,
    button_background_hover_color: opts.bgHover || COLORS.orangeDark,
    border_radius: RAD(opts.radius !== undefined ? opts.radius : 9999),
    padding: PAD(opts.py || 16, opts.px || 36, opts.py || 16, opts.px || 36, true)
  };
  if (opts.fontSizeMobile) s.typography_font_size_mobile = PX(opts.fontSizeMobile);
  if (opts.widthMobile) s.width_mobile = PCT(opts.widthMobile);
  if (opts.border) Object.assign(s, BORDER(opts.border.width, opts.border.color));
  if (opts.custom_css) s.custom_css = opts.custom_css;
  if (opts.transform) s.typography_text_transform = opts.textTransform;
  if (opts.shadow) {
    s.box_shadow_box_shadow_type = 'yes';
    s.box_shadow_box_shadow = { horizontal: 0, vertical: opts.shadow.y || 10, blur: opts.shadow.blur || 15, spread: opts.shadow.spread || -3, color: opts.shadow.color || 'rgba(0,0,0,0.1)' };
  }
  return createWidget('button', s);
}

// Lucide-ish icon via Font Awesome (Elementor bundles FA)
export function icon(name, opts = {}) {
  return createWidget('icon', {
    selected_icon: { value: name, library: 'fa-solid' },
    primary_color: opts.color || COLORS.heading,
    size: PX(opts.size || 20),
    align: opts.align || 'left'
  });
}

// ---------------------------------------------------------------------
// Dynamic tags (Elementor Pro). Applied to a STANDARD widget setting, so
// if the tag is unavailable the widget still renders its static fallback
// text instead of collapsing to nothing.
//
//   createWidget('heading', {
//     title: 'Post Title',
//     __dynamic__: dynamic('title', 'post-title')
//   })
// ---------------------------------------------------------------------
export function dynamic(settingKey, tagName, settings = {}) {
  const id = Math.random().toString(36).substring(2, 9);
  const encoded = encodeURIComponent(JSON.stringify(settings));
  return { [settingKey]: `[elementor-tag id="${id}" name="${tagName}" settings="${encoded}"]` };
}

// Merge a dynamic tag into an existing settings object
export function withDynamic(settings, settingKey, tagName, tagSettings = {}) {
  return { ...settings, __dynamic__: dynamic(settingKey, tagName, tagSettings) };
}

// ---------------------------------------------------------------------
// Elementor Posts widget (Pro). Used for dynamic article lists where the
// query must come from WordPress rather than hardcoded markup.
// ---------------------------------------------------------------------
export function postsWidget(opts = {}) {
  const isCards = opts.skin === 'cards' || !opts.skin;
  const s = {
    skin: opts.skin || 'cards',
    posts_post_type: 'post',
    posts_per_page: opts.perPage || 6,
    posts_offset: opts.offset || 0,
    posts_columns: String(opts.columns || 3),
    posts_columns_tablet: String(opts.columnsTablet || 2),
    posts_columns_mobile: String(opts.columnsMobile || 1),
    pagination_type: 'none',
    show_image: 'yes',
    image_size: opts.imageSize || 'large',
    image_ratio: 'yes',
    image_ratio_size: 'landscape',
    show_title: 'yes',
    title_tag: opts.titleTag || 'h3',
    show_excerpt: 'yes',
    excerpt_length: opts.excerptLength || 20,
    show_read_more: opts.showReadMore === false ? '' : 'yes',
    read_more_text: opts.readMoreText || 'Read Article',
    show_badge: '',
    show_avatar: '',
    meta_data: ['date'],
    ...(opts.custom_css ? { custom_css: opts.custom_css } : {})
  };

  // Elementor Cards skin uses cards_* setting keys for layout & queries
  if (isCards) {
    s.cards_columns = String(opts.columns || 3);
    s.cards_columns_tablet = String(opts.columnsTablet || 2);
    s.cards_columns_mobile = String(opts.columnsMobile || 1);
    s.cards_posts_per_page = opts.perPage || 6;
    s.cards_offset = opts.offset || 0;
    s.cards_title_tag = opts.titleTag || 'h3';
    s.cards_show_read_more = opts.showReadMore === false ? '' : 'yes';
    s.cards_read_more_text = opts.readMoreText || 'Read Article';
    s.cards_excerpt_length = opts.excerptLength || 20;
    s.cards_image_size = opts.imageSize || 'large';
    s.cards_show_badge = '';
    s.cards_show_avatar = '';
    s.cards_meta_data = ['date'];
  }

  return createWidget('posts', s);
}

// ---------------------------------------------------------------------
// Interactive Gallery Section (Used across detail spaces pages:
// Function Room, SOHO, Serviced Office, Premium Office)
// Matches React 100%: 16:9 main image, glassmorphic arrows, dots,
// and thumbnails with active #EA8E18 border and click sync.
// ---------------------------------------------------------------------
export function interactiveGallerySection(opts = {}) {
  const {
    id = 'space-gallery',
    titleHtml = 'Gallery <span style="color:#EA8E18;">Details</span>',
    images = [],
    mb = 128,
    mbMobile = 80
  } = opts;

  const gid = 'hq-gal-' + Math.random().toString(36).slice(2, 9);
  const safeImages = images.map(img => ({
    src: encodeURI(img.src),
    title: img.title || ''
  }));

  const galleryHtml = `
<div class="hq-gallery-wrap" id="${gid}" style="width:100%;position:relative;">
  <style>
    #${gid} .hq-main-img-box {
      position: relative !important;
      width: 100% !important;
      min-width: 100% !important;
      height: 520px !important;
      border-radius: 16px !important;
      overflow: hidden !important;
      background: #0F172A !important;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.08) !important;
    }
    @media (max-width: 1024px) {
      #${gid} .hq-main-img-box {
        height: 400px !important;
      }
    }
    @media (max-width: 640px) {
      #${gid} .hq-main-img-box {
        height: 240px !important;
        border-radius: 20px !important;
      }
    }
    /* KUNCI: position: absolute membuat foto TIDAK BISA mendorong atau mengubah ukuran container */
    #${gid} .hq-main-img {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 100% !important;
      max-height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
      transition: opacity 0.25s ease !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    #${gid} .hq-nav-btn {
      position: absolute !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 48px !important;
      height: 48px !important;
      border-radius: 50% !important;
      background: rgba(255,255,255,0.45) !important;
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
      border: 1px solid rgba(255,255,255,0.4) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: #0F172A !important;
      cursor: pointer !important;
      z-index: 10 !important;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      padding: 0 !important;
    }
    #${gid} .hq-nav-btn:hover {
      background: rgba(255,255,255,0.85) !important;
      transform: translateY(-50%) scale(1.08) !important;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.15) !important;
    }
    #${gid} .hq-nav-prev { left: 16px !important; }
    #${gid} .hq-nav-next { right: 16px !important; }
    @media (max-width: 640px) {
      #${gid} .hq-nav-btn { width: 40px !important; height: 40px !important; }
      #${gid} .hq-nav-prev { left: 10px !important; }
      #${gid} .hq-nav-next { right: 10px !important; }
    }
    #${gid} .hq-dots-wrap {
      position: absolute !important;
      bottom: 16px !important;
      left: 0 !important;
      right: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      z-index: 10 !important;
    }
    #${gid} .hq-dot {
      height: 8px !important;
      border-radius: 9999px !important;
      cursor: pointer !important;
      border: none !important;
      padding: 0 !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    #${gid} .hq-dot.active {
      width: 24px !important;
      background: #FFFFFF !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.25) !important;
    }
    #${gid} .hq-dot:not(.active) {
      width: 8px !important;
      background: rgba(255,255,255,0.5) !important;
    }
    #${gid} .hq-dot:not(.active):hover {
      background: rgba(255,255,255,0.85) !important;
    }
    #${gid} .hq-thumbs-wrap {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 16px !important;
      margin-top: 16px !important;
      overflow-x: auto !important;
      padding: 4px 2px 10px 2px !important;
      max-width: 100% !important;
      scrollbar-width: none !important;
    }
    #${gid} .hq-thumbs-wrap::-webkit-scrollbar { display: none !important; }
    #${gid} .hq-thumb-btn {
      position: relative !important;
      flex-shrink: 0 !important;
      width: 128px !important;
      height: 88px !important;
      border-radius: 12px !important;
      overflow: hidden !important;
      cursor: pointer !important;
      border: 2px solid transparent !important;
      padding: 0 !important;
      margin: 0 !important;
      background: #0F172A !important;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    @media (max-width: 640px) {
      #${gid} .hq-thumb-btn { width: 96px !important; height: 64px !important; }
      #${gid} .hq-thumbs-wrap { gap: 12px !important; }
    }
    #${gid} .hq-thumb-btn img {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      display: block !important;
      margin: 0 !important;
    }
    #${gid} .hq-thumb-btn.active {
      border-color: #EA8E18 !important;
      opacity: 1 !important;
      transform: scale(1.04);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.15);
    }
    #${gid} .hq-thumb-btn:not(.active) {
      opacity: 0.6;
    }
    #${gid} .hq-thumb-btn:not(.active):hover {
      opacity: 1;
      border-color: rgba(226,232,240,0.8);
      transform: translateY(-2px);
    }
  </style>

  <div class="hq-main-img-box">
    <img class="hq-main-img" src="${safeImages[0]?.src || ''}" alt="${safeImages[0]?.title || ''}" />
    <button class="hq-nav-btn hq-nav-prev" aria-label="Previous image">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button class="hq-nav-btn hq-nav-next" aria-label="Next image">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <div class="hq-dots-wrap">
      ${safeImages.map((_, i) => `<button class="hq-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>`).join('')}
    </div>
  </div>

  <div class="hq-thumbs-wrap">
    ${safeImages.map((img, i) => `
      <button class="hq-thumb-btn ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="${img.title || `Image ${i + 1}`}">
        <img src="${img.src}" alt="${img.title || ''}" loading="lazy" />
      </button>
    `).join('')}
  </div>

  <script>
  (function() {
    function init() {
      var root = document.getElementById('${gid}');
      if (!root) return;
      var images = ${JSON.stringify(safeImages.map(img => img.src))};
      var mainImg = root.querySelector('.hq-main-img');
      var prevBtn = root.querySelector('.hq-nav-prev');
      var nextBtn = root.querySelector('.hq-nav-next');
      var dots = root.querySelectorAll('.hq-dot');
      var thumbs = root.querySelectorAll('.hq-thumb-btn');
      var current = 0;

      function goTo(idx) {
        if (idx < 0) idx = images.length - 1;
        if (idx >= images.length) idx = 0;
        current = idx;
        mainImg.style.opacity = '0.4';
        setTimeout(function() {
          mainImg.src = images[current];
          mainImg.style.opacity = '1';
        }, 120);
        dots.forEach(function(dot, i) {
          if (i === current) dot.classList.add('active');
          else dot.classList.remove('active');
        });
        thumbs.forEach(function(thumb, i) {
          if (i === current) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
          } else {
            thumb.classList.remove('active');
          }
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', function(e) { e.preventDefault(); goTo(current - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function(e) { e.preventDefault(); goTo(current + 1); });
      dots.forEach(function(dot) {
        dot.addEventListener('click', function(e) {
          e.preventDefault();
          goTo(parseInt(this.getAttribute('data-idx'), 10));
        });
      });
      thumbs.forEach(function(thumb) {
        thumb.addEventListener('click', function(e) {
          e.preventDefault();
          goTo(parseInt(this.getAttribute('data-idx'), 10));
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
  </script>
</div>
`;

  return section({
    pt: 0,
    pb: 0,
    bg: COLORS.surface,
    mb: mb,
    mbMobile: mbMobile,
    gap: 24,
    id: id,
    children: [
      // Header with bottom border
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
          heading(titleHtml, {
            tag: 'h2',
            align: 'left',
            size: 36,
            sizeTablet: 30,
            sizeMobile: 24,
            tracking: -0.025
          })
        ]
      ),
      // Interactive Gallery Widget
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column'
        },
        [
          createWidget('html', { html: galleryHtml })
        ]
      )
    ]
  });
}
