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

// Global Styling Helpers
const FONTS = {
  heading: 'Outfit',
  body: 'Plus Jakarta Sans'
};

const COLORS = {
  gold: '#EA8E18',
  goldHover: '#D88010',
  dark: '#0F172A',
  darkBg: '#231F20',
  cream: '#FAF8F5',
  slateText: '#475569',
  slateMuted: '#94A3B8',
  border: '#E2E8F0',
  white: '#FFFFFF'
};

// Common Section: Breadcrumb + Hero
function buildPageHero({ breadcrumbs, badge, titleHtml, description, buttonText, buttonUrl, imageSrc, specsText }) {
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
      createWidget('text-editor', {
        editor: `<p style="margin:0;">${breadcrumbs}</p>`,
        typography_typography: 'custom',
        typography_font_family: FONTS.body,
        typography_font_size: { unit: 'px', size: 13 },
        typography_font_weight: '500'
      }),
      createContainer(
        {
          content_width: 'full',
          width: { unit: '%', size: 100 },
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          align_items: 'stretch',
          background_background: 'classic',
          background_color: COLORS.dark,
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
              createWidget('heading', {
                title: badge,
                header_size: 'span',
                title_color: '#FBBF24',
                typography_typography: 'custom',
                typography_font_family: FONTS.heading,
                typography_font_size: { unit: 'px', size: 14 },
                typography_font_weight: '700',
                typography_letter_spacing: { unit: 'px', size: 1.5 },
                align: 'left'
              }),
              createWidget('heading', {
                title: titleHtml,
                header_size: 'h1',
                title_color: COLORS.white,
                typography_typography: 'custom',
                typography_font_family: FONTS.heading,
                typography_font_size: { unit: 'px', size: 52 },
                typography_font_size_tablet: { unit: 'px', size: 40 },
                typography_font_size_mobile: { unit: 'px', size: 32 },
                typography_font_weight: '500',
                typography_line_height: { unit: 'em', size: 1.12 },
                align: 'left'
              }),
              createWidget('text-editor', {
                editor: `<p>${description}</p>`,
                text_color: '#CBD5E1',
                typography_typography: 'custom',
                typography_font_family: FONTS.body,
                typography_font_size: { unit: 'px', size: 16 },
                typography_font_size_mobile: { unit: 'px', size: 14 },
                typography_line_height: { unit: 'em', size: 1.6 }
              }),
              createWidget('button', {
                text: buttonText,
                link: { url: buttonUrl },
                button_type: 'default',
                size: 'md',
                typography_typography: 'custom',
                typography_font_family: FONTS.body,
                typography_font_size: { unit: 'px', size: 14 },
                typography_font_weight: '700',
                background_color: COLORS.gold,
                button_text_color: COLORS.white,
                border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
                button_padding: { unit: 'px', top: '14', right: '32', bottom: '14', left: '32', isLinked: false },
                icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
                icon_align: 'right',
                icon_indent: { unit: 'px', size: 8 }
              }),
              ...(specsText ? [
                createWidget('text-editor', {
                  editor: `<p style="margin:0; padding-top:12px; border-top:1px solid #1E293B; color:#94A3B8; font-size:12px;">${specsText}</p>`,
                  typography_typography: 'custom',
                  typography_font_family: FONTS.body,
                  typography_font_size: { unit: 'px', size: 12 },
                  typography_font_weight: '500'
                })
              ] : [])
            ]
          ),
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
              background_image: { url: imageSrc },
              background_position: 'center center',
              background_size: 'cover'
            },
            []
          )
        ]
      )
    ]
  );
}

// Common Bottom CTA
function buildBottomCTA({ titleHtml, subtitle }) {
  return createContainer(
    {
      content_width: 'full',
      background_background: 'classic',
      background_color: COLORS.darkBg,
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
            title: titleHtml,
            header_size: 'h2',
            title_color: COLORS.white,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 48 },
            typography_font_size_tablet: { unit: 'px', size: 36 },
            typography_font_size_mobile: { unit: 'px', size: 28 },
            typography_font_weight: '500',
            typography_line_height: { unit: 'em', size: 1.15 },
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: `<p>${subtitle}</p>`,
            text_color: '#94A3B8',
            typography_typography: 'custom',
            typography_font_family: FONTS.body,
            typography_font_size: { unit: 'px', size: 16 },
            align: 'center'
          })
        ]
      )
    ]
  );
}

// Common Form Section
function buildFormSection(initialSpace) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '40', left: '16', isLinked: false }
    },
    [
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1200 },
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          background_background: 'classic',
          background_color: COLORS.white,
          border_radius: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: COLORS.border,
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
              background_color: COLORS.dark,
              background_image: { url: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp' },
              background_position: 'center center',
              background_size: 'cover',
              background_overlay_background: 'classic',
              background_overlay_color: COLORS.dark,
              background_overlay_opacity: { unit: 'px', size: 0.5 },
              padding: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
              padding_mobile: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
              _css_classes: 'hq-space-banner'
            },
            [
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
                    title_color: COLORS.white,
                    typography_typography: 'custom',
                    typography_font_family: FONTS.heading,
                    typography_font_size: { unit: 'px', size: 10 },
                    typography_font_weight: '800',
                    typography_letter_spacing: { unit: 'px', size: 1 },
                    _css_classes: 'hq-space-badge'
                  }),
                  createWidget('heading', {
                    title: 'Tell Us What Your Team Needs.',
                    header_size: 'h2',
                    title_color: COLORS.white,
                    typography_typography: 'custom',
                    typography_font_family: FONTS.heading,
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
                    typography_font_family: FONTS.body,
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
                title_color: COLORS.dark,
                typography_typography: 'custom',
                typography_font_family: FONTS.heading,
                typography_font_size: { unit: 'px', size: 18 },
                typography_font_weight: '500'
              }),
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  flex_gap: { column: '8', row: '8', unit: 'px' }
                },
                [
                  createWidget('button', { text: 'Premium Office', button_type: 'default', _css_classes: `hq-space-btn ${initialSpace === 'Premium Office' ? 'active' : ''}` }),
                  createWidget('button', { text: 'SOHO', button_type: 'default', _css_classes: `hq-space-btn ${initialSpace === 'SOHO' ? 'active' : ''}` }),
                  createWidget('button', { text: 'Serviced Office', button_type: 'default', _css_classes: `hq-space-btn ${initialSpace === 'Serviced Office' ? 'active' : ''}` }),
                  createWidget('button', { text: 'Virtual Office', button_type: 'default', _css_classes: `hq-space-btn ${initialSpace === 'Virtual Office' ? 'active' : ''}` }),
                  createWidget('button', { text: 'Function Room', button_type: 'default', _css_classes: `hq-space-btn ${initialSpace === 'Function Room' ? 'active' : ''}` })
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
                title_color: COLORS.dark,
                typography_typography: 'custom',
                typography_font_family: FONTS.heading,
                typography_font_size: { unit: 'px', size: 18 },
                typography_font_weight: '500'
              }),
              createWidget('text-editor', {
                editor: '<p style="margin:0; font-size:12px; color:#64748B;">Share your details and our team will get back to you shortly.</p>'
              }),
              createWidget('form', {
                form_name: 'Inquiry Form',
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
                redirect_to: `https://wa.me/628111908319?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*${encodeURIComponent(initialSpace)}*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`
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

// -------------------------------------------------------------
// BUILDER: Space SOHO Duplex Page
// -------------------------------------------------------------
function buildSpaceSohoJSON() {
  const template = {
    version: '0.4',
    title: 'Space SOHO Duplex HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildPageHero({
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Spaces</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">SOHO</strong>',
        badge: 'SOHO DUPLEX',
        titleHtml: 'Live, Work & Own <br><span style="color:#EA8E18;">In One Space.</span>',
        description: 'Double-height ceiling SOHO duplex units combining modern residential comfort with professional business presence in Asia Afrika CBD.',
        buttonText: 'FIND MY SOHO',
        buttonUrl: '#find-space',
        imageSrc: '/SPACES/SOHO/SOHO 01.webp',
        specsText: 'Double Height Ceiling &nbsp;—&nbsp; Strata Title Ownership &nbsp;—&nbsp; Dual Purpose Living & Working'
      }),
      // Statement
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1000 },
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          padding: { unit: 'px', top: '80', right: '24', bottom: '80', left: '24', isLinked: false },
          flex_gap: { column: '18', row: '18', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: 'Office. Home Office. Living Space. <br><span style="color:#EA8E18;">#FleksibelAja</span>',
            header_size: 'h2',
            title_color: COLORS.dark,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 44 },
            typography_font_size_mobile: { unit: 'px', size: 26 },
            typography_font_weight: '500',
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: '<p>Designed for entrepreneurs, creative studios, and forward-thinking professionals who refuse to separate work from life excellence.</p>',
            text_color: COLORS.slateText,
            typography_typography: 'custom',
            typography_font_family: FONTS.body,
            typography_font_size: { unit: 'px', size: 17 },
            align: 'center'
          })
        ]
      ),
      // SOHO Concept Grid (3 Concept Cards)
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'column',
          padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
          flex_gap: { column: '36', row: '36', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: '3 Ways To Configure Your <span style="color:#EA8E18;">SOHO Unit</span>',
            header_size: 'h2',
            title_color: COLORS.dark,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 36 },
            typography_font_size_mobile: { unit: 'px', size: 24 },
            align: 'center'
          }),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              flex_wrap: 'wrap',
              flex_gap: { column: '24', row: '24', unit: 'px' }
            },
            [
              { title: '1. Professional Office', desc: 'Ground floor for team workstations & reception, upper mezzanine for executive suite & meeting room.', src: '/SPACES/SOHO/1. unit soho ruang kerja.webp' },
              { title: '2. Hybrid Home Office', desc: 'Ground floor dedicated to daily office operations, upper mezzanine styled as a luxury private apartment.', src: '/SPACES/SOHO/1. unit soho ruang istirahat.webp' },
              { title: '3. Creative & Private Studio', desc: 'Open loft design suited for design agencies, boutique legal firms, or private consultation suites.', src: '/SPACES/SOHO/1. unit soho ruang santai.webp' }
            ].map((c) =>
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
                    background_image: { url: c.src },
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
                      createWidget('heading', { title: c.title, header_size: 'h3', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 20 } }),
                      createWidget('text-editor', { editor: `<p style="margin:0; font-size:14px; color:${COLORS.slateText};">${c.desc}</p>` })
                    ]
                  )
                ]
              )
            )
          )
        ]
      ),
      buildFormSection('SOHO'),
      buildBottomCTA({
        titleHtml: 'Own Your Space. <br><span style="color:#EA8E18;">Elevate Your Life.</span>',
        subtitle: 'HQuarters SOHO Duplex — Asia Afrika, Bandung'
      })
    ]
  };

  fs.writeFileSync(path.resolve('page-space-soho.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-space-soho.json');
}

// -------------------------------------------------------------
// BUILDER: Space Serviced Office Page
// -------------------------------------------------------------
function buildSpaceServicedJSON() {
  const template = {
    version: '0.4',
    title: 'Space Serviced Office HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildPageHero({
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Spaces</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Serviced Office</strong>',
        badge: 'SERVICED OFFICE',
        titleHtml: 'Turnkey Office Suite <br><span style="color:#EA8E18;">Ready In 24 Hours.</span>',
        description: 'Fully furnished, high-speed fiber internet, meeting rooms, and professional reception support included in one flexible monthly arrangement.',
        buttonText: 'EXPLORE SERVICED OFFICE',
        buttonUrl: '#find-space',
        imageSrc: '/SPACES/SERVICED OFFICE/1.webp',
        specsText: 'Fully Furnished &nbsp;—&nbsp; High-Speed Fiber Internet &nbsp;—&nbsp; Reception & Mail Handling Included'
      }),
      // Statement
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1000 },
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          padding: { unit: 'px', top: '80', right: '24', bottom: '80', left: '24', isLinked: false },
          flex_gap: { column: '18', row: '18', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: 'Plug In & Start Working. <br><span style="color:#EA8E18;">We Handle The Rest.</span>',
            header_size: 'h2',
            title_color: COLORS.dark,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 44 },
            typography_font_size_mobile: { unit: 'px', size: 26 },
            typography_font_weight: '500',
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: '<p>Zero fit-out delays, zero capital expenditure on furniture, zero utility hassle. Just move in with your laptop and focus on your business growth.</p>',
            text_color: COLORS.slateText,
            typography_typography: 'custom',
            typography_font_family: FONTS.body,
            typography_font_size: { unit: 'px', size: 17 },
            align: 'center'
          })
        ]
      ),
      // Inclusions Grid
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'column',
          padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
          flex_gap: { column: '36', row: '36', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: 'Everything Included In <span style="color:#EA8E18;">Your Suite</span>',
            header_size: 'h2',
            title_color: COLORS.dark,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 36 },
            align: 'center'
          }),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              flex_wrap: 'wrap',
              flex_gap: { column: '24', row: '24', unit: 'px' }
            },
            [
              { title: 'Ergonomic Workstations', desc: 'Executive desks, mesh chairs, and pedestal storage.' },
              { title: 'High-Speed Fiber Wi-Fi', desc: 'Dedicated corporate bandwidth with redundant backup.' },
              { title: 'Professional Receptionist', desc: 'Greeting your guests and handling incoming mail/parcels.' },
              { title: 'Meeting Room Credits', desc: 'Access to high-tech boardrooms for client presentations.' },
              { title: 'Daily Cleaning Service', desc: 'Immaculate office hygiene maintained every single day.' },
              { title: 'Free Refreshment', desc: 'Premium coffee, tea, and mineral water available all day.' }
            ].map((item) =>
              createContainer(
                {
                  width: { unit: '%', size: 31 },
                  width_tablet: { unit: '%', size: 48 },
                  width_mobile: { unit: '%', size: 100 },
                  background_background: 'classic',
                  background_color: COLORS.white,
                  border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                  border_color: COLORS.border,
                  padding: { unit: 'px', top: '28', right: '24', bottom: '28', left: '24', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '12', row: '12', unit: 'px' }
                },
                [
                  createWidget('heading', { title: item.title, header_size: 'h3', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 20 } }),
                  createWidget('text-editor', { editor: `<p style="margin:0; font-size:14px; color:${COLORS.slateText};">${item.desc}</p>` })
                ]
              )
            )
          )
        ]
      ),
      buildFormSection('Serviced Office'),
      buildBottomCTA({
        titleHtml: 'Move-In Today. <br><span style="color:#EA8E18;">Scale Tomorrow.</span>',
        subtitle: 'HQuarters Serviced Office — Asia Afrika, Bandung'
      })
    ]
  };

  fs.writeFileSync(path.resolve('page-space-serviced-office.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-space-serviced-office.json');
}

// -------------------------------------------------------------
// BUILDER: Space Virtual Office Page
// -------------------------------------------------------------
function buildSpaceVirtualJSON() {
  const template = {
    version: '0.4',
    title: 'Space Virtual Office HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildPageHero({
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Spaces</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Virtual Office</strong>',
        badge: 'PRESTIGE ADDRESS',
        titleHtml: 'Establish Corporate Presence <br><span style="color:#EA8E18;">In Asia Afrika CBD.</span>',
        description: 'Get a prestigious Asia Afrika CBD business address, legal domicile support, mail handling, and meeting room access to build instant enterprise credibility.',
        buttonText: 'GET VIRTUAL OFFICE',
        buttonUrl: '#find-space',
        imageSrc: '/SPACES/SERVICED OFFICE/6.webp',
        specsText: 'Legal Domicile License &nbsp;—&nbsp; Mail & Parcel Handling &nbsp;—&nbsp; Meeting Room Access Included'
      }),
      // Benefits Grid
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'column',
          padding: { unit: 'px', top: '80', right: '32', bottom: '60', left: '32', isLinked: false },
          flex_gap: { column: '36', row: '36', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: 'Why Companies Choose <span style="color:#EA8E18;">HQuarters Virtual Office</span>',
            header_size: 'h2',
            title_color: COLORS.dark,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 36 },
            align: 'center'
          }),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              flex_wrap: 'wrap',
              flex_gap: { column: '24', row: '24', unit: 'px' }
            },
            [
              { title: 'CBD Domicile Certificate', desc: 'Legitimate business address for PT / CV incorporation and tax PKP registration.' },
              { title: 'Mail & Package Forwarding', desc: 'Real-time WhatsApp notification when letters or documents arrive at reception.' },
              { title: 'Dedicated Phone Line', desc: 'Dedicated Bandung phone number with professional call answering service.' },
              { title: 'Meeting Room Quota', desc: 'Monthly hours for high-grade conference rooms to meet clients and investors.' }
            ].map((item) =>
              createContainer(
                {
                  width: { unit: '%', size: 48 },
                  width_mobile: { unit: '%', size: 100 },
                  background_background: 'classic',
                  background_color: COLORS.white,
                  border_radius: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                  border_color: COLORS.border,
                  padding: { unit: 'px', top: '32', right: '28', bottom: '32', left: '28', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '12', row: '12', unit: 'px' }
                },
                [
                  createWidget('heading', { title: item.title, header_size: 'h3', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 22 } }),
                  createWidget('text-editor', { editor: `<p style="margin:0; font-size:15px; color:${COLORS.slateText};">${item.desc}</p>` })
                ]
              )
            )
          )
        ]
      ),
      buildFormSection('Virtual Office'),
      buildBottomCTA({
        titleHtml: 'Instant Credibility. <br><span style="color:#EA8E18;">Asia Afrika Address.</span>',
        subtitle: 'HQuarters Virtual Office — Bandung CBD'
      })
    ]
  };

  fs.writeFileSync(path.resolve('page-space-virtual-office.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-space-virtual-office.json');
}

// -------------------------------------------------------------
// BUILDER: Event / Function Room Page
// -------------------------------------------------------------
function buildSpaceFunctionRoomJSON() {
  const template = {
    version: '0.4',
    title: 'Space Function Room HQuarters (Full Responsive)',
    type: 'page',
    content: [
      buildPageHero({
        breadcrumbs: '<a href="/" style="color:#64748B; text-decoration:none;">Home</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Spaces</a> <span style="color:#94A3B8; margin:0 6px;">›</span> <strong style="color:#0F172A;">Function Room</strong>',
        badge: 'EVENT VENUE',
        titleHtml: 'Plan Your Next <br><span style="color:#EA8E18;">Corporate Gathering.</span>',
        description: 'State-of-the-art audiovisual setups, flexible seating, and dedicated event support for board meetings, seminars, product launches, and banquets.',
        buttonText: 'BOOK FUNCTION ROOM',
        buttonUrl: '#find-space',
        imageSrc: '/BUILDING/FR 01.webp',
        specsText: 'Capacity Up To 200 Guests &nbsp;—&nbsp; High-Definition AV System &nbsp;—&nbsp; Dedicated Catering Support'
      }),
      // Layout Configuration Cards
      createContainer(
        {
          content_width: 'boxed',
          boxed_width: { unit: 'px', size: 1440 },
          flex_direction: 'column',
          padding: { unit: 'px', top: '80', right: '32', bottom: '60', left: '32', isLinked: false },
          flex_gap: { column: '36', row: '36', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: 'Flexible Seating Configurations',
            header_size: 'h2',
            title_color: COLORS.dark,
            typography_typography: 'custom',
            typography_font_family: FONTS.heading,
            typography_font_size: { unit: 'px', size: 36 },
            align: 'center'
          }),
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'row',
              flex_wrap: 'wrap',
              flex_gap: { column: '24', row: '24', unit: 'px' }
            },
            [
              { title: 'Theater Setup', desc: 'Ideal for keynote presentations, press conferences, and company town halls (Up to 150 guests).' },
              { title: 'Classroom Setup', desc: 'Equipped for interactive workshops, corporate training, and seminars with writing tables (Up to 90 guests).' },
              { title: 'Banquet & Round Table', desc: 'Designed for gala dinners, networking receptions, and award ceremonies (Up to 100 guests).' }
            ].map((item) =>
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
                  padding: { unit: 'px', top: '32', right: '24', bottom: '32', left: '24', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '12', row: '12', unit: 'px' }
                },
                [
                  createWidget('heading', { title: item.title, header_size: 'h3', title_color: COLORS.dark, typography_typography: 'custom', typography_font_family: FONTS.heading, typography_font_size: { unit: 'px', size: 22 } }),
                  createWidget('text-editor', { editor: `<p style="margin:0; font-size:14px; color:${COLORS.slateText};">${item.desc}</p>` })
                ]
              )
            )
          )
        ]
      ),
      buildFormSection('Function Room'),
      buildBottomCTA({
        titleHtml: 'Host Memorable Events. <br><span style="color:#EA8E18;">At HQuarters Asia Afrika.</span>',
        subtitle: 'HQuarters Function Room & Event Space'
      })
    ]
  };

  fs.writeFileSync(path.resolve('page-space-function-room.json'), JSON.stringify(template, null, 2));
  console.log('Generated page-space-function-room.json');
}

// Execute builders
buildSpaceSohoJSON();
buildSpaceServicedJSON();
buildSpaceVirtualJSON();
buildSpaceFunctionRoomJSON();
