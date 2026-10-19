import fs from 'fs';
import path from 'path';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function createContainer(settings = {}, elements = []) {
  return {
    id: generateId(),
    elType: 'container',
    isInner: false,
    settings,
    elements
  };
}

function createWidget(widgetType, settings = {}) {
  return {
    id: generateId(),
    elType: 'widget',
    widgetType,
    settings,
    elements: []
  };
}

const FONTS = { heading: 'Outfit', body: 'Plus Jakarta Sans' };
const COLORS = { gold: '#EA8E18', dark: '#0F172A', darkBg: '#231F20', cream: '#FAF8F5', slateText: '#475569', slateMuted: '#94A3B8', border: '#E2E8F0', white: '#FFFFFF' };

function buildHubHero({ badge, titleHtml, description, breadcrumbs }) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '24', right: '32', bottom: '20', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: false },
      flex_gap: { column: '16', row: '16', unit: 'px' }
    },
    [
      ...(breadcrumbs ? [
        createWidget('text-editor', {
          editor: `<p style="margin:0;">${breadcrumbs}</p>`,
          typography_typography: 'custom',
          typography_font_family: FONTS.body,
          typography_font_size: { unit: 'px', size: 13 },
          typography_font_weight: '500'
        })
      ] : []),
      createContainer(
        {
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          padding: { unit: 'px', top: '40', right: '20', bottom: '20', left: '20', isLinked: false },
          flex_gap: { column: '12', row: '12', unit: 'px' }
        },
        [
          ...(badge ? [
            createWidget('heading', {
              title: badge,
              header_size: 'span',
              title_color: COLORS.gold,
              typography_typography: 'custom',
              typography_font_family: FONTS.heading,
              typography_font_size: { unit: 'px', size: 13 },
              typography_font_weight: '700',
              typography_letter_spacing: { unit: 'px', size: 1.5 },
              align: 'center'
            })
          ] : []),
          createWidget('heading', {
            title: titleHtml,
            header_size: 'h1',
            title_color: COLORS.dark,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 52 },
            typography_font_size_tablet: { unit: 'px', size: 40 },
            typography_font_size_mobile: { unit: 'px', size: 32 },
            typography_font_weight: '500',
            typography_line_height: { unit: 'em', size: 1.15 },
            align: 'center'
          }),
          ...(description ? [
            createWidget('text-editor', {
              editor: `<p style="max-width:680px; margin:0 auto;">${description}</p>`,
              text_color: COLORS.slateText,
              typography_typography: 'custom',
              typography_font_family: FONTS.body,
              typography_font_size: { unit: 'px', size: 17 },
              typography_font_size_mobile: { unit: 'px', size: 15 },
              align: 'center'
            })
          ] : [])
        ]
      )
    ]
  );
}

// -------------------------------------------------------------
// 1. BUILDER: Spaces Hub Page (/spaces)
// -------------------------------------------------------------
function buildSpacesHubJSON() {
  const spaces = [
    { title: 'Premium Office', desc: 'Expansive executive floorplates for corporate regional headquarters.', url: '/spaces/premium-office', img: '/SPACES/PREMIUM OFFICE/Premium Office.webp' },
    { title: 'SOHO Duplex', desc: 'Double-height ceiling strata units fusing modern living and working.', url: '/spaces/soho', img: '/SPACES/SOHO/SOHO 01.webp' },
    { title: 'Serviced Office', desc: 'Turnkey fully-equipped office suites ready for immediate move-in.', url: '/spaces/serviced-office', img: '/SPACES/SERVICED OFFICE/1.webp' },
    { title: 'Virtual Office', desc: 'Prestige Asia Afrika CBD business address with legal domicile licensing.', url: '/spaces/virtual-office', img: '/SPACES/SERVICED OFFICE/6.webp' },
    { title: 'Function Room', desc: 'High-tech corporate event venue for seminars, banquets & board meetings.', url: '/events', img: '/BUILDING/FR 01.webp' }
  ];

  const template = {
    version: '0.4',
    title: 'Spaces Hub HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildHubHero({
        badge: 'SPACES OVERVIEW',
        titleHtml: 'Space for Every <span style="color:#EA8E18;">Stage of Business.</span>',
        description: 'Explore our tailored commercial real estate solutions in Asia Afrika CBD Bandung.',
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Spaces</strong>'
      }),
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          padding: { unit: 'px', top: '40', right: '32', bottom: '80', left: '32', isLinked: false },
          flex_gap: { column: '28', row: '28', unit: 'px' }
        },
        spaces.map((s) =>
          createContainer(
            {
              width: { unit: '%', size: 48 },
              width_mobile: { unit: '%', size: 100 },
              background_background: 'classic',
              background_color: COLORS.white,
              border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: COLORS.border,
              overflow: 'hidden',
              flex_direction: 'column',
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 8, blur: 24, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              createContainer({
                width: { unit: '%', size: 100 },
                min_height: { unit: 'px', size: 260 },
                background_background: 'classic',
                background_image: { url: s.img },
                background_position: 'center center',
                background_size: 'cover'
              }),
              createContainer(
                {
                  padding: { unit: 'px', top: '28', right: '28', bottom: '28', left: '28', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '14', row: '14', unit: 'px' }
                },
                [
                  createWidget('heading', { title: s.title, header_size: 'h3', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 24 } }),
                  createWidget('text-editor', { editor: `<p style="margin:0; font-size:15px; color:${COLORS.slateText}; line-height:1.6;">${s.desc}</p>` }),
                  createWidget('button', {
                    text: 'EXPLORE SPACE',
                    link: { url: s.url },
                    size: 'sm',
                    background_color: COLORS.gold,
                    border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
                    button_padding: { unit: 'px', top: '10', right: '24', bottom: '10', left: '24', isLinked: false },
                    icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
                    icon_align: 'right'
                  })
                ]
              )
            ]
          )
        )
      )
    ]
  };

  fs.writeFileSync(path.resolve('page-spaces.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-spaces.json');
}

// -------------------------------------------------------------
// 2. BUILDER: Building Page (/building)
// -------------------------------------------------------------
function buildBuildingJSON() {
  const highlights = [
    { title: 'Automated Mechanical Parking', desc: 'Multi-level automated vehicle storage reducing parking time and ensuring maximum security.', img: '/BUILDING/parkiran 5_4.webp' },
    { title: '24/7 Security & Engineering', desc: 'Layered security with round-the-clock patrol, CCTV surveillance, and specialized building maintenance engineers.', img: '/BUILDING/satpam.webp' },
    { title: 'Grand Arrival Lobby', desc: 'Impressive double-volume entrance lobby reflecting prestige from the moment clients step inside.', img: '/BUILDING/lobby 5_4.webp' },
    { title: 'Health & Wellness Center', desc: 'Equipped with an Olympic-standard heated pool, Finnish sauna, and modern gym facilities.', img: '/BUILDING/kolam renang 5_4.webp' }
  ];

  const template = {
    version: '0.4',
    title: 'Building & Facilities HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildHubHero({
        badge: 'BUILDING SPECIFICATIONS',
        titleHtml: 'Engineering Excellence <br><span style="color:#EA8E18;">In Every Detail.</span>',
        description: 'A 21-story Grade-A commercial tower built with advanced Japanese mechanical engineering and international safety standards.',
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Building</strong>'
      }),
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'column',
          padding: { unit: 'px', top: '20', right: '32', bottom: '80', left: '32', isLinked: false },
          flex_gap: { column: '40', row: '40', unit: 'px' }
        },
        highlights.map((h, idx) =>
          createContainer(
            {
              content_width: 'full',
              flex_direction: idx % 2 === 0 ? 'row' : 'row-reverse',
              flex_direction_tablet: 'column',
              flex_direction_mobile: 'column',
              align_items: 'center',
              background_background: 'classic',
              background_color: COLORS.white,
              border_radius: { unit: 'px', top: '32', right: '32', bottom: '32', left: '32', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: COLORS.border,
              overflow: 'hidden',
              flex_gap: { column: '36', row: '36', unit: 'px' }
            },
            [
              createContainer({
                width: { unit: '%', size: 50 },
                width_tablet: { unit: '%', size: 100 },
                width_mobile: { unit: '%', size: 100 },
                min_height: { unit: 'px', size: 360 },
                background_background: 'classic',
                background_image: { url: h.img },
                background_position: 'center center',
                background_size: 'cover'
              }),
              createContainer(
                {
                  width: { unit: '%', size: 50 },
                  width_tablet: { unit: '%', size: 100 },
                  width_mobile: { unit: '%', size: 100 },
                  padding: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '16', row: '16', unit: 'px' }
                },
                [
                  createWidget('heading', { title: h.title, header_size: 'h2', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 32 } }),
                  createWidget('text-editor', { editor: `<p style="margin:0; font-size:16px; color:${COLORS.slateText}; line-height:1.6;">${h.desc}</p>` })
                ]
              )
            ]
          )
        )
      )
    ]
  };

  fs.writeFileSync(path.resolve('page-building.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-building.json');
}

// -------------------------------------------------------------
// 3. BUILDER: Location Page (/location)
// -------------------------------------------------------------
function buildLocationJSON() {
  const template = {
    version: '0.4',
    title: 'Location Asia Afrika CBD HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildHubHero({
        badge: 'STRATEGIC LOCATION',
        titleHtml: 'In The Epicenter of <br><span style="color:#EA8E18;">Asia Afrika CBD.</span>',
        description: 'Jl. Asia Afrika No. 158, Bandung. Surrounded by government financial institutions, iconic heritage landmarks, and high-end transit corridors.',
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Location</strong>'
      }),
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          padding: { unit: 'px', top: '20', right: '32', bottom: '80', left: '32', isLinked: false }
        },
        [
          createContainer(
            {
              width: { unit: '%', size: 100 },
              min_height: { unit: 'px', size: 480 },
              border_radius: { unit: 'px', top: '32', right: '32', bottom: '32', left: '32', isLinked: true },
              overflow: 'hidden',
              background_background: 'classic',
              background_image: { url: '/addressstatement/21;9.webp' },
              background_position: 'center center',
              background_size: 'cover',
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 40, spread: 0, color: 'rgba(0,0,0,0.1)' }
            },
            []
          )
        ]
      )
    ]
  };

  fs.writeFileSync(path.resolve('page-location.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-location.json');
}

// -------------------------------------------------------------
// 4. BUILDER: Companies Page (/companies)
// -------------------------------------------------------------
function buildCompaniesJSON() {
  const partners = [
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

  const template = {
    version: '0.4',
    title: 'Companies & Community HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildHubHero({
        badge: 'TENANT COMMUNITY',
        titleHtml: 'Our Growing Business <br><span style="color:#EA8E18;">Ecosystem.</span>',
        description: 'Meet the market leaders, financial giants, and creative pioneers who call HQuarters their corporate home.',
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Companies</strong>'
      }),
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'center',
          padding: { unit: 'px', top: '20', right: '32', bottom: '80', left: '32', isLinked: false },
          flex_gap: { column: '24', row: '24', unit: 'px' }
        },
        partners.map((p) =>
          createContainer(
            {
              width: { unit: '%', size: 23 },
              width_tablet: { unit: '%', size: 30 },
              width_mobile: { unit: '%', size: 46 },
              min_height: { unit: 'px', size: 130 },
              background_background: 'classic',
              background_color: '#F8FAFC',
              border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: COLORS.border,
              padding: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
              justify_content: 'center',
              align_items: 'center'
            },
            [
              createWidget('image', {
                image: { url: p.src },
                image_size: 'full',
                align: 'center'
              })
            ]
          )
        )
      )
    ]
  };

  fs.writeFileSync(path.resolve('page-companies.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-companies.json');
}

// -------------------------------------------------------------
// 5. BUILDER: Insights Page (/insights)
// -------------------------------------------------------------
function buildInsightsJSON() {
  const articles = [
    { title: 'The Evolution of Modern Workspaces in Bandung CBD', category: 'MARKET TRENDS', date: 'August 2026', img: '/BUILDING/lobby 5_4.webp' },
    { title: 'Why Strata Title SOHO is the Prime Asset for Indonesian Entrepreneurs', category: 'INVESTMENT', date: 'July 2026', img: '/SPACES/SOHO/SOHO 01.webp' },
    { title: 'Grade-A Building Amenities That Drive Tenant Retention', category: 'ARCHITECTURE', date: 'June 2026', img: '/BUILDING/gym 01.webp' }
  ];

  const template = {
    version: '0.4',
    title: 'Insights & Journal HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildHubHero({
        badge: 'JOURNAL & UPDATES',
        titleHtml: 'Perspectives on <span style="color:#EA8E18;">Work, Space & Real Estate.</span>',
        description: 'Read our latest articles, market analyses, and commercial property guides.',
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Insights</strong>'
      }),
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          padding: { unit: 'px', top: '20', right: '32', bottom: '80', left: '32', isLinked: false },
          flex_gap: { column: '28', row: '28', unit: 'px' }
        },
        articles.map((art) =>
          createContainer(
            {
              width: { unit: '%', size: 31 },
              width_tablet: { unit: '%', size: 48 },
              width_mobile: { unit: '%', size: 100 },
              background_background: 'classic',
              background_color: COLORS.white,
              border_radius: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: COLORS.border,
              overflow: 'hidden',
              flex_direction: 'column'
            },
            [
              createContainer({
                width: { unit: '%', size: 100 },
                min_height: { unit: 'px', size: 220 },
                background_background: 'classic',
                background_image: { url: art.img },
                background_position: 'center center',
                background_size: 'cover'
              }),
              createContainer(
                {
                  padding: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '10', row: '10', unit: 'px' }
                },
                [
                  createWidget('heading', { title: `${art.category} • ${art.date}`, header_size: 'span', title_color: COLORS.gold, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 11 }, typography_font_weight: '700' }),
                  createWidget('heading', { title: art.title, header_size: 'h3', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 20 } })
                ]
              )
            ]
          )
        )
      )
    ]
  };

  fs.writeFileSync(path.resolve('page-insights.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-insights.json');
}

// -------------------------------------------------------------
// 6. BUILDER: Find Space Standalone Page (/find-space)
// -------------------------------------------------------------
function buildFindSpacePageJSON() {
  const options = [
    { title: 'I need a Premium Office', desc: 'For established teams & corporate regional headquarters.' },
    { title: 'I want to Own a SOHO', desc: 'Flexible fusion of living & working space.' },
    { title: 'I need a Serviced Office', desc: 'Fully equipped turnkey office for fast teams.' },
    { title: 'I need a Virtual Office', desc: 'Prestige CBD business address & mail service.' },
    { title: 'I want to book Function Room', desc: 'Flexible hall for corporate events, seminars & banquets.' }
  ];

  const template = {
    version: '0.4',
    title: 'Find Space Landing HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildHubHero({
        badge: 'SPACE ADVISOR',
        titleHtml: 'Let Us Find Your <span style="color:#EA8E18;">Ideal Workspace.</span>',
        description: 'Select the space type that fits your vision, and our workplace advisors will prepare a personalized proposal.',
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Find Space</strong>'
      }),
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1200 },
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          padding: { unit: 'px', top: '20', right: '24', bottom: '80', left: '24', isLinked: false },
          flex_gap: { column: '36', row: '36', unit: 'px' }
        },
        [
          // Left Options (5 Cards)
          createContainer(
            {
              width: { unit: '%', size: 45 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              flex_direction: 'column',
              flex_gap: { column: '12', row: '12', unit: 'px' }
            },
            options.map((opt, i) =>
              createContainer(
                {
                  background_background: 'classic',
                  background_color: i === 0 ? '#FEF3E2' : COLORS.white,
                  border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                  border_color: i === 0 ? COLORS.gold : COLORS.border,
                  padding: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '6', row: '6', unit: 'px' }
                },
                [
                  createWidget('heading', { title: opt.title, header_size: 'h4', title_color: i === 0 ? COLORS.gold : COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 18 } }),
                  createWidget('text-editor', { editor: `<p style="margin:0; font-size:13px; color:${COLORS.slateText};">${opt.desc}</p>` })
                ]
              )
            )
          ),
          // Right Form
          createContainer(
            {
              width: { unit: '%', size: 55 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              background_background: 'classic',
              background_color: COLORS.white,
              border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: COLORS.border,
              padding: { unit: 'px', top: '36', right: '36', bottom: '36', left: '36', isLinked: true },
              padding_mobile: { unit: 'px', top: '24', right: '20', bottom: '24', left: '20', isLinked: true },
              flex_direction: 'column',
              flex_gap: { column: '16', row: '16', unit: 'px' }
            },
            [
              createWidget('heading', { title: 'Complete Your Inquiry', header_size: 'h3', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 24 } }),
              createWidget('form', {
                form_name: 'Find Space Landing Form',
                form_fields: [
                  { _id: 'name', field_type: 'text', field_label: 'FULL NAME *', placeholder: 'Your full name', required: 'true', width: '50', width_mobile: '100', custom_id: 'name' },
                  { _id: 'whatsapp', field_type: 'tel', field_label: 'WHATSAPP *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100', custom_id: 'whatsapp' },
                  { _id: 'company', field_type: 'text', field_label: 'COMPANY NAME (OPTIONAL)', placeholder: 'e.g. PT Enterprise Nusantara', width: '100', custom_id: 'company' },
                  { _id: 'notes', field_type: 'textarea', field_label: 'ADDITIONAL REQUIREMENTS (OPTIONAL)', placeholder: 'Any specific requests, timeline, or inquiries...', rows: 3, width: '100', custom_id: 'notes' }
                ],
                button_text: 'Submit Space Inquiry',
                button_size: 'md',
                button_width: '100',
                submit_actions: ['redirect'],
                redirect_to: 'https://wa.me/628111908319?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20ruang%20kantor.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]'
              })
            ]
          )
        ]
      )
    ]
  };

  fs.writeFileSync(path.resolve('page-find-space.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-find-space.json');
}

// Execute all hub & landing builders
buildSpacesHubJSON();
buildBuildingJSON();
buildLocationJSON();
buildCompaniesJSON();
buildInsightsJSON();
buildFindSpacePageJSON();
