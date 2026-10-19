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

// 1. Breadcrumbs + Hero Section
function buildHeroSection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '24', right: '32', bottom: '0', left: '32', isLinked: false },
      padding_tablet: { unit: 'px', top: '20', right: '24', bottom: '0', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '0', left: '16', isLinked: false },
      flex_gap: { column: '16', row: '16', unit: 'px' }
    },
    [
      // Breadcrumbs
      createWidget('text-editor', {
        editor: '<p style="margin:0;"><a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Spaces</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Premium Office</strong></p>',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: { unit: 'px', size: 13 },
        typography_font_weight: '500'
      }),

      // Hero Card (Slate-900 2-col)
      createContainer(
        {
          content_width: 'full',
          width: { unit: '%', size: 100 },
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          align_items: 'stretch',
          background_background: 'classic',
          background_color: '#0F172A',
          border_radius: { unit: 'px', top: '44', right: '44', bottom: '44', left: '44', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#1E293B',
          padding: { unit: 'px', top: '56', right: '56', bottom: '56', left: '56', isLinked: true },
          padding_tablet: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
          padding_mobile: { unit: 'px', top: '28', right: '24', bottom: '28', left: '24', isLinked: false },
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 40, spread: 0, color: 'rgba(0,0,0,0.35)' },
          flex_gap: { column: '36', row: '36', unit: 'px' },
          overflow: 'hidden'
        },
        [
          // Left Column (Text & CTA)
          createContainer(
            {
              width: { unit: '%', size: 50 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              flex_direction: 'column',
              justify_content: 'center',
              align_items: 'flex-start',
              flex_gap: { column: '20', row: '20', unit: 'px' }
            },
            [
              // Badge
              createWidget('heading', {
                title: 'PREMIUM OFFICE',
                header_size: 'span',
                title_color: '#FBBF24',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 14 },
                typography_font_weight: '700',
                typography_letter_spacing: { unit: 'px', size: 1.5 },
                align: 'left'
              }),
              // Title H1
              createWidget('heading', {
                title: 'Your Next HQuarters <br><span style="color:#EA8E18;">Is Ready.</span>',
                header_size: 'h1',
                title_color: '#FFFFFF',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 52 },
                typography_font_size_tablet: { unit: 'px', size: 40 },
                typography_font_size_mobile: { unit: 'px', size: 32 },
                typography_font_weight: '500',
                typography_line_height: { unit: 'em', size: 1.12 },
                align: 'left'
              }),
              // Paragraph
              createWidget('text-editor', {
                editor: '<p>Premium office space in Bandung\'s CBD for companies ready for their next chapter.</p>',
                text_color: '#CBD5E1',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: { unit: 'px', size: 16 },
                typography_font_size_mobile: { unit: 'px', size: 14 },
                typography_line_height: { unit: 'em', size: 1.6 }
              }),
              // CTA Button
              createWidget('button', {
                text: 'FIND MY OFFICE',
                link: { url: '#find-space' },
                button_type: 'default',
                size: 'md',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: { unit: 'px', size: 14 },
                typography_font_weight: '700',
                typography_letter_spacing: { unit: 'px', size: 0.5 },
                background_color: '#EA8E18',
                button_text_color: '#FFFFFF',
                border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
                button_padding: { unit: 'px', top: '14', right: '32', bottom: '14', left: '32', isLinked: false },
                icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
                icon_align: 'right',
                icon_indent: { unit: 'px', size: 8 }
              }),
              // Specs Footer
              createWidget('text-editor', {
                editor: '<p style="margin:0; padding-top:12px; border-top:1px solid #1E293B; color:#94A3B8; font-size:12px;">Flexible Office Sizes &nbsp;—&nbsp; Premium Business Environment &nbsp;—&nbsp; Ready for Fit-Out / Occupancy*</p>',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: { unit: 'px', size: 12 },
                typography_font_weight: '500'
              })
            ]
          ),
          // Right Column (Image Showcase)
          createContainer(
            {
              width: { unit: '%', size: 50 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              min_height: { unit: 'px', size: 340 },
              min_height_mobile: { unit: 'px', size: 260 },
              border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: 'rgba(255,255,255,0.15)',
              overflow: 'hidden',
              background_background: 'classic',
              background_image: { url: '/SPACES/PREMIUM OFFICE/Premium Office.webp' },
              background_position: 'center bottom',
              background_size: 'cover'
            },
            []
          )
        ]
      )
    ]
  );
}

// 2. Statement Section
function buildStatementSection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1000 },
      flex_direction: 'column',
      align_items: 'center',
      text_align: 'center',
      padding: { unit: 'px', top: '80', right: '24', bottom: '80', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '48', right: '16', bottom: '48', left: '16', isLinked: false },
      flex_gap: { column: '18', row: '18', unit: 'px' }
    },
    [
      createWidget('heading', {
        title: 'Your Company Has Grown. <br><span style="color:#EA8E18;">Your Office Should Too.</span>',
        header_size: 'h2',
        title_color: '#0F172A',
        typography_typography: 'custom',
        typography_font_family: 'Outfit',
        typography_font_size: { unit: 'px', size: 44 },
        typography_font_size_tablet: { unit: 'px', size: 34 },
        typography_font_size_mobile: { unit: 'px', size: 26 },
        typography_font_weight: '500',
        typography_line_height: { unit: 'em', size: 1.2 },
        align: 'center'
      }),
      createWidget('text-editor', {
        editor: '<p>Every company reaches a point where the old office no longer reflects the business it has become. Teams grow. Clients grow. Expectations rise. The office becomes part of your corporate identity.</p>',
        text_color: '#475569',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: { unit: 'px', size: 17 },
        typography_font_size_mobile: { unit: 'px', size: 15 },
        typography_line_height: { unit: 'em', size: 1.6 },
        align: 'center'
      })
    ]
  );
}

// 3. Office Gallery Showcase
function buildGallerySection() {
  const images = [
    { src: '/SPACES/PREMIUM OFFICE/Premium Office.webp', title: 'Executive Corporate Floor', desc: 'Expansive open-plan floorplate' },
    { src: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp', title: 'Boardroom & Conference Suite', desc: 'High-tech conference environment' },
    { src: '/SPACES/PREMIUM OFFICE/Premium Office 03.webp', title: 'Corner Executive Office', desc: 'Dedicated leadership suite with CBD views' },
    { src: '/SPACES/PREMIUM OFFICE/Premium Office 04.webp', title: 'Collaborative Team Hub', desc: 'Acoustically tuned workspace' }
  ];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '40', left: '16', isLinked: false },
      flex_gap: { column: '24', row: '24', unit: 'px' }
    },
    [
      // Header
      createWidget('heading', {
        title: 'Premium Office <span style="color:#EA8E18;">Details</span>',
        header_size: 'h2',
        title_color: '#0F172A',
        typography_typography: 'custom',
        typography_font_family: 'Outfit',
        typography_font_size: { unit: 'px', size: 34 },
        typography_font_weight: '500',
        align: 'left'
      }),

      // Main Feature Image
      createContainer(
        {
          width: { unit: '%', size: 100 },
          min_height: { unit: 'px', size: 520 },
          min_height_tablet: { unit: 'px', size: 400 },
          min_height_mobile: { unit: 'px', size: 280 },
          border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
          overflow: 'hidden',
          background_background: 'classic',
          background_image: { url: images[0].src },
          background_position: 'center center',
          background_size: 'cover',
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 12, blur: 30, spread: 0, color: 'rgba(0,0,0,0.1)' }
        },
        []
      ),

      // 4 Thumbnail Cards
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_direction_mobile: 'column',
          flex_wrap: 'wrap',
          flex_gap: { column: '16', row: '16', unit: 'px' },
          justify_content: 'space-between'
        },
        images.map((item, idx) =>
          createContainer(
            {
              width: { unit: '%', size: 23 },
              width_tablet: { unit: '%', size: 48 },
              width_mobile: { unit: '%', size: 100 },
              min_height: { unit: 'px', size: 130 },
              border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: idx === 0 ? '2' : '1', right: idx === 0 ? '2' : '1', bottom: idx === 0 ? '2' : '1', left: idx === 0 ? '2' : '1', isLinked: true },
              border_color: idx === 0 ? '#EA8E18' : '#E2E8F0',
              overflow: 'hidden',
              background_background: 'classic',
              background_image: { url: item.src },
              background_position: 'center center',
              background_size: 'cover',
              padding: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true }
            },
            []
          )
        )
      )
    ]
  );
}

// 4. Callout Box Statement
function buildCalloutSection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1000 },
      padding: { unit: 'px', top: '40', right: '24', bottom: '40', left: '24', isLinked: false }
    },
    [
      createContainer(
        {
          background_background: 'classic',
          background_color: '#FAF8F5',
          border_radius: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#E2E8F0',
          padding: { unit: 'px', top: '56', right: '48', bottom: '56', left: '48', isLinked: true },
          padding_mobile: { unit: 'px', top: '36', right: '24', bottom: '36', left: '24', isLinked: true },
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: { column: '16', row: '16', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: 'Before The Meeting Starts, Your Office Has Already Said Something.',
            header_size: 'h3',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 32 },
            typography_font_size_mobile: { unit: 'px', size: 22 },
            typography_font_weight: '500',
            typography_line_height: { unit: 'em', size: 1.25 },
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: '<p>A representative lobby. A professional arrival experience. A credible business environment — the kind that tells clients and partners they\'re dealing with a serious company.</p>',
            text_color: '#475569',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: { unit: 'px', size: 16 },
            typography_line_height: { unit: 'em', size: 1.6 },
            align: 'center'
          }),
          createWidget('heading', {
            title: 'Make sure it says the right thing.',
            header_size: 'h4',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 20 },
            typography_font_weight: '700',
            align: 'center'
          })
        ]
      )
    ]
  );
}

// 5. Facilities Gallery
function buildFacilitiesGallery() {
  const facilities = [
    { src: '/BUILDING/gym 01.webp', title: 'State-of-the-Art Fitness Center' },
    { src: '/BUILDING/gym 5_4.webp', title: 'Fitness & Conditioning Studio' },
    { src: '/BUILDING/sauna 5_4.webp', title: 'Recovery & Relaxation Suite' },
    { src: '/BUILDING/kolam renang 5_4.webp', title: 'Swimming Pool & Leisure Area' }
  ];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '40', left: '16', isLinked: false },
      flex_gap: { column: '24', row: '24', unit: 'px' }
    },
    [
      createWidget('heading', {
        title: 'Facilities',
        header_size: 'h2',
        title_color: '#0F172A',
        typography_typography: 'custom',
        typography_font_family: 'Outfit',
        typography_font_size: { unit: 'px', size: 34 },
        typography_font_weight: '500',
        align: 'left'
      }),
      createContainer(
        {
          width: { unit: '%', size: 100 },
          min_height: { unit: 'px', size: 520 },
          min_height_tablet: { unit: 'px', size: 400 },
          min_height_mobile: { unit: 'px', size: 280 },
          border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
          overflow: 'hidden',
          background_background: 'classic',
          background_image: { url: facilities[0].src },
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
          flex_direction_mobile: 'column',
          flex_wrap: 'wrap',
          flex_gap: { column: '16', row: '16', unit: 'px' },
          justify_content: 'space-between'
        },
        facilities.map((item, idx) =>
          createContainer(
            {
              width: { unit: '%', size: 23 },
              width_tablet: { unit: '%', size: 48 },
              width_mobile: { unit: '%', size: 100 },
              min_height: { unit: 'px', size: 130 },
              border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: idx === 0 ? '2' : '1', right: idx === 0 ? '2' : '1', bottom: idx === 0 ? '2' : '1', left: idx === 0 ? '2' : '1', isLinked: true },
              border_color: idx === 0 ? '#EA8E18' : '#E2E8F0',
              overflow: 'hidden',
              background_background: 'classic',
              background_image: { url: item.src },
              background_position: 'center center',
              background_size: 'cover',
              padding: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true }
            },
            []
          )
        )
      )
    ]
  );
}

// 6. Features Grid ("What's Included")
function buildFeaturesSection() {
  const features = [
    { title: 'Professional Image', desc: 'Premium common areas and business environment that reflect corporate credibility.' },
    { title: 'Space To Grow', desc: 'Unit and layout choices for organizations of different sizes.' },
    { title: 'Business Connectivity', desc: 'Fiber infrastructure and connectivity support for modern business.' },
    { title: 'Accessibility', desc: 'Located in the centre of Bandung\'s activity.' },
    { title: 'Security', desc: '24-hour professional security and layered building access.' },
    { title: 'Employee Experience', desc: 'Gym, sauna and heated pool that raise the quality of the workplace.' }
  ];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '60', right: '32', bottom: '60', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '40', right: '16', bottom: '40', left: '16', isLinked: false },
      flex_gap: { column: '36', row: '36', unit: 'px' }
    },
    [
      createContainer(
        {
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: { column: '8', row: '8', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: "WHAT'S INCLUDED",
            header_size: 'span',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 12 },
            typography_font_weight: '700',
            typography_letter_spacing: { unit: 'px', size: 1.5 },
            align: 'center'
          }),
          createWidget('heading', {
            title: 'Everything a Modern Company Expects.',
            header_size: 'h2',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 38 },
            typography_font_size_mobile: { unit: 'px', size: 26 },
            typography_font_weight: '500',
            align: 'center'
          })
        ]
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          flex_gap: { column: '24', row: '24', unit: 'px' },
          justify_content: 'space-between'
        },
        features.map((item) =>
          createContainer(
            {
              width: { unit: '%', size: 31 },
              width_tablet: { unit: '%', size: 48 },
              width_mobile: { unit: '%', size: 100 },
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
              border_border: 'solid',
              border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
              border_color: '#E2E8F0',
              padding: { unit: 'px', top: '32', right: '28', bottom: '32', left: '28', isLinked: true },
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 4, blur: 12, spread: 0, color: 'rgba(0,0,0,0.03)' },
              flex_direction: 'column',
              flex_gap: { column: '14', row: '14', unit: 'px' }
            },
            [
              createWidget('heading', {
                title: item.title,
                header_size: 'h3',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 20 },
                typography_font_weight: '500',
                align: 'left'
              }),
              createWidget('text-editor', {
                editor: `<p>${item.desc}</p>`,
                text_color: '#475569',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: { unit: 'px', size: 14 },
                typography_line_height: { unit: 'em', size: 1.6 }
              })
            ]
          )
        )
      )
    ]
  );
}

// 7. Team Size Selector
function buildTeamSizeSection() {
  const sizes = [
    { size: '10 — 20 People', desc: 'Compact corporate office' },
    { size: '20 — 40 People', desc: 'Flexible office layout.' },
    { size: '40 — 80 People', desc: 'Larger combined office solutions.' },
    { size: '80 — 150+ People', desc: 'Custom corporate configuration.' }
  ];

  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      padding: { unit: 'px', top: '40', right: '32', bottom: '40', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '24', left: '16', isLinked: false }
    },
    [
      createContainer(
        {
          background_background: 'classic',
          background_color: '#FAF8F5',
          border_radius: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#E2E8F0',
          padding: { unit: 'px', top: '56', right: '48', bottom: '56', left: '48', isLinked: true },
          padding_mobile: { unit: 'px', top: '36', right: '20', bottom: '36', left: '20', isLinked: true },
          flex_direction: 'column',
          flex_gap: { column: '32', row: '32', unit: 'px' }
        },
        [
          createContainer(
            {
              flex_direction: 'column',
              align_items: 'center',
              text_align: 'center',
              flex_gap: { column: '8', row: '8', unit: 'px' }
            },
            [
              createWidget('heading', {
                title: 'SIZED TO YOUR TEAM',
                header_size: 'span',
                title_color: '#EA8E18',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 12 },
                typography_font_weight: '700',
                typography_letter_spacing: { unit: 'px', size: 1.5 },
                align: 'center'
              }),
              createWidget('heading', {
                title: 'How Big Is Your Team?',
                header_size: 'h2',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 36 },
                typography_font_size_mobile: { unit: 'px', size: 26 },
                typography_font_weight: '500',
                align: 'center'
              })
            ]
          ),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              flex_wrap: 'wrap',
              flex_gap: { column: '18', row: '18', unit: 'px' },
              justify_content: 'space-between'
            },
            sizes.map((item) =>
              createContainer(
                {
                  width: { unit: '%', size: 23 },
                  width_tablet: { unit: '%', size: 48 },
                  width_mobile: { unit: '%', size: 100 },
                  background_background: 'classic',
                  background_color: '#FFFFFF',
                  border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                  border_color: '#E2E8F0',
                  padding: { unit: 'px', top: '28', right: '20', bottom: '28', left: '20', isLinked: true },
                  flex_direction: 'column',
                  align_items: 'center',
                  text_align: 'center',
                  flex_gap: { column: '8', row: '8', unit: 'px' },
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 4, blur: 10, spread: 0, color: 'rgba(0,0,0,0.03)' }
                },
                [
                  createWidget('heading', {
                    title: item.size,
                    header_size: 'h3',
                    title_color: '#0F172A',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: { unit: 'px', size: 22 },
                    typography_font_weight: '500',
                    align: 'center'
                  }),
                  createWidget('text-editor', {
                    editor: `<p style="margin:0; font-size:12px; color:#64748B;">${item.desc}</p>`,
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: { unit: 'px', size: 12 },
                    align: 'center'
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

// 8. Capital Working Statement
function buildCapitalSection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 900 },
      flex_direction: 'column',
      align_items: 'center',
      text_align: 'center',
      padding: { unit: 'px', top: '80', right: '24', bottom: '60', left: '24', isLinked: false },
      padding_mobile: { unit: 'px', top: '48', right: '16', bottom: '40', left: '16', isLinked: false },
      flex_gap: { column: '18', row: '18', unit: 'px' }
    },
    [
      createWidget('heading', {
        title: 'Lease The Space. <br><span style="color:#EA8E18;">Keep Your Capital Working.</span>',
        header_size: 'h2',
        title_color: '#0F172A',
        typography_typography: 'custom',
        typography_font_family: 'Outfit',
        typography_font_size: { unit: 'px', size: 44 },
        typography_font_size_tablet: { unit: 'px', size: 34 },
        typography_font_size_mobile: { unit: 'px', size: 26 },
        typography_font_weight: '500',
        typography_line_height: { unit: 'em', size: 1.2 },
        align: 'center'
      }),
      createWidget('text-editor', {
        editor: '<p>Buying a corporate office isn\'t always the smartest use of capital. Lease at HQuarters and keep your resources focused where they create the greatest impact: your people, your products and your business.</p>',
        text_color: '#475569',
        typography_typography: 'custom',
        typography_font_family: 'Plus Jakarta Sans',
        typography_font_size: { unit: 'px', size: 16 },
        typography_line_height: { unit: 'em', size: 1.6 },
        align: 'center'
      })
    ]
  );
}

// 9. Community Banner
function buildCommunityBanner() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1000 },
      padding: { unit: 'px', top: '20', right: '24', bottom: '60', left: '24', isLinked: false }
    },
    [
      createContainer(
        {
          background_background: 'classic',
          background_color: '#FAF8F5',
          border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#E2E8F0',
          padding: { unit: 'px', top: '48', right: '40', bottom: '48', left: '40', isLinked: true },
          padding_mobile: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20', isLinked: true },
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: { column: '12', row: '12', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: "YOU'RE IN GOOD COMPANY",
            header_size: 'span',
            title_color: '#EA8E18',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 12 },
            typography_font_weight: '700',
            typography_letter_spacing: { unit: 'px', size: 1.5 },
            align: 'center'
          }),
          createWidget('heading', {
            title: 'Join a growing community of respected companies <br>operating from HQuarters.',
            header_size: 'h3',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 26 },
            typography_font_size_mobile: { unit: 'px', size: 20 },
            typography_font_weight: '500',
            typography_line_height: { unit: 'em', size: 1.3 },
            align: 'center'
          })
        ]
      )
    ]
  );
}

// 10. Master Form Inquiry Section
function buildFormSection() {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '40', left: '16', isLinked: false }
    },
    [
      // Card Container 2-col
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1200 },
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          background_background: 'classic',
          background_color: '#FFFFFF',
          border_radius: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#E2E8F0',
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 40, spread: 0, color: 'rgba(15,23,42,0.08)' },
          overflow: 'hidden',
          _element_id: 'find-space'
        },
        [
          // Left Banner (40%)
          createContainer(
            {
              width: { unit: '%', size: 40 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              min_height_tablet: { unit: 'px', size: 380 },
              min_height_mobile: { unit: 'px', size: 380 },
              flex_direction: 'column',
              justify_content: 'flex-end',
              align_items: 'stretch',
              background_background: 'classic',
              background_color: '#0F172A',
              background_image: { url: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp' },
              background_position: 'center center',
              background_size: 'cover',
              background_overlay_background: 'classic',
              background_overlay_color: '#0F172A',
              background_overlay_opacity: { unit: 'px', size: 0.5 },
              padding: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
              padding_mobile: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
              _css_classes: 'hq-space-banner'
            },
            [
              // Dark Glass Card
              createContainer(
                {
                  background_background: 'classic',
                  background_color: 'rgba(22, 26, 37, 0.95)',
                  border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                  border_color: 'rgba(255,255,255,0.12)',
                  padding: { unit: 'px', top: '28', right: '28', bottom: '28', left: '28', isLinked: true },
                  padding_mobile: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '12', row: '12', unit: 'px' }
                },
                [
                  createWidget('heading', {
                    title: 'FIND YOUR NEXT OFFICE',
                    header_size: 'span',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: { unit: 'px', size: 10 },
                    typography_font_weight: '800',
                    typography_letter_spacing: { unit: 'px', size: 1 },
                    _css_classes: 'hq-space-badge'
                  }),
                  createWidget('heading', {
                    title: 'Tell Us What Your Team Needs.',
                    header_size: 'h2',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: { unit: 'px', size: 26 },
                    typography_font_size_mobile: { unit: 'px', size: 22 },
                    typography_font_weight: '500',
                    typography_line_height: { unit: 'em', size: 1.2 },
                    _css_classes: 'hq-space-title'
                  }),
                  createWidget('text-editor', {
                    editor: '<p>We\'ll match you to available office spaces by area, floor and move-in timeline — with a tailored rental proposal, not a public price list.</p>',
                    text_color: '#CBD5E1',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: { unit: 'px', size: 13 },
                    typography_line_height: { unit: 'em', size: 1.6 },
                    _css_classes: 'hq-space-desc'
                  })
                ]
              )
            ]
          ),
          // Right Form Area (60%)
          createContainer(
            {
              width: { unit: '%', size: 60 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              flex_direction: 'column',
              padding: { unit: 'px', top: '44', right: '44', bottom: '44', left: '44', isLinked: true },
              padding_mobile: { unit: 'px', top: '24', right: '20', bottom: '24', left: '20', isLinked: true },
              flex_gap: { column: '18', row: '18', unit: 'px' }
            },
            [
              createWidget('heading', {
                title: '1. Select Space Type',
                header_size: 'h3',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 18 },
                typography_font_weight: '500'
              }),
              // 5 Buttons Container
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  flex_gap: { column: '8', row: '8', unit: 'px' }
                },
                [
                  createWidget('button', { text: 'Premium Office', button_type: 'default', _css_classes: 'hq-space-btn active' }),
                  createWidget('button', { text: 'SOHO', button_type: 'default', _css_classes: 'hq-space-btn' }),
                  createWidget('button', { text: 'Serviced Office', button_type: 'default', _css_classes: 'hq-space-btn' }),
                  createWidget('button', { text: 'Virtual Office', button_type: 'default', _css_classes: 'hq-space-btn' }),
                  createWidget('button', { text: 'Function Room', button_type: 'default', _css_classes: 'hq-space-btn' })
                ]
              ),
              createWidget('divider', {
                style: 'solid',
                weight: { unit: 'px', size: 1 },
                color: '#F1F5F9',
                gap: { unit: 'px', size: 6 }
              }),
              createWidget('heading', {
                title: '2. Complete Your Details',
                header_size: 'h3',
                title_color: '#0F172A',
                typography_typography: 'custom',
                typography_font_family: 'Outfit',
                typography_font_size: { unit: 'px', size: 18 },
                typography_font_weight: '500'
              }),
              createWidget('text-editor', {
                editor: '<p style="margin:0; font-size:12px; color:#64748B;">Share your details and our team will get back to you shortly.</p>'
              }),
              // Form Widget
              createWidget('form', {
                form_name: 'Premium Office Inquiry Form',
                form_fields: [
                  { _id: 'name', field_type: 'text', field_label: 'FULL NAME *', placeholder: 'Your full name', required: 'true', width: '50', width_mobile: '100', custom_id: 'name' },
                  { _id: 'whatsapp', field_type: 'tel', field_label: 'WHATSAPP *', placeholder: '+62 812 3456 7890', required: 'true', width: '50', width_mobile: '100', custom_id: 'whatsapp' },
                  { _id: 'company', field_type: 'text', field_label: 'COMPANY NAME (OPTIONAL)', placeholder: 'e.g. PT Enterprise Nusantara', width: '100', custom_id: 'company' },
                  { _id: 'notes', field_type: 'textarea', field_label: 'ADDITIONAL REQUIREMENTS (OPTIONAL)', placeholder: 'Any specific requests, timeline, or inquiries...', rows: 3, width: '100', custom_id: 'notes' }
                ],
                button_text: 'Request Floorplan & Proposal',
                button_size: 'md',
                button_width: '100',
                button_css_id: 'hq-submit-btn',
                submit_actions: ['redirect'],
                redirect_to: 'https://wa.me/628111908319?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*Premium%20Office*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]'
              }),
              createWidget('text-editor', {
                editor: '<p style="margin:0; text-align:center; font-size:10px; color:#94A3B8;">Your information is confidential and will only be used by HQuarters management.</p>'
              })
            ]
          )
        ]
      )
    ]
  );
}

// 11. Dark Bottom CTA Section
function buildBottomCTASection() {
  return createContainer(
    {
      content_width: 'full',
      background_background: 'classic',
      background_color: '#231F20',
      padding: { unit: 'px', top: '96', right: '32', bottom: '80', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '60', right: '16', bottom: '48', left: '16', isLinked: false }
    },
    [
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1000 },
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: { column: '18', row: '18', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: 'Your Next Chapter Deserves <br><span style="color:#EA8E18;">The Right Address.</span>',
            header_size: 'h2',
            title_color: '#FFFFFF',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 48 },
            typography_font_size_tablet: { unit: 'px', size: 36 },
            typography_font_size_mobile: { unit: 'px', size: 28 },
            typography_font_weight: '500',
            typography_line_height: { unit: 'em', size: 1.15 },
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: '<p>HQuarters Premium Office — Asia Afrika, Bandung</p>',
            text_color: '#94A3B8',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: { unit: 'px', size: 16 },
            align: 'center'
          })
        ]
      )
    ]
  );
}

// Master Assembler for Space Premium Office
function generateSpacePremiumOfficeJSON() {
  const template = {
    version: '0.4',
    title: 'Space Premium Office HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildHeroSection(),
      buildStatementSection(),
      buildGallerySection(),
      buildCalloutSection(),
      buildFacilitiesGallery(),
      buildFeaturesSection(),
      buildTeamSizeSection(),
      buildCapitalSection(),
      buildCommunityBanner(),
      buildFormSection(),
      buildBottomCTASection()
    ]
  };

  const outputPath = path.resolve('page-space-premium-office.json');
  fs.writeFileSync(outputPath, JSON.stringify(template, null, 2), 'utf-8');
  console.log('Successfully generated page-space-premium-office.json at: ' + outputPath);
}

generateSpacePremiumOfficeJSON();
