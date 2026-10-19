import fs from 'fs';
import path from 'path';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Helper for Elementor Containers
function createContainer(settings = {}, elements = []) {
  return {
    id: generateId(),
    elType: 'container',
    isInner: false,
    settings,
    elements
  };
}

// Helper for Elementor Widgets
function createWidget(widgetType, settings = {}) {
  return {
    id: generateId(),
    elType: 'widget',
    widgetType,
    settings,
    elements: []
  };
}

// Build Section 1: Hero Section
function buildHeroSection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '80', right: '32', bottom: '16', left: '32', isLinked: false },
      padding_tablet: { unit: 'px', top: '60', right: '24', bottom: '16', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '40', right: '16', bottom: '16', left: '16', isLinked: false },
      background_background: 'classic',
      background_color: '#FFFFFF'
    },
    [
      // Hero Card Container
      createContainer(
        {
          content_width: 'full',
          width: { unit: '%', size: 100 },
          min_height: { unit: 'px', size: 680 },
          min_height_tablet: { unit: 'px', size: 620 },
          min_height_mobile: { unit: 'px', size: 580 },
          flex_direction: 'column',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          justify_content: 'center',
          align_items: 'flex-start',
          border_radius: { unit: 'px', top: '48', right: '48', bottom: '48', left: '48', isLinked: true },
          border_radius_tablet: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
          overflow: 'hidden',
          background_background: 'classic',
          background_image: {
            url: '/BUILDING/ChatGPT%20Image%20Jul%2029,%202026,%2003_09_51%20PM-800.webp',
            id: ''
          },
          background_position: 'center center',
          background_size: 'cover',
          background_overlay_background: 'gradient',
          background_overlay_color: 'rgba(15, 23, 42, 0.90)',
          background_overlay_color_b: 'rgba(15, 23, 42, 0.40)',
          background_overlay_gradient_type: 'linear',
          background_overlay_gradient_angle: { unit: 'deg', size: 90 },
          padding: { unit: 'px', top: '64', right: '64', bottom: '64', left: '64', isLinked: false },
          padding_tablet: { unit: 'px', top: '48', right: '40', bottom: '48', left: '40', isLinked: false },
          padding_mobile: { unit: 'px', top: '32', right: '24', bottom: '32', left: '24', isLinked: false }
        },
        [
          // Left Content Box
          createContainer(
            {
              width: { unit: '%', size: 60 },
              width_tablet: { unit: '%', size: 80 },
              width_mobile: { unit: '%', size: 100 },
              flex_direction: 'column',
              gaps: { unit: 'px', size: 24 }
            },
            [
              createWidget('heading', {
                title: 'Space for Every <span style="color:#EA8E18;">Stage of Business.</span>',
                header_size: 'h1',
                title_color: '#FFFFFF',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 62 },
                typography_font_size_tablet: { unit: 'px', size: 46 },
                typography_font_size_mobile: { unit: 'px', size: 32 },
                typography_font_weight: '500',
                typography_line_height: { unit: 'em', size: 1.15 }
              }),
              createWidget('text-editor', {
                editor: '<p style="color: #E2E8F0; font-size: 18px; line-height: 1.6;">From your first business address to your corporate headquarters, HQuarters gives you the space to start, work, own and grow — in the heart of Asia Afrika, Bandung.</p>',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: { unit: 'px', size: 18 },
                typography_font_size_mobile: { unit: 'px', size: 14 }
              }),
              createWidget('button', {
                text: 'EXPLORE SPACES',
                link: { url: '/spaces' },
                button_type: 'default',
                size: 'medium',
                background_color: '#EA8E18',
                button_text_color: '#FFFFFF',
                border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
                padding: { unit: 'px', top: '16', right: '36', bottom: '16', left: '36', isLinked: false },
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_weight: '700',
                typography_font_size: { unit: 'px', size: 13 },
                typography_transform: 'uppercase'
              })
            ]
          )
        ]
      )
    ]
  );
}

// Build Section 2: Business Journey Section (Start, Work, Own, Grow)
function buildBusinessJourneySection() {
  const journeys = [
    {
      category: 'VIRTUAL OFFICE',
      title: 'Start Here.',
      desc: 'Professional business presence without a permanent office.',
      btnText: 'Explore Virtual Office',
      url: '/spaces/virtual-office'
    },
    {
      category: 'SERVICED OFFICE',
      title: 'Work Here.',
      desc: 'Ready-to-use workspace with facilities and service included.',
      btnText: 'Explore Serviced Office',
      url: '/spaces/serviced-office'
    },
    {
      category: 'SOHO',
      title: 'Own Here.',
      desc: 'Office. Home office. Living space. One space that grows with you. #FleksibelAja',
      btnText: 'Explore SOHO Spaces',
      url: '/spaces/soho'
    },
    {
      category: 'PREMIUM OFFICE',
      title: 'Grow Here.',
      desc: 'Representative, professional space built to support your next chapter.',
      btnText: 'Explore Premium Office',
      url: '/spaces/premium-office'
    }
  ];

  const cards = journeys.map((item) =>
    createContainer(
      {
        width: { unit: '%', size: 23 },
        width_tablet: { unit: '%', size: 48 },
        width_mobile: { unit: '%', size: 100 },
        flex_direction: 'column',
        justify_content: 'space-between',
        background_background: 'classic',
        background_color: '#F8FAFC',
        border_type: 'solid',
        border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
        border_color: '#E2E8F0',
        border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
        padding: { unit: 'px', top: '28', right: '24', bottom: '28', left: '24', isLinked: false },
        gaps: { unit: 'px', size: 20 }
      },
      [
        createWidget('heading', {
          title: item.category,
          header_size: 'div',
          title_color: '#EA8E18',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 11 },
          typography_font_weight: '800',
          typography_transform: 'uppercase',
          typography_letter_spacing: { unit: 'px', size: 1 }
        }),
        createWidget('heading', {
          title: item.title,
          header_size: 'h3',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 24 },
          typography_font_weight: '500'
        }),
        createWidget('text-editor', {
          editor: `<p style="color: #64748B; font-size: 13px; line-height: 1.6;">${item.desc}</p>`,
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans'
        }),
        createWidget('button', {
          text: item.btnText,
          link: { url: item.url },
          button_type: 'default',
          size: 'small',
          background_color: '#FFFFFF',
          button_text_color: '#0F172A',
          border_type: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#E2E8F0',
          border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
          padding: { unit: 'px', top: '10', right: '20', bottom: '10', left: '20', isLinked: false },
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 12 },
          typography_font_weight: '700'
        })
      ]
    )
  );

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      align_items: 'center',
      padding: { unit: 'px', top: '96', right: '32', bottom: '96', left: '32', isLinked: false },
      padding_tablet: { unit: 'px', top: '64', right: '24', bottom: '64', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '48', right: '16', bottom: '48', left: '16', isLinked: false },
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_type: 'solid',
      border_width: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false },
      border_color: '#E2E8F0'
    },
    [
      // Section Header
      createContainer(
        {
          width: { unit: '%', size: 100 },
          flex_direction: 'column',
          align_items: 'center',
          gaps: { unit: 'px', size: 12 },
          margin: { unit: 'px', top: '0', right: '0', bottom: '48', left: '0', isLinked: false }
        },
        [
          createWidget('heading', {
            title: 'ONE BUILDING. MANY POSSIBILITIES.',
            header_size: 'div',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 12 },
            typography_font_weight: '800',
            typography_transform: 'uppercase',
            typography_letter_spacing: { unit: 'px', size: 1 }
          }),
          createWidget('heading', {
            title: 'Where Are You in <span style="color:#EA8E18;">Your Business Journey?</span>',
            header_size: 'h2',
            title_color: '#0F172A',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 48 },
            typography_font_size_tablet: { unit: 'px', size: 38 },
            typography_font_size_mobile: { unit: 'px', size: 28 },
            typography_font_weight: '500'
          }),
          createWidget('text-editor', {
            editor: '<p style="color: #64748B; font-size: 16px; text-align: center;">Whatever comes next, there is a space for you at HQuarters.</p>',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans'
          })
        ]
      ),
      // 4 Cards Row
      createContainer(
        {
          width: { unit: '%', size: 100 },
          flex_direction: 'row',
          flex_direction_tablet: 'row',
          flex_direction_mobile: 'column',
          justify_content: 'space-between',
          wrap: 'wrap',
          gaps: { unit: 'px', size: 24 }
        },
        cards
      )
    ]
  );
}

// Build Section 3: Address Statement Section
function buildAddressStatementSection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      align_items: 'center',
      padding: { unit: 'px', top: '96', right: '32', bottom: '96', left: '32', isLinked: false },
      padding_tablet: { unit: 'px', top: '64', right: '24', bottom: '64', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '48', right: '16', bottom: '48', left: '16', isLinked: false },
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_type: 'solid',
      border_width: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false },
      border_color: '#E2E8F0'
    },
    [
      // Copywriting Header
      createContainer(
        {
          width: { unit: '%', size: 80 },
          width_mobile: { unit: '%', size: 100 },
          flex_direction: 'column',
          align_items: 'center',
          gaps: { unit: 'px', size: 16 },
          margin: { unit: 'px', top: '0', right: '0', bottom: '48', left: '0', isLinked: false }
        },
        [
          createWidget('heading', {
            title: 'HQUARTERS — ASIA AFRIKA — BANDUNG',
            header_size: 'div',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 12 },
            typography_font_weight: '800',
            typography_letter_spacing: { unit: 'px', size: 2 }
          }),
          createWidget('heading', {
            title: 'Your Address Says Something <span style="color:#EA8E18;">About Your Business.</span>',
            header_size: 'h2',
            title_color: '#0F172A',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 52 },
            typography_font_size_tablet: { unit: 'px', size: 40 },
            typography_font_size_mobile: { unit: 'px', size: 28 },
            typography_font_weight: '500'
          }),
          createWidget('text-editor', {
            editor: '<p style="color: #64748B; font-size: 17px; text-align: center; max-width: 680px;">When clients, partners, or candidates walk in, they form an impression before the meeting even starts. HQuarters offers a modern, professional business environment in Bandung\'s most iconic district.</p>',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans'
          }),
          createWidget('button', {
            text: 'DISCOVER THE LOCATION →',
            link: { url: '/location' },
            button_type: 'default',
            size: 'medium',
            background_color: 'transparent',
            button_text_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_weight: '800',
            typography_font_size: { unit: 'px', size: 13 }
          })
        ]
      ),
      // Banner Image 21:9 Container
      createContainer(
        {
          width: { unit: '%', size: 100 },
          min_height: { unit: 'px', size: 480 },
          min_height_tablet: { unit: 'px', size: 380 },
          min_height_mobile: { unit: 'px', size: 260 },
          border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
          overflow: 'hidden',
          background_background: 'classic',
          background_image: {
            url: '/addressstatement/21;9.webp',
            id: ''
          },
          background_position: 'center bottom',
          background_size: 'cover'
        },
        []
      )
    ]
  );
}

// Build Section 4: Partners / Community Section
function buildPartnersSection() {
  const brandLogos = [
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

  const logoCards = brandLogos.map((brand) =>
    createContainer(
      {
        width: { unit: 'px', size: 200 },
        width_tablet: { unit: '%', size: 30 },
        width_mobile: { unit: '%', size: 46 },
        min_height: { unit: 'px', size: 100 },
        justify_content: 'center',
        align_items: 'center',
        background_background: 'classic',
        background_color: '#F8FAFC',
        border_type: 'solid',
        border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
        border_color: '#E2E8F0',
        border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
        padding: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true }
      },
      [
        createWidget('image', {
          image: { url: brand.src, id: '' },
          image_size: 'full',
          width: { unit: '%', size: 85 }
        })
      ]
    )
  );

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      align_items: 'center',
      padding: { unit: 'px', top: '64', right: '32', bottom: '64', left: '32', isLinked: false },
      padding_tablet: { unit: 'px', top: '48', right: '24', bottom: '48', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '40', right: '16', bottom: '40', left: '16', isLinked: false },
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_type: 'solid',
      border_width: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false },
      border_color: '#E2E8F0'
    },
    [
      // Copy Header
      createContainer(
        {
          width: { unit: '%', size: 80 },
          width_mobile: { unit: '%', size: 100 },
          flex_direction: 'column',
          align_items: 'center',
          gaps: { unit: 'px', size: 12 },
          margin: { unit: 'px', top: '0', right: '0', bottom: '36', left: '0', isLinked: false }
        },
        [
          createWidget('heading', {
            title: "YOU'RE IN GOOD COMPANY",
            header_size: 'div',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 12 },
            typography_font_weight: '800',
            typography_letter_spacing: { unit: 'px', size: 2 }
          }),
          createWidget('heading', {
            title: 'Trusted by Businesses That Know the Value of the Right Address.',
            header_size: 'h2',
            title_color: '#0F172A',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 36 },
            typography_font_size_tablet: { unit: 'px', size: 28 },
            typography_font_size_mobile: { unit: 'px', size: 22 },
            typography_font_weight: '500'
          })
        ]
      ),
      // Grid Logos
      createContainer(
        {
          width: { unit: '%', size: 100 },
          flex_direction: 'row',
          flex_direction_tablet: 'row',
          flex_direction_mobile: 'row',
          justify_content: 'center',
          wrap: 'wrap',
          gaps: { unit: 'px', size: 16 }
        },
        logoCards
      )
    ]
  );
}

// Build Section 5: Building Highlights Section
function buildBuildingHighlightsSection() {
  const highlights = [
    { title: 'Premium Arrival', desc: 'Representative lobby & professional environment.' },
    { title: 'Business Ready', desc: 'Meeting facilities, connectivity and professional building management.' },
    { title: '24/7 Security', desc: 'Layered building security and controlled access.' },
    { title: 'Easy Parking', desc: 'Large-capacity parking supported by mechanical parking systems.' },
    { title: 'Health & Wellness', desc: 'Gym, sauna and heated swimming pool.' },
    { title: 'Connected', desc: "At the centre of Bandung's business and city activity." }
  ];

  const highlightCards = highlights.map((item) =>
    createContainer(
      {
        width: { unit: '%', size: 31 },
        width_tablet: { unit: '%', size: 48 },
        width_mobile: { unit: '%', size: 100 },
        flex_direction: 'column',
        background_background: 'classic',
        background_color: '#F8FAFC',
        border_type: 'solid',
        border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
        border_color: '#E2E8F0',
        border_radius: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
        padding: { unit: 'px', top: '28', right: '24', bottom: '28', left: '24', isLinked: false },
        gaps: { unit: 'px', size: 12 }
      },
      [
        createWidget('heading', {
          title: item.title,
          header_size: 'h3',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 20 },
          typography_font_weight: '500'
        }),
        createWidget('text-editor', {
          editor: `<p style="color: #64748B; font-size: 14px; line-height: 1.6;">${item.desc}</p>`,
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans'
        })
      ]
    )
  );

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      align_items: 'center',
      padding: { unit: 'px', top: '96', right: '32', bottom: '96', left: '32', isLinked: false },
      padding_tablet: { unit: 'px', top: '64', right: '24', bottom: '64', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '48', right: '16', bottom: '48', left: '16', isLinked: false },
      background_background: 'classic',
      background_color: '#FFFFFF'
    },
    [
      // Copy Header
      createContainer(
        {
          width: { unit: '%', size: 80 },
          width_mobile: { unit: '%', size: 100 },
          flex_direction: 'column',
          align_items: 'center',
          gaps: { unit: 'px', size: 12 },
          margin: { unit: 'px', top: '0', right: '0', bottom: '48', left: '0', isLinked: false }
        },
        [
          createWidget('heading', {
            title: 'BUILT FOR PURPOSE',
            header_size: 'div',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 12 },
            typography_font_weight: '800',
            typography_letter_spacing: { unit: 'px', size: 2 }
          }),
          createWidget('heading', {
            title: 'Infrastructure & Amenities Designed for Work.',
            header_size: 'h2',
            title_color: '#0F172A',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 48 },
            typography_font_size_tablet: { unit: 'px', size: 36 },
            typography_font_size_mobile: { unit: 'px', size: 26 },
            typography_font_weight: '500'
          })
        ]
      ),
      // 6 Cards Grid
      createContainer(
        {
          width: { unit: '%', size: 100 },
          flex_direction: 'row',
          flex_direction_tablet: 'row',
          flex_direction_mobile: 'column',
          justify_content: 'space-between',
          wrap: 'wrap',
          gaps: { unit: 'px', size: 24 }
        },
        highlightCards
      )
    ]
  );
}

// Build Section 6: CTA Section
function buildCTASection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      align_items: 'center',
      padding: { unit: 'px', top: '112', right: '32', bottom: '96', left: '32', isLinked: false },
      padding_tablet: { unit: 'px', top: '80', right: '24', bottom: '64', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '60', right: '16', bottom: '48', left: '16', isLinked: false },
      background_background: 'classic',
      background_color: '#231F20'
    },
    [
      createContainer(
        {
          width: { unit: '%', size: 70 },
          width_tablet: { unit: '%', size: 85 },
          width_mobile: { unit: '%', size: 100 },
          flex_direction: 'column',
          align_items: 'center',
          gaps: { unit: 'px', size: 24 }
        },
        [
          createWidget('heading', {
            title: 'Where Will Your Business <br/><span style="color:#EA8E18;">Go Next?</span>',
            header_size: 'h2',
            title_color: '#FFFFFF',
            align: 'center',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 52 },
            typography_font_size_tablet: { unit: 'px', size: 40 },
            typography_font_size_mobile: { unit: 'px', size: 28 },
            typography_font_weight: '500'
          }),
          createWidget('text-editor', {
            editor: '<p style="color: #CBD5E1; font-size: 17px; text-align: center; line-height: 1.6;">Start from an address. Build your team. Own your space. Or move your company to its next headquarters. Whatever comes next, start at HQuarters.</p>',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans'
          }),
          createWidget('button', {
            text: 'FIND MY SPACE →',
            link: { url: '/find-space' },
            button_type: 'default',
            size: 'large',
            background_color: '#EA8E18',
            button_text_color: '#FFFFFF',
            border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
            padding: { unit: 'px', top: '16', right: '36', bottom: '16', left: '36', isLinked: false },
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: { unit: 'px', size: 14 },
            typography_font_weight: '700'
          })
        ]
      )
    ]
  );
}

// Assemble Master Template
const fullHomepageTemplate = {
  version: '0.4',
  title: 'Homepage HQuarters Master (Full Responsive)',
  type: 'page',
  content: [
    buildHeroSection(),
    buildBusinessJourneySection(),
    buildAddressStatementSection(),
    buildPartnersSection(),
    buildBuildingHighlightsSection(),
    buildCTASection()
  ]
};

const outputFilePath = path.join(process.cwd(), 'homepage-full.json');
fs.writeFileSync(outputFilePath, JSON.stringify(fullHomepageTemplate, null, 2), 'utf8');

console.log(`Successfully generated full homepage Elementor JSON template at: ${outputFilePath}`);
