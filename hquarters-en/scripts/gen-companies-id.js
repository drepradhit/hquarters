// Generates page-companies-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/CompaniesPage.jsx       -> <main class="pt-24 sm:pt-28"> (NO space-y), CTA props
//   src/components/CompaniesSection.jsx
//   src/components/CTA.jsx
//
// React structure (CompaniesSection.jsx):
//   114  <section id="companies" class="pt-4 sm:pt-6 pb-16 bg-white">
//   115    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
//   120      header      max-w-3xl space-y-3   (gap 12)
//   132      6 sector cards, space-y-12       (gap 48)
//   179      quote card  bg-[#FAF8F5] rounded-2xl sm:rounded-[40px] p-8 sm:p-16
//
// CompaniesPage.jsx CTA props: description="" (so no paragraph),
// buttonText="Find Your Space".
//
// Logo grid is `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5` (20px).
// Tailwind sm=640 has no Elementor equivalent, so tablet (768+) takes the
// md:grid-cols-4 value and mobile (<768) takes grid-cols-2.
//
// Logo scales use Tailwind v4 dynamic scale-* utilities (scale-85/120/125),
// applied here as a transform on the logo box.
//
// Product names, sector titles and company names stay in English.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, CUSTOM, GAP, PAD, RAD, BORDER, BORDER_SIDE, MARGIN,
  GRID, section, heading, para, button,
  COLORS
} from './lib/elementor.js';

// CompaniesSection.jsx:14-111 — 6 sectors, 54 partners total, copied verbatim
const SECTORS = [
  {
    id: 'financial',
    title: 'Insurance & Financial Services',
    icon: 'fas fa-shield-alt',
    partners: [
      { name: 'Allianz', logo: '/tenants/alllogo-gf-allianz.webp', scale: 1.20 },
      { name: 'AXA', logo: '/tenants/alllogo-7de-axa.webp', scale: 1.25 },
      { name: 'MSIG', logo: '/tenants/alllogo-9ef-msig.webp', scale: 1.20 },
      { name: 'FWD Insurance', logo: '/tenants/alllogo-6fgh-fwd.webp', scale: 1.20 },
      { name: 'Avrist Assurance', logo: '/tenants/alllogo-19r-avrist.webp', scale: 1.20 },
      { name: 'NH Korindo Sekuritas', logo: '/tenants/alllogo-5d-nh-korindo-sekuritas.webp', scale: 1.25 },
      { name: 'Bmoney', logo: '/tenants/alllogo-6k-b-money.webp', scale: 1.25 },
      { name: 'Henan Sekuritas', logo: '/tenants/alllogo-16e-henan-sekuritas-copy.webp', scale: 1.25 },
      { name: 'DANA Indonesia', logo: '/tenants/alllogo-19-op-dana-logo.webp', scale: 1.25 },
      { name: 'Interpan Tradepro', logo: '/tenants/alllogo-6i-interpan-tradepro.webp', scale: 1.25 },
      { name: 'Mega Menara Mas', logo: '/tenants/alllogo-3i-mega-menara-mas-a5-copy.webp', scale: 1.25 }
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    icon: 'fas fa-heartbeat',
    partners: [
      { name: 'Roche', logo: '/tenants/alllogo-16j-roche.webp', scale: 1.25 },
      { name: 'Medion', logo: '/tenants/alllogo-15-rstkj-medion-logo.webp', scale: 1.25 },
      { name: 'Hasna Medika', logo: '/tenants/alllogo-12ij-hasna-copy-2.webp', scale: 1.25 },
      { name: 'Amoures Clinic', logo: '/tenants/alllogo-12m-amoures.webp', scale: 1.25 },
      { name: 'Dispendix', logo: '/tenants/alllogo-dispendixbicocompany.webp', scale: 1.25 }
    ]
  },
  {
    id: 'tech',
    title: 'Technology & Media',
    icon: 'fas fa-microchip',
    partners: [
      { name: 'Huawei', logo: '/tenants/alllogo-19-efhijk-huawei-logo.webp', scale: 1.20 },
      { name: 'Datacolor', logo: '/tenants/alllogo-6a-data-color.webp', scale: 1.20 },
      { name: 'Garuda TV', logo: '/tenants/alllogo-gf-b-garuda.webp', scale: 0.85 },
      { name: 'INET Media', logo: '/tenants/alllogo-6d-inet-media.webp', scale: 1.25 },
      { name: 'VML Agency', logo: '/tenants/alllogo-7q-vml.webp', scale: 1.25 },
      { name: 'Social Bread', logo: '/tenants/alllogo-5q-social-bread-logo-a4-cmyk.webp', scale: 1.25 },
      { name: 'Hubton Studio', logo: '/tenants/8D hubton-totem-hq-B.webp', scale: 1.25 },
      { name: 'Senjakara Media', logo: '/tenants/alllogo-8p-senjakara.webp', scale: 1.25 },
      { name: 'Inpam Tekno', logo: '/tenants/alllogo-7j-inpam-mini-riset.webp', scale: 1.20 },
      { name: 'Neo IT', logo: '/tenants/10 neo.webp', scale: 1.25 }
    ]
  },
  {
    id: 'industrial',
    title: 'Industrial, Logistics & Engineering',
    icon: 'fas fa-industry',
    partners: [
      { name: 'Mitsubishi Chemical', logo: '/tenants/alllogo-7i-mitsubishi.webp', scale: 1.25 },
      { name: 'Hyosung Corp', logo: '/tenants/alllogo-8q-hyusung.webp', scale: 1.25 },
      { name: 'PT Integra Dayacipta Grahatama', logo: '/tenants/alllogo-5n-integra-logo-baru001.webp', scale: 1.25 },
      { name: 'GSS Engineering', logo: '/tenants/alllogo-10h-gss.webp', scale: 1.25 },
      { name: 'HGS Sourcing', logo: '/tenants/alllogo-10q-hgs.webp', scale: 1.25 },
      { name: 'Aero Logistics', logo: '/tenants/alllogo-ug-aero.webp', scale: 1.25 },
      { name: 'PT Biru Global', logo: '/tenants/alllogo-17-abcdeflmnop-pt-biru.webp', scale: 1.25 },
      { name: 'PT Bagja', logo: '/tenants/alllogo-8fgh-pt-bagja.webp', scale: 1.25 },
      { name: 'Kreasi Perdana', logo: '/tenants/alllogo-15o-kreasi-perdana.webp', scale: 1.25 },
      { name: 'Daya Inara', logo: '/tenants/alllogo-15i-daya-inara.webp', scale: 1.20 }
    ]
  },
  {
    id: 'property',
    title: 'Property, Education & Professional Services',
    icon: 'fas fa-building',
    partners: [
      { name: 'Ray White', logo: '/tenants/raywhite.webp', scale: 1.25 },
      { name: 'IWG Workspace', logo: '/tenants/alllogo-20-iwg-hq.webp', scale: 1.20 },
      { name: 'Kozystay', logo: '/tenants/alllogo-kozystay.webp', scale: 1.25 },
      { name: 'Investaland', logo: '/tenants/alllogo-logo-investaland.webp', scale: 1.25 },
      { name: 'Artaloka', logo: '/tenants/alllogo-12c-artaloka.webp', scale: 1.25 },
      { name: 'TDE Design', logo: '/tenants/alllogo-12k-logo-tde---totem-pylon-hquarters-2.webp', scale: 1.25 },
      { name: 'Kobi Education', logo: '/tenants/alllogo-11h-kobi.webp', scale: 1.20 },
      { name: 'Australia Int. College', logo: '/tenants/alllogo-6l-australia-international-college.webp', scale: 1.20 },
      { name: 'Universal Consulting', logo: '/tenants/alllogo-6q-universal.webp', scale: 1.25 },
      { name: 'ASA Consulting', logo: '/tenants/alllogo-9q-asa.webp', scale: 1.25 },
      { name: 'CAS Services', logo: '/tenants/alllogo-5s-cas.webp', scale: 1.25 },
      { name: 'AZ Pro Services', logo: '/tenants/alllogo-ug-az-pro.webp', scale: 1.20 }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Travel & Lifestyle',
    icon: 'fas fa-coffee',
    partners: [
      { name: 'HIS Travel', logo: '/tenants/alllogo-ug-his-travel.webp', scale: 1.25 },
      { name: 'Hamidah Tour & Travel', logo: '/tenants/alllogo-9m-hamidah-tour-new.webp', scale: 1.25 },
      { name: 'Tomoro Coffee', logo: '/tenants/alllogo-gf-tomoro.webp', scale: 1.25 },
      { name: 'Rejuve Juice', logo: '/tenants/alllogo-gf-cmyk-rejuve-new-logo2025color.webp', scale: 1.25 },
      { name: 'Jus Gaban', logo: '/tenants/GF Jus Gaban.webp', scale: 1.25 },
      { name: 'Sal Corner', logo: '/tenants/alllogo-gf-sal-corner.webp', scale: 1.25 }
    ]
  }
];

// ------------------------------------------------------------------
// 1. CompaniesSection.jsx
// ------------------------------------------------------------------
function buildCompaniesSection() {
  return section({
    // main pt-24 sm:pt-28 + section pt-4 sm:pt-6 = 112 / 136 ; pb-16 (64)
    pt: 112, ptTablet: 136, ptMobile: 112,
    pb: 64,
    bg: COLORS.surface,
    gap: 64,   // space-y-16
    id: 'companies',
    children: [
      // header: text-center max-w-3xl mx-auto space-y-3 (gap 12)
      createContainer(
        {
          content_width: 'full',
          width: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(12),
          custom_css: 'selector { margin-left:auto; margin-right:auto; }'
        },
        [
          // h1 text-4xl sm:text-6xl (36 / 60) — no lg step
          heading("Anda Berada di <br><span style=\"color:#EA8E18;\">Perusahaan yang Tepat.</span>", {
            tag: 'h1',
            align: 'center',
            size: 60,
            sizeTablet: 60,
            sizeMobile: 36,
            leading: 1.25,
            tracking: -0.025
          }),
          // p text-base sm:text-lg (16 / 18)
          para(
            '<p>Bisnis memilih gedung. Tapi bisnis yang hebat juga membangun komunitas.</p>',
            { align: 'center', size: 18, sizeMobile: 16 }
          )
        ]
      ),

      // 6 sector cards, space-y-12 (gap 48)
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'column',
          flex_gap: GAP(48)
        },
        SECTORS.map((s) => buildSectorCard(s))
      ),

      // quote card
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
              // h2 text-3xl sm:text-5xl (30 / 48) leading-tight
              heading('Kenapa Penting Siapa <br><span style="color:#EA8E18;">Tetangga Anda.</span>', {
                tag: 'h2',
                align: 'center',
                size: 48,
                sizeTablet: 48,
                sizeMobile: 30,
                leading: 1.25,
                tracking: -0.025
              }),
              para(
                '<p>Lingkungan bisnis yang kuat membangun kepercayaan &mdash; untuk klien, karyawan, mitra, dan siapa pun yang mempertimbangkan bekerja sama dengan Anda.</p>',
                {
                  align: 'center',
                  size: 18,
                  sizeMobile: 16,
                  custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
                }
              ),
              // quote row: pt-4 flex items-center justify-center gap-3
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'row',
                  justify_content: 'center',
                  align_items: 'center',
                  flex_gap: GAP(12),
                  padding: PAD(16, 0, 0, 0)
                },
                [
                  // h-px w-10 bg-[#EA8E18]/40
                  createContainer(
                    {
                      width: PX(40),
                      min_height: PX(1),
                      flex_direction: 'row',
                      background_background: 'classic',
                      background_color: 'rgba(234,142,24,0.4)'
                    },
                    []
                  ),
                  // text-base sm:text-lg font-medium italic
                  heading('&ldquo;Kredibilitas hidup dalam konteks.&rdquo;', {
                    tag: 'span',
                    align: 'center',
                    size: 18,
                    sizeMobile: 16,
                    weight: '500',
                    tracking: 0.025,
                    custom_css: 'selector .elementor-heading-title { font-style: italic; }'
                  }),
                  createContainer(
                    {
                      width: PX(40),
                      min_height: PX(1),
                      flex_direction: 'row',
                      background_background: 'classic',
                      background_color: 'rgba(234,142,24,0.4)'
                    },
                    []
                  )
                ]
              )
            ]
          )
        ]
      )
    ]
  });
}

// One sector card (CompaniesSection.jsx:136-172)
function buildSectorCard(s) {
  return createContainer(
    {
      content_width: 'full',
      width: PCT(100),
      flex_direction: 'column',
      flex_gap: GAP(0),
      background_background: 'classic',
      background_color: 'rgba(248,250,252,0.7)',
      border_radius: RAD(40),
      border_radius_mobile: RAD(16),
      padding: PAD(40, 40, 40, 40, true),
      padding_mobile: PAD(32, 32, 32, 32, true),
      ...BORDER(1, COLORS.borderSoft),
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
    },
    [
      // header row: flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/70
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          align_items: 'center',
          flex_gap: GAP(12),
          padding: PAD(0, 0, 16, 0),
          _margin: MARGIN('', '', 24, ''),
          ...BORDER_SIDE('bottom', 'rgba(226,232,240,0.7)')
        },
        [
          // w-10 h-10 rounded-xl bg-white border border-slate-200
          createContainer(
            {
              width: PX(40),
              min_height: PX(40),
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              border_radius: RAD(12),
              background_background: 'classic',
              background_color: '#FFFFFF',
              ...BORDER(1, '#E2E8F0'),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              createWidget('icon', {
                selected_icon: { value: s.icon, library: 'fa-solid' },
                primary_color: COLORS.orange,
                size: PX(20)
              })
            ]
          ),
          // h2 text-xl sm:text-2xl (20 / 24)
          heading(s.title, {
            tag: 'h2',
            align: 'left',
            size: 24,
            sizeTablet: 24,
            sizeMobile: 20,
            weight: '500',
            leading: 1.375
          })
        ]
      ),

      // logos grid: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 (20)
      createContainer(
        {
          content_width: 'full',
          width: PCT(100),
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          flex_gap: GAP(20)
        },
        s.partners.map((p) =>
          createContainer(
            {
              width: GRID(4, 20),
              width_tablet: GRID(4, 20),
              width_mobile: GRID(2, 20),
              min_height: PX(128),
              min_height_mobile: PX(112),   // h-28 sm:h-32
              flex_direction: 'row',
              justify_content: 'center',
              align_items: 'center',
              overflow: 'hidden',
              background_background: 'classic',
              background_color: '#FFFFFF',
              border_radius: RAD(16),
              padding: PAD(16, 16, 16, 16, true),
              padding_mobile: PAD(12, 12, 12, 12, true),
              ...BORDER(1, COLORS.borderSoft),
              box_shadow_box_shadow_type: 'yes',
              box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' }
            },
            [
              // w-full h-full object-contain + per-logo scale
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  min_height: PX(96),
                  min_height_mobile: PX(88),
                  background_background: 'classic',
                  background_image: { url: p.logo },
                  background_position: 'center center',
                  background_size: 'contain',
                  background_repeat: 'no-repeat',
                  custom_css: `selector { transform: scale(${p.scale}); }`
                },
                []
              )
            ]
          )
        )
      )
    ]
  );
}

// ------------------------------------------------------------------
// 2. CTA.jsx  (CompaniesPage.jsx props: description="" -> no paragraph)
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
          heading('Bergabung dengan Bisnis yang <br><span style="color:#EA8E18;">Bertumbuh dari HQuarters.</span>', {
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
              button('Cari Ruang Saya &nbsp;&rarr;', '/find-space', {
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
console.log('Generating page-companies-id.json ...');
exportElementorTemplate('HQuarters - Companies', [
  buildCompaniesSection(),
  buildCTA()
], 'page-companies-id.json');
console.log('Done.');
