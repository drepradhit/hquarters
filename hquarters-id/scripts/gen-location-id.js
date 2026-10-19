// Generates page-location-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/LocationPage.jsx        -> <main class="pt-24 sm:pt-28"> (NO space-y), CTA props
//   src/components/LocationSection.jsx
//   src/components/CTA.jsx
//
// React structure (LocationSection.jsx):
//   30  <section id="location" class="pt-4 sm:pt-6 pb-16 bg-white">
//   31    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
//   36      header      text-center max-w-3xl mx-auto space-y-4   (gap 16)
//   49      map card    bg-slate-50/80 rounded-2xl sm:rounded-[40px]
//                         p-8 sm:p-12, grid lg:grid-cols-12 gap-8 items-center
//                         left  lg:col-span-6  Google Maps iframe, aspect-[4/3]
//                         right lg:col-span-6  space-y-6, heading + 8 nearby tiles
//   103     neighbours  bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-16
//   129     outside     heading + description (no card)
//
// LocationPage.jsx CTA props: description="" (so no paragraph),
// buttonText="Get Directions & Contact".
//
// The Google Maps iframe is embedded verbatim via an HTML widget.
//
// Product names stay in English. Copy is Indonesian.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button,
  COLORS
} from './lib/elementor.js';

// LocationSection.jsx:60 — exact embed URL from source
const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7328941393102!2d107.61305377499647!3d-6.922500093077204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e62eaa6b6423%3A0xb2cdc805dd650314!2sHQuarters%20Business%20Residence!5e0!3m2!1sid!2sid!4v1785903189677!5m2!1sid!2sid';

// LocationSection.jsx:18-27 — 8 categories, copied verbatim
const NEARBY_CATEGORIES = [
  { name: 'Hotels', icon: 'fas fa-building' },
  { name: 'Government', icon: 'fas fa-landmark' },
  { name: 'Shopping', icon: 'fas fa-shopping-bag' },
  { name: 'Main Roads', icon: 'fas fa-location-arrow' },
  { name: 'Banks', icon: 'fas fa-landmark' },
  { name: 'Restaurants', icon: 'fas fa-utensils' },
  { name: 'Railway Station', icon: 'fas fa-train' },
  { name: 'Toll Access*', icon: 'fas fa-car' }
];

// ------------------------------------------------------------------
// 1. LocationSection.jsx
// ------------------------------------------------------------------
function buildLocationSection() {
  return section({
    // main pt-24 sm:pt-28 + section pt-4 sm:pt-6 = 112 / 136 ; pb-16 (64)
    pt: 112, ptTablet: 136, ptMobile: 112,
    pb: 64,
    bg: COLORS.surface,
    gap: 64,   // space-y-16
    id: 'location',
    children: [
      // header: text-center max-w-3xl mx-auto space-y-4 (gap 16)
      createContainer(
        {
          content_width: 'full',
          width: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          // h1 text-4xl sm:text-5xl lg:text-6xl leading-[1.12]
          heading('Di Pusat <br><span style="color:#EA8E18;">Bisnis Bandung.</span>', {
            tag: 'h1',
            align: 'center',
            size: 60,
            sizeTablet: 48,
            sizeMobile: 36,
            leading: 1.12,
            tracking: -0.025
          }),
          // p text-base sm:text-lg max-w-xl mx-auto
          para(
            '<p>Asia Afrika &mdash; alamat yang terhubung dengan perdagangan, sejarah, perhotelan, dan kehidupan sehari-hari kota.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:576px; margin-left:auto; margin-right:auto; }'
            }
          )
        ]
      ),

      // map card: bg-slate-50/80 rounded-2xl sm:rounded-[40px] p-8 sm:p-12
      //           grid lg:grid-cols-12 gap-8 items-center
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_direction_tablet: 'column',
          flex_direction_mobile: 'column',
          align_items: 'center',
          flex_gap: GAP(32),   // gap-8
          background_background: 'classic',
          background_color: 'rgba(248,250,252,0.8)',
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          padding: PAD(48, 48, 48, 48, true),
          padding_mobile: PAD(32, 32, 32, 32, true),
          ...BORDER(1, COLORS.borderSoft),
          box_shadow_box_shadow_type: 'yes',
          box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
        },
        [
          // LEFT lg:col-span-6 -> 6/12 with gap-8 (32) = 50% - 16px
          createContainer(
            {
              width: CUSTOM('calc(50% - 16px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'row',
              align_items: 'stretch'
            },
            [
              // rounded-xl overflow-hidden shadow-lg aspect-[4/3] bg-slate-100
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  min_height: PX(400),
                  min_height_tablet: PX(340),
                  min_height_mobile: PX(240),
                  border_radius: RAD(12),
                  overflow: 'hidden',
                  background_background: 'classic',
                  background_color: '#F1F5F9',
                  ...BORDER(1, COLORS.border),
                  box_shadow_box_shadow_type: 'yes',
                  box_shadow_box_shadow: { horizontal: 0, vertical: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,0.1)' },
                  custom_css: 'selector { aspect-ratio: 4 / 3; }'
                },
                [
                  createWidget('html', {
                    html: `<iframe src="${MAP_EMBED}" style="width:100%;height:100%;border:0;display:block;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="HQuarters Location Map"></iframe>`
                  })
                ]
              )
            ]
          ),

          // RIGHT lg:col-span-6 space-y-6
          createContainer(
            {
              width: CUSTOM('calc(50% - 16px)'),
              width_tablet: PCT(100),
              width_mobile: PCT(100),
              flex_direction: 'column',
              flex_gap: GAP(24)   // space-y-6
            },
            [
              // h2 text-3xl sm:text-4xl
              heading('Lebih Dekat ke <br><span style="color:#EA8E18;">Semua yang Penting.</span>', {
                tag: 'h2',
                align: 'left',
                size: 36,
                sizeTablet: 36,
                sizeMobile: 30,
                weight: '500',
                leading: 1.375
              }),
              // grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  flex_direction: 'row',
                  flex_wrap: 'wrap',
                  justify_content: 'space-between',
                  align_items: 'stretch',
                  flex_gap: GAP(12),
                  padding: PAD(8, 0, 0, 0)
                },
                NEARBY_CATEGORIES.map((c) =>
                  createContainer(
                    {
                      width: GRID(2, 12),
                      width_tablet: GRID(2, 12),
                      width_mobile: PCT(100),
                      min_height: PX(60),
                      flex_direction: 'row',
                      align_items: 'center',
                      flex_gap: GAP(12),   // gap-3
                      background_background: 'classic',
                      background_color: '#FFFFFF',
                      border_radius: RAD(12),
                      padding: PAD(14, 14, 14, 14, true),   // p-3.5
                      ...BORDER(1, COLORS.borderSoft),
                      box_shadow_box_shadow_type: 'yes',
                      box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' },
                      custom_css: 'selector { transition: border-color .3s ease, box-shadow .3s ease; }\nselector:hover { border-color: rgba(234,142,24,.4); box-shadow: 0 4px 6px -1px rgba(0,0,0,.1); }'
                    },
                    [
                      // w-8 h-8 rounded-lg bg-slate-100 shrink-0
                      createContainer(
                        {
                          width: PX(32),
                          min_height: PX(32),
                          flex_direction: 'row',
                          justify_content: 'center',
                          align_items: 'center',
                          border_radius: RAD(8),
                          background_background: 'classic',
                          background_color: '#F1F5F9'
                        },
                        [
                          createWidget('icon', {
                            selected_icon: { value: c.icon, library: 'fa-solid' },
                            primary_color: '#334155',
                            size: PX(16)
                          })
                        ]
                      ),
                      // text-sm font-bold text-slate-900
                      heading(c.name, {
                        tag: 'span',
                        align: 'left',
                        color: COLORS.heading,
                        size: 14,
                        sizeMobile: 14,
                        weight: '700'
                      })
                    ]
                  )
                )
              )
            ]
          )
        ]
      ),

      // neighbours: bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-16 text-center
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          overflow: 'hidden',
          background_background: 'classic',
          background_color: COLORS.surfaceCream,
          border_radius: RAD(40),
          border_radius_mobile: RAD(16),
          padding: PAD(64, 64, 64, 64, true),
          padding_mobile: PAD(32, 32, 32, 32, true),
          ...BORDER(1, COLORS.borderSoft)
        },
        [
          // inner max-w-3xl mx-auto space-y-4 (gap 16)
          createContainer(
            {
              content_width: 'full',
              width: PX(768),
              width_mobile: PCT(100),
              flex_direction: 'column',
              align_items: 'center',
              text_align: 'center',
              flex_gap: GAP(16),
              custom_css: 'selector { margin-left:auto; margin-right:auto; }'
            },
            [
              // h2 text-3xl sm:text-5xl leading-[1.15]
              heading('Klien Anda Sudah Tahu <br><span style="color:#EA8E18;">Alamatnya.</span>', {
                tag: 'h2',
                align: 'center',
                size: 48,
                sizeTablet: 48,
                sizeMobile: 30,
                weight: '500',
                leading: 1.15,
                tracking: -0.025
              }),
              // p text-base sm:text-lg max-w-xl mx-auto
              para(
                '<p>Ada keunggulan psikologis nyata ketika alamat perusahaan tidak perlu dijelaskan. Asia Afrika sudah dikenal dan mudah dikenali.</p>',
                {
                  align: 'center',
                  size: 18,
                  sizeMobile: 16,
                  custom_css: 'selector .elementor-widget-container { max-width:576px; margin-left:auto; margin-right:auto; }'
                }
              ),
              // pt-2 font-bold text-[#EA8E18] text-base sm:text-lg
              heading('Mudah ditemukan. Mudah diingat.', {
                tag: 'span',
                align: 'center',
                color: COLORS.orange,
                size: 18,
                sizeMobile: 16,
                weight: '700',
                custom_css: 'selector { padding-top:8px; }'
              })
            ]
          )
        ]
      ),

      // "Business Outside The Office." heading + description (no card)
      createContainer(
        {
          content_width: 'full',
          width: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16),
          padding: PAD(24, 0, 0, 0),
          padding_mobile: PAD(0, 0, 0, 0),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          // h2 text-3xl sm:text-4xl lg:text-5xl leading-tight
          heading('Bisnis di Luar <br><span style="color:#EA8E18;">Kantor.</span>', {
            tag: 'h2',
            align: 'center',
            size: 48,
            sizeTablet: 36,
            sizeMobile: 30,
            weight: '500',
            leading: 1.25,
            tracking: -0.025
          }),
          // p text-base sm:text-lg max-w-2xl mx-auto (with a <br> in source)
          para(
            '<p style="text-align:center;">Makan siang dengan klien. Rapat di hotel. Kopi. Perbankan. Urusan pemerintahan. <br>Belanja. Semua dekat.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          )
        ]
      )
    ]
  });
}

// ------------------------------------------------------------------
// 2. CTA.jsx  (LocationPage.jsx props: description="" -> no paragraph)
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
          // text-3xl sm:text-5xl lg:text-[52px] leading-[1.15]
          heading('Alamat Bisnis yang Lebih Baik <br><span style="color:#EA8E18;">Dimulai dari Lokasi.</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 52,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.15,
            tracking: -0.025
          }),
          // React: description="" -> paragraph is NOT rendered
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
              button('Petunjuk Arah & Kontak &nbsp;&rarr;', '/find-space', {
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
console.log('Generating page-location-id.json ...');
exportElementorTemplate('HQuarters - Location', [
  buildLocationSection(),
  buildCTA()
], 'page-location-id.json');
console.log('Done.');
