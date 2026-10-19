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
  console.log(`✓ ${filename}`);
}

// ---------------------------------------------------------------- helpers
const PX = (v) => ({ unit: 'px', size: v });
const PCT = (v) => ({ unit: '%', size: v });
const EM = (v) => ({ unit: 'em', size: v });
const GAP = (c, r = c) => ({ column: String(c), row: String(r), unit: 'px' });
const BOX = (t, r, b, l, linked = true) => ({ unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: linked });
const RAD = (v) => ({ unit: 'px', top: String(v), right: String(v), bottom: String(v), left: String(v), isLinked: true });

// Section heading block (badge + heading + optional description), centered
function sectionHeader(badge, heading, description, opts = {}) {
  const children = [
    createWidget('heading', {
      title: badge,
      header_size: 'span',
      title_color: '#EA8E18',
      typography_typography: 'custom',
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: PX(opts.badgeSize || 12),
      typography_font_weight: '700',
      typography_letter_spacing: PX(2),
      typography_text_transform: 'uppercase',
      align: 'center'
    }),
    createWidget('heading', {
      title: heading,
      header_size: opts.tag || 'h2',
      title_color: '#0F172A',
      typography_typography: 'custom',
      typography_font_family: 'Outfit',
      typography_font_size: PX(opts.headingSize || 44),
      typography_font_size_tablet: PX(opts.headingSizeTablet || 36),
      typography_font_size_mobile: PX(opts.headingSizeMobile || 28),
      typography_font_weight: '500',
      typography_line_height: EM(1.15),
      align: 'center'
    })
  ];
  if (description) {
    children.push(createWidget('text-editor', {
      editor: `<p style="max-width:640px;margin:0 auto;">${description}</p>`,
      text_color: '#475569',
      typography_typography: 'custom',
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: PX(17),
      typography_font_size_mobile: PX(15),
      typography_line_height: EM(1.6),
      align: 'center'
    }));
  }
  return createContainer(
    {
      content_width: 'full',
      flex_direction: 'column',
      align_items: 'center',
      text_align: 'center',
      flex_gap: GAP(12)
    },
    children
  );
}

// Inline text link with arrow (React: text-sm font-bold text-[#EA8E18] + ArrowRight)
function arrowLink(text, url) {
  return createWidget('heading', {
    title: `<a href="${url}" style="color:#EA8E18;text-decoration:none;">${text} &nbsp;&rarr;</a>`,
    header_size: 'span',
    title_color: '#EA8E18',
    typography_typography: 'custom',
    typography_font_family: 'Plus Jakarta Sans',
    typography_font_size: PX(14),
    typography_font_weight: '700'
  });
}

// Icon box card (React: bg-slate-50/80 p-8 rounded-2xl border + icon tile + title + desc + footer link)
function iconCard(icon, title, desc, footerText, footerUrl, opts = {}) {
  const children = [
    createContainer(
      {
        width: PX(opts.iconBox || 48),
        min_height: PX(opts.iconBox || 48),
        background_background: 'classic',
        background_color: '#FFFFFF',
        border_border: 'solid',
        border_width: BOX(1, 1, 1, 1),
        border_color: '#E2E8F0',
        border_radius: RAD(12),
        justify_content: 'center',
        align_items: 'center'
      },
      [
        createWidget('icon', {
          selected_icon: { value: icon, library: 'fa-solid' },
          primary_color: '#1E293B',
          size: PX(opts.iconSize || 20)
        })
      ]
    ),
    createWidget('heading', {
      title: title,
      header_size: 'h3',
      title_color: '#0F172A',
      typography_typography: 'custom',
      typography_font_family: 'Outfit',
      typography_font_size: PX(opts.titleSize || 20),
      typography_font_weight: '500',
      typography_line_height: EM(1.25)
    }),
    createWidget('text-editor', {
      editor: `<p>${desc}</p>`,
      text_color: '#475569',
      typography_typography: 'custom',
      typography_font_family: 'Plus Jakarta Sans',
      typography_font_size: PX(14),
      typography_line_height: EM(1.6)
    })
  ];
  if (footerText) {
    children.push(
      createContainer(
        {
          flex_direction: 'row',
          align_items: 'center',
          border_border: 'solid',
          border_width: BOX(1, 0, 0, 0),
          border_color: '#E2E8F0',
          padding: BOX(20, 0, 0, 0)
        },
        [arrowLink(footerText, footerUrl || '#')]
      )
    );
  }
  return createContainer(
    {
      width: opts.width || PCT(31),
      width_tablet: opts.widthTablet || PCT(48),
      width_mobile: opts.widthMobile || PCT(100),
      background_background: 'classic',
      background_color: opts.bg || '#F8FAFC',
      border_radius: RAD(opts.radius || 16),
      border_border: 'solid',
      border_width: BOX(1, 1, 1, 1),
      border_color: '#E2E8F0',
      padding: BOX(opts.padding || 32, opts.padding || 32, opts.padding || 32, opts.padding || 32),
      flex_direction: 'column',
      justify_content: 'space-between',
      flex_gap: GAP(16),
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 2, blur: 8, spread: 0, color: 'rgba(0,0,0,0.04)' }
    },
    children
  );
}

// =================================================================
// HERO (React: src/components/Hero.jsx)
// =================================================================
function buildHero() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      padding: BOX(80, 32, 16, 32, false),
      padding_tablet: BOX(96, 24, 16, 24, false),
      padding_mobile: BOX(96, 16, 16, 16, false),
      background_background: 'classic',
      background_color: '#FFFFFF'
    },
    [
      createContainer(
        {
          content_width: 'full',
          min_height: PX(680),
          min_height_tablet: PX(620),
          min_height_mobile: PX(580),
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          justify_content: 'center',
          justify_content_mobile: 'flex-end',
          align_items: 'center',
          align_items_mobile: 'flex-start',
          border_radius: RAD(48),
          border_radius_tablet: RAD(44),
          border_radius_mobile: RAD(16),
          border_border: 'solid',
          border_width: BOX(1, 1, 1, 1),
          border_color: '#E2E8F0',
          overflow: 'hidden',
          background_background: 'classic',
          background_image: { url: '/BUILDING/ChatGPT Image Jul 29, 2026, 03_09_51 PM-800.webp' },
          background_position: 'right center',
          background_position_mobile: 'center center',
          background_size: 'cover',
          background_overlay_background: 'gradient',
          background_overlay_color: '#FFFFFF',
          background_overlay_color_stop: PCT(35),
          background_overlay_color_b: 'rgba(255,255,255,0)',
          background_overlay_color_b_stop: PCT(85),
          background_overlay_gradient_type: 'linear',
          background_overlay_gradient_angle: { unit: 'deg', size: 90 },
          padding: BOX(0, 0, 0, 0),
          custom_css: 'selector { background-size: 125% auto; background-position: 78% center; }\n@media(max-width:1024px){ selector { background-size: cover; background-position: center top; } }'
        },
        [
          createContainer(
            {
              width: PCT(55),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              padding: BOX(56, 56, 56, 56),
              padding_mobile: BOX(32, 20, 40, 20),
              flex_direction: 'column',
              flex_gap: GAP(24)
            },
            [
              createWidget('heading', {
                title: 'Space for Every <br><span style="color:#EA8E18;">Stage of Business.</span>',
                header_size: 'h1',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: PX(62),
                typography_font_size_tablet: PX(46),
                typography_font_size_mobile: PX(30),
                typography_font_weight: '500',
                typography_line_height: EM(1.1),
                typography_letter_spacing: PX(-1)
              }),
              createWidget('text-editor', {
                editor: '<p>From your first business address to your corporate headquarters, HQuarters gives you the space to start, work, own and grow — in the heart of Asia Afrika, Bandung.</p>',
                text_color: '#475569',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(17),
                typography_font_size_mobile: PX(15),
                typography_line_height: EM(1.6)
              }),
              createContainer(
                { flex_direction: 'row', flex_wrap: 'wrap', flex_gap: GAP(14) },
                [
                  createWidget('button', {
                    text: 'Explore Your Space',
                    link: { url: '/spaces' },
                    size: 'md',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(16),
                    typography_font_weight: '600',
                    button_text_color: '#FFFFFF',
                    background_color: '#EA8E18',
                    button_background_hover_color: '#D88010',
                    border_radius: RAD(12),
                    padding: BOX(14, 28, 14, 28)
                  }),
                  createWidget('button', {
                    text: 'Visit HQuarters',
                    link: { url: '/find-space' },
                    size: 'md',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(16),
                    typography_font_weight: '600',
                    button_text_color: '#1E293B',
                    background_color: '#FFFFFF',
                    border_border: 'solid',
                    border_width: BOX(1, 1, 1, 1),
                    border_color: '#CBD5E1',
                    border_radius: RAD(12),
                    padding: BOX(14, 28, 14, 28)
                  })
                ]
              ),
              createContainer(
                { flex_direction: 'row', align_items: 'center', flex_gap: GAP(10) },
                [
                  createWidget('heading', {
                    title: '★★★★★',
                    header_size: 'span',
                    title_color: '#EA8E18',
                    typography_typography: 'custom',
                    typography_font_size: PX(17)
                  }),
                  createWidget('heading', {
                    title: 'Trusted by Leading National & Multinational Companies',
                    header_size: 'span',
                    title_color: '#475569',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(14),
                    typography_font_weight: '500'
                  })
                ]
              )
            ]
          )
        ]
      )
    ]
  );
}

// =================================================================
// BUSINESS JOURNEY (React: src/components/BusinessJourney.jsx)
// =================================================================
function buildBusinessJourney() {
  const cards = [
    { cat: 'VIRTUAL OFFICE', title: 'Start Here.', desc: 'Professional business presence without a permanent office.', cta: 'Explore Virtual Office', url: '/spaces/virtual-office', icon: 'fas fa-building' },
    { cat: 'SERVICED OFFICE', title: 'Work Here.', desc: 'Ready-to-use workspace with facilities and service included.', cta: 'Explore Serviced Office', url: '/spaces/serviced-office', icon: 'fas fa-briefcase' },
    { cat: 'SOHO', title: 'Own Here.', desc: 'Office. Home office. Living space. One space that grows with you. #FleksibelAja', cta: 'Explore SOHO Spaces', url: '/spaces/soho', icon: 'fas fa-home' },
    { cat: 'PREMIUM OFFICE', title: 'Grow Here.', desc: 'Representative, professional space built to support your next chapter.', cta: 'Explore Premium Office', url: '/spaces/premium-office', icon: 'fas fa-layer-group' }
  ];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      padding: BOX(96, 32, 96, 32, false),
      padding_mobile: BOX(64, 16, 64, 16, false),
      flex_gap: GAP(48),
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_border: 'solid',
      border_width: BOX(0, 0, 1, 0),
      border_color: '#E2E8F0',
      _element_id: 'business-journey'
    },
    [
      sectionHeader(
        'ONE BUILDING. MANY POSSIBILITIES.',
        'Where Are You in <br><span style="color:#EA8E18;">Your Business Journey?</span>',
        'Whatever comes next, there is a space for you at HQuarters.',
        { headingSize: 46, headingSizeTablet: 38, headingSizeMobile: 30 }
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          flex_gap: GAP(24),
          justify_content: 'space-between'
        },
        cards.map((c) =>
          createContainer(
            {
              width: PCT(23.5),
              width_tablet: PCT(48),
              width_mobile: PCT(100),
              background_background: 'classic',
              background_color: '#F8FAFC',
              border_radius: RAD(24),
              border_border: 'solid',
              border_width: BOX(1, 1, 1, 1),
              border_color: '#E2E8F0',
              padding: BOX(28, 28, 28, 28),
              flex_direction: 'column',
              justify_content: 'space-between',
              flex_gap: GAP(20),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 2, blur: 8, spread: 0, color: 'rgba(0,0,0,0.04)' },
              custom_css: 'selector { transition: all .3s ease; }\nselector:hover { background:#EA8E18; border-color:#EA8E18; box-shadow:0 20px 25px -5px rgba(0,0,0,.1); transform:translateY(-6px); }\nselector:hover h3, selector:hover p, selector:hover a, selector:hover span { color:#FFFFFF !important; }\nselector:hover .elementor-icon { color:#FFFFFF !important; }'
            },
            [
              createContainer(
                {
                  flex_direction: 'row',
                  justify_content: 'space-between',
                  align_items: 'center',
                  flex_gap: GAP(10)
                },
                [
                  createWidget('heading', {
                    title: c.cat,
                    header_size: 'span',
                    title_color: '#EA8E18',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(11),
                    typography_font_weight: '800',
                    typography_letter_spacing: PX(1.2),
                    typography_text_transform: 'uppercase'
                  }),
                  createContainer(
                    {
                      width: PX(36),
                      min_height: PX(36),
                      background_background: 'classic',
                      background_color: '#FFFFFF',
                      border_border: 'solid',
                      border_width: BOX(1, 1, 1, 1),
                      border_color: '#E2E8F0',
                      border_radius: RAD(12),
                      justify_content: 'center',
                      align_items: 'center'
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
              createContainer(
                { flex_direction: 'column', flex_gap: GAP(8) },
                [
                  createWidget('heading', {
                    title: c.title,
                    header_size: 'h3',
                    title_color: '#0F172A',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: PX(26),
                    typography_font_weight: '500',
                    typography_line_height: EM(1.2)
                  }),
                  createWidget('text-editor', {
                    editor: `<p>${c.desc}</p>`,
                    text_color: '#475569',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(14),
                    typography_line_height: EM(1.6)
                  })
                ]
              ),
              createContainer(
                {
                  flex_direction: 'row',
                  align_items: 'center',
                  border_border: 'solid',
                  border_width: BOX(1, 0, 0, 0),
                  border_color: '#E2E8F0',
                  padding: BOX(20, 0, 0, 0)
                },
                [arrowLink(c.cta, c.url)]
              )
            ]
          )
        )
      )
    ]
  );
}

// =================================================================
// ADDRESS STATEMENT (React: src/components/AddressStatement.jsx)
// =================================================================
function buildAddressStatement() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      padding: BOX(96, 32, 96, 32, false),
      padding_mobile: BOX(64, 16, 64, 16, false),
      flex_gap: GAP(64),
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_border: 'solid',
      border_width: BOX(0, 0, 1, 0),
      border_color: '#E2E8F0',
      _element_id: 'address-statement'
    },
    [
      sectionHeader(
        'HQUARTERS — ASIA AFRIKA — BANDUNG',
        'Your Address Says Something <br><span style="color:#EA8E18;">About Your Business.</span>',
        "When clients, partners, or candidates walk in, they form an impression before the meeting even starts. HQuarters offers a modern, professional business environment in Bandung's most iconic district.",
        { headingSize: 54, headingSizeTablet: 42, headingSizeMobile: 32, badgeSize: 12 }
      ),
      createContainer(
        { flex_direction: 'row', justify_content: 'center' },
        [arrowLink('Discover The Location', '/location')]
      ),
      // 21:9 building image with bottom overlay bar
      createContainer(
        {
          content_width: 'full',
          min_height: PX(520),
          min_height_tablet: PX(400),
          min_height_mobile: PX(300),
          border_radius: RAD(16),
          overflow: 'hidden',
          border_border: 'solid',
          border_width: BOX(1, 1, 1, 1),
          border_color: '#E2E8F0',
          background_background: 'classic',
          background_image: { url: '/addressstatement/21;9.webp' },
          background_position: 'center bottom',
          background_size: 'cover',
          flex_direction: 'row',
          align_items: 'flex-end',
          padding: BOX(40, 40, 40, 40),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' },
          background_overlay_background: 'gradient',
          background_overlay_color: 'rgba(2,6,23,0.85)',
          background_overlay_color_b: 'rgba(2,6,23,0)',
          background_overlay_gradient_type: 'linear',
          background_overlay_gradient_angle: { unit: 'deg', size: 0 }
        },
        [
          createContainer(
            {
              flex_direction: 'row',
              justify_content: 'space-between',
              align_items: 'center',
              width: PCT(100),
              flex_gap: GAP(16)
            },
            [
              createContainer(
                { flex_direction: 'row', align_items: 'center', flex_gap: GAP(10) },
                [
                  createWidget('heading', {
                    title: '●',
                    header_size: 'span',
                    title_color: '#EA8E18',
                    typography_typography: 'custom',
                    typography_font_size: PX(14)
                  }),
                  createWidget('heading', {
                    title: 'HQUARTERS BUSINESS RESIDENCE — ASIA AFRIKA CBD',
                    header_size: 'span',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: PX(14),
                    typography_font_weight: '800',
                    typography_letter_spacing: PX(1.2),
                    typography_text_transform: 'uppercase'
                  })
                ]
              ),
              createWidget('button', {
                text: 'View Location',
                link: { url: '/location' },
                size: 'sm',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(12),
                typography_font_weight: '700',
                typography_text_transform: 'uppercase',
                button_text_color: '#0F172A',
                background_color: 'rgba(255,255,255,0.9)',
                button_background_hover_color: '#FFFFFF',
                border_radius: RAD(9999),
                padding: BOX(10, 20, 10, 20)
              })
            ]
          )
        ]
      ),
      // Make The Right First Impression block
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          padding: BOX(56, 32, 56, 32)
        },
        [
          createWidget('heading', {
            title: 'Make The <br><span style="color:#EA8E18;">Right First Impression.</span>',
            header_size: 'h3',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: PX(44),
            typography_font_size_tablet: PX(36),
            typography_font_size_mobile: PX(28),
            typography_font_weight: '500',
            typography_line_height: EM(1.15),
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: '<p style="max-width:640px;margin:0 auto;">A good building isn\'t just good-looking. It makes clients feel assured, makes teams feel proud, and makes a business look ready for something bigger.</p>',
            text_color: '#475569',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: PX(17),
            typography_line_height: EM(1.6),
            align: 'center'
          })
        ]
      )
    ]
  );
}

// =================================================================
// PARTNERS (React: src/components/Partners.jsx)
// =================================================================
function buildPartners() {
  const logos = [
    { name: 'Allianz', src: '/homepagelogobaru/GF allianz.webp' },
    { name: 'AXA', src: '/homepagelogobaru/7de axa.webp' },
    { name: 'MSIG', src: '/homepagelogobaru/9ef MSIG.webp' },
    { name: 'Mitsubishi', src: '/homepagelogobaru/7i mitsubishi.webp' },
    { name: 'Roche', src: '/homepagelogobaru/16j roche.webp' },
    { name: 'FWD', src: '/homepagelogobaru/6FGH fwd.webp' },
    { name: 'Avrist', src: '/homepagelogobaru/19r avrist.webp' },
    { name: 'DANA', src: '/homepagelogobaru/19 OP Dana-Logo.webp' },
    { name: 'HIS Travel', src: '/homepagelogobaru/UG his travel.webp' },
    { name: 'Henan Sekuritas', src: '/homepagelogobaru/16E henan sekuritas.webp' },
    { name: 'Huawei', src: '/homepagelogobaru/huawei.webp' },
    { name: 'Garuda TV', src: '/homepagelogobaru/GF B garuda.webp' }
  ];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      padding: BOX(56, 32, 56, 32, false),
      padding_mobile: BOX(48, 16, 48, 16, false),
      flex_gap: GAP(32),
      align_items: 'center',
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_border: 'solid',
      border_width: BOX(0, 0, 1, 0),
      border_color: '#E2E8F0'
    },
    [
      sectionHeader(
        "YOU'RE IN GOOD COMPANY",
        'Trusted by Businesses That Know the Value of the Right Address.',
        null,
        { headingSize: 36, headingSizeTablet: 32, headingSizeMobile: 24 }
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'center',
          align_items: 'center',
          flex_gap: GAP(24)
        },
        logos.map((l) =>
          createContainer(
            {
              width: PX(224),
              width_mobile: PCT(48),
              min_height: PX(112),
              background_background: 'classic',
              background_color: '#F8FAFC',
              border_border: 'solid',
              border_width: BOX(1, 1, 1, 1),
              border_color: '#E2E8F0',
              border_radius: RAD(16),
              padding: BOX(12, 12, 12, 12),
              justify_content: 'center',
              align_items: 'center',
              overflow: 'hidden',
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 2, blur: 8, spread: 0, color: 'rgba(0,0,0,0.04)' },
              custom_css: 'selector { transition: all .3s ease; }\nselector:hover { background:#FFFFFF; border-color: rgba(234,142,24,.5); box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); }'
            },
            [
              createContainer(
                {
                  width: PCT(100),
                  min_height: PX(88),
                  background_background: 'classic',
                  background_image: { url: l.src },
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
      arrowLink('Meet The HQuarters Business Community', '/companies')
    ]
  );
}

// =================================================================
// BUILDING HIGHLIGHTS (React: src/components/BuildingHighlights.jsx)
// =================================================================
function buildBuildingHighlights() {
  const items = [
    { title: 'Premium Arrival', desc: 'Representative lobby & professional environment.', icon: 'fas fa-star', anchor: '/building#infrastructure' },
    { title: 'Business Ready', desc: 'Meeting facilities, connectivity and professional building management.', icon: 'fas fa-briefcase', anchor: '/building#infrastructure' },
    { title: '24/7 Security', desc: 'Layered building security and controlled access.', icon: 'fas fa-shield-alt', anchor: '/building#security' },
    { title: 'Easy Parking', desc: 'Large-capacity parking supported by mechanical parking systems.', icon: 'fas fa-car', anchor: '/building#parking' },
    { title: 'Health & Wellness', desc: 'Gym, sauna and heated swimming pool.', icon: 'fas fa-water', anchor: '/building#building-amenities' },
    { title: 'Connected', desc: "At the centre of Bandung's business and city activity.", icon: 'fas fa-map-marker-alt', anchor: '/location' }
  ];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      padding: BOX(96, 32, 96, 32, false),
      padding_mobile: BOX(64, 16, 64, 16, false),
      flex_gap: GAP(48),
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_border: 'solid',
      border_width: BOX(0, 0, 1, 0),
      border_color: '#E2E8F0',
      _element_id: 'building-highlights'
    },
    [
      sectionHeader(
        'THE BUILDING',
        'Built for Business. <br><span style="color:#EA8E18;">Designed for Life.</span>',
        null,
        { headingSize: 46, headingSizeTablet: 38, headingSizeMobile: 30 }
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          flex_gap: GAP(24),
          justify_content: 'space-between'
        },
        items.map((i) =>
          iconCard(i.icon, i.title, i.desc, 'Explore Feature', i.anchor, {
            width: PCT(31.5),
            widthTablet: PCT(48),
            widthMobile: PCT(100),
            bg: '#F8FAFC',
            radius: 16,
            padding: 32,
            titleSize: 20,
            iconBox: 48,
            iconSize: 20
          })
        )
      ),
      createContainer(
        { flex_direction: 'row', justify_content: 'center' },
        [arrowLink('Explore The Building', '/building')]
      )
    ]
  );
}

// =================================================================
// BOTTOM CTA (React: src/components/CTA.jsx)
// =================================================================
function buildCTA(titlePrefix, titleHighlight, description, buttonText, target) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      align_items: 'center',
      text_align: 'center',
      padding: BOX(112, 32, 64, 32, false),
      padding_mobile: BOX(80, 16, 48, 16, false),
      flex_gap: GAP(24),
      background_background: 'classic',
      background_color: '#231F20',
      _element_id: 'contact'
    },
    [
      createWidget('heading', {
        title: `${titlePrefix}<br><span style="color:#EA8E18;">${titleHighlight}</span>`,
        header_size: 'h2',
        title_color: '#FFFFFF',
        typography_typography: 'custom',
        typography_font_family: 'Outfit',
        typography_font_size: PX(52),
        typography_font_size_tablet: PX(42),
        typography_font_size_mobile: PX(30),
        typography_font_weight: '500',
        typography_line_height: EM(1.15),
        align: 'center'
      }),
      createWidget('text-editor', {
        editor: `<p style="max-width:640px;margin:0 auto;">${description}</p>`,
        text_color: '#CBD5E1',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: PX(18),
        typography_font_size_mobile: PX(15),
        typography_line_height: EM(1.6),
        align: 'center'
      }),
      createWidget('button', {
        text: `${buttonText} →`,
        link: { url: target },
        size: 'md',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: PX(16),
        typography_font_weight: '600',
        button_text_color: '#FFFFFF',
        background_color: '#EA8E18',
        button_background_hover_color: '#D88010',
        border_radius: RAD(9999),
        padding: BOX(16, 36, 16, 36),
        box_shadow_box_shadow_type: 'yes',
        box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 15, spread: -3, color: 'rgba(234,142,24,0.25)' }
      })
    ]
  );
}

// =================================================================
// MASTER FORM INQUIRY (React: src/components/FindSpaceSection.jsx)
// =================================================================
const SPACE_COPY = {
  'Premium Office': {
    badge: 'FIND YOUR NEXT OFFICE',
    title: 'Tell Us What Your Team Needs.',
    description: "We'll match you to available office spaces by area, floor and move-in timeline — with a tailored rental proposal, not a public price list.",
    image: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp',
    submit: 'Request Floorplan & Proposal'
  },
  SOHO: {
    badge: 'FIND MY SOHO',
    title: "Let's Find A Space That Fits Your Life.",
    description: 'Configure your SOHO unit for living, working, or a representative private studio.',
    image: '/SPACES/SOHO/SOHO 01.webp',
    submit: 'Find My SOHO Unit'
  },
  'Serviced Office': {
    badge: 'TURNKEY OFFICE',
    title: 'Find The Right Office Suite.',
    description: 'Fully furnished, high-speed fiber internet, meeting rooms, and reception support included.',
    image: '/SPACES/SERVICED OFFICE/1.webp',
    submit: 'Request Serviced Office Tour'
  },
  'Virtual Office': {
    badge: 'PRESTIGE ADDRESS',
    title: 'Establish Your Corporate Presence.',
    description: 'Get a prestigious Asia Afrika CBD domicile, mail handling, call answering, and meeting room access to grow your enterprise credibility.',
    image: '/SPACES/SERVICED OFFICE/6.webp',
    submit: 'Inquire Virtual Office Package'
  },
  'Function Room': {
    badge: 'EVENT VENUE',
    title: 'Plan Your Next Corporate Gathering.',
    description: 'State-of-the-art audiovisual setups, flexible seating, and dedicated event support for board meetings, seminars, and banquets.',
    image: '/BUILDING/FR 01.webp',
    submit: 'Inquire Function Room Booking'
  }
};

function buildMasterForm(defaultSpace = 'Premium Office') {
  const copy = SPACE_COPY[defaultSpace] || SPACE_COPY['Premium Office'];
  const spaces = ['Premium Office', 'SOHO', 'Serviced Office', 'Virtual Office', 'Function Room'];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      padding: BOX(40, 32, 96, 32, false),
      padding_mobile: BOX(24, 16, 64, 16, false),
      _element_id: 'find-space'
    },
    [
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          background_background: 'classic',
          background_color: '#FFFFFF',
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          border_border: 'solid',
          border_width: BOX(1, 1, 1, 1),
          border_color: '#E2E8F0',
          overflow: 'hidden',
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' }
        },
        [
          // LEFT: visual + dark glass card
          createContainer(
            {
              width: PCT(40),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              min_height: PX(480),
              min_height_mobile: PX(380),
              background_background: 'classic',
              background_color: '#0F172A',
              background_image: { url: copy.image },
              background_position: 'center center',
              background_size: 'cover',
              background_overlay_background: 'classic',
              background_overlay_color: 'rgba(15,23,42,0.6)',
              padding: BOX(24, 24, 24, 24),
              padding_mobile: BOX(20, 20, 20, 20),
              flex_direction: 'column',
              justify_content: 'flex-end'
            },
            [
              createContainer(
                {
                  background_background: 'classic',
                  background_color: 'rgba(22,26,37,0.95)',
                  border_radius: RAD(16),
                  border_border: 'solid',
                  border_width: BOX(1, 1, 1, 1),
                  border_color: 'rgba(255,255,255,0.1)',
                  padding: BOX(32, 32, 32, 32),
                  padding_mobile: BOX(24, 24, 24, 24),
                  flex_direction: 'column',
                  flex_gap: GAP(12)
                },
                [
                  createWidget('heading', {
                    title: copy.badge,
                    header_size: 'span',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(10),
                    typography_font_weight: '800',
                    typography_letter_spacing: PX(1.2),
                    typography_text_transform: 'uppercase',
                    custom_css: 'selector { display:inline-block; background:#EA8E18; padding:4px 12px; border-radius:6px; width:fit-content; }'
                  }),
                  createWidget('heading', {
                    title: copy.title,
                    header_size: 'h3',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: PX(28),
                    typography_font_size_mobile: PX(24),
                    typography_font_weight: '500',
                    typography_line_height: EM(1.2)
                  }),
                  createWidget('text-editor', {
                    editor: `<p>${copy.description}</p>`,
                    text_color: '#CBD5E1',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(14),
                    typography_line_height: EM(1.6)
                  })
                ]
              )
            ]
          ),

          // RIGHT: form
          createContainer(
            {
              width: PCT(60),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              padding: BOX(48, 48, 48, 48),
              padding_mobile: BOX(28, 20, 28, 20),
              flex_direction: 'column',
              flex_gap: GAP(24)
            },
            [
              createContainer(
                { flex_direction: 'column', flex_gap: GAP(12) },
                [
                  createContainer(
                    { flex_direction: 'row', justify_content: 'space-between', align_items: 'center' },
                    [
                      createWidget('heading', {
                        title: '1. Select Space Type',
                        header_size: 'h4',
                        title_color: '#0F172A',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: PX(20),
                        typography_font_weight: '500'
                      }),
                      createWidget('heading', {
                        title: defaultSpace.toUpperCase(),
                        header_size: 'span',
                        title_color: '#EA8E18',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: PX(11),
                        typography_font_weight: '700',
                        typography_letter_spacing: PX(1.2)
                      })
                    ]
                  ),
                  createContainer(
                    {
                      flex_direction: 'row',
                      flex_wrap: 'wrap',
                      flex_gap: GAP(8)
                    },
                    spaces.map((s) => {
                      const active = s === defaultSpace;
                      return createWidget('button', {
                        text: s,
                        link: { url: '#find-space' },
                        size: 'xs',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: PX(12),
                        typography_font_weight: active ? '700' : '600',
                        button_text_color: active ? '#EA8E18' : '#334155',
                        background_color: active ? '#FEF3E2' : '#FFFFFF',
                        border_border: 'solid',
                        border_width: BOX(1, 1, 1, 1),
                        border_color: active ? '#EA8E18' : '#E2E8F0',
                        border_radius: RAD(12),
                        padding: BOX(10, 14, 10, 14)
                      });
                    })
                  )
                ]
              ),

              createWidget('divider', {
                style: 'solid',
                weight: PX(1),
                color: '#F1F5F9',
                gap: PX(8)
              }),

              createContainer(
                { flex_direction: 'column', flex_gap: GAP(16) },
                [
                  createContainer(
                    { flex_direction: 'column', flex_gap: GAP(4) },
                    [
                      createWidget('heading', {
                        title: '2. Complete Your Details',
                        header_size: 'h4',
                        title_color: '#0F172A',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: PX(20),
                        typography_font_weight: '500'
                      }),
                      createWidget('text-editor', {
                        editor: '<p>Share your details and our team will get back to you shortly.</p>',
                        text_color: '#64748B',
                        typography_typography: 'custom',
                        typography_font_family: 'Plus Jakarta Sans',
                        typography_font_size: PX(12)
                      })
                    ]
                  ),
                  createWidget('form', {
                    form_name: 'HQuarters Inquiry',
                    form_fields: [
                      { _id: 'space_type', field_type: 'hidden', field_value: defaultSpace },
                      { _id: 'name', field_type: 'text', field_label: 'FULL NAME *', placeholder: 'John Doe', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'whatsapp', field_type: 'tel', field_label: 'WHATSAPP *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'company', field_type: 'text', field_label: 'COMPANY NAME (OPTIONAL)', placeholder: 'e.g. PT Enterprise Nusantara', required: 'false', width: '100' },
                      { _id: 'notes', field_type: 'textarea', field_label: 'ADDITIONAL REQUIREMENTS (OPTIONAL)', placeholder: 'Any specific requests, timeline, or inquiries...', rows: 3, required: 'false', width: '100' }
                    ],
                    button_text: copy.submit,
                    button_size: 'md',
                    button_width: '100',
                    button_typography_typography: 'custom',
                    button_typography_font_family: 'Plus Jakarta Sans',
                    button_typography_font_size: PX(16),
                    button_typography_font_weight: '700',
                    button_text_color: '#FFFFFF',
                    button_background_color: '#EA8E18',
                    button_background_hover_color: '#D88010',
                    button_border_radius: RAD(9999),
                    button_padding: BOX(14, 28, 14, 28),
                    submit_actions: ['redirect'],
                    redirect_to: `https://wa.me/628111908319?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*${encodeURIComponent(defaultSpace)}*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
                    label_typography_typography: 'custom',
                    label_typography_font_family: 'Plus Jakarta Sans',
                    label_typography_font_size: PX(10),
                    label_typography_font_weight: '800',
                    label_typography_text_transform: 'uppercase',
                    label_text_color: '#475569',
                    field_typography_typography: 'custom',
                    field_typography_font_family: 'Plus Jakarta Sans',
                    field_typography_font_size: PX(14),
                    field_text_color: '#0F172A',
                    field_background_color: '#FFFFFF',
                    field_border_border: 'solid',
                    field_border_width: BOX(1, 1, 1, 1),
                    field_border_color: '#E2E8F0',
                    field_border_radius: RAD(12),
                    field_padding: BOX(10, 14, 10, 14)
                  }),
                  createWidget('text-editor', {
                    editor: '<p style="text-align:center;font-size:10px;color:#94A3B8;">Your information is confidential and will only be used by HQuarters management.</p>'
                  })
                ]
              )
            ]
          )
        ]
      )
    ]
  );
}

// =================================================================
// GALLERY SHOWCASE (React: space pages — main image + 4 thumbs)
// =================================================================
function buildGallery(images) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      padding: BOX(20, 32, 60, 32, false),
      padding_mobile: BOX(12, 16, 40, 16, false),
      flex_gap: GAP(16)
    },
    [
      createContainer(
        {
          content_width: 'full',
          min_height: PX(520),
          min_height_tablet: PX(400),
          min_height_mobile: PX(260),
          border_radius: RAD(24),
          overflow: 'hidden',
          background_background: 'classic',
          background_image: { url: images[0] },
          background_position: 'center center',
          background_size: 'cover',
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 12, blur: 30, spread: 0, color: 'rgba(0,0,0,0.1)' }
        },
        []
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          flex_gap: GAP(16),
          justify_content: 'space-between'
        },
        images.slice(1, 5).map((src, idx) =>
          createContainer(
            {
              width: PCT(23.5),
              width_tablet: PCT(48),
              width_mobile: PCT(100),
              min_height: PX(130),
              border_radius: RAD(12),
              border_border: 'solid',
              border_width: BOX(idx === 0 ? 2 : 1, idx === 0 ? 2 : 1, idx === 0 ? 2 : 1, idx === 0 ? 2 : 1),
              border_color: idx === 0 ? '#EA8E18' : '#E2E8F0',
              overflow: 'hidden',
              background_background: 'classic',
              background_image: { url: src },
              background_position: 'center center',
              background_size: 'cover'
            },
            []
          )
        )
      )
    ]
  );
}

// =================================================================
// FEATURE GRID ("What's Included" — React: 6 light cards w/ icon tile)
// =================================================================
function buildFeatureGrid(badge, heading, features, icon) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      padding: BOX(80, 32, 80, 32, false),
      padding_mobile: BOX(56, 16, 56, 16, false),
      flex_gap: GAP(48),
      background_background: 'classic',
      background_color: '#FFFFFF'
    },
    [
      sectionHeader(badge, heading, null, { headingSize: 42, headingSizeTablet: 34, headingSizeMobile: 26 }),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          flex_gap: GAP(24),
          justify_content: 'space-between'
        },
        features.map((f) =>
          createContainer(
            {
              width: PCT(31.5),
              width_tablet: PCT(48),
              width_mobile: PCT(100),
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(12),
              border_border: 'solid',
              border_width: BOX(1, 1, 1, 1),
              border_color: '#E2E8F0',
              padding: BOX(32, 32, 32, 32),
              flex_direction: 'column',
              flex_gap: GAP(16),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 3, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              createContainer(
                {
                  width: PX(48),
                  min_height: PX(48),
                  background_background: 'classic',
                  background_color: '#FEF3E2',
                  border_radius: RAD(12),
                  justify_content: 'center',
                  align_items: 'center'
                },
                [
                  createWidget('icon', {
                    selected_icon: { value: f.icon || icon || 'fas fa-check', library: 'fa-solid' },
                    primary_color: '#B86807',
                    size: PX(22)
                  })
                ]
              ),
              createWidget('heading', {
                title: f.title,
                header_size: 'h3',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: PX(20),
                typography_font_weight: '500'
              }),
              createWidget('text-editor', {
                editor: `<p>${f.desc}</p>`,
                text_color: '#475569',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(14),
                typography_line_height: EM(1.6)
              })
            ]
          )
        )
      )
    ]
  );
}

// =================================================================
// SPACE PAGE HERO HEADER (breadcrumb + title + desc + spec card)
// =================================================================
function buildSpaceHero(badge, title, desc, specs, ctaText) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      flex_direction: 'column',
      padding: BOX(96, 32, 24, 32, false),
      padding_mobile: BOX(96, 16, 16, 16, false),
      flex_gap: GAP(24)
    },
    [
      createWidget('heading', {
        title: '<a href="/" style="color:#64748B;text-decoration:none;">Home</a> <span style="color:#CBD5E1;">&rsaquo;</span> <a href="/spaces" style="color:#64748B;text-decoration:none;">Spaces</a> <span style="color:#CBD5E1;">&rsaquo;</span> <span style="color:#EA8E18;font-weight:600;">' + badge + '</span>',
        header_size: 'span',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: PX(14)
      }),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          justify_content: 'space-between',
          align_items: 'flex-start',
          flex_gap: GAP(32)
        },
        [
          createContainer(
            {
              width: PCT(62),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(16)
            },
            [
              createWidget('heading', {
                title: badge.toUpperCase(),
                header_size: 'span',
                title_color: '#EA8E18',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(12),
                typography_font_weight: '700',
                typography_letter_spacing: PX(2),
                typography_text_transform: 'uppercase'
              }),
              createWidget('heading', {
                title: title,
                header_size: 'h1',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: PX(54),
                typography_font_size_tablet: PX(42),
                typography_font_size_mobile: PX(30),
                typography_font_weight: '500',
                typography_line_height: EM(1.12)
              }),
              createWidget('text-editor', {
                editor: `<p>${desc}</p>`,
                text_color: '#475569',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(17),
                typography_line_height: EM(1.6)
              })
            ]
          ),
          createContainer(
            {
              width: PCT(34),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              background_background: 'classic',
              background_color: '#FAF8F5',
              border_radius: RAD(16),
              border_border: 'solid',
              border_width: BOX(1, 1, 1, 1),
              border_color: '#E2E8F0',
              padding: BOX(24, 24, 24, 24),
              flex_direction: 'column',
              flex_gap: GAP(12)
            },
            [
              createWidget('heading', {
                title: 'Quick Specs',
                header_size: 'h4',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: PX(18),
                typography_font_weight: '600'
              }),
              createWidget('text-editor', {
                editor: `<ul style="margin:0;padding-left:18px;">${specs.map((s) => `<li style="font-size:14px;color:#475569;margin-bottom:6px;">${s}</li>`).join('')}</ul>`
              }),
              createWidget('button', {
                text: ctaText || 'Request Proposal',
                link: { url: '#find-space' },
                size: 'sm',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: PX(14),
                typography_font_weight: '700',
                button_text_color: '#FFFFFF',
                background_color: '#EA8E18',
                border_radius: RAD(12),
                padding: BOX(12, 20, 12, 20)
              })
            ]
          )
        ]
      )
    ]
  );
}

// =================================================================
// PAGE 1 — HOMEPAGE
// =================================================================
function generateHomepage() {
  exportElementorTemplate('HQuarters - Homepage', [
    buildHero(),
    buildBusinessJourney(),
    buildAddressStatement(),
    buildPartners(),
    buildBuildingHighlights(),
    buildCTA(
      'Where Will Your Business ',
      'Go Next?',
      'Start from an address. Build your team. Own your space. Or move your company to its next headquarters. Whatever comes next, start at HQuarters.',
      'Find My Space',
      '/find-space'
    )
  ], 'homepage-id.json');
}

// =================================================================
// PAGE 2 — SPACES HUB
// =================================================================
function generateSpacesHub() {
  const spaces = [
    {
      badge: 'Virtual Office', title: 'Start Here.', desc: 'Professional business presence without a permanent office.',
      specs: ['Kapasitas: 1 orang / tim kecil', 'Legalitas domisili PT, CV, PMA', 'Penerimaan surat & telepon', 'Akses meeting room'],
      image: '/SPACES/SERVICED OFFICE/6.webp', url: '/spaces/virtual-office'
    },
    {
      badge: 'Serviced Office', title: 'Work Here.', desc: 'Ready-to-use workspace with facilities and service included.',
      specs: ['Kapasitas: 1 - 20 orang', 'Fully furnished & AC', 'Internet fiber dedicated', 'Resepsionis & cleaning'],
      image: '/SPACES/SERVICED OFFICE/1.webp', url: '/spaces/serviced-office'
    },
    {
      badge: 'SOHO', title: 'Own Here.', desc: 'Office. Home office. Living space. One space that grows with you. #FleksibelAja',
      specs: ['Kapasitas: 4 - 12 orang', 'Duplex 2 lantai, plafon double height', 'Kamar mandi & pantry privat', 'Strata title / sewa'],
      image: '/SPACES/SOHO/SOHO 01.webp', url: '/spaces/soho'
    },
    {
      badge: 'Premium Office', title: 'Grow Here.', desc: 'Representative, professional space built to support your next chapter.',
      specs: ['Kapasitas: 10 - 150+ orang', 'Luas: 60 - 500+ m2', 'Bare / custom fit-out', 'Akses 24/7 dedicated'],
      image: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp', url: '/spaces/premium-office'
    },
    {
      badge: 'Function Room', title: 'Gather Here.', desc: 'State-of-the-art venue for corporate events, seminars and banquets.',
      specs: ['Kapasitas hingga 150+ peserta', 'Theater / classroom / banquet', 'Proyektor & sound system', 'Paket F&B tersedia'],
      image: '/BUILDING/FR 01.webp', url: '/spaces/function-room'
    }
  ];

  exportElementorTemplate('HQuarters - Spaces', [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(96, 32, 40, 32, false),
        padding_mobile: BOX(96, 16, 24, 16, false),
        flex_gap: GAP(12),
        align_items: 'center'
      },
      [
        sectionHeader(
          'SPACES',
          'A Space for <span style="color:#EA8E18;">Every Stage of Business.</span>',
          'From a prestigious virtual address to a full corporate floor — choose the workspace that fits how your team works today.',
          { headingSize: 48, headingSizeTablet: 38, headingSizeMobile: 30 }
        )
      ]
    ),
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(24, 32, 80, 32, false),
        padding_mobile: BOX(16, 16, 56, 16, false),
        flex_gap: GAP(32)
      },
      spaces.map((s, i) =>
        createContainer(
          {
            content_width: 'full',
            flex_direction: i % 2 === 0 ? 'row' : 'row-reverse',
            flex_direction_tablet: 'column',
            flex_direction_mobile: 'column',
            background_background: 'classic',
            background_color: '#FFFFFF',
            border_radius: RAD(24),
            border_border: 'solid',
            border_width: BOX(1, 1, 1, 1),
            border_color: '#E2E8F0',
            overflow: 'hidden',
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 30, spread: 0, color: 'rgba(0,0,0,0.05)' }
          },
          [
            createContainer(
              {
                width: PCT(50),
                width_tablet: PCT(100),
                width_mobile: PCT(100),
                min_height: PX(420),
                min_height_mobile: PX(240),
                background_background: 'classic',
                background_image: { url: s.image },
                background_position: 'center center',
                background_size: 'cover'
              },
              []
            ),
            createContainer(
              {
                width: PCT(50),
                width_tablet: PCT(100),
                width_mobile: PCT(100),
                padding: BOX(48, 48, 48, 48),
                padding_mobile: BOX(28, 20, 28, 20),
                flex_direction: 'column',
                justify_content: 'center',
                flex_gap: GAP(16)
              },
              [
                createWidget('heading', {
                  title: s.badge,
                  header_size: 'span',
                  title_color: '#EA8E18',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: PX(11),
                  typography_font_weight: '800',
                  typography_letter_spacing: PX(1.2),
                  typography_text_transform: 'uppercase'
                }),
                createWidget('heading', {
                  title: s.title,
                  header_size: 'h2',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: PX(34),
                  typography_font_size_mobile: PX(26),
                  typography_font_weight: '500'
                }),
                createWidget('text-editor', {
                  editor: `<p>${s.desc}</p>`,
                  text_color: '#475569',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: PX(15),
                  typography_line_height: EM(1.6)
                }),
                createWidget('text-editor', {
                  editor: `<ul style="margin:0;padding-left:18px;">${s.specs.map((x) => `<li style="font-size:14px;color:#334155;font-weight:500;margin-bottom:6px;">${x}</li>`).join('')}</ul>`
                }),
                createWidget('button', {
                  text: 'Explore Space →',
                  link: { url: s.url },
                  size: 'sm',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: PX(14),
                  typography_font_weight: '700',
                  button_text_color: '#FFFFFF',
                  background_color: '#EA8E18',
                  border_radius: RAD(12),
                  padding: BOX(12, 24, 12, 24)
                })
              ]
            )
          ]
        )
      )
    ),
    buildCTA(
      'Ready to Claim Your ',
      'Ideal Workspace?',
      'Whether you need a prestigious virtual address, a turnkey serviced desk, a SOHO, or a premium corporate floor — our team is ready to guide your selection.',
      'Schedule a Private Tour',
      '/find-space'
    )
  ], 'page-spaces-hub-id.json');
}

// =================================================================
// PAGE 3-7 — SPACE DETAIL PAGES
// =================================================================
function generatePremiumOffice() {
  const imgs = [
    '/SPACES/PREMIUM OFFICE/Premium Office 06.webp',
    '/SPACES/PREMIUM OFFICE/Premium Office.webp',
    '/SPACES/PREMIUM OFFICE/Premium Office 05.webp',
    '/SPACES/PREMIUM OFFICE/Premium Office 07.webp',
    '/SPACES/PREMIUM OFFICE/Premium Office 06.webp'
  ];
  exportElementorTemplate('HQuarters - Space Premium Office', [
    buildSpaceHero(
      'Premium Office',
      'Everything a Modern Company Expects.',
      'Representative, professional space built to support your next chapter. Located in the heart of Asia Afrika CBD, Bandung.',
      ['Kapasitas: 10 - 150+ orang', 'Luas: 60 - 500+ m2', 'Bare / custom fit-out', 'Akses 24/7 dedicated'],
      'Request Floorplan & Proposal'
    ),
    buildGallery(imgs),
    buildFeatureGrid(
      "WHAT'S INCLUDED",
      'Everything a Modern Company Expects.',
      [
        { title: 'Professional Image', desc: 'Premium common areas and business environment that reflect corporate credibility.', icon: 'fas fa-building' },
        { title: 'Space To Grow', desc: 'Unit and layout choices for organizations of different sizes.', icon: 'fas fa-users' },
        { title: 'Business Connectivity', desc: 'Fiber infrastructure and connectivity support for modern business.', icon: 'fas fa-wifi' },
        { title: 'Accessibility', desc: "Located in the centre of Bandung's activity.", icon: 'fas fa-map-marker-alt' },
        { title: 'Security', desc: '24-hour professional security and layered building access.', icon: 'fas fa-shield-alt' },
        { title: 'Employee Experience', desc: 'Gym, sauna and heated pool that raise the quality of the workplace.', icon: 'fas fa-heart' }
      ]
    ),
    buildTeamSize(),
    buildMasterForm('Premium Office')
  ], 'page-space-premium-office-id.json');
}

function generateSoho() {
  const imgs = [
    '/SPACES/SOHO/SOHO 01.webp',
    '/SPACES/SOHO/SOHO 02.webp',
    '/SPACES/SOHO/SOHO 03.webp',
    '/SPACES/SOHO/SOHO 04.webp',
    '/SPACES/SOHO/SOHO 01.webp'
  ];
  exportElementorTemplate('HQuarters - Space SOHO Duplex', [
    buildSpaceHero(
      'SOHO',
      'Office. Home office. Living space. #FleksibelAja',
      'One space that grows with you. Double-height duplex units for living, working, or a representative private studio in Asia Afrika CBD.',
      ['Tipe: Duplex 2 lantai', 'Kapasitas: 4 - 12 orang', 'Plafon double height', 'Kamar mandi & pantry privat'],
      'Find My SOHO Unit'
    ),
    buildGallery(imgs),
    buildFeatureGrid(
      "WHAT'S INCLUDED",
      'One Space That Grows With You.',
      [
        { title: 'Double-Height Ceiling', desc: 'Generous vertical space with natural light across both levels.', icon: 'fas fa-arrows-alt-v' },
        { title: 'Mezzanine Layout', desc: 'Clear separation between working floor and private upper level.', icon: 'fas fa-layer-group' },
        { title: 'Private Facilities', desc: 'En-suite bathroom and kitchenette inside your own unit.', icon: 'fas fa-home' },
        { title: 'Strata Ownership', desc: 'Available to lease or own as a commercial property asset.', icon: 'fas fa-file-signature' },
        { title: 'Building Amenities', desc: 'Access to gym, sauna and heated swimming pool.', icon: 'fas fa-water' },
        { title: 'Flexible Use', desc: 'Suitable for creative studios, law firms, agencies and startups.', icon: 'fas fa-briefcase' }
      ]
    ),
    buildMasterForm('SOHO')
  ], 'page-space-soho-id.json');
}

function generateServiced() {
  const imgs = [
    '/SPACES/SERVICED OFFICE/1.webp',
    '/SPACES/SERVICED OFFICE/2.webp',
    '/SPACES/SERVICED OFFICE/3.webp',
    '/SPACES/SERVICED OFFICE/6.webp',
    '/SPACES/SERVICED OFFICE/1.webp'
  ];
  exportElementorTemplate('HQuarters - Space Serviced Office', [
    buildSpaceHero(
      'Serviced Office',
      'Ready-to-Use Workspace, Ready in 24 Hours.',
      'Fully furnished, high-speed fiber internet, meeting rooms, and reception support included. Move in and start working immediately.',
      ['Kapasitas: 1 - 20 orang', 'Fully furnished & AC', 'Internet fiber dedicated', 'Resepsionis & cleaning harian'],
      'Request Serviced Office Tour'
    ),
    buildGallery(imgs),
    buildFeatureGrid(
      "WHAT'S INCLUDED",
      'Everything Included In One Monthly Fee.',
      [
        { title: 'Fully Furnished', desc: 'Ergonomic desks, executive chairs, storage and air conditioning.', icon: 'fas fa-chair' },
        { title: 'Fiber Internet', desc: 'High-speed dedicated connection with backup line.', icon: 'fas fa-wifi' },
        { title: 'Reception Support', desc: 'Professional front desk to greet your guests and handle mail.', icon: 'fas fa-concierge-bell' },
        { title: 'Meeting Rooms', desc: 'Monthly quota of smart-screen meeting rooms for client sessions.', icon: 'fas fa-users' },
        { title: 'Daily Cleaning', desc: 'Housekeeping and utility costs already covered in your lease.', icon: 'fas fa-broom' },
        { title: 'Flexible Terms', desc: 'Monthly to yearly commitments without large upfront capital.', icon: 'fas fa-calendar-alt' }
      ]
    ),
    buildMasterForm('Serviced Office')
  ], 'page-space-serviced-office-id.json');
}

function generateVirtual() {
  const packages = [
    {
      name: 'Silver',
      desc: 'For freelancers and new business registrations.',
      items: ['Prestigious Asia Afrika business address', 'Mail & parcel handling', 'Email / WhatsApp notification', 'Building reception access']
    },
    {
      name: 'Gold',
      desc: 'For PT / CV needing meeting rooms and a dedicated line.',
      items: ['Everything in Silver', 'Dedicated business phone number', 'Professional call forwarding', '5 hours meeting room per month'],
      highlight: true
    },
    {
      name: 'Platinum',
      desc: 'For established companies needing priority service.',
      items: ['Everything in Gold', '12 hours meeting room per month', 'Company listing in building directory', 'Executive lounge access']
    }
  ];

  exportElementorTemplate('HQuarters - Space Virtual Office', [
    buildSpaceHero(
      'Virtual Office',
      'Establish Your Corporate Presence.',
      'Get a prestigious Asia Afrika CBD domicile, mail handling, call answering, and meeting room access to grow your enterprise credibility.',
      ['Domisili: Gedung Grade A Asia Afrika', 'Legalitas PT / CV / PMA', 'Penerimaan surat & paket', 'Akses meeting room'],
      'Inquire Virtual Office Package'
    ),
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(40, 32, 60, 32, false),
        padding_mobile: BOX(24, 16, 40, 16, false),
        flex_gap: GAP(40)
      },
      [
        sectionHeader('PACKAGES', 'Choose the Plan That <span style="color:#EA8E18;">Fits Your Stage.</span>', null, { headingSize: 42, headingSizeTablet: 34, headingSizeMobile: 26 }),
        createContainer(
          {
            content_width: 'full',
            flex_direction: 'row',
            flex_wrap: 'wrap',
            flex_gap: GAP(24),
            justify_content: 'space-between'
          },
          packages.map((p) =>
            createContainer(
              {
                width: PCT(31.5),
                width_tablet: PCT(48),
                width_mobile: PCT(100),
                background_background: 'classic',
                background_color: p.highlight ? '#FEF3E2' : '#FFFFFF',
                border_radius: RAD(24),
                border_border: 'solid',
                border_width: BOX(p.highlight ? 2 : 1, p.highlight ? 2 : 1, p.highlight ? 2 : 1, p.highlight ? 2 : 1),
                border_color: p.highlight ? '#EA8E18' : '#E2E8F0',
                padding: BOX(36, 32, 36, 32),
                flex_direction: 'column',
                justify_content: 'space-between',
                flex_gap: GAP(24),
                box_shadow_box_shadow_type: 'yes',
                box_shadow_box_shadow: { horizontal: 0, vertical: 2, blur: 8, spread: 0, color: 'rgba(0,0,0,0.04)' }
              },
              [
                createContainer(
                  { flex_direction: 'column', flex_gap: GAP(16) },
                  [
                    createWidget('heading', {
                      title: p.name,
                      header_size: 'h3',
                      title_color: '#0F172A',
                      typography_typography: 'custom',
                      typography_font_family: 'Outfit',
                      typography_font_size: PX(26),
                      typography_font_weight: '500'
                    }),
                    createWidget('text-editor', {
                      editor: `<p>${p.desc}</p>`,
                      text_color: '#475569',
                      typography_typography: 'custom',
                      typography_font_family: 'Plus Jakarta Sans',
                      typography_font_size: PX(14),
                      typography_line_height: EM(1.6)
                    }),
                    createWidget('divider', { style: 'solid', weight: PX(1), color: '#E2E8F0' }),
                    createWidget('text-editor', {
                      editor: `<ul style="margin:0;padding-left:18px;">${p.items.map((x) => `<li style="font-size:14px;color:#334155;margin-bottom:8px;">${x}</li>`).join('')}</ul>`
                    })
                  ]
                ),
                createWidget('button', {
                  text: 'Inquire This Package →',
                  link: { url: '#find-space' },
                  size: 'sm',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: PX(14),
                  typography_font_weight: '700',
                  button_text_color: '#FFFFFF',
                  background_color: '#EA8E18',
                  border_radius: RAD(12),
                  padding: BOX(12, 24, 12, 24)
                })
              ]
            )
          )
        )
      ]
    ),
    buildFeatureGrid(
      "WHAT'S INCLUDED",
      'Everything You Need for a Credible Address.',
      [
        { title: 'Prestige Address', desc: 'Use Jl. Asia Afrika No. 158 Bandung on your letterhead, cards and website.', icon: 'fas fa-map-marker-alt' },
        { title: 'Domicile Letter', desc: 'Official building domicile letter for PT, CV and PMA licensing.', icon: 'fas fa-file-signature' },
        { title: 'Mail Handling', desc: 'Front desk receives documents and parcels, then notifies you instantly.', icon: 'fas fa-envelope' },
        { title: 'Dedicated Phone Line', desc: 'A business phone number answered professionally in your company name.', icon: 'fas fa-phone' },
        { title: 'Meeting Room Access', desc: 'Representative meeting rooms available whenever you meet clients on site.', icon: 'fas fa-users' },
        { title: 'Lower Overhead', desc: 'Build enterprise credibility without the cost of a full physical office.', icon: 'fas fa-chart-line' }
      ]
    ),
    buildMasterForm('Virtual Office')
  ], 'page-space-virtual-office-id.json');
}

function generateFunctionRoom() {
  const imgs = [
    '/BUILDING/FR 01.webp',
    '/BUILDING/01.webp',
    '/BUILDING/02.webp',
    '/BUILDING/gym 01.webp',
    '/BUILDING/FR 01.webp'
  ];
  exportElementorTemplate('HQuarters - Space Function Room', [
    buildSpaceHero(
      'Function Room',
      'Plan Your Next Corporate Gathering.',
      'State-of-the-art audiovisual setups, flexible seating, and dedicated event support for board meetings, seminars, and banquets.',
      ['Kapasitas hingga 150+ peserta', 'Theater / classroom / banquet', 'Proyektor & sound system', 'Paket F&B tersedia'],
      'Inquire Function Room Booking'
    ),
    buildGallery(imgs),
    buildFeatureGrid(
      "WHAT'S INCLUDED",
      'Everything Your Event Needs, Handled.',
      [
        { title: 'Professional AV', desc: 'Sound system, wireless microphones and high-resolution projector.', icon: 'fas fa-volume-up' },
        { title: 'Flexible Seating', desc: 'Theater, classroom, round-table banquet or U-shape boardroom layouts.', icon: 'fas fa-chair' },
        { title: 'Catering & F&B', desc: 'Coffee break, buffet lunch and formal dinner packages available.', icon: 'fas fa-utensils' },
        { title: 'Easy Parking', desc: 'Large-capacity mechanical parking for all your guests and delegates.', icon: 'fas fa-car' },
        { title: 'Central Location', desc: 'Jl. Asia Afrika, minutes from the train station and five-star hotels.', icon: 'fas fa-map-marker-alt' },
        { title: 'Event Support Team', desc: 'On-site technical and operations staff throughout your event.', icon: 'fas fa-headset' }
      ]
    ),
    buildMasterForm('Function Room')
  ], 'page-space-function-room-id.json');
}

// Team size selector (React: Premium Office "How Big Is Your Team?")
function buildTeamSize() {
  const sizes = [
    { size: '10 — 20 People', desc: 'Compact corporate office' },
    { size: '20 — 40 People', desc: 'Flexible office layout.' },
    { size: '40 — 80 People', desc: 'Larger combined office solutions.' },
    { size: '80 — 150+ People', desc: 'Custom corporate configuration.' }
  ];
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: PX(1440),
      padding: BOX(40, 32, 40, 32, false),
      padding_mobile: BOX(24, 16, 24, 16, false)
    },
    [
      createContainer(
        {
          content_width: 'full',
          background_background: 'classic',
          background_color: '#FAF8F5',
          border_radius: RAD(40),
          border_radius_mobile: RAD(20),
          border_border: 'solid',
          border_width: BOX(1, 1, 1, 1),
          border_color: '#E2E8F0',
          padding: BOX(56, 48, 56, 48),
          padding_mobile: BOX(36, 20, 36, 20),
          flex_direction: 'column',
          flex_gap: GAP(32)
        },
        [
          sectionHeader('SIZED TO YOUR TEAM', 'How Big Is Your Team?', null, { headingSize: 42, headingSizeTablet: 34, headingSizeMobile: 26 }),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              flex_wrap: 'wrap',
              flex_gap: GAP(24),
              justify_content: 'space-between'
            },
            sizes.map((s) =>
              createContainer(
                {
                  width: PCT(23.5),
                  width_tablet: PCT(48),
                  width_mobile: PCT(100),
                  background_background: 'classic',
                  background_color: '#FFFFFF',
                  border_radius: RAD(16),
                  border_border: 'solid',
                  border_width: BOX(1, 1, 1, 1),
                  border_color: '#E2E8F0',
                  padding: BOX(24, 16, 24, 16),
                  flex_direction: 'column',
                  align_items: 'center',
                  text_align: 'center',
                  flex_gap: GAP(6),
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 3, spread: 0, color: 'rgba(0,0,0,0.05)' }
                },
                [
                  createWidget('heading', {
                    title: s.size,
                    header_size: 'h3',
                    title_color: '#0F172A',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: PX(24),
                    typography_font_weight: '500',
                    align: 'center'
                  }),
                  createWidget('text-editor', {
                    editor: `<p style="text-align:center;margin:0;">${s.desc}</p>`,
                    text_color: '#475569',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(14)
                  })
                ]
              )
            )
          )
        ]
      )
    ]
  );
}

// =================================================================
// PAGE 8 — BUILDING
// =================================================================
function generateBuilding() {
  const blocks = [
    {
      title: 'Automated Mechanical Parking',
      desc: 'Large-capacity parking supported by mechanical parking systems that save space and time for every tenant and guest.',
      img: '/BUILDING/02.webp', anchor: 'parking'
    },
    {
      title: 'Layered Security & Engineering',
      desc: 'Controlled building access, CCTV coverage on every public floor, and 100% backup power supported by professional engineering teams.',
      img: '/BUILDING/01.webp', anchor: 'security'
    },
    {
      title: 'Health & Wellness Amenities',
      desc: 'Gym, sauna and heated swimming pool designed to raise the quality of your working day.',
      img: '/BUILDING/kolam renang 5_4.webp', anchor: 'building-amenities'
    },
    {
      title: 'Meeting & Business Facilities',
      desc: 'Meeting rooms, connectivity and professional building management that keep your operations running without friction.',
      img: '/BUILDING/gym 01.webp', anchor: 'infrastructure'
    }
  ];

  exportElementorTemplate('HQuarters - Building', [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(96, 32, 40, 32, false),
        padding_mobile: BOX(96, 16, 24, 16, false),
        flex_gap: GAP(12),
        align_items: 'center'
      },
      [
        sectionHeader(
          'THE BUILDING',
          'Built for Business. <br><span style="color:#EA8E18;">Designed for Life.</span>',
          'HQuarters Business Residence combines modern engineering, layered security and premium lifestyle facilities in one Asia Afrika CBD tower.',
          { headingSize: 48, headingSizeTablet: 38, headingSizeMobile: 30 }
        )
      ]
    ),
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(24, 32, 80, 32, false),
        padding_mobile: BOX(16, 16, 56, 16, false),
        flex_gap: GAP(32)
      },
      blocks.map((b, i) =>
        createContainer(
          {
            content_width: 'full',
            flex_direction: i % 2 === 0 ? 'row' : 'row-reverse',
            flex_direction_tablet: 'column',
            flex_direction_mobile: 'column',
            background_background: 'classic',
            background_color: '#FFFFFF',
            border_radius: RAD(24),
            border_border: 'solid',
            border_width: BOX(1, 1, 1, 1),
            border_color: '#E2E8F0',
            overflow: 'hidden',
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 30, spread: 0, color: 'rgba(0,0,0,0.05)' },
            _element_id: b.anchor
          },
          [
            createContainer(
              {
                width: PCT(50),
                width_tablet: PCT(100),
                width_mobile: PCT(100),
                min_height: PX(380),
                min_height_mobile: PX(240),
                background_background: 'classic',
                background_image: { url: b.img },
                background_position: 'center center',
                background_size: 'cover'
              },
              []
            ),
            createContainer(
              {
                width: PCT(50),
                width_tablet: PCT(100),
                width_mobile: PCT(100),
                padding: BOX(40, 40, 40, 40),
                padding_mobile: BOX(28, 20, 28, 20),
                flex_direction: 'column',
                justify_content: 'center',
                flex_gap: GAP(16)
              },
              [
                createWidget('heading', {
                  title: b.title,
                  header_size: 'h2',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: PX(30),
                  typography_font_size_mobile: PX(24),
                  typography_font_weight: '500'
                }),
                createWidget('text-editor', {
                  editor: `<p>${b.desc}</p>`,
                  text_color: '#475569',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: PX(16),
                  typography_line_height: EM(1.6)
                })
              ]
            )
          ]
        )
      )
    ),
    buildCTA('Explore the Building ', 'in Person.', 'Schedule a private tour with our management team and see the infrastructure, security systems and amenities first hand.', 'Schedule a Private Tour', '/find-space')
  ], 'page-building-id.json');
}

// =================================================================
// PAGE 9 — LOCATION
// =================================================================
function generateLocation() {
  const vicinity = [
    { time: '5 min', title: 'Bandung Train Station', desc: 'Direct access to intercity rail and the Jakarta - Bandung high-speed line.' },
    { time: '10 min', title: 'Pasteur & Pasir Koja Toll', desc: 'Fast connection to the main toll gates in and out of the city.' },
    { time: '1 min', title: 'Banking & Financial District', desc: 'Surrounded by regional offices of Indonesia\u2019s major banks.' },
    { time: '3 min', title: 'Hotels & Culinary District', desc: 'Close to Savoy Homann, Braga Citywalk and established restaurants.' }
  ];

  exportElementorTemplate('HQuarters - Location', [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(96, 32, 40, 32, false),
        padding_mobile: BOX(96, 16, 24, 16, false),
        flex_gap: GAP(12),
        align_items: 'center'
      },
      [
        sectionHeader(
          'ASIA AFRIKA CBD',
          'Your Address Says Something <br><span style="color:#EA8E18;">About Your Business.</span>',
          "When clients, partners, or candidates walk in, they form an impression before the meeting even starts. HQuarters offers a modern, professional business environment in Bandung's most iconic district.",
          { headingSize: 48, headingSizeTablet: 38, headingSizeMobile: 30 }
        )
      ]
    ),
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        padding: BOX(24, 32, 40, 32, false),
        padding_mobile: BOX(16, 16, 24, 16, false)
      },
      [
        createContainer(
          {
            content_width: 'full',
            min_height: PX(480),
            min_height_mobile: PX(280),
            border_radius: RAD(16),
            overflow: 'hidden',
            border_border: 'solid',
            border_width: BOX(1, 1, 1, 1),
            border_color: '#E2E8F0',
            background_background: 'classic',
            background_image: { url: '/addressstatement/21;9.webp' },
            background_position: 'center bottom',
            background_size: 'cover',
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' }
          },
          []
        )
      ]
    ),
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'row',
        flex_wrap: 'wrap',
        flex_gap: GAP(24),
        justify_content: 'space-between',
        padding: BOX(24, 32, 80, 32, false),
        padding_mobile: BOX(16, 16, 56, 16, false)
      },
      vicinity.map((v) =>
        createContainer(
          {
            width: PCT(23.5),
            width_tablet: PCT(48),
            width_mobile: PCT(100),
            background_background: 'classic',
            background_color: '#FAF8F5',
            border_radius: RAD(16),
            border_border: 'solid',
            border_width: BOX(1, 1, 1, 1),
            border_color: '#E2E8F0',
            padding: BOX(28, 24, 28, 24),
            flex_direction: 'column',
            flex_gap: GAP(8)
          },
          [
            createWidget('heading', {
              title: v.time,
              header_size: 'span',
              title_color: '#EA8E18',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: PX(24),
              typography_font_weight: '600'
            }),
            createWidget('heading', {
              title: v.title,
              header_size: 'h3',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: PX(18),
              typography_font_weight: '500'
            }),
            createWidget('text-editor', {
              editor: `<p style="margin:0;">${v.desc}</p>`,
              text_color: '#475569',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: PX(14),
              typography_line_height: EM(1.6)
            })
          ]
        )
      )
    ),
    buildCTA('Discover The ', 'Location.', 'Visit HQuarters at Jl. Asia Afrika No. 158, Bandung, Jawa Barat 40261, and see why this address works for your business.', 'Schedule a Visit', '/find-space')
  ], 'page-location-id.json');
}

// =================================================================
// PAGE 10 — COMPANIES
// =================================================================
function generateCompanies() {
  const logos = [
    'GF allianz', '7de axa', '9ef MSIG', '7i mitsubishi', '16j roche', '6FGH fwd',
    '19r avrist', '19 OP Dana-Logo', 'UG his travel', '16E henan sekuritas', 'huawei', 'GF B garuda'
  ];
  return exportElementorTemplate('HQuarters - Companies', [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(96, 32, 40, 32, false),
        padding_mobile: BOX(96, 16, 24, 16, false),
        flex_gap: GAP(12),
        align_items: 'center'
      },
      [
        sectionHeader(
          "YOU'RE IN GOOD COMPANY",
          'Trusted by Businesses That Know the Value of the Right Address.',
          'HQuarters is home to national insurers, global manufacturers, financial institutions and professional firms that chose Asia Afrika as their base.',
          { headingSize: 44, headingSizeTablet: 36, headingSizeMobile: 28 }
        )
      ]
    ),
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'row',
        flex_wrap: 'wrap',
        justify_content: 'center',
        align_items: 'center',
        flex_gap: GAP(24),
        padding: BOX(24, 32, 80, 32, false),
        padding_mobile: BOX(16, 16, 56, 16, false)
      },
      logos.map((l) =>
        createContainer(
          {
            width: PX(224),
            width_mobile: PCT(48),
            min_height: PX(112),
            background_background: 'classic',
            background_color: '#F8FAFC',
            border_border: 'solid',
            border_width: BOX(1, 1, 1, 1),
            border_color: '#E2E8F0',
            border_radius: RAD(16),
            padding: BOX(12, 12, 12, 12),
            justify_content: 'center',
            align_items: 'center',
            overflow: 'hidden',
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 2, blur: 8, spread: 0, color: 'rgba(0,0,0,0.04)' }
          },
          [
            createContainer(
              {
                width: PCT(100),
                min_height: PX(88),
                background_background: 'classic',
                background_image: { url: `/homepagelogobaru/${l}.webp` },
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
    buildCTA('Meet The HQuarters ', 'Business Community.', 'Join the companies that already work from Asia Afrika CBD and grow alongside them.', 'Find My Space', '/find-space')
  ], 'page-companies-id.json');
}

// =================================================================
// PAGE 11 — INSIGHTS
// =================================================================
function generateInsights() {
  return exportElementorTemplate('HQuarters - Insights', [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(96, 32, 80, 32, false),
        padding_mobile: BOX(96, 16, 56, 16, false),
        flex_gap: GAP(12),
        align_items: 'center'
      },
      [
        sectionHeader(
          'INSIGHTS & JOURNAL',
          'Perspectives on <span style="color:#EA8E18;">Space and Business.</span>',
          'Articles on workspace strategy, property trends and how companies choose the right address in Bandung.',
          { headingSize: 48, headingSizeTablet: 38, headingSizeMobile: 30 }
        )
      ]
    ),
    buildCTA('Where Will Your Business ', 'Go Next?', 'Start from an address. Build your team. Own your space. Or move your company to its next headquarters. Whatever comes next, start at HQuarters.', 'Find My Space', '/find-space')
  ], 'page-insights-id.json');
}

// =================================================================
// PAGE 12 — FIND SPACE
// =================================================================
function generateFindSpace() {
  const options = [
    { label: 'I need a Premium Office', value: 'Premium Office', desc: 'For established teams & corporate headquarters', icon: 'fas fa-building' },
    { label: 'I want to Own a SOHO', value: 'SOHO', desc: 'Flexible fusion of living & working space', icon: 'fas fa-home' },
    { label: 'I need a Serviced Office', value: 'Serviced Office', desc: 'Fully equipped turnkey office for fast teams', icon: 'fas fa-briefcase' },
    { label: 'I need a Virtual Office', value: 'Virtual Office', desc: 'Prestige CBD business address & mail service', icon: 'fas fa-envelope-open-text' },
    { label: 'I want to book Function Room', value: 'Function Room', desc: 'Flexible hall for corporate events, seminars & banquets', icon: 'fas fa-calendar-alt' }
  ];

  exportElementorTemplate('HQuarters - Find Space', [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        padding: BOX(96, 32, 40, 32, false),
        padding_mobile: BOX(96, 16, 24, 16, false),
        flex_gap: GAP(12),
        align_items: 'center'
      },
      [
        sectionHeader(
          'FIND MY SPACE',
          'Tell Us What <span style="color:#EA8E18;">You Need.</span>',
          'Pick the workspace type below and share your details. Our team will respond with a tailored proposal and floorplan.',
          { headingSize: 48, headingSizeTablet: 38, headingSizeMobile: 30 }
        )
      ]
    ),
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: PX(1440),
        flex_direction: 'column',
        flex_gap: GAP(16),
        padding: BOX(24, 32, 24, 32, false),
        padding_mobile: BOX(16, 16, 16, 16, false)
      },
      options.map((o) =>
        createContainer(
          {
            content_width: 'full',
            flex_direction: 'row',
            align_items: 'center',
            flex_gap: GAP(20),
            background_background: 'classic',
            background_color: '#F8FAFC',
            border_border: 'solid',
            border_width: BOX(1, 1, 1, 1),
            border_color: '#E2E8F0',
            border_radius: RAD(16),
            padding: BOX(24, 28, 24, 28),
            custom_css: 'selector { transition: all .3s ease; }\nselector:hover { background:#FFFFFF; border-color:#EA8E18; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1); }'
          },
          [
            createContainer(
              {
                width: PX(52),
                min_height: PX(52),
                background_background: 'classic',
                background_color: '#FFFFFF',
                border_border: 'solid',
                border_width: BOX(1, 1, 1, 1),
                border_color: '#E2E8F0',
                border_radius: RAD(12),
                justify_content: 'center',
                align_items: 'center'
              },
              [
                createWidget('icon', {
                  selected_icon: { value: o.icon, library: 'fa-solid' },
                  primary_color: '#EA8E18',
                  size: PX(22)
                })
              ]
            ),
            createContainer(
              { width: PCT(100), flex_direction: 'column', flex_gap: GAP(4) },
              [
                createWidget('heading', {
                  title: o.label,
                  header_size: 'h3',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: PX(22),
                  typography_font_weight: '500'
                }),
                createWidget('text-editor', {
                  editor: `<p style="margin:0;">${o.desc}</p>`,
                  text_color: '#475569',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: PX(14)
                })
              ]
            ),
            createWidget('button', {
              text: 'Select →',
              link: { url: '#find-space' },
              size: 'sm',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: PX(13),
              typography_font_weight: '700',
              button_text_color: '#EA8E18',
              background_color: '#FFFFFF',
              border_border: 'solid',
              border_width: BOX(1, 1, 1, 1),
              border_color: '#EA8E18',
              border_radius: RAD(12),
              padding: BOX(10, 20, 10, 20)
            })
          ]
        )
      )
    ),
    buildMasterForm('Premium Office')
  ], 'page-find-space-id.json');
}

// RUN
console.log('Generating Elementor templates (faithful to React)...');
generateHomepage();
generateSpacesHub();
generatePremiumOffice();
generateSoho();
generateServiced();
generateVirtual();
generateFunctionRoom();
generateBuilding();
generateLocation();
generateCompanies();
generateInsights();
generateFindSpace();
console.log('Done.');
