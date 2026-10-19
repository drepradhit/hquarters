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

function exportElementorTemplate(title, elements, filename) {
  const template = {
    version: '0.4',
    title: title,
    type: 'page',
    content: elements
  };
  fs.writeFileSync(filename, JSON.stringify(template, null, 2), 'utf-8');
  console.log(`✓ Generated: ${filename}`);
}

// =========================================================================
// REUSABLE COMPONENTS
// =========================================================================

// Master Form Inquiry Section
function buildMasterFormInquirySection(defaultSpace = 'Premium Office') {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      padding: { unit: 'px', top: '40', right: '32', bottom: '80', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '60', left: '16', isLinked: false },
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
          border_radius: { unit: 'px', top: '36', right: '36', bottom: '36', left: '36', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
          border_border: 'solid',
          border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
          border_color: '#E2E8F0',
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 16, blur: 40, spread: 0, color: 'rgba(0,0,0,0.06)' },
          overflow: 'hidden'
        },
        [
          // Left Visual Panel (40%)
          createContainer(
            {
              width: { unit: '%', size: 40 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              min_height: { unit: 'px', size: 540 },
              min_height_mobile: { unit: 'px', size: 360 },
              background_background: 'classic',
              background_image: { url: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp' },
              background_position: 'center center',
              background_size: 'cover',
              background_overlay_background: 'classic',
              background_overlay_color: 'rgba(15, 23, 42, 0.45)',
              padding: { unit: 'px', top: '40', right: '36', bottom: '40', left: '36', isLinked: true },
              padding_mobile: { unit: 'px', top: '24', right: '20', bottom: '24', left: '20', isLinked: true },
              flex_direction: 'column',
              justify_content: 'flex-end'
            },
            [
              createContainer(
                {
                  background_background: 'classic',
                  background_color: 'rgba(22, 26, 37, 0.95)',
                  border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
                  border_border: 'solid',
                  border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                  border_color: 'rgba(255, 255, 255, 0.12)',
                  padding: { unit: 'px', top: '28', right: '28', bottom: '28', left: '28', isLinked: true },
                  padding_mobile: { unit: 'px', top: '20', right: '18', bottom: '20', left: '18', isLinked: true },
                  flex_direction: 'column',
                  flex_gap: { column: '12', row: '12', unit: 'px' }
                },
                [
                  createWidget('heading', {
                    title: 'KONSULTASI RUANG USAHA',
                    header_size: 'span',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: { unit: 'px', size: 10 },
                    typography_font_weight: '800',
                    typography_letter_spacing: { unit: 'px', size: 1 },
                    _custom_css: 'selector { display: inline-block; background: #EA8E18; padding: 4px 10px; border-radius: 6px; width: fit-content; }'
                  }),
                  createWidget('heading', {
                    title: 'Sampaikan Kebutuhan Tim & Usaha Anda.',
                    header_size: 'h3',
                    title_color: '#FFFFFF',
                    typography_typography: 'custom',
                    typography_font_family: 'Outfit',
                    typography_font_size: { unit: 'px', size: 24 },
                    typography_font_size_mobile: { unit: 'px', size: 20 },
                    typography_font_weight: '500',
                    typography_line_height: { unit: 'em', size: 1.25 }
                  }),
                  createWidget('text-editor', {
                    editor: '<p>Kami akan mencocokkan pilihan unit yang tepat berdasarkan luas, lantai, dan timeline kepindahan — dengan proposal penawaran khusus untuk perusahaan Anda.</p>',
                    text_color: '#CBD5E1',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: { unit: 'px', size: 13 },
                    typography_line_height: { unit: 'em', size: 1.6 }
                  })
                ]
              )
            ]
          ),

          // Right Form Panel (60%)
          createContainer(
            {
              width: { unit: '%', size: 60 },
              width_tablet: { unit: '%', size: 100 },
              width_mobile: { unit: '%', size: 100 },
              padding: { unit: 'px', top: '48', right: '48', bottom: '48', left: '48', isLinked: true },
              padding_mobile: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20', isLinked: true },
              flex_direction: 'column',
              flex_gap: { column: '24', row: '24', unit: 'px' }
            },
            [
              createContainer(
                {
                  flex_direction: 'column',
                  flex_gap: { column: '12', row: '12', unit: 'px' }
                },
                [
                  createContainer(
                    {
                      flex_direction: 'row',
                      justify_content: 'space-between',
                      align_items: 'center'
                    },
                    [
                      createWidget('heading', {
                        title: '1. Pilih Tipe Ruang Kerja',
                        header_size: 'h4',
                        title_color: '#0F172A',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: { unit: 'px', size: 18 },
                        typography_font_weight: '500'
                      }),
                      createWidget('heading', {
                        title: defaultSpace.toUpperCase(),
                        header_size: 'span',
                        title_color: '#EA8E18',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: { unit: 'px', size: 11 },
                        typography_font_weight: '700',
                        typography_letter_spacing: { unit: 'px', size: 1 }
                      })
                    ]
                  ),
                  createContainer(
                    {
                      flex_direction: 'row',
                      flex_wrap: 'wrap',
                      flex_gap: { column: '8', row: '8', unit: 'px' }
                    },
                    ['Premium Office', 'SOHO', 'Serviced Office', 'Virtual Office', 'Ruang Acara'].map((item) =>
                      createWidget('button', {
                        text: item,
                        button_type: 'default',
                        size: 'xs',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: { unit: 'px', size: 12 },
                        typography_font_weight: item === defaultSpace ? '700' : '600',
                        background_color: item === defaultSpace ? '#FEF3E2' : '#FFFFFF',
                        button_text_color: item === defaultSpace ? '#EA8E18' : '#475569',
                        border_border: 'solid',
                        border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                        border_color: item === defaultSpace ? '#EA8E18' : '#E2E8F0',
                        border_radius: { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true },
                        padding: { unit: 'px', top: '8', right: '14', bottom: '8', left: '14', isLinked: true }
                      })
                    )
                  )
                ]
              ),

              createWidget('divider', {
                style: 'solid',
                weight: { unit: 'px', size: 1 },
                color: '#F1F5F9',
                gap: { unit: 'px', size: 6 }
              }),

              createContainer(
                {
                  flex_direction: 'column',
                  flex_gap: { column: '16', row: '16', unit: 'px' }
                },
                [
                  createContainer(
                    {
                      flex_direction: 'column',
                      flex_gap: { column: '4', row: '4', unit: 'px' }
                    },
                    [
                      createWidget('heading', {
                        title: '2. Lengkapi Data Diri Anda',
                        header_size: 'h4',
                        title_color: '#0F172A',
                        typography_typography: 'custom',
                        typography_font_family: 'Outfit',
                        typography_font_size: { unit: 'px', size: 18 },
                        typography_font_weight: '500'
                      }),
                      createWidget('text-editor', {
                        editor: '<p>Kirimkan informasi kontak Anda, tim konsultan HQuarters akan segera menghubungi via WhatsApp.</p>',
                        text_color: '#64748B',
                        typography_typography: 'custom',
                        typography_font_family: 'Plus Jakarta Sans',
                        typography_font_size: { unit: 'px', size: 12 }
                      })
                    ]
                  ),

                  createWidget('form', {
                    form_name: 'Inquiry Form HQuarters',
                    form_fields: [
                      { _id: 'space_type', field_type: 'hidden', field_value: defaultSpace },
                      { _id: 'name', field_type: 'text', field_label: 'NAMA LENGKAP *', placeholder: 'Nama lengkap Anda', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'whatsapp', field_type: 'tel', field_label: 'NOMOR WHATSAPP *', placeholder: '0812 3456 7890', required: 'true', width: '50', width_mobile: '100' },
                      { _id: 'company', field_type: 'text', field_label: 'NAMA PERUSAHAAN (OPSIONAL)', placeholder: 'Contoh: PT Nusantara Maju', required: 'false', width: '100' },
                      { _id: 'notes', field_type: 'textarea', field_label: 'CATATAN / KEBUTUHAN KHUSUS (OPSIONAL)', placeholder: 'Tuliskan preferensi lantai, jumlah tim, atau rencana kepindahan...', rows: 3, required: 'false', width: '100' }
                    ],
                    button_text: 'Dapatkan Proposal & Denah Lantai',
                    button_size: 'md',
                    button_width: '100',
                    button_typography_typography: 'custom',
                    button_typography_font_family: 'Plus Jakarta Sans',
                    button_typography_font_size: { unit: 'px', size: 14 },
                    button_typography_font_weight: '700',
                    button_text_color: '#FFFFFF',
                    button_background_color: '#EA8E18',
                    button_border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
                    button_padding: { unit: 'px', top: '14', right: '28', bottom: '14', left: '28', isLinked: true },
                    submit_actions: ['redirect'],
                    redirect_to: `https://wa.me/628111908319?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*${encodeURIComponent(defaultSpace)}*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
                    label_typography_typography: 'custom',
                    label_typography_font_family: 'Plus Jakarta Sans',
                    label_typography_font_size: { unit: 'px', size: '10' },
                    label_typography_font_weight: '800',
                    label_text_color: '#475569',
                    field_typography_typography: 'custom',
                    field_typography_font_family: 'Plus Jakarta Sans',
                    field_typography_font_size: { unit: 'px', size: 14 },
                    field_text_color: '#0F172A',
                    field_background_color: '#FFFFFF',
                    field_border_border: 'solid',
                    field_border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                    field_border_color: '#E2E8F0',
                    field_border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
                    field_padding: { unit: 'px', top: '10', right: '14', bottom: '10', left: '14', isLinked: true }
                  }),

                  createWidget('text-editor', {
                    editor: '<p style="text-align:center; font-size:10px; color:#94A3B8; margin-top:4px;">Informasi Anda bersifat rahasia dan hanya digunakan oleh manajemen HQuarters.</p>'
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

// Bottom CTA
function buildBottomCTASection(titlePrefix = 'Siap Menemukan ', titleHighlight = 'Ruang Usaha Ideal Anda?', desc = 'Mulai dari domisili virtual bergengsi, serviced office siap pakai, SOHO duplex, hingga lantai kantor korporasi — tim kami siap membantu Anda memilih ruang terbaik.', btnText = 'Jadwalkan Kunjungan Lokasi', target = '/find-space') {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      padding: { unit: 'px', top: '40', right: '32', bottom: '80', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '60', left: '16', isLinked: false }
    },
    [
      createContainer(
        {
          content_width: 'full',
          background_background: 'classic',
          background_color: '#231F20',
          border_radius: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
          border_radius_mobile: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
          padding: { unit: 'px', top: '72', right: '48', bottom: '72', left: '48', isLinked: true },
          padding_mobile: { unit: 'px', top: '48', right: '24', bottom: '48', left: '24', isLinked: true },
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: { column: '24', row: '24', unit: 'px' }
        },
        [
          createWidget('heading', {
            title: `${titlePrefix}<span style="color:#EA8E18;">${titleHighlight}</span>`,
            header_size: 'h2',
            title_color: '#FFFFFF',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 44 },
            typography_font_size_tablet: { unit: 'px', size: 34 },
            typography_font_size_mobile: { unit: 'px', size: 26 },
            typography_font_weight: '500',
            typography_line_height: { unit: 'em', size: 1.15 },
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: `<p style="max-width: 680px; margin: 0 auto;">${desc}</p>`,
            text_color: '#CBD5E1',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: { unit: 'px', size: 16 },
            typography_font_size_mobile: { unit: 'px', size: 14 },
            typography_line_height: { unit: 'em', size: 1.6 },
            align: 'center'
          }),
          createWidget('button', {
            text: btnText,
            link: { url: target },
            size: 'md',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: { unit: 'px', size: 15 },
            typography_font_weight: '700',
            button_text_color: '#FFFFFF',
            background_color: '#EA8E18',
            border_radius: { unit: 'px', top: '9999', right: '9999', bottom: '9999', left: '9999', isLinked: true },
            padding: { unit: 'px', top: '16', right: '36', bottom: '16', left: '36', isLinked: true }
          })
        ]
      )
    ]
  );
}

// Gallery Showcase (Main + 4 Thumbnails)
function buildGalleryShowcaseSection(images = []) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '20', right: '32', bottom: '40', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '12', right: '16', bottom: '24', left: '16', isLinked: false },
      flex_gap: { column: '16', row: '16', unit: 'px' }
    },
    [
      // Main Image
      createContainer(
        {
          width: { unit: '%', size: 100 },
          min_height: { unit: 'px', size: 520 },
          min_height_tablet: { unit: 'px', size: 400 },
          min_height_mobile: { unit: 'px', size: 280 },
          border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
          overflow: 'hidden',
          background_background: 'classic',
          background_image: { url: images[0]?.src || '/SPACES/PREMIUM OFFICE/Premium Office 06.webp' },
          background_position: 'center center',
          background_size: 'cover',
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 12, blur: 30, spread: 0, color: 'rgba(0,0,0,0.08)' }
        },
        []
      ),
      // 4 Thumbnails Row
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
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
              background_size: 'cover'
            },
            []
          )
        )
      )
    ]
  );
}

// Callout Box Section
function buildCalloutSection(title, text, accent) {
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
          border_radius: { unit: 'px', top: '36', right: '36', bottom: '36', left: '36', isLinked: true },
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
            title: title,
            header_size: 'h3',
            title_color: '#0F172A',
            typography_typography: 'custom',
            typography_font_family: 'Outfit',
            typography_font_size: { unit: 'px', size: 30 },
            typography_font_size_mobile: { unit: 'px', size: 22 },
            typography_font_weight: '500',
            typography_line_height: { unit: 'em', size: 1.25 },
            align: 'center'
          }),
          createWidget('text-editor', {
            editor: `<p>${text}</p>`,
            text_color: '#475569',
            typography_typography: 'custom',
            typography_font_family: 'Plus Jakarta Sans',
            typography_font_size: { unit: 'px', size: 16 },
            typography_line_height: { unit: 'em', size: 1.6 },
            align: 'center'
          }),
          createWidget('heading', {
            title: accent,
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

// 6 Features Grid (What's Included)
function buildFeaturesSection(tagline, heading, featuresList = []) {
  return createContainer(
    {
      content_width: 'boxed',
      boxed_width: { unit: 'px', size: 1440 },
      flex_direction: 'column',
      padding: { unit: 'px', top: '60', right: '32', bottom: '60', left: '32', isLinked: false },
      padding_mobile: { unit: 'px', top: '40', right: '16', bottom: '40', left: '16', isLinked: false },
      flex_gap: { column: '36', row: '36', unit: 'px' },
      background_background: 'classic',
      background_color: '#FFFFFF'
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
            title: tagline,
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
            title: heading,
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
        featuresList.map((item) =>
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
              createContainer(
                {
                  width: { unit: 'px', size: 48 },
                  min_height: { unit: 'px', size: 48 },
                  background_background: 'classic',
                  background_color: '#FEF3E2',
                  border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
                  justify_content: 'center',
                  align_items: 'center'
                },
                [
                  createWidget('heading', {
                    title: '◆',
                    header_size: 'span',
                    title_color: '#B86807',
                    typography_typography: 'custom',
                    typography_font_size: { unit: 'px', size: 18 }
                  })
                ]
              ),
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

// Facilities Showcase
function buildFacilitiesShowcase(title = 'Fasilitas Gedung', facilities = []) {
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
        title: title,
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
          background_image: { url: facilities[0]?.src || '/BUILDING/gym 01.webp' },
          background_position: 'center center',
          background_size: 'cover',
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 12, blur: 30, spread: 0, color: 'rgba(0,0,0,0.08)' }
        },
        []
      ),
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
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
              padding: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
              flex_direction: 'column',
              justify_content: 'flex-end'
            },
            [
              createWidget('heading', {
                title: item.title,
                header_size: 'span',
                title_color: '#FFFFFF',
                typography_typography: 'custom',
                typography_font_family: 'Plus Jakarta Sans',
                typography_font_size: { unit: 'px', size: 11 },
                typography_font_weight: '700',
                _custom_css: 'selector { background: rgba(15,23,42,0.85); padding: 4px 8px; border-radius: 6px; width: fit-content; }'
              })
            ]
          )
        )
      )
    ]
  );
}

// =========================================================================
// 3. PAGE: PREMIUM OFFICE (ID)
// =========================================================================
function generatePremiumOfficePage() {
  const images = [
    { src: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp' },
    { src: '/SPACES/PREMIUM OFFICE/Premium Office.webp' },
    { src: '/SPACES/PREMIUM OFFICE/Premium Office 05.webp' },
    { src: '/SPACES/PREMIUM OFFICE/Premium Office 07.webp' }
  ];

  const facilities = [
    { src: '/BUILDING/gym 01.webp', title: 'Pusat Kebugaran Fitness Eksklusif' },
    { src: '/BUILDING/gym 5_4.webp', title: 'Studio Latihan & Conditioning' },
    { src: '/BUILDING/sauna 5_4.webp', title: 'Sauna Relaksasi Privat' },
    { src: '/BUILDING/kolam renang 5_4.webp', title: 'Kolam Renang Air Hangat' }
  ];

  const features = [
    { title: 'Citra Profesional Bergengsi', desc: 'Area lobby representatif dan lingkungan bisnis berkelas yang mencerminkan kredibilitas korporat Anda.' },
    { title: 'Kapasitas Ruang yang Fleksibel', desc: 'Pilihan layout modular yang dapat disesuaikan untuk berbagai ukuran dan pertumbuhan tim perusahaan.' },
    { title: 'Konektivitas Bisnis Cepat', desc: 'Infrastruktur internet serat optik dedicated berkecepatan tinggi siap mendukung operasional harian.' },
    { title: 'Aksesibilitas Terbaik di Bandung', desc: 'Terletak tepat di pusat denyut ekonomi Jl. Asia Afrika, dekat dengan bank sentral dan institusi penting.' },
    { title: 'Keamanan 24 Jam Berlapis', desc: 'Sistem pengawasan CCTV terpadu, akses kartu pintar di setiap lift, dan staf keamanan profesional siaga 24/7.' },
    { title: 'Fasilitas Karyawan Lengkap', desc: 'Fasilitas gym, sauna, dan heated swimming pool yang meningkatkan kenyamanan dan produktivitas tim Anda.' }
  ];

  const elements = [
    // Breadcrumb Nav
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '0', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '0', left: '16', isLinked: false }
      },
      [
        createWidget('heading', {
          title: '<a href="/" style="color:#64748B; text-decoration:none;">Beranda</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Ruang Usaha</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <span style="color:#EA8E18; font-weight:600;">Premium Office</span>',
          header_size: 'span',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 13 }
        })
      ]
    ),

    // Hero Header Space
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '24', right: '32', bottom: '24', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: false },
        flex_direction: 'row',
        flex_direction_tablet: 'column',
        flex_direction_mobile: 'column',
        justify_content: 'space-between',
        align_items: 'flex-start',
        flex_gap: { column: '24', row: '24', unit: 'px' }
      },
      [
        createContainer(
          {
            width: { unit: '%', size: 65 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'LANTAI KANTOR KORPORASI GRADE-A',
              header_size: 'span',
              title_color: '#EA8E18',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 12 },
              typography_font_weight: '700',
              typography_letter_spacing: { unit: 'px', size: 1.5 }
            }),
            createWidget('heading', {
              title: 'Kantor Pusat Korporasi Anda Siap Ditempati.',
              header_size: 'h1',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 48 },
              typography_font_size_mobile: { unit: 'px', size: 30 },
              typography_font_weight: '500',
              typography_line_height: { unit: 'em', size: 1.15 }
            }),
            createWidget('text-editor', {
              editor: '<p>Ruang kantor eksklusif di koridor finansial Jl. Asia Afrika Bandung. Didesain untuk perusahaan mapan dan korporasi multinasional yang mengutamakan kredibilitas, kenyamanan, dan infrastruktur modern.</p>',
              text_color: '#475569',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 16 },
              typography_line_height: { unit: 'em', size: 1.6 }
            })
          ]
        ),
        createContainer(
          {
            width: { unit: '%', size: 30 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            background_background: 'classic',
            background_color: '#FAF8F5',
            border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            padding: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'Ringkasan Spesifikasi',
              header_size: 'h4',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 16 },
              typography_font_weight: '600'
            }),
            createWidget('text-editor', {
              editor: '<ul style="margin:0; padding-left:18px; font-size:13px; color:#475569; line-height:1.8;"><li><strong>Kapasitas:</strong> 10 — 150+ Anggota Tim</li><li><strong>Luas Lantai:</strong> 60 m² — 500+ m²</li><li><strong>Kondisi:</strong> Bare / Custom Layout</li><li><strong>Akses:</strong> 24 Jam Dedicated Card</li></ul>'
            }),
            createWidget('button', {
              text: 'Dapatkan Proposal Ruang',
              link: { url: '#find-space' },
              size: 'sm',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 13 },
              typography_font_weight: '700',
              button_text_color: '#FFFFFF',
              background_color: '#EA8E18',
              border_radius: { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true }
            })
          ]
        )
      ]
    ),

    // Gallery Showcase
    buildGalleryShowcaseSection(images),

    // Callout Box
    buildCalloutSection(
      'Sebelum Pertemuan Dimulai, Kantor Anda Sudah Menunjukkan Kelas Bisnis Anda.',
      'Lobby berdesain representatif, pengalaman kedatangan yang profesional, dan atmosfer korporat yang kredibel — meyakinkan klien bahwa mereka bermitra dengan perusahaan terpercaya.',
      'Pastikan kantor Anda mencerminkan visi kesuksesan yang tepat.'
    ),

    // Facilities Showcase
    buildFacilitiesShowcase('Fasilitas Pendukung Kantor Premium', facilities),

    // What's Included (6 Features Grid)
    buildFeaturesSection(
      "STANDAR FASILITAS KORPORAT",
      'Seluruh Standar Fasilitas yang Dibutuhkan Perusahaan Modern.',
      features
    ),

    // Team Size Selector
    createContainer(
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
            border_radius: { unit: 'px', top: '36', right: '36', bottom: '36', left: '36', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            padding: { unit: 'px', top: '48', right: '40', bottom: '48', left: '40', isLinked: true },
            padding_mobile: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20', isLinked: true },
            flex_direction: 'column',
            align_items: 'center',
            text_align: 'center',
            flex_gap: { column: '24', row: '24', unit: 'px' }
          },
          [
            createContainer(
              {
                flex_direction: 'column',
                align_items: 'center',
                flex_gap: { column: '6', row: '6', unit: 'px' }
              },
              [
                createWidget('heading', {
                  title: 'SESUAI KAPASITAS TIM ANDA',
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
                  title: 'Berapa Jumlah Anggota Tim Anda?',
                  header_size: 'h2',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 36 },
                  typography_font_size_mobile: { unit: 'px', size: 24 },
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
                flex_gap: { column: '16', row: '16', unit: 'px' },
                justify_content: 'space-between'
              },
              [
                { size: '10 — 20 Orang', desc: 'Kantor korporasi kompak & efisien' },
                { size: '20 — 40 Orang', desc: 'Layout kantor modular fleksibel' },
                { size: '40 — 80 Orang', desc: 'Solusi lantai gabungan skala besar' },
                { size: '80 — 150+ Orang', desc: 'Konfigurasi korporasi kustom' }
              ].map((item) =>
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
                    padding: { unit: 'px', top: '24', right: '20', bottom: '24', left: '20', isLinked: true },
                    flex_direction: 'column',
                    align_items: 'center',
                    text_align: 'center',
                    flex_gap: { column: '8', row: '8', unit: 'px' }
                  },
                  [
                    createWidget('heading', {
                      title: item.size,
                      header_size: 'h3',
                      title_color: '#0F172A',
                      typography_typography: 'custom',
                      typography_font_family: 'Outfit',
                      typography_font_size: { unit: 'px', size: 20 },
                      typography_font_weight: '600'
                    }),
                    createWidget('text-editor', {
                      editor: `<p style="font-size:13px; color:#64748B; margin:0;">${item.desc}</p>`
                    })
                  ]
                )
              )
            )
          ]
        )
      ]
    ),

    // Master Form Inquiry
    buildMasterFormInquirySection('Premium Office')
  ];

  exportElementorTemplate('HQuarters - Space: Premium Office (Indonesian)', elements, 'page-space-premium-office-id.json');
}

// =========================================================================
// 4. PAGE: SOHO DUPLEX (ID)
// =========================================================================
function generateSohoDuplexPage() {
  const images = [
    { src: '/SPACES/SOHO/SOHO 01.webp' },
    { src: '/SPACES/SOHO/SOHO 02.webp' },
    { src: '/SPACES/SOHO/SOHO 03.webp' },
    { src: '/SPACES/SOHO/SOHO 04.webp' }
  ];

  const features = [
    { title: 'Plafon Double-Height Tinggi', desc: 'Ketinggian plafon void dramatis yang memberikan pencahayaan alami melimpah dan kesan ruang lapang.' },
    { title: 'Konsep Mezzanine Multifungsi', desc: 'Pemisahan lantai yang cerdas antara area kerja operasional di lantai bawah dan area privat/istirahat di lantai atas.' },
    { title: 'Kamar Mandi & Dapur Privat', desc: 'Fasilitas residensial lengkap di dalam unit untuk kenyamanan bekerja hingga larut malam tanpa repot.' },
    { title: 'Pilihan Hak Milik Strata Title', desc: 'Bisa disewa ataupun dimiliki sebagai aset properti komersial bernilai tinggi di CBD Bandung.' },
    { title: 'Akses Fasilitas Bintang Lima', desc: 'Termasuk akses penuh ke fitness center, sauna, kolam renang air hangat, dan lounge gedung.' },
    { title: 'Fleksibilitas Bisnis & Gaya Hidup', desc: 'Sesuai dengan semangat #FleksibelAja untuk studio desain, firma hukum, agensi, konsultan, maupun tech startup.' }
  ];

  const elements = [
    // Breadcrumb
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '0', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '0', left: '16', isLinked: false }
      },
      [
        createWidget('heading', {
          title: '<a href="/" style="color:#64748B; text-decoration:none;">Beranda</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Ruang Usaha</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <span style="color:#EA8E18; font-weight:600;">SOHO Duplex</span>',
          header_size: 'span',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 13 }
        })
      ]
    ),

    // Hero Header
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '24', right: '32', bottom: '24', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: false },
        flex_direction: 'row',
        flex_direction_tablet: 'column',
        flex_direction_mobile: 'column',
        justify_content: 'space-between',
        align_items: 'flex-start',
        flex_gap: { column: '24', row: '24', unit: 'px' }
      },
      [
        createContainer(
          {
            width: { unit: '%', size: 65 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'SMALL OFFICE HOME OFFICE • #FLEKSIBELELAJA',
              header_size: 'span',
              title_color: '#EA8E18',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 12 },
              typography_font_weight: '700',
              typography_letter_spacing: { unit: 'px', size: 1.5 }
            }),
            createWidget('heading', {
              title: 'Hunian, Tempat Kerja & Investasi Dalam Satu Ruang.',
              header_size: 'h1',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 48 },
              typography_font_size_mobile: { unit: 'px', size: 30 },
              typography_font_weight: '500',
              typography_line_height: { unit: 'em', size: 1.15 }
            }),
            createWidget('text-editor', {
              editor: '<p>SOHO Duplex menghadirkan ruang 2 lantai yang fleksibel dan efisien. Gabungan sempurna antara studio profesional untuk menyambut klien dan hunian privat yang nyaman di pusat kota Bandung.</p>',
              text_color: '#475569',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 16 },
              typography_line_height: { unit: 'em', size: 1.6 }
            })
          ]
        ),
        createContainer(
          {
            width: { unit: '%', size: 30 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            background_background: 'classic',
            background_color: '#FAF8F5',
            border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            padding: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'Detail Unit SOHO',
              header_size: 'h4',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 16 },
              typography_font_weight: '600'
            }),
            createWidget('text-editor', {
              editor: '<ul style="margin:0; padding-left:18px; font-size:13px; color:#475569; line-height:1.8;"><li><strong>Tipe:</strong> Duplex 2 Lantai</li><li><strong>Kapasitas:</strong> 4 — 12 Orang</li><li><strong>Plafon:</strong> 5.8 Meter Double Height</li><li><strong>Fasilitas:</strong> Kitchenette & Kamar Mandi</li></ul>'
            }),
            createWidget('button', {
              text: 'Dapatkan Info Unit & Harga',
              link: { url: '#find-space' },
              size: 'sm',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 13 },
              typography_font_weight: '700',
              button_text_color: '#FFFFFF',
              background_color: '#EA8E18',
              border_radius: { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true }
            })
          ]
        )
      ]
    ),

    buildGalleryShowcaseSection(images),

    buildCalloutSection(
      'Satu Ruang, Beragam Kemungkinan Bisnis dan Hidup.',
      'Hilangkan waktu terbuang akibat macet di jalan. Bekerja produktif di lantai bawah, beristirahat nyaman di lantai atas — solusi hidup efisien di pusat bisnis Bandung.',
      'Pilihan cerdas untuk founder, profesional mandiri, dan investor properti.'
    ),

    buildFeaturesSection(
      "KEUNGGULAN UNIT SOHO",
      'Dirancang untuk Fleksibilitas Hidup dan Bekerja.',
      features
    ),

    buildMasterFormInquirySection('SOHO')
  ];

  exportElementorTemplate('HQuarters - Space: SOHO Duplex (Indonesian)', elements, 'page-space-soho-id.json');
}

// =========================================================================
// 5. PAGE: SERVICED OFFICE (ID)
// =========================================================================
function generateServicedOfficePage() {
  const images = [
    { src: '/SPACES/SERVICED OFFICE/1.webp' },
    { src: '/SPACES/SERVICED OFFICE/2.webp' },
    { src: '/SPACES/SERVICED OFFICE/3.webp' },
    { src: '/SPACES/SERVICED OFFICE/6.webp' }
  ];

  const features = [
    { title: 'Langsung Pakai Tanpa Renovasi', desc: 'Lengkap dengan meja ergonomis, kursi eksekutif, lemari arsip, dan pendingin ruangan AC inverter.' },
    { title: 'Internet Serat Optik Dedicated', desc: 'Koneksi internet cepat dan stabil dengan backup line untuk kelancaran rapat daring tanpa putus.' },
    { title: 'Layanan Resepsionis Eksekutif', desc: 'Tim front desk menyambut tamu perusahaan Anda secara profesional dan mengelola surat masuk.' },
    { title: 'Gratis Akses Meeting Room', desc: 'Kuota bulanan ruang rapat berfasilitas smart screen untuk presentasi penting bersama klien.' },
    { title: 'Pembersihan Harian & Maintenance', desc: 'Kebersihan suite terjaga setiap hari dan fasilitas utilitas (listrik & air) sudah termasuk.' },
    { title: 'Skema Sewa Sangat Fleksibel', desc: 'Pilihan komitmen fleksibel mulai dari bulanan hingga tahunan tanpa investasi modal awal besar.' }
  ];

  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '0', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '0', left: '16', isLinked: false }
      },
      [
        createWidget('heading', {
          title: '<a href="/" style="color:#64748B; text-decoration:none;">Beranda</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Ruang Usaha</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <span style="color:#EA8E18; font-weight:600;">Serviced Office</span>',
          header_size: 'span',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 13 }
        })
      ]
    ),

    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '24', right: '32', bottom: '24', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: false },
        flex_direction: 'row',
        flex_direction_tablet: 'column',
        flex_direction_mobile: 'column',
        justify_content: 'space-between',
        align_items: 'flex-start',
        flex_gap: { column: '24', row: '24', unit: 'px' }
      },
      [
        createContainer(
          {
            width: { unit: '%', size: 65 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'KANTOR SIAP PAKAI • TURNKEY OFFICE',
              header_size: 'span',
              title_color: '#EA8E18',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 12 },
              typography_font_weight: '700',
              typography_letter_spacing: { unit: 'px', size: 1.5 }
            }),
            createWidget('heading', {
              title: 'Kantor Siap Pakai Beroperasi dalam 24 Jam.',
              header_size: 'h1',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 48 },
              typography_font_size_mobile: { unit: 'px', size: 30 },
              typography_font_weight: '500',
              typography_line_height: { unit: 'em', size: 1.15 }
            }),
            createWidget('text-editor', {
              editor: '<p>Solusi suite kantor privat fully furnished untuk tim yang bergerak cepat. Cukup bawa laptop Anda, seluruh kebutuhan operasional kantor sudah disiapkan secara profesional oleh tim HQuarters.</p>',
              text_color: '#475569',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 16 },
              typography_line_height: { unit: 'em', size: 1.6 }
            })
          ]
        ),
        createContainer(
          {
            width: { unit: '%', size: 30 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            background_background: 'classic',
            background_color: '#FAF8F5',
            border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            padding: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'Paket Serviced Office',
              header_size: 'h4',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 16 },
              typography_font_weight: '600'
            }),
            createWidget('text-editor', {
              editor: '<ul style="margin:0; padding-left:18px; font-size:13px; color:#475569; line-height:1.8;"><li><strong>Kapasitas:</strong> 2 — 20 Workstation</li><li><strong>Fasilitas:</strong> Fully Furnished + AC</li><li><strong>Termasuk:</strong> Resepsionis & Cleaning</li><li><strong>Sewa:</strong> Bulanan / Tahunan</li></ul>'
            }),
            createWidget('button', {
              text: 'Jadwalkan Tur Kantor',
              link: { url: '#find-space' },
              size: 'sm',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 13 },
              typography_font_weight: '700',
              button_text_color: '#FFFFFF',
              background_color: '#EA8E18',
              border_radius: { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true }
            })
          ]
        )
      ]
    ),

    buildGalleryShowcaseSection(images),

    buildCalloutSection(
      'Fokus Pada Pertumbuhan Bisnis, Kami Urus Operasional Kantor Anda.',
      'Tanpa biaya renovasi yang mahal, tanpa repot mengelola tagihan utilitas terpisah, dan tanpa menunggu berminggu-minggu untuk mulai bekerja.',
      'Langsung beroperasi di alamat paling bergengsi di Bandung.'
    ),

    buildFeaturesSection(
      "FASILITAS ALL-INCLUSIVE",
      'Semua Sudah Termasuk Dalam Satu Paket Sewa.',
      features
    ),

    buildMasterFormInquirySection('Serviced Office')
  ];

  exportElementorTemplate('HQuarters - Space: Serviced Office (Indonesian)', elements, 'page-space-serviced-office-id.json');
}

// =========================================================================
// 6. PAGE: VIRTUAL OFFICE (ID)
// =========================================================================
function generateVirtualOfficePage() {
  const features = [
    { title: 'Alamat Bisnis CBD Bergengsi', desc: 'Gunakan Jl. Asia Afrika No. 158 Bandung di kop surat, kartu nama, dan website perusahaan Anda.' },
    { title: 'Legalitas Domicile Letter', desc: 'Surat keterangan domisili resmi gedung untuk kelengkapan izin usaha PT, CV, maupun PMA.' },
    { title: 'Penerimaan & Notifikasi Surat', desc: 'Staf front desk menerima kiriman dokumen dan paket masuk lalu memberi tahu Anda secara instan.' },
    { title: 'Nomor Telepon Khusus Perusahaan', desc: 'Disediakan nomor telepon kantor khusus dengan layanan penjawab profesional atas nama bisnis Anda.' },
    { title: 'Akses Ruang Rapat Eksekutif', desc: 'Gunakan ruang meeting representatif berfasilitas lengkap saat Anda perlu bertemu klien di kantor.' },
    { title: 'Hemat Biaya Operasional 90%', desc: 'Tingkatkan kredibilitas perusahaan tanpa perlu membayar biaya sewa kantor fisik penuh.' }
  ];

  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '0', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '0', left: '16', isLinked: false }
      },
      [
        createWidget('heading', {
          title: '<a href="/" style="color:#64748B; text-decoration:none;">Beranda</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Ruang Usaha</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <span style="color:#EA8E18; font-weight:600;">Virtual Office</span>',
          header_size: 'span',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 13 }
        })
      ]
    ),

    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '24', right: '32', bottom: '40', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '24', left: '16', isLinked: false },
        flex_direction: 'column',
        align_items: 'center',
        text_align: 'center',
        flex_gap: { column: '12', row: '12', unit: 'px' }
      },
      [
        createWidget('heading', {
          title: 'DOMISILI BISNIS & LEGALITAS CBD',
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
          title: 'Bangun Legitimasi Bisnis di Pusat CBD Bandung.',
          header_size: 'h1',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 48 },
          typography_font_size_mobile: { unit: 'px', size: 30 },
          typography_font_weight: '500',
          align: 'center'
        }),
        createWidget('text-editor', {
          editor: '<p style="max-width: 680px; margin: 0 auto;">Dapatkan alamat komersial prestisius di gedung perkantoran Grade A Jl. Asia Afrika No. 158 Bandung untuk meningkatkan rasa percaya klien dan mempercepat perizinan badan usaha.</p>',
          text_color: '#475569',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 16 },
          typography_line_height: { unit: 'em', size: 1.6 },
          align: 'center'
        })
      ]
    ),

    // 3 Virtual Office Packages
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        flex_direction: 'row',
        flex_wrap: 'wrap',
        flex_gap: { column: '24', row: '24', unit: 'px' },
        justify_content: 'space-between',
        padding: { unit: 'px', top: '10', right: '32', bottom: '40', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '10', right: '16', bottom: '24', left: '16', isLinked: false }
      },
      [
        {
          name: 'Paket Silver',
          desc: 'Cocok untuk permulaan bisnis, freelancer, dan pendaftaran domisili usaha baru.',
          features: ['Alamat Bisnis Legal Asia Afrika', 'Penerimaan Surat & Paket', 'Notifikasi Email / WhatsApp', 'Akses Resepsionis Gedung']
        },
        {
          name: 'Paket Gold (Paling Populer)',
          desc: 'Solusi lengkap untuk PT/CV yang membutuhkan kuota ruang rapat dan nomor telepon.',
          features: ['Semua Fitur Paket Silver', 'Nomor Telepon Khusus Perusahaan', 'Penerusan Telepon Profesional', 'Kuota Ruang Rapat 5 Jam/Bulan']
        },
        {
          name: 'Paket Platinum Enterprise',
          desc: 'Paket korporasi maksimal dengan fasilitas meeting room ekstra dan penanganan prioritas.',
          features: ['Semua Fitur Paket Gold', 'Kuota Ruang Rapat 12 Jam/Bulan', 'Papan Nama Perusahaan di Direktori', 'Akses Fasilitas Executive Lounge']
        }
      ].map((pkg, idx) =>
        createContainer(
          {
            width: { unit: '%', size: 31 },
            width_tablet: { unit: '%', size: 48 },
            width_mobile: { unit: '%', size: 100 },
            background_background: 'classic',
            background_color: idx === 1 ? '#FEF3E2' : '#FFFFFF',
            border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: idx === 1 ? '2' : '1', right: idx === 1 ? '2' : '1', bottom: idx === 1 ? '2' : '1', left: idx === 1 ? '2' : '1', isLinked: true },
            border_color: idx === 1 ? '#EA8E18' : '#E2E8F0',
            padding: { unit: 'px', top: '36', right: '32', bottom: '36', left: '32', isLinked: true },
            flex_direction: 'column',
            justify_content: 'space-between',
            flex_gap: { column: '20', row: '20', unit: 'px' }
          },
          [
            createContainer(
              {
                flex_direction: 'column',
                flex_gap: { column: '12', row: '12', unit: 'px' }
              },
              [
                createWidget('heading', {
                  title: pkg.name,
                  header_size: 'h3',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 22 },
                  typography_font_weight: '600'
                }),
                createWidget('text-editor', {
                  editor: `<p>${pkg.desc}</p>`,
                  text_color: '#475569',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: { unit: 'px', size: 13 },
                  typography_line_height: { unit: 'em', size: 1.5 }
                }),
                createWidget('divider', { style: 'solid', color: '#E2E8F0', weight: { unit: 'px', size: 1 } }),
                createContainer(
                  {
                    flex_direction: 'column',
                    flex_gap: { column: '8', row: '8', unit: 'px' }
                  },
                  pkg.features.map((f) =>
                    createContainer(
                      {
                        flex_direction: 'row',
                        align_items: 'center',
                        flex_gap: { column: '8', row: '8', unit: 'px' }
                      },
                      [
                        createWidget('heading', { title: '✓', header_size: 'span', title_color: '#EA8E18', typography_font_size: { unit: 'px', size: 14 } }),
                        createWidget('text-editor', { editor: `<p style="font-size:13px; color:#334155; margin:0;">${f}</p>` })
                      ]
                    )
                  )
                )
              ]
            ),
            createWidget('button', {
              text: 'Pilih Paket Ini →',
              link: { url: '#find-space' },
              size: 'md',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 14 },
              typography_font_weight: '700',
              button_text_color: '#FFFFFF',
              background_color: '#EA8E18',
              border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true }
            })
          ]
        )
      )
    ),

    buildFeaturesSection(
      "LAYANAN TERMASUK",
      'Kemudahan Operasional untuk Kantor Virtual Anda.',
      features
    ),

    buildMasterFormInquirySection('Virtual Office')
  ];

  exportElementorTemplate('HQuarters - Space: Virtual Office (Indonesian)', elements, 'page-space-virtual-office-id.json');
}

// =========================================================================
// 7. PAGE: FUNCTION ROOM (ID)
// =========================================================================
function generateFunctionRoomPage() {
  const images = [
    { src: '/BUILDING/FR 01.webp' },
    { src: '/BUILDING/01.webp' },
    { src: '/BUILDING/02.webp' },
    { src: '/BUILDING/gym 01.webp' }
  ];

  const features = [
    { title: 'Tata Suara & Visual Modern', desc: 'Dilengkapi sound system profesional, mikrofon nirkabel, dan layar proyektor resolusi tinggi.' },
    { title: 'Konfigurasi Kursi Fleksibel', desc: 'Dapat ditata dalam format Theater, Classroom, Round Table Banquet, ataupun U-Shape Boardroom.' },
    { title: 'Layanan Katering & F&B', desc: 'Tersedia paket coffee break, makan siang prasmanan, dan jamuan makan malam formal.' },
    { title: 'Parkir Otomatis Berkapasitas Luas', desc: 'Memudahkan akses dan keamanan kendaraan bagi seluruh tamu dan peserta acara Anda.' },
    { title: 'Pusat Bisnis Strategis', desc: 'Lokasi Jl. Asia Afrika yang mudah dijangkau dari stasiun kereta api dan hotel berbintang di Bandung.' },
    { title: 'Dukungan Tim Event Khusus', desc: 'Staf teknis dan operasional profesional siaga memastikan kelancaran acara Anda dari awal hingga akhir.' }
  ];

  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '0', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '0', left: '16', isLinked: false }
      },
      [
        createWidget('heading', {
          title: '<a href="/" style="color:#64748B; text-decoration:none;">Beranda</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <a href="/spaces" style="color:#64748B; text-decoration:none;">Ruang Usaha</a> <span style="color:#CBD5E1; margin:0 8px;">›</span> <span style="color:#EA8E18; font-weight:600;">Ruang Acara (Function Room)</span>',
          header_size: 'span',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 13 }
        })
      ]
    ),

    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '24', right: '32', bottom: '24', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: false },
        flex_direction: 'row',
        flex_direction_tablet: 'column',
        flex_direction_mobile: 'column',
        justify_content: 'space-between',
        align_items: 'flex-start',
        flex_gap: { column: '24', row: '24', unit: 'px' }
      },
      [
        createContainer(
          {
            width: { unit: '%', size: 65 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'VENUE ACARA & PERTEMUAN KORPORASI',
              header_size: 'span',
              title_color: '#EA8E18',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 12 },
              typography_font_weight: '700',
              typography_letter_spacing: { unit: 'px', size: 1.5 }
            }),
            createWidget('heading', {
              title: 'Rencanakan Acara Korporasi di Lokasi Paling Prestisius.',
              header_size: 'h1',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 48 },
              typography_font_size_mobile: { unit: 'px', size: 30 },
              typography_font_weight: '500',
              typography_line_height: { unit: 'em', size: 1.15 }
            }),
            createWidget('text-editor', {
              editor: '<p>Function Room HQuarters menyediakan ruang pertemuan representatif dan fleksibel untuk seminar bisnis, rapat umum pemegang saham (RUPS), peluncuran produk, hingga jamuan makan malam resmi.</p>',
              text_color: '#475569',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 16 },
              typography_line_height: { unit: 'em', size: 1.6 }
            })
          ]
        ),
        createContainer(
          {
            width: { unit: '%', size: 30 },
            width_tablet: { unit: '%', size: 100 },
            width_mobile: { unit: '%', size: 100 },
            background_background: 'classic',
            background_color: '#FAF8F5',
            border_radius: { unit: 'px', top: '16', right: '16', bottom: '16', left: '16', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            padding: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
            flex_direction: 'column',
            flex_gap: { column: '12', row: '12', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'Kapasitas Ruang',
              header_size: 'h4',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 16 },
              typography_font_weight: '600'
            }),
            createWidget('text-editor', {
              editor: '<ul style="margin:0; padding-left:18px; font-size:13px; color:#475569; line-height:1.8;"><li><strong>Kapasitas:</strong> Hingga 150+ Peserta</li><li><strong>Audio Visual:</strong> 4K Display & Wireless Mic</li><li><strong>Layout:</strong> Theater, Banquet, U-Shape</li><li><strong>Katering:</strong> Tersedia Paket F&B</li></ul>'
            }),
            createWidget('button', {
              text: 'Reservasi Tanggal Acara',
              link: { url: '#find-space' },
              size: 'sm',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 13 },
              typography_font_weight: '700',
              button_text_color: '#FFFFFF',
              background_color: '#EA8E18',
              border_radius: { unit: 'px', top: '10', right: '10', bottom: '10', left: '10', isLinked: true }
            })
          ]
        )
      ]
    ),

    buildGalleryShowcaseSection(images),

    buildCalloutSection(
      'Kesan Acara yang Mewah, Nyaman, dan Tak Terlupakan.',
      'Sambut kolega dan rekan bisnis Anda dalam atmosfer gedung modern dengan akses mudah dan layanan berstandar internasional.',
      'Jadikan setiap momentum pertemuan bisnis Anda berjalan sukses sempurna.'
    ),

    buildFeaturesSection(
      "FASILITAS ACARA LENGKAP",
      'Didukung Peralatan & Layanan Terbaik.',
      features
    ),

    buildMasterFormInquirySection('Function Room')
  ];

  exportElementorTemplate('HQuarters - Space: Function Room (Indonesian)', elements, 'page-space-function-room-id.json');
}

// =========================================================================
// 8. PAGE: BUILDING (ID)
// =========================================================================
function generateBuildingPage() {
  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '40', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '24', left: '16', isLinked: false },
        flex_direction: 'column',
        align_items: 'center',
        text_align: 'center',
        flex_gap: { column: '12', row: '12', unit: 'px' }
      },
      [
        createWidget('heading', {
          title: 'ARSITEKTUR & FASILITAS GEDUNG',
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
          title: 'Tower Komersial 21 Lantai dengan Standar Mutu Tertinggi.',
          header_size: 'h1',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 48 },
          typography_font_size_mobile: { unit: 'px', size: 30 },
          typography_font_weight: '500',
          align: 'center'
        }),
        createWidget('text-editor', {
          editor: '<p style="max-width: 680px; margin: 0 auto;">HQuarters Business Residence memadukan efisiensi teknik modern, sistem keamanan berlapis, dan fasilitas gaya hidup premium untuk menghadirkan pengalaman kerja terbaik di Bandung.</p>',
          text_color: '#475569',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 16 },
          typography_line_height: { unit: 'em', size: 1.6 },
          align: 'center'
        })
      ]
    ),

    // 4 Key Building Features Cards
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        flex_direction: 'column',
        padding: { unit: 'px', top: '10', right: '32', bottom: '60', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '10', right: '16', bottom: '40', left: '16', isLinked: false },
        flex_gap: { column: '36', row: '36', unit: 'px' }
      },
      [
        {
          title: 'Sistem Parkir Mekanikal Otomatis (Automated Parking)',
          desc: 'Teknologi parkir vertikal otomatis canggih yang memberikan keamanan maksimal untuk kendaraan Anda serta memangkas waktu tunggu parkir secara signifikan.',
          img: '/BUILDING/02.webp'
        },
        {
          title: 'Keamanan 24 Jam & Sistem Akses Berlapis',
          desc: 'Integrasi pengawasan kamera CCTV beresolusi tinggi di setiap lantai publik, pembatasan akses lift menggunakan kartu pintar, dan pengawalan staf sekuriti 24 jam nonstop.',
          img: '/BUILDING/01.webp'
        },
        {
          title: 'Fasilitas Kebugaran & Wellness Eksklusif',
          desc: 'Manjakan diri Anda dan tim setelah jam kerja dengan fitness center modern, sauna hangat relaksasi, dan kolam renang air hangat dengan pemandangan kota Bandung.',
          img: '/BUILDING/kolam renang 5_4.webp'
        },
        {
          title: 'Infrastruktur Rekayasa & Listrik Cadangan 100%',
          desc: 'Dilengkapi generator genset cadangan penuh 100%, sistem proteksi kebakaran mutakhir, dan manajemen pengelolaan limbah gedung ramah lingkungan.',
          img: '/BUILDING/gym 01.webp'
        }
      ].map((bld, idx) =>
        createContainer(
          {
            content_width: 'full',
            flex_direction: idx % 2 === 0 ? 'row' : 'row-reverse',
            flex_direction_tablet: 'column',
            flex_direction_mobile: 'column',
            background_background: 'classic',
            background_color: '#FFFFFF',
            border_radius: { unit: 'px', top: '28', right: '28', bottom: '28', left: '28', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            overflow: 'hidden',
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 8, blur: 24, spread: 0, color: 'rgba(0,0,0,0.04)' }
          },
          [
            createContainer(
              {
                width: { unit: '%', size: 50 },
                width_tablet: { unit: '%', size: 100 },
                width_mobile: { unit: '%', size: 100 },
                min_height: { unit: 'px', size: 380 },
                min_height_mobile: { unit: 'px', size: 240 },
                background_background: 'classic',
                background_image: { url: bld.img },
                background_position: 'center center',
                background_size: 'cover'
              },
              []
            ),
            createContainer(
              {
                width: { unit: '%', size: 50 },
                width_tablet: { unit: '%', size: 100 },
                width_mobile: { unit: '%', size: 100 },
                padding: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40', isLinked: true },
                padding_mobile: { unit: 'px', top: '28', right: '20', bottom: '28', left: '20', isLinked: true },
                flex_direction: 'column',
                justify_content: 'center',
                flex_gap: { column: '16', row: '16', unit: 'px' }
              },
              [
                createWidget('heading', {
                  title: bld.title,
                  header_size: 'h2',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 26 },
                  typography_font_weight: '500'
                }),
                createWidget('text-editor', {
                  editor: `<p>${bld.desc}</p>`,
                  text_color: '#475569',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: { unit: 'px', size: 15 },
                  typography_line_height: { unit: 'em', size: 1.6 }
                })
              ]
            )
          ]
        )
      )
    ),

    buildBottomCTASection(
      'Ingin Mengunjungi Langsung ',
      'Gedung HQuarters?',
      'Jadwalkan survei lokasi bersama tim manajemen kami untuk melihat langsung seluruh infrastruktur dan fasilitas gedung.',
      'Jadwalkan Kunjungan Lokasi',
      '/find-space'
    )
  ];

  exportElementorTemplate('HQuarters - Gedung & Fasilitas (Indonesian)', elements, 'page-building-id.json');
}

// =========================================================================
// 9. PAGE: LOCATION (ID)
// =========================================================================
function generateLocationPage() {
  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '40', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '24', left: '16', isLinked: false },
        flex_direction: 'column',
        align_items: 'center',
        text_align: 'center',
        flex_gap: { column: '12', row: '12', unit: 'px' }
      },
      [
        createWidget('heading', {
          title: 'LOKASI STRATEGIS CBD BANDUNG',
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
          title: 'Jantung Finansial & Bisnis di Jl. Asia Afrika No. 158.',
          header_size: 'h1',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 48 },
          typography_font_size_mobile: { unit: 'px', size: 30 },
          typography_font_weight: '500',
          align: 'center'
        }),
        createWidget('text-editor', {
          editor: '<p style="max-width: 680px; margin: 0 auto;">Kawasan paling bersejarah dan bernilai ekonomi tinggi di Jawa Barat. Dikelilingi kantor pusat perbankan, hotel bintang 5 ternama, dan pusat kuliner premium.</p>',
          text_color: '#475569',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 16 },
          typography_line_height: { unit: 'em', size: 1.6 },
          align: 'center'
        })
      ]
    ),

    // Vicinity Grid (4 Cards)
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        flex_direction: 'row',
        flex_wrap: 'wrap',
        flex_gap: { column: '24', row: '24', unit: 'px' },
        justify_content: 'space-between',
        padding: { unit: 'px', top: '10', right: '32', bottom: '40', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '10', right: '16', bottom: '24', left: '16', isLinked: false }
      },
      [
        { time: '5 Menit', title: 'Stasiun Kereta Cepat & Stasiun Bandung', desc: 'Akses cepat menuju mobilitas antarkota dan transit Jakarta - Bandung.' },
        { time: '10 Menit', title: 'Pintu Tol Pasteur & Pasir Koja', desc: 'Koneksi langsung menuju jalan tol utama keluar-masuk kota Bandung.' },
        { time: '1 Menit', title: 'Pusat Perbankan & Finansial', desc: 'Dikelilingi kantor wilayah Bank Indonesia, BCA, Mandiri, BNI, dan BRI.' },
        { time: '3 Menit', title: 'Hotel Berbintang & Pusat Kuliner', desc: 'Dekat dengan Hotel Savoy Homann, Ibis, Braga Citywalk, dan restoran ternama.' }
      ].map((item) =>
        createContainer(
          {
            width: { unit: '%', size: 23 },
            width_tablet: { unit: '%', size: 48 },
            width_mobile: { unit: '%', size: 100 },
            background_background: 'classic',
            background_color: '#FAF8F5',
            border_radius: { unit: 'px', top: '20', right: '20', bottom: '20', left: '20', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            padding: { unit: 'px', top: '28', right: '24', bottom: '28', left: '24', isLinked: true },
            flex_direction: 'column',
            flex_gap: { column: '8', row: '8', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: item.time,
              header_size: 'span',
              title_color: '#EA8E18',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 20 },
              typography_font_weight: '700'
            }),
            createWidget('heading', {
              title: item.title,
              header_size: 'h3',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 16 },
              typography_font_weight: '600'
            }),
            createWidget('text-editor', {
              editor: `<p style="font-size:13px; color:#64748B; margin:0;">${item.desc}</p>`
            })
          ]
        )
      )
    ),

    buildBottomCTASection(
      'Kunjungi Kantor Representatif Kami di ',
      'Asia Afrika Bandung.',
      'Dapatkan panduan arah dan jadwal janji temu dengan tim manajemen HQuarters sekarang.',
      'Panduan Rute & Janji Temu',
      '/find-space'
    )
  ];

  exportElementorTemplate('HQuarters - Lokasi Strategis (Indonesian)', elements, 'page-location-id.json');
}

// =========================================================================
// 10. PAGE: COMPANIES (ID)
// =========================================================================
function generateCompaniesPage() {
  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '40', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '24', left: '16', isLinked: false },
        flex_direction: 'column',
        align_items: 'center',
        text_align: 'center',
        flex_gap: { column: '12', row: '12', unit: 'px' }
      },
      [
        createWidget('heading', {
          title: 'KOMUNITAS & EKOSISTEM BISNIS',
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
          title: 'Ekosistem Perusahaan Terkemuka di HQuarters.',
          header_size: 'h1',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 48 },
          typography_font_size_mobile: { unit: 'px', size: 30 },
          typography_font_weight: '500',
          align: 'center'
        }),
        createWidget('text-editor', {
          editor: '<p style="max-width: 680px; margin: 0 auto;">Bergabunglah dengan jaringan perusahaan nasional, multinasional, firma profesional, dan startup inovatif yang telah mempercayakan ruang kerjanya di HQuarters Bandung.</p>',
          text_color: '#475569',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 16 },
          typography_line_height: { unit: 'em', size: 1.6 },
          align: 'center'
        })
      ]
    ),

    buildBottomCTASection(
      'Jadilah Bagian dari Komunitas Korporasi ',
      'HQuarters Bandung.',
      'Perluas jejaring bisnis Anda dan nikmati lingkungan kerja yang kolaboratif dan prestisius.',
      'Bergabung Bersama Kami',
      '/find-space'
    )
  ];

  exportElementorTemplate('HQuarters - Komunitas Perusahaan (Indonesian)', elements, 'page-companies-id.json');
}

// =========================================================================
// 11. PAGE: INSIGHTS (ID)
// =========================================================================
function generateInsightsPage() {
  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '40', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '24', left: '16', isLinked: false },
        flex_direction: 'column',
        align_items: 'center',
        text_align: 'center',
        flex_gap: { column: '12', row: '12', unit: 'px' }
      },
      [
        createWidget('heading', {
          title: 'ARTIKEL & WAWASAN BISNIS',
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
          title: 'Wawasan Properti & Perspektif Bisnis Terkini.',
          header_size: 'h1',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 48 },
          typography_font_size_mobile: { unit: 'px', size: 30 },
          typography_font_weight: '500',
          align: 'center'
        })
      ]
    ),

    buildBottomCTASection(
      'Ikuti Perkembangan Tren Properti & Bisnis Bersama ',
      'HQuarters.',
      'Dapatkan update artikel terbaru seputar peluang investasi dan strategi pemilihan ruang kantor langsung ke email Anda.',
      'Konsultasi Bersama Tim',
      '/find-space'
    )
  ];

  exportElementorTemplate('HQuarters - Artikel & Wawasan (Indonesian)', elements, 'page-insights-id.json');
}

// =========================================================================
// 12. PAGE: FIND SPACE STANDALONE (ID)
// =========================================================================
function generateFindSpaceStandalonePage() {
  const elements = [
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '20', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '16', left: '16', isLinked: false },
        flex_direction: 'column',
        align_items: 'center',
        text_align: 'center',
        flex_gap: { column: '12', row: '12', unit: 'px' }
      },
      [
        createWidget('heading', {
          title: 'PENASIHAT RUANG KERJA',
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
          title: 'Temukan Ruang Usaha yang Sesuai dengan Kebutuhan Anda.',
          header_size: 'h1',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 48 },
          typography_font_size_mobile: { unit: 'px', size: 30 },
          typography_font_weight: '500',
          align: 'center'
        }),
        createWidget('text-editor', {
          editor: '<p style="max-width: 680px; margin: 0 auto;">Pilih format ruang kerja di bawah ini dan lengkapi informasi kontak Anda untuk menerima proposal resmi dan denah unit dari konsultan HQuarters.</p>',
          text_color: '#475569',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 16 },
          typography_line_height: { unit: 'em', size: 1.6 },
          align: 'center'
        })
      ]
    ),

    buildMasterFormInquirySection('Premium Office')
  ];

  exportElementorTemplate('HQuarters - Cari Ruang Usaha (Indonesian)', elements, 'page-find-space-id.json');
}

// =========================================================================
// 1. HOMEPAGE (ID)
// =========================================================================
function generateHomepage() {
  const elements = [
    // 1. Hero Section (White Overlay left, building right, dark on mobile)
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '80', right: '32', bottom: '16', left: '32', isLinked: false },
        padding_tablet: { unit: 'px', top: '60', right: '24', bottom: '16', left: '24', isLinked: false },
        padding_mobile: { unit: 'px', top: '32', right: '16', bottom: '16', left: '16', isLinked: false }
      },
      [
        createContainer(
          {
            content_width: 'full',
            width: { unit: '%', size: 100 },
            min_height: { unit: 'px', size: 680 },
            min_height_tablet: { unit: 'px', size: 600 },
            min_height_mobile: { unit: 'px', size: 560 },
            flex_direction: 'row',
            flex_direction_tablet: 'column',
            flex_direction_mobile: 'column',
            justify_content: 'flex-start',
            justify_content_mobile: 'flex-end',
            align_items: 'center',
            align_items_mobile: 'flex-start',
            border_radius: { unit: 'px', top: '48', right: '48', bottom: '48', left: '48', isLinked: true },
            border_radius_mobile: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            overflow: 'hidden',
            background_background: 'classic',
            background_image: { url: '/BUILDING/ChatGPT Image Jul 29, 2026, 03_09_51 PM-800.webp' },
            background_position: 'right center',
            background_position_mobile: 'center center',
            background_size: 'cover',
            background_overlay_background: 'gradient',
            background_overlay_color: '#FFFFFF',
            background_overlay_color_b: 'rgba(255, 255, 255, 0)',
            background_overlay_gradient_type: 'linear',
            background_overlay_gradient_angle: { unit: 'deg', size: 90 },
            background_overlay_gradient_angle_mobile: { unit: 'deg', size: 0 },
            padding: { unit: 'px', top: '64', right: '64', bottom: '64', left: '64', isLinked: false },
            padding_mobile: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20', isLinked: false }
          },
          [
            createContainer(
              {
                width: { unit: '%', size: 55 },
                width_tablet: { unit: '%', size: 75 },
                width_mobile: { unit: '%', size: 100 },
                flex_direction: 'column',
                flex_gap: { column: '24', row: '24', unit: 'px' }
              },
              [
                createWidget('heading', {
                  title: 'Ruang Usaha untuk Setiap <br><span style="color:#EA8E18;">Tahap Perkembangan Bisnis Anda.</span>',
                  header_size: 'h1',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 58 },
                  typography_font_size_tablet: { unit: 'px', size: 44 },
                  typography_font_size_mobile: { unit: 'px', size: 30 },
                  typography_font_weight: '500',
                  typography_line_height: { unit: 'em', size: 1.12 }
                }),
                createWidget('text-editor', {
                  editor: '<p>Mulai dari domisili bisnis pertama hingga kantor pusat korporasi, HQuarters menyediakan ruang untuk memulai, bekerja, memiliki, dan berkembang — di pusat CBD Asia Afrika, Bandung.</p>',
                  text_color: '#475569',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: { unit: 'px', size: 16 },
                  typography_font_size_mobile: { unit: 'px', size: 14 },
                  typography_line_height: { unit: 'em', size: 1.6 }
                }),
                createContainer(
                  {
                    flex_direction: 'row',
                    flex_direction_mobile: 'column',
                    flex_gap: { column: '14', row: '14', unit: 'px' }
                  },
                  [
                    createWidget('button', {
                      text: 'Jelajahi Ruang Usaha',
                      link: { url: '/spaces' },
                      size: 'md',
                      typography_typography: 'custom',
                      typography_font_family: 'Plus Jakarta Sans',
                      typography_font_size: { unit: 'px', size: 15 },
                      typography_font_weight: '700',
                      button_text_color: '#FFFFFF',
                      background_color: '#EA8E18',
                      border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
                      padding: { unit: 'px', top: '14', right: '28', bottom: '14', left: '28', isLinked: true }
                    }),
                    createWidget('button', {
                      text: 'Kunjungi HQuarters',
                      link: { url: '/find-space' },
                      size: 'md',
                      typography_typography: 'custom',
                      typography_font_family: 'Plus Jakarta Sans',
                      typography_font_size: { unit: 'px', size: 15 },
                      typography_font_weight: '700',
                      button_text_color: '#1E293B',
                      background_color: '#FFFFFF',
                      border_border: 'solid',
                      border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                      border_color: '#CBD5E1',
                      border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
                      padding: { unit: 'px', top: '14', right: '28', bottom: '14', left: '28', isLinked: true }
                    })
                  ]
                ),
                createContainer(
                  {
                    flex_direction: 'row',
                    align_items: 'center',
                    flex_gap: { column: '10', row: '10', unit: 'px' }
                  },
                  [
                    createWidget('heading', {
                      title: '★★★★★',
                      header_size: 'span',
                      title_color: '#EA8E18',
                      typography_typography: 'custom',
                      typography_font_size: { unit: 'px', size: 16 }
                    }),
                    createWidget('heading', {
                      title: 'Dipercayai oleh Perusahaan Nasional & Multinasional Terkemuka',
                      header_size: 'span',
                      title_color: '#475569',
                      typography_typography: 'custom',
                      typography_font_family: 'Plus Jakarta Sans',
                      typography_font_size: { unit: 'px', size: 13 },
                      typography_font_weight: '500'
                    })
                  ]
                )
              ]
            )
          ]
        )
      ]
    ),

    // 2. Business Journey (4 Cards: Start, Work, Own, Grow)
    createContainer(
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
              title: 'SOLUSI PERJALANAN USAHA',
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
              title: 'Di Manakah Posisi Bisnis Anda Saat Ini?',
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
            flex_gap: { column: '20', row: '20', unit: 'px' },
            justify_content: 'space-between'
          },
          [
            { badge: 'MULAI DI SINI', title: 'Virtual Office', desc: 'Alamat bisnis legal bergengsi di CBD Bandung dengan penanganan surat dan penerimaan telepon.', link: '/spaces/virtual-office', bg: '/SPACES/SERVICED OFFICE/6.webp' },
            { badge: 'BEKERJA DI SINI', title: 'Serviced Office', desc: 'Suite kantor fully furnished siap pakai dalam 24 jam dengan internet fiber dan ruang meeting.', link: '/spaces/serviced-office', bg: '/SPACES/SERVICED OFFICE/1.webp' },
            { badge: 'MILIKI DI SINI', title: 'SOHO Duplex', desc: 'Unit duplex fleksibel 2 lantai untuk hunian modern sekaligus studio kerja representatif.', link: '/spaces/soho', bg: '/SPACES/SOHO/SOHO 01.webp' },
            { badge: 'BERKEMBANG DI SINI', title: 'Premium Office', desc: 'Lantai kantor korporasi skala penuh di pusat finansial dengan standar arsitektur grade-A.', link: '/spaces/premium-office', bg: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp' }
          ].map((card) =>
            createContainer(
              {
                width: { unit: '%', size: 23 },
                width_tablet: { unit: '%', size: 48 },
                width_mobile: { unit: '%', size: 100 },
                min_height: { unit: 'px', size: 380 },
                border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
                overflow: 'hidden',
                background_background: 'classic',
                background_image: { url: card.bg },
                background_position: 'center center',
                background_size: 'cover',
                background_overlay_background: 'classic',
                background_overlay_color: 'rgba(15, 23, 42, 0.70)',
                padding: { unit: 'px', top: '28', right: '24', bottom: '28', left: '24', isLinked: true },
                flex_direction: 'column',
                justify_content: 'space-between'
              },
              [
                createWidget('heading', {
                  title: card.badge,
                  header_size: 'span',
                  title_color: '#FFFFFF',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 10 },
                  typography_font_weight: '800',
                  typography_letter_spacing: { unit: 'px', size: 1 },
                  _custom_css: 'selector { display: inline-block; background: #EA8E18; padding: 4px 10px; border-radius: 6px; width: fit-content; }'
                }),
                createContainer(
                  {
                    flex_direction: 'column',
                    flex_gap: { column: '12', row: '12', unit: 'px' }
                  },
                  [
                    createWidget('heading', {
                      title: card.title,
                      header_size: 'h3',
                      title_color: '#FFFFFF',
                      typography_typography: 'custom',
                      typography_font_family: 'Outfit',
                      typography_font_size: { unit: 'px', size: 22 },
                      typography_font_weight: '500'
                    }),
                    createWidget('text-editor', {
                      editor: `<p>${card.desc}</p>`,
                      text_color: '#CBD5E1',
                      typography_typography: 'custom',
                      typography_font_family: 'Plus Jakarta Sans',
                      typography_font_size: { unit: 'px', size: 13 },
                      typography_line_height: { unit: 'em', size: 1.5 }
                    }),
                    createWidget('button', {
                      text: 'Lihat Detail Ruang →',
                      link: { url: card.link },
                      size: 'xs',
                      typography_typography: 'custom',
                      typography_font_family: 'Plus Jakarta Sans',
                      typography_font_size: { unit: 'px', size: 13 },
                      typography_font_weight: '700',
                      button_text_color: '#FFFFFF',
                      background_color: 'rgba(255, 255, 255, 0.15)',
                      border_border: 'solid',
                      border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
                      border_color: 'rgba(255, 255, 255, 0.3)',
                      border_radius: { unit: 'px', top: '8', right: '8', bottom: '8', left: '8', isLinked: true },
                      padding: { unit: 'px', top: '8', right: '14', bottom: '8', left: '14', isLinked: true }
                    })
                  ]
                )
              ]
            )
          )
        )
      ]
    ),

    // 3. Address Statement Card
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '40', left: '16', isLinked: false }
      },
      [
        createContainer(
          {
            content_width: 'full',
            background_background: 'classic',
            background_color: '#FAF8F5',
            border_radius: { unit: 'px', top: '36', right: '36', bottom: '36', left: '36', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            padding: { unit: 'px', top: '64', right: '48', bottom: '64', left: '48', isLinked: true },
            padding_mobile: { unit: 'px', top: '40', right: '20', bottom: '40', left: '20', isLinked: true },
            flex_direction: 'column',
            align_items: 'center',
            text_align: 'center',
            flex_gap: { column: '20', row: '20', unit: 'px' }
          },
          [
            createWidget('heading', {
              title: 'LOKASI CBD ASIA AFRIKA',
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
              title: 'Alamat Kantor Anda Menentukan Kredibilitas Bisnis Anda.',
              header_size: 'h2',
              title_color: '#0F172A',
              typography_typography: 'custom',
              typography_font_family: 'Outfit',
              typography_font_size: { unit: 'px', size: 38 },
              typography_font_size_mobile: { unit: 'px', size: 26 },
              typography_font_weight: '500',
              align: 'center'
            }),
            createWidget('text-editor', {
              editor: '<p style="max-width: 680px; margin: 0 auto;">Berlokasi strategis di Jl. Asia Afrika No. 158 Bandung — pusat perbankan, perhotelan bintang lima, dan denyut bisnis Jawa Barat. Menghadirkan prestise instan di mata klien dan investor.</p>',
              text_color: '#475569',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 16 },
              typography_line_height: { unit: 'em', size: 1.6 },
              align: 'center'
            }),
            createWidget('button', {
              text: 'Jelajahi Lokasi Strategis',
              link: { url: '/location' },
              size: 'md',
              typography_typography: 'custom',
              typography_font_family: 'Plus Jakarta Sans',
              typography_font_size: { unit: 'px', size: 14 },
              typography_font_weight: '700',
              button_text_color: '#FFFFFF',
              background_color: '#EA8E18',
              border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
              padding: { unit: 'px', top: '12', right: '28', bottom: '12', left: '28', isLinked: true }
            })
          ]
        )
      ]
    ),

    // 4. Building Highlights (3 Bento Cards)
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        flex_direction: 'column',
        padding: { unit: 'px', top: '40', right: '32', bottom: '60', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '24', right: '16', bottom: '40', left: '16', isLinked: false },
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
              title: 'KEUNGGULAN GEDUNG',
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
              title: 'Seluruh Fasilitas Dirancang untuk Keunggulan Korporasi.',
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
          [
            { title: 'Sistem Parkir Otomatis', desc: 'Sistem parkir mekanikal modern vertikal yang cepat, aman, dan efisien untuk kenyamanan harian Anda dan tamu perusahaan.', bg: '/BUILDING/02.webp' },
            { title: 'Keamanan 24 Jam & Akses Berlapis', desc: 'Pengawasan CCTV terpadu, kontrol akses kartu pintar di setiap zona, dan tim sekuriti profesional siaga penuh.', bg: '/BUILDING/01.webp' },
            { title: 'Fasilitas Kebugaran & Relaksasi', desc: 'Pusat kebugaran fitness modern, sauna privat, dan heated swimming pool eksklusif di dalam satu gedung.', bg: '/BUILDING/kolam renang 5_4.webp' }
          ].map((card) =>
            createContainer(
              {
                width: { unit: '%', size: 31 },
                width_tablet: { unit: '%', size: 48 },
                width_mobile: { unit: '%', size: 100 },
                min_height: { unit: 'px', size: 360 },
                border_radius: { unit: 'px', top: '24', right: '24', bottom: '24', left: '24', isLinked: true },
                overflow: 'hidden',
                background_background: 'classic',
                background_image: { url: card.bg },
                background_position: 'center center',
                background_size: 'cover',
                background_overlay_background: 'classic',
                background_overlay_color: 'rgba(15, 23, 42, 0.65)',
                padding: { unit: 'px', top: '32', right: '28', bottom: '32', left: '28', isLinked: true },
                flex_direction: 'column',
                justify_content: 'flex-end',
                flex_gap: { column: '10', row: '10', unit: 'px' }
              },
              [
                createWidget('heading', {
                  title: card.title,
                  header_size: 'h3',
                  title_color: '#FFFFFF',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 22 },
                  typography_font_weight: '500'
                }),
                createWidget('text-editor', {
                  editor: `<p>${card.desc}</p>`,
                  text_color: '#E2E8F0',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: { unit: 'px', size: 13 },
                  typography_line_height: { unit: 'em', size: 1.5 }
                })
              ]
            )
          )
        )
      ]
    ),

    // 5. Bottom CTA
    buildBottomCTASection(
      'Mulai Langkah Sukses Perusahaan Anda di ',
      'HQuarters Bandung.',
      'Hubungi tim representatif kami untuk mendapatkan denah lantai lengkap, estimasi biaya, atau jadwalkan survei unit secara langsung.',
      'Hubungi Tim HQuarters',
      '/find-space'
    )
  ];

  exportElementorTemplate('HQuarters - Beranda (Indonesian)', elements, 'homepage-id.json');
}

// =========================================================================
// 2. SPACES HUB PAGE (ID)
// =========================================================================
function generateSpacesHubPage() {
  const elements = [
    // Header Intro
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        flex_direction: 'column',
        padding: { unit: 'px', top: '80', right: '32', bottom: '30', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '40', right: '16', bottom: '20', left: '16', isLinked: false },
        align_items: 'center',
        text_align: 'center',
        flex_gap: { column: '12', row: '12', unit: 'px' }
      },
      [
        createWidget('heading', {
          title: 'PILIHAN RUANG USAHA',
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
          title: 'Ruang yang Dirancang untuk Setiap Skala Bisnis.',
          header_size: 'h1',
          title_color: '#0F172A',
          typography_typography: 'custom',
          typography_font_family: 'Outfit',
          typography_font_size: { unit: 'px', size: 48 },
          typography_font_size_mobile: { unit: 'px', size: 30 },
          typography_font_weight: '500',
          align: 'center'
        }),
        createWidget('text-editor', {
          editor: '<p style="max-width: 650px; margin: 0 auto;">Pilih ruang kerja yang paling sesuai dengan kebutuhan operasional, jumlah tim, dan target pertumbuhan perusahaan Anda.</p>',
          text_color: '#475569',
          typography_typography: 'custom',
          typography_font_family: 'Plus Jakarta Sans',
          typography_font_size: { unit: 'px', size: 16 },
          typography_line_height: { unit: 'em', size: 1.6 },
          align: 'center'
        })
      ]
    ),

    // 5 Spaces Cards (Vertical stack with photo & specs)
    createContainer(
      {
        content_width: 'boxed',
        boxed_width: { unit: 'px', size: 1440 },
        flex_direction: 'column',
        padding: { unit: 'px', top: '20', right: '32', bottom: '60', left: '32', isLinked: false },
        padding_mobile: { unit: 'px', top: '16', right: '16', bottom: '40', left: '16', isLinked: false },
        flex_gap: { column: '40', row: '40', unit: 'px' }
      },
      [
        {
          badge: 'KORPORASI & KANTOR PUSAT',
          title: 'Premium Office',
          desc: 'Lantai ruang kantor skala besar dengan spesifikasi korporat penuh di koridor finansial Jl. Asia Afrika. Pilihan ideal untuk kantor pusat, perbankan, dan perusahaan multinasional.',
          specs: ['Kapasitas: 10 — 150+ Orang', 'Luas: 60 m² — 500+ m²', 'Status: Bare / Custom Fit-out', 'Akses: 24/7 Dedicated Access'],
          bg: '/SPACES/PREMIUM OFFICE/Premium Office 06.webp',
          link: '/spaces/premium-office'
        },
        {
          badge: 'HUNIAN & KANTOR FLEKSIBEL',
          title: 'SOHO Duplex',
          desc: 'Konsep Small Office Home Office dengan plafon double-height tinggi dan mezzanine. Fleksibel untuk studio kreatif, firma hukum, kantor konsultan, ataupun tempat tinggal profesional. #FleksibelAja',
          specs: ['Kapasitas: 4 — 12 Orang', 'Tipe: Duplex 2 Lantai', 'Fitur: Kamar Mandi & Pantry Privat', 'Kepemilikan: Strata Title / Sewa'],
          bg: '/SPACES/SOHO/SOHO 01.webp',
          link: '/spaces/soho'
        },
        {
          badge: 'SIAP PAKAI 24 JAM',
          title: 'Serviced Office',
          desc: 'Suite kantor siap pakai fully furnished dengan perabot ergonomis, koneksi internet serat optik kecepatan tinggi, layanan resepsionis, dan akses meeting room gratis.',
          specs: ['Kapasitas: 1 — 20 Orang', 'Fasilitas: Fully Furnished + AC', 'Termasuk: Resepsionis & Kebersihan', 'Durasi: Fleksibel Bulanan / Tahunan'],
          bg: '/SPACES/SERVICED OFFICE/1.webp',
          link: '/spaces/serviced-office'
        },
        {
          badge: 'LEGALITAS & PRESTISE CBD',
          title: 'Virtual Office',
          desc: 'Dapatkan domisili bisnis legal di alamat bergengsi Jl. Asia Afrika No. 158 Bandung. Lengkap dengan layanan penerimaan surat, nomor telepon khusus, dan kuota ruang rapat.',
          specs: ['Domisili: Gedung Grade A Asia Afrika', 'Layanan: Penerimaan Surat & Dokumen', 'Fasilitas: Akses Meeting Room', 'Legalitas: Cocok untuk PT / CV / PMA'],
          bg: '/SPACES/SERVICED OFFICE/6.webp',
          link: '/spaces/virtual-office'
        },
        {
          badge: 'ACARA KORPORASI & SEMINAR',
          title: 'Ruang Acara (Function Room)',
          desc: 'Venue pertemuan dan ruang acara multifungsi berkapasitas besar dengan tata audio-visual mutakhir. Siap untuk rapat dewan direksi, seminar bisnis, peluncuran produk, dan jamuan makan.',
          specs: ['Kapasitas: Hingga 150+ Peserta', 'Konfigurasi: Theater, Classroom, Banquet', 'Perlengkapan: Proyektor 4K & Sound System', 'Katering: Tersedia Paket F&B'],
          bg: '/BUILDING/FR 01.webp',
          link: '/spaces/function-room'
        }
      ].map((space, idx) =>
        createContainer(
          {
            content_width: 'full',
            flex_direction: idx % 2 === 0 ? 'row' : 'row-reverse',
            flex_direction_tablet: 'column',
            flex_direction_mobile: 'column',
            background_background: 'classic',
            background_color: '#FFFFFF',
            border_radius: { unit: 'px', top: '32', right: '32', bottom: '32', left: '32', isLinked: true },
            border_border: 'solid',
            border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
            border_color: '#E2E8F0',
            overflow: 'hidden',
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 30, spread: 0, color: 'rgba(0,0,0,0.04)' }
          },
          [
            // Photo Column (50%)
            createContainer(
              {
                width: { unit: '%', size: 50 },
                width_tablet: { unit: '%', size: 100 },
                width_mobile: { unit: '%', size: 100 },
                min_height: { unit: 'px', size: 420 },
                min_height_mobile: { unit: 'px', size: 260 },
                background_background: 'classic',
                background_image: { url: space.bg },
                background_position: 'center center',
                background_size: 'cover'
              },
              []
            ),
            // Details Column (50%)
            createContainer(
              {
                width: { unit: '%', size: 50 },
                width_tablet: { unit: '%', size: 100 },
                width_mobile: { unit: '%', size: 100 },
                padding: { unit: 'px', top: '48', right: '48', bottom: '48', left: '48', isLinked: true },
                padding_mobile: { unit: 'px', top: '28', right: '20', bottom: '28', left: '20', isLinked: true },
                flex_direction: 'column',
                justify_content: 'center',
                flex_gap: { column: '16', row: '16', unit: 'px' }
              },
              [
                createWidget('heading', {
                  title: space.badge,
                  header_size: 'span',
                  title_color: '#EA8E18',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 11 },
                  typography_font_weight: '800',
                  typography_letter_spacing: { unit: 'px', size: 1 }
                }),
                createWidget('heading', {
                  title: space.title,
                  header_size: 'h2',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Outfit',
                  typography_font_size: { unit: 'px', size: 32 },
                  typography_font_size_mobile: { unit: 'px', size: 24 },
                  typography_font_weight: '500'
                }),
                createWidget('text-editor', {
                  editor: `<p>${space.desc}</p>`,
                  text_color: '#475569',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: { unit: 'px', size: 14 },
                  typography_line_height: { unit: 'em', size: 1.6 }
                }),
                // Quick Specs List
                createContainer(
                  {
                    flex_direction: 'column',
                    flex_gap: { column: '8', row: '8', unit: 'px' },
                    padding: { unit: 'px', top: '8', right: '0', bottom: '8', left: '0', isLinked: false }
                  },
                  space.specs.map((spec) =>
                    createContainer(
                      {
                        flex_direction: 'row',
                        align_items: 'center',
                        flex_gap: { column: '8', row: '8', unit: 'px' }
                      },
                      [
                        createWidget('heading', {
                          title: '✓',
                          header_size: 'span',
                          title_color: '#EA8E18',
                          typography_typography: 'custom',
                          typography_font_weight: '700',
                          typography_font_size: { unit: 'px', size: 14 }
                        }),
                        createWidget('text-editor', {
                          editor: `<p style="font-size: 13px; color: #334155; font-weight: 500;">${spec}</p>`
                        })
                      ]
                    )
                  )
                ),
                createWidget('button', {
                  text: 'Pelajari Selengkapnya →',
                  link: { url: space.link },
                  size: 'md',
                  typography_typography: 'custom',
                  typography_font_family: 'Plus Jakarta Sans',
                  typography_font_size: { unit: 'px', size: 14 },
                  typography_font_weight: '700',
                  button_text_color: '#FFFFFF',
                  background_color: '#EA8E18',
                  border_radius: { unit: 'px', top: '12', right: '12', bottom: '12', left: '12', isLinked: true },
                  padding: { unit: 'px', top: '12', right: '24', bottom: '12', left: '24', isLinked: true }
                })
              ]
            )
          ]
        )
      )
    ),

    // Bottom CTA
    buildBottomCTASection(
      'Tertarik dengan Salah Satu Ruang Kerja ',
      'HQuarters?',
      'Diskusikan kebutuhan spesifik Anda dengan konsultan kami untuk menerima proposal denah lantai dan penawaran sewa resmi.',
      'Dapatkan Penawaran Ruang',
      '/find-space'
    )
  ];

  exportElementorTemplate('HQuarters - Ruang Usaha Hub (Indonesian)', elements, 'page-spaces-hub-id.json');
}

// RUN ALL GENERATORS
console.log('Generating 12 Complete Indonesian Elementor Templates...');
generateHomepage();
generateSpacesHubPage();
generatePremiumOfficePage();
generateSohoDuplexPage();
generateServicedOfficePage();
generateVirtualOfficePage();
generateFunctionRoomPage();
generateBuildingPage();
generateLocationPage();
generateCompaniesPage();
generateInsightsPage();
generateFindSpaceStandalonePage();
console.log('All 12 Indonesian JSON Templates generated successfully!');
