// Generates page-spaces-hub-id.json
//
// Source of truth (read directly, do not guess):
//   src/pages/SpacesPage.jsx         -> main pt-24 sm:pt-28, section order, CTA props
//   src/components/SpacesSection.jsx -> header + 4-card grid, badge overlay, "Best for:" row
//   src/components/CTA.jsx           -> shared bottom CTA
//
// Product names (SOHO, Premium Office, Serviced Office, Virtual Office) stay in English.
// All other copy is Indonesian.

import {
  createContainer, createWidget, exportElementorTemplate,
  PX, PCT, EM, GAP, PAD, RAD, BORDER, BORDER_SIDE,
  GRID, section, heading, para, button,
  COLORS
} from './lib/elementor.js';

// ------------------------------------------------------------------
// SpacesSection.jsx
// ------------------------------------------------------------------
function buildSpacesSection() {
  const cards = [
    {
      badge: 'SOHO',
      popular: 'TERPOPULER',
      title: 'Untuk Mereka yang Tidak Cocok dalam Satu Kotak.',
      desc: 'Bekerja di sini. Tinggal di sini. Membangun di sini. Miliki.',
      bestFor: 'wirausaha, startup, profesional, UKM, investor.',
      link: 'Jelajahi SOHO',
      url: '/spaces/soho',
      image: '/SPACES/SOHO/SOHO 01.webp'
    },
    {
      badge: 'PREMIUM OFFICE',
      title: 'Untuk Perusahaan yang Sedang Melaju.',
      desc: 'Kantor premium untuk perusahaan yang membutuhkan citra korporat, lokasi strategis, dan lingkungan kerja profesional.',
      bestFor: 'perusahaan mapan, kantor regional, perusahaan multinasional, kantor pusat, tim yang bertumbuh.',
      link: 'Jelajahi Premium Office',
      url: '/spaces/premium-office',
      image: '/SPACES/PREMIUM OFFICE/Premium Office.webp'
    },
    {
      badge: 'SERVICED OFFICE',
      title: 'Untuk Tim yang Perlu Bergerak Cepat.',
      desc: 'Kantor lengkap tanpa waktu dan modal yang dibutuhkan untuk membangun ruang kerja sendiri.',
      bestFor: 'tim kecil, kantor proyek, kantor satelit, masuknya pasar baru.',
      link: 'Jelajahi Serviced Office',
      url: '/spaces/serviced-office',
      image: '/SPACES/SERVICED OFFICE/1.webp'
    },
    {
      badge: 'VIRTUAL OFFICE',
      title: 'Untuk Bisnis yang Butuh Kehadiran Sebelum Ruang.',
      desc: 'Kehadiran bisnis profesional tanpa komitmen kantor permanen.',
      bestFor: 'perusahaan baru, bisnis remote, profesional independen, perwakilan cabang.',
      link: 'Jelajahi Virtual Office',
      url: '/spaces/virtual-office',
      image: '/SPACES/SERVICED OFFICE/6.webp'
    }
  ];

  return section({
    // main pt-24 sm:pt-28 (96/112) + inner pt-4 sm:pt-6 (16/24) = 112/136; pb-16 (64)
    pt: 136, ptTablet: 136, ptMobile: 112,
    pb: 64,
    bg: COLORS.surface,
    gap: 48,
    center: true,
    id: 'spaces',
    children: [
      // text-center max-w-3xl mx-auto space-y-4
      createContainer(
        {
          content_width: 'full',
          width: PX(768),
          width_mobile: PCT(100),
          flex_direction: 'column',
          align_items: 'center',
          text_align: 'center',
          flex_gap: GAP(16)
        },
        [
          // h1 text-4xl sm:text-5xl lg:text-6xl leading-[1.12]
          heading('Temukan Ruang <br><span style="color:#EA8E18;">yang Tepat untuk Anda.</span>', {
            tag: 'h1',
            align: 'center',
            size: 60,
            sizeTablet: 48,
            sizeMobile: 36,
            leading: 1.12,
            tracking: -0.025
          }),
          // p text-base sm:text-lg max-w-2xl leading-relaxed
          para(
            '<p>Tidak semua bisnis bekerja dengan cara yang sama. Karena itu HQuarters menyediakan ruang untuk berbagai kebutuhan, ukuran bisnis, dan tahap pertumbuhan.</p>',
            {
              align: 'center',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          )
        ]
      ),

      // grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          flex_wrap: 'wrap',
          justify_content: 'space-between',
          align_items: 'stretch',
          width: PCT(100),
          flex_gap: GAP(32, 24),
          flex_gap_tablet: GAP(24),
          flex_gap_mobile: GAP(24)
        },
        cards.map((c) => buildSpaceCard(c))
      )
    ]
  });
}

function buildSpaceCard(c) {
  const badgeRow = [
    heading(c.badge, {
      tag: 'span',
      align: 'left',
      color: '#FFFFFF',
      size: 11,
      weight: '700',
      tracking: 0.05,
      transform: 'uppercase',
      custom_css: 'selector .elementor-heading-title { display:inline-block; background:rgba(15,23,42,0.9); padding:4px 12px; border-radius:6px; }'
    })
  ];

  if (c.popular) {
    badgeRow.push(
      createContainer(
        {
          flex_direction: 'row',
          align_items: 'center',
          flex_gap: GAP(4),
          background_background: 'classic',
          background_color: COLORS.orange,
          border_radius: RAD(6),
          padding: PAD(4, 10, 4, 10, true)
        },
        [
          createWidget('icon', {
            selected_icon: { value: 'fas fa-star', library: 'fa-solid' },
            primary_color: '#FFFFFF',
            size: PX(12)
          }),
          heading(c.popular, {
            tag: 'span',
            align: 'left',
            color: '#FFFFFF',
            size: 11,
            sizeMobile: 10,
            weight: '800',
            tracking: 0.05,
            transform: 'uppercase'
          })
        ]
      )
    );
  }

  return createContainer(
    {
      width: GRID(2, 32),
      width_tablet: GRID(2, 24),
      width_mobile: PCT(100),
      flex_direction: 'column',
      justify_content: 'space-between',
      flex_gap: GAP(0),
      background_background: 'classic',
      background_color: COLORS.surface,
      border_radius: RAD(24),
      overflow: 'hidden',
      ...BORDER(1, COLORS.borderSoft),
      box_shadow_box_shadow_type: 'yes',
      box_shadow_box_shadow: { horizontal: 0, vertical: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' },
      custom_css: 'selector { transition: border-color .3s ease, box-shadow .3s ease; }\nselector:hover { border-color:#EA8E18; box-shadow:0 20px 25px -5px rgba(0,0,0,.1); }'
    },
    [
      // top part — keeps justify-between pushing the footer to the card bottom
      createContainer(
        { content_width: 'full', flex_direction: 'column', flex_gap: GAP(0) },
        [
          // image: aspect-[16/10] sm:aspect-[16/9], bg-slate-100, badge overlay inset 3.5 (14px)
          createContainer(
            {
              content_width: 'full',
              width: PCT(100),
              min_height: PX(380),
              min_height_tablet: PX(320),
              min_height_mobile: PX(214),
              flex_direction: 'column',
              justify_content: 'flex-start',
              background_background: 'classic',
              background_color: '#F1F5F9',
              background_image: { url: c.image },
              background_position: 'center center',
              background_size: 'cover',
              overflow: 'hidden',
              padding: PAD(14, 14, 14, 14, true),
              custom_css: 'selector { aspect-ratio: 16 / 10; }\n@media (min-width: 768px) { selector { aspect-ratio: 16 / 9; } }'
            },
            [
              createContainer(
                {
                  content_width: 'full',
                  width: PCT(100),
                  flex_direction: 'row',
                  justify_content: 'space-between',
                  align_items: 'center',
                  flex_gap: GAP(8)
                },
                badgeRow
              )
            ]
          ),
          // p-4 sm:p-5 space-y-1.5
          createContainer(
            {
              content_width: 'full',
              flex_direction: 'column',
              flex_gap: GAP(6),
              padding: PAD(20, 20, 20, 20, true),
              padding_mobile: PAD(16, 16, 16, 16, true)
            },
            [
              // h4 text-lg sm:text-xl leading-snug
              heading(c.title, {
                tag: 'h4',
                align: 'left',
                size: 20,
                sizeMobile: 18,
                leading: 1.375
              }),
              // p text-xs sm:text-sm leading-relaxed line-clamp-2
              para(`<p>${c.desc}</p>`, {
                size: 14,
                sizeMobile: 12,
                custom_css: 'selector .elementor-widget-container p { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }'
              }),
              // pt-1 text-xs text-slate-500 border-t border-slate-100
              createContainer(
                {
                  content_width: 'full',
                  flex_direction: 'column',
                  flex_gap: GAP(0),
                  padding: PAD(4, 0, 0, 0),
                  ...BORDER_SIDE('top', '#F1F5F9')
                },
                [
                  createWidget('text-editor', {
                    editor: `<p style="font-size:12px;color:#64748B;margin:0;"><span style="font-weight:600;color:#334155;">Cocok untuk: </span>${c.bestFor}</p>`,
                    align: 'left',
                    typography_typography: 'custom',
                    typography_font_family: 'Plus Jakarta Sans',
                    typography_font_size: PX(12),
                    typography_line_height: EM(1.625)
                  })
                ]
              )
            ]
          )
        ]
      ),
      // px-4 sm:px-5 pb-4 pt-0 flex items-center justify-between text-xs sm:text-sm font-bold text-[#EA8E18]
      createContainer(
        {
          content_width: 'full',
          flex_direction: 'row',
          justify_content: 'space-between',
          align_items: 'center',
          flex_gap: GAP(8),
          padding: PAD(0, 20, 16, 20, true),
          padding_mobile: PAD(0, 16, 16, 16, true)
        },
        [
          heading(c.link, {
            tag: 'span',
            align: 'left',
            color: COLORS.orange,
            size: 14,
            sizeMobile: 12,
            weight: '700'
          }),
          createWidget('icon', {
            selected_icon: { value: 'fas fa-arrow-right', library: 'fa-solid' },
            primary_color: COLORS.orange,
            size: PX(16),
            align: 'right'
          })
        ]
      )
    ]
  );
}

// ------------------------------------------------------------------
// CTA.jsx  (props from SpacesPage.jsx)
// ------------------------------------------------------------------
function buildSpacesCTA() {
  return section({
    // pt-20 sm:pt-28 (80/112), pb-12 sm:pb-16 (48/64)
    pt: 112, ptMobile: 80,
    pb: 64, pbMobile: 48,
    bg: COLORS.dark,
    id: 'contact',
    center: true,
    gap: 24,
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
          heading('Siap Mengambil <br><span style="color:#EA8E18;">Ruang Usaha Ideal Anda?</span>', {
            tag: 'h2',
            align: 'center',
            color: '#FFFFFF',
            size: 52,
            sizeTablet: 48,
            sizeMobile: 30,
            leading: 1.15,
            tracking: -0.025
          }),
          para(
            '<p>Baik Anda membutuhkan alamat virtual yang prestisius, meja serviced siap pakai, unit SOHO, atau lantai korporat premium, tim kami siap memandu pilihan Anda.</p>',
            {
              align: 'center',
              color: '#CBD5E1',
              size: 18,
              sizeMobile: 16,
              custom_css: 'selector .elementor-widget-container { max-width:672px; margin-left:auto; margin-right:auto; }'
            }
          ),
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
              button('Jadwalkan Tur Privat &nbsp;&rarr;', '/find-space', {
                fontSize: 16,
                fontSizeMobile: 14,
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

console.log('Generating page-spaces-hub-id.json ...');
exportElementorTemplate('HQuarters - Spaces', [
  buildSpacesSection(),
  buildSpacesCTA()
], 'page-spaces-hub-id.json');
console.log('Done.');
