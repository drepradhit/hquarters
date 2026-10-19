// Generates page-find-space-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/FindSpacePage.jsx          -> main pt-24 sm:pt-28, no bottom CTA on this page
//   src/components/FindSpacePageSection.jsx -> header, 5 option cards, inquiry form card
//
// Product names (SOHO, Premium Office, Serviced Office, Virtual Office, Function Room)
// stay in English. All other copy is Indonesian.
//
// Note: the React version swaps the submit label / preview image per selected space via
// useState. Elementor has no equivalent without custom JS, so this renders the default
// state (Premium Office), which is what React shows on first load.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  section, heading, para,
  COLORS
} from './lib/elementor.js';

const WA_NUMBER = '628111908319';

function buildFindSpaceSection() {
  const options = [
    {
      label: 'Saya butuh Premium Office',
      value: 'Premium Office',
      desc: 'Untuk tim mapan & kantor pusat korporasi',
      icon: 'fas fa-building'
    },
    {
      label: 'Saya ingin memiliki SOHO',
      value: 'SOHO',
      desc: 'Gabungan fleksibel ruang tinggal & ruang kerja',
      icon: 'fas fa-home'
    },
    {
      label: 'Saya butuh Serviced Office',
      value: 'Serviced Office',
      desc: 'Kantor siap pakai lengkap untuk tim yang bergerak cepat',
      icon: 'fas fa-briefcase'
    },
    {
      label: 'Saya butuh Virtual Office',
      value: 'Virtual Office',
      desc: 'Alamat bisnis prestisius di CBD & layanan surat',
      icon: 'fas fa-envelope-open-text'
    },
    {
      label: 'Saya ingin memesan Function Room',
      value: 'Function Room',
      desc: 'Ruang fleksibel untuk acara korporasi, seminar & jamuan',
      icon: 'fas fa-calendar-alt'
    }
  ];

  const selected = 'Premium Office';

  return section({
    // main pt-24 sm:pt-28 (96/112) + section pt-4 sm:pt-6 (16/24); pb-16 (64)
    pt: 136, ptTablet: 136, ptMobile: 112,
    pb: 64,
    bg: COLORS.surface,
    gap: 48,
    center: true,
    id: 'find-space',
    children: [
      // text-center max-w-3xl mx-auto
      createContainer(
        {
          content_width: 'full',
          width: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(0)
        },
        [
          // h1 text-4xl sm:text-6xl (36 / 60) — accent #E8860B, no <br>
          heading('Beri Tahu Kami <span style="color:#E8860B;">Apa yang Anda Butuhkan.</span>', {
            tag: 'h1',
            align: 'center',
            size: 60,
            sizeTablet: 60,
            sizeMobile: 36,
            leading: 1.25,
            tracking: -0.025
          }),
          // p mt-4 text-base sm:text-lg
          para(
            '<p>Bagikan data Anda dan tim kami akan segera menghubungi Anda.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              margin: MARGIN(16, '', '', '')
            }
          )
        ]
      ),

      // grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-[1200px] items-stretch
      createContainer(
        {
          content_width: 'full',
          width: PX(1200),
          width_tablet: PCT(100),
          width_mobile: PCT(100),
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          flex_wrap: 'wrap',
          align_items: 'stretch',
          flex_gap: GAP(48),
          flex_gap_tablet: GAP(32),
          flex_gap_mobile: GAP(32)
        },
        [
          // LEFT: lg:col-span-5 -> 5/12 with lg:gap-12 (48px) = 41.6667% - 28px
          createContainer(
            {
              width: CUSTOM('calc(41.6667% - 28px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(14)
            },
            options.map((o) => buildOptionCard(o, o.value === 'Premium Office'))
          ),

          // RIGHT: lg:col-span-7 -> 7/12 with lg:gap-12 (48px) = 58.3333% - 20px
          createContainer(
            {
              width: CUSTOM('calc(58.3333% - 20px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column'
            },
            [buildFormCard(selected)]
          )
        ]
      )
    ]
  });
}

// React: button flex-1, p-5 sm:p-6, rounded-2xl, selected = dark slate
function buildOptionCard(o, isSelected) {
  const cardCss = [
    'selector { flex: 1 1 0%; transition: background-color .3s ease, border-color .3s ease, box-shadow .3s ease; }'
  ].join('\n');

  const iconBox = createContainer(
    {
      width: PX(36),
      min_height: PX(36),
      flex_direction: 'row',
      justify_content: 'center',
      align_items: 'center',
      border_radius: RAD(12),
      background_background: 'classic',
      background_color: isSelected ? '#E8860B' : '#FFFFFF',
      ...(isSelected ? {} : BORDER(1, '#E2E8F0'))
    },
    [
      createWidget('icon', {
        selected_icon: { value: o.icon, library: 'fa-solid' },
        primary_color: isSelected ? '#FFFFFF' : '#1E293B',
        size: PX(18)
      })
    ]
  );

  const inner = createContainer(
    {
      content_width: 'full',
      flex_direction: 'column',
      flex_gap: GAP(8)
    },
    [
      iconBox,
      // font-bold text-base font-heading leading-snug
      heading(o.label, {
        tag: 'div',
        align: 'left',
        color: isSelected ? '#FFFFFF' : COLORS.heading,
        size: 16,
        weight: '700',
        leading: 1.375
      }),
      // text-xs
      para(`<p>${o.desc}</p>`, {
        size: 12,
        sizeMobile: 12,
        color: isSelected ? '#CBD5E1' : '#64748B'
      })
    ]
  );

  const children = [inner];

  // CheckCircle2 absolute top-4 right-4 (selected only)
  if (isSelected) {
    children.push(
      createContainer(
        {
          flex_direction: 'row',
          justify_content: 'flex-end',
          align_items: 'flex-start',
          custom_css: 'selector { position:absolute; top:16px; right:16px; }'
        },
        [
          createWidget('icon', {
            selected_icon: { value: 'fas fa-check-circle', library: 'fa-solid' },
            primary_color: '#E8860B',
            size: PX(20)
          })
        ]
      )
    );
  }

  return createContainer(
    {
      content_width: 'full',
      width: PCT(100),
      flex_direction: 'column',
      justify_content: 'space-between',
      padding: PAD(24, 24, 24, 24, true),
      padding_mobile: PAD(20, 20, 20, 20, true),
      border_radius: RAD(16),
      background_background: 'classic',
      background_color: isSelected ? '#0F172A' : 'rgba(248,250,252,0.8)',
      ...BORDER(1, isSelected ? '#0F172A' : COLORS.borderSoft),
      ...(isSelected
        ? {
            box_shadow_box_shadow_type: 'yes',
            box_shadow_box_shadow: { horizontal: 0, vertical: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,0.1)' }
          }
        : {}),
      custom_css: isSelected
        ? 'selector { flex: 1 1 0%; position: relative; transform: scale(1.02); z-index: 10; }'
        : cardCss
    },
    children
  );
}

// React: bg-white rounded-2xl p-6 sm:p-10 border shadow-2xl, h-full flex flex-col justify-between
function buildFormCard(selected) {
  const labelIconCss = [
    'selector .elementor-field-label { text-transform: uppercase; letter-spacing: .05em; font-weight: 800; font-size: 10px; color: #475569; display: flex; align-items: center; gap: 6px; }',
    'selector .elementor-field-group-name .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f007"; color:#E8860B; font-size:13px; }',
    'selector .elementor-field-group-whatsapp .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f095"; color:#E8860B; font-size:13px; }',
    'selector .elementor-field-group-company .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f1ad"; color:#94A3B8; font-size:13px; }',
    'selector .elementor-field-group-notes .elementor-field-label::before { font-family:"Font Awesome 5 Free"; font-weight:900; content:"\\f075"; color:#94A3B8; font-size:13px; }'
  ].join('\n');

  return createContainer(
    {
      content_width: 'full',
      width: PCT(100),
      flex_direction: 'column',
      justify_content: 'space-between',
      background_background: 'classic',
      background_color: '#FFFFFF',
      border_radius: RAD(16),
      padding: PAD(40, 40, 40, 40, true),
      padding_mobile: PAD(24, 24, 24, 24, true),
      ...BORDER(1, COLORS.borderSoft),
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,0.25)' },
      overflow: 'hidden',
      flex_gap: GAP(0)
    },
    [
      // header row: pb-5 mb-6 border-b border-slate-100
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          justify_content: 'space-between',
          align_items: 'center',
          flex_gap: GAP(12),
          padding: PAD(0, 0, 20, 0),
          _margin: MARGIN('', '', 24, ''),
          ...BORDER_SIDE('bottom', '#F1F5F9')
        },
        [
          createContainer(
            {
              flex_direction: 'row',
              flex_wrap: 'wrap',
              align_items: 'center',
              flex_gap: GAP(8)
            },
            [
              heading('Selected Space:', {
                tag: 'span',
                align: 'left',
                color: '#94A3B8',
                size: 12,
                weight: '700',
                tracking: 0.05,
                transform: 'uppercase'
              }),
              createContainer(
                {
                  flex_direction: 'row',
                  align_items: 'center',
                  background_background: 'classic',
                  background_color: COLORS.orangeTint,
                  border_radius: RAD(9999),
                  padding: PAD(4, 12, 4, 12, true)
                },
                [
                  heading(selected, {
                    tag: 'span',
                    align: 'left',
                    color: COLORS.orangeIcon,
                    size: 12,
                    weight: '800'
                  })
                ]
              )
            ]
          ),
          createWidget('icon', {
            selected_icon: { value: 'fas fa-shield-alt', library: 'fa-solid' },
            primary_color: '#10B981',
            size: PX(20)
          })
        ]
      ),

      // Form (React: space-y-4, 2-col for name/whatsapp at sm)
      createWidget('form', {
        form_name: 'HQuarters Find Space',
        form_fields: [
          { _id: 'space_type', field_type: 'hidden', field_value: selected },
          {
            _id: 'name',
            field_type: 'text',
            field_label: 'Full Name *',
            placeholder: 'Nama lengkap Anda',
            required: 'true',
            width: '50',
            width_tablet: '50',
            width_mobile: '100'
          },
          {
            _id: 'whatsapp',
            field_type: 'tel',
            field_label: 'WhatsApp *',
            placeholder: '+62 812 3456 7890',
            required: 'true',
            width: '50',
            width_tablet: '50',
            width_mobile: '100'
          },
          {
            _id: 'company',
            field_type: 'text',
            field_label: 'Company Name (Optional)',
            placeholder: 'mis. PT Enterprise Nusantara',
            required: 'false',
            width: '100'
          },
          {
            _id: 'notes',
            field_type: 'textarea',
            field_label: 'Additional Requirements (Optional)',
            placeholder: 'Ceritakan kebutuhan khusus, waktu, atau pertanyaan Anda...',
            rows: 3,
            required: 'false',
            width: '100'
          }
        ],
        button_text: 'Request Proposal & Floorplan',
        button_size: 'md',
        button_width: '100',
        button_typography_typography: 'custom',
        button_typography_font_family: 'Plus Jakarta Sans',
        button_typography_font_size: PX(14),
        button_typography_font_weight: '800',
        button_typography_text_transform: 'uppercase',
        button_text_color: '#FFFFFF',
        button_background_color: '#E8860B',
        button_background_hover_color: '#D67A0A',
        button_border_radius: RAD(12),
        button_padding: PAD(16, 24, 16, 24, true),
        submit_actions: ['redirect'],
        redirect_to: `https://wa.me/${WA_NUMBER}?text=Halo%20HQuarters!%20Saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20*${encodeURIComponent(selected)}*.%0ANama:%20[field id="name"]%0AWhatsApp:%20[field id="whatsapp"]%0APerusahaan:%20[field id="company"]%0ACatatan:%20[field id="notes"]`,
        label_typography_typography: 'custom',
        label_typography_font_family: 'Plus Jakarta Sans',
        label_typography_font_size: PX(10),
        label_typography_font_weight: '800',
        label_typography_line_height: EM(1),
        label_text_color: '#475569',
        field_typography_typography: 'custom',
        field_typography_font_family: 'Plus Jakarta Sans',
        field_typography_font_size: PX(14),
        field_text_color: '#0F172A',
        field_background_color: '#F8FAFC',
        field_border_border: 'solid',
        field_border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true },
        field_border_color: COLORS.borderSoft,
        field_border_radius: RAD(12),
        field_padding: PAD(10, 14, 10, 14, true),
        custom_css: labelIconCss
      }),

      // footer note: text-center text-[10px] text-slate-400 mt-2
      createWidget('text-editor', {
        editor: '<p style="text-align:center;font-size:10px;color:#94A3B8;margin:8px 0 0;">Informasi Anda aman dan hanya digunakan oleh manajemen HQuarters.</p>',
        align: 'center'
      })
    ]
  );
}

console.log('Generating page-find-space-id.json ...');
exportElementorTemplate('HQuarters - Find Space', [
  buildFindSpaceSection()
], 'page-find-space-id.json');
console.log('Done.');
