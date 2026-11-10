/**
 * HQuarters Gutenberg Visual WYSIWYG Section Blocks (Option 1)
 * Elementor-like visual canvas editing with real website preview & inline RichText editing.
 */
(function(wp) {
    if (!wp || !wp.blocks || !wp.element) return;

    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = (wp.blockEditor && wp.blockEditor.InspectorControls) || (wp.editor && wp.editor.InspectorControls);
    var useBlockProps = (wp.blockEditor && wp.blockEditor.useBlockProps) || function(p) { return p || {}; };
    var RichText = (wp.blockEditor && wp.blockEditor.RichText) || (wp.editor && wp.editor.RichText);
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var TextareaControl = wp.components.TextareaControl;
    var SelectControl = wp.components.SelectControl;
    var ToggleControl = wp.components.ToggleControl;

    function formatImgUrl(path) {
        if (!path) return '';
        if (path.startsWith('http://') || path.startsWith('https://')) return path;
        return 'https://hquarters.co.id' + (path.startsWith('/') ? path : '/' + path);
    }

    // 1. HERO SECTION
    registerBlockType('hq/hero', {
        title: 'Hero & Pembuka Utama',
        icon: 'cover-image',
        category: 'hquarters',
        attributes: {
            badge: { type: 'string', default: 'CBD ASIA AFRIKA BANDUNG' },
            headline: { type: 'string', default: 'Ruang bisnis modern yang fleksibel, dalam satu gedung di jalan asia afrika CBD bandung' },
            headlineHighlight: { type: 'string', default: 'HQuarters Business Residence' },
            heroImg: { type: 'string', default: '/architectural_hero_bg.webp' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Konten Hero', initialOpen: true }, [
                        el(TextControl, { label: 'Badge Label', value: a.badge, onChange: function(v) { set({ badge: v }); } }),
                        el(TextareaControl, { label: 'Teks Headline Pembuka', value: a.headline, onChange: function(v) { set({ headline: v }); } }),
                        el(TextControl, { label: 'Headline Highlight (Oranye)', value: a.headlineHighlight, onChange: function(v) { set({ headlineHighlight: v }); } }),
                        el(TextControl, { label: 'URL Foto Hero Background', value: a.heroImg, onChange: function(v) { set({ heroImg: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '🏢 HERO & BANNER UTAMA'),
                    el('div', { className: 'hq-hero-wrap' }, [
                        el('img', {
                            className: 'hq-hero-bg',
                            src: formatImgUrl(a.heroImg || '/architectural_hero_bg.webp'),
                            alt: 'Hero'
                        }),
                        el('div', { className: 'hq-hero-gradient' }),
                        el('div', { className: 'hq-hero-content' }, [
                            el(RichText, {
                                tagName: 'span',
                                className: 'hq-badge-gold',
                                value: a.badge,
                                onChange: function(v) { set({ badge: v }); },
                                placeholder: 'BADGE LABEL'
                            }),
                            el(RichText, {
                                tagName: 'h1',
                                className: 'hq-hero-title',
                                value: a.headline,
                                onChange: function(v) { set({ headline: v }); },
                                placeholder: 'Ketik headline pembuka...'
                            }),
                            el('div', { className: 'hq-btn-row' }, [
                                el('a', { href: '#', className: 'hq-btn-primary' }, 'Konsultasi Sekarang →'),
                                el('a', { href: '#', className: 'hq-btn-outline' }, 'Virtual Tour 360°')
                            ])
                        ])
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 2. BUSINESS JOURNEY
    registerBlockType('hq/business-journey', {
        title: 'Alur Bisnis (Business Journey)',
        icon: 'chart-line',
        category: 'hquarters',
        attributes: {
            title: { type: 'string', default: 'Setiap Tahap Bisnis Membutuhkan Ruang yang Berbeda' },
            subtitle: { type: 'string', default: 'Dari awal merintis hingga skala korporasi multinasional.' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Pengaturan Alur Bisnis', initialOpen: true }, [
                        el(TextControl, { label: 'Judul Utama', value: a.title, onChange: function(v) { set({ title: v }); } }),
                        el(TextareaControl, { label: 'Subjudul', value: a.subtitle, onChange: function(v) { set({ subtitle: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '📈 ALUR BISNIS / JOURNEY'),
                    el('div', { className: 'hq-journey-wrap' }, [
                        el('div', { className: 'hq-journey-header' }, [
                            el(RichText, {
                                tagName: 'h2',
                                className: 'hq-address-title',
                                value: a.title,
                                onChange: function(v) { set({ title: v }); }
                            }),
                            el(RichText, {
                                tagName: 'p',
                                className: 'hq-address-desc',
                                value: a.subtitle,
                                onChange: function(v) { set({ subtitle: v }); }
                            })
                        ]),
                        el('div', { className: 'hq-journey-grid' }, [
                            el('div', { className: 'hq-journey-card' }, [
                                el('div', { className: 'hq-journey-num' }, '01'),
                                el('h4', { className: 'hq-journey-title' }, 'Virtual Office'),
                                el('p', { className: 'hq-journey-desc' }, 'Solopreneur & pendirian PT dengan alamat legal bergengsi di Asia Afrika.')
                            ]),
                            el('div', { className: 'hq-journey-card' }, [
                                el('div', { className: 'hq-journey-num' }, '02'),
                                el('h4', { className: 'hq-journey-title' }, 'Serviced Office'),
                                el('p', { className: 'hq-journey-desc' }, 'Tim 2-6 orang siap operasional langsung pakai tanpa renovasi.')
                            ]),
                            el('div', { className: 'hq-journey-card' }, [
                                el('div', { className: 'hq-journey-num' }, '03'),
                                el('h4', { className: 'hq-journey-title' }, 'SOHO Duplex'),
                                el('p', { className: 'hq-journey-desc' }, '2 lantai fungsional untuk hunian privat sekaligus kantor tim profesional.')
                            ]),
                            el('div', { className: 'hq-journey-card' }, [
                                el('div', { className: 'hq-journey-num' }, '04'),
                                el('h4', { className: 'hq-journey-title' }, 'Premium Office'),
                                el('p', { className: 'hq-journey-desc' }, 'Lantai korporat 120 - 450 m² representatif di pusat finansial Bandung.')
                            ])
                        ])
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 3. ADDRESS STATEMENT
    registerBlockType('hq/address-statement', {
        title: 'Pernyataan Alamat & Lokasi',
        icon: 'location',
        category: 'hquarters',
        attributes: {
            titlePrefix: { type: 'string', default: 'Di Jl. Asia Afrika,' },
            titleHighlight: { type: 'string', default: 'Bandung' },
            description: { type: 'string', default: 'Berada tepat di koridor finansial dan pusat bisnis utama kota Bandung.' },
            ctaText: { type: 'string', default: 'Buka petunjuk arah' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Pernyataan Lokasi', initialOpen: true }, [
                        el(TextControl, { label: 'Teks Awalan', value: a.titlePrefix, onChange: function(v) { set({ titlePrefix: v }); } }),
                        el(TextControl, { label: 'Teks Highlight (Oranye)', value: a.titleHighlight, onChange: function(v) { set({ titleHighlight: v }); } }),
                        el(TextareaControl, { label: 'Deskripsi Alamat', value: a.description, onChange: function(v) { set({ description: v }); } }),
                        el(TextControl, { label: 'Teks Tombol Arah', value: a.ctaText, onChange: function(v) { set({ ctaText: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '📍 PERNYATAAN LOKASI CBD'),
                    el('div', { className: 'hq-address-wrap' }, [
                        el('div', { className: 'hq-address-badge' }, 'KORIDOR FINANSIAL ASIA AFRIKA'),
                        el('h2', { className: 'hq-address-title' }, [
                            el(RichText, {
                                tagName: 'span',
                                value: a.titlePrefix,
                                onChange: function(v) { set({ titlePrefix: v }); }
                            }),
                            ' ',
                            el('span', { className: 'hq-highlight-text' }, a.titleHighlight || 'Bandung')
                        ]),
                        el(RichText, {
                            tagName: 'p',
                            className: 'hq-address-desc',
                            value: a.description,
                            onChange: function(v) { set({ description: v }); }
                        }),
                        el('div', { style: { display: 'flex', justifyContent: 'center' } }, [
                            el('a', { href: '#', className: 'hq-btn-primary' }, [
                                '🗺️ ', (a.ctaText || 'Buka petunjuk arah')
                            ])
                        ])
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 4. PARTNERS / TENANTS MARQUEE GRID
    registerBlockType('hq/partners', {
        title: 'Logo Mitra & Tenant Perusahaan',
        icon: 'groups',
        category: 'hquarters',
        attributes: {
            title: { type: 'string', default: 'DIPERCAYA OLEH PERUSAHAAN TERKEMUKA' },
            enabled: { type: 'boolean', default: true }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            var logos = [
                '/homepagelogobaru/GF%20B%20garuda.webp',
                '/homepagelogobaru/huawei.webp',
                '/homepagelogobaru/7i%20mitsubishi.webp',
                '/homepagelogobaru/16j%20roche.webp',
                '/homepagelogobaru/7de%20axa.webp',
                '/homepagelogobaru/6FGH%20fwd.webp',
                '/homepagelogobaru/9ef%20MSIG.webp',
                '/homepagelogobaru/19%20OP%20Dana-Logo.webp'
            ];

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Pengaturan Tenant Logos', initialOpen: true }, [
                        el(TextControl, { label: 'Judul Label', value: a.title, onChange: function(v) { set({ title: v }); } }),
                        el(ToggleControl, { label: 'Tampilkan Section Ini', checked: a.enabled, onChange: function(v) { set({ enabled: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '🤝 LOGO MITRA & TENANT'),
                    el('div', { className: 'hq-partners-wrap' }, [
                        el(RichText, {
                            tagName: 'div',
                            className: 'hq-partners-label',
                            value: a.title,
                            onChange: function(v) { set({ title: v }); }
                        }),
                        el('div', { className: 'hq-partners-grid' }, logos.map(function(src, i) {
                            return el('div', { className: 'hq-partner-card', key: i }, [
                                el('img', { src: formatImgUrl(src), alt: 'Partner Logo' })
                            ]);
                        }))
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 5. BUILDING HIGHLIGHTS
    registerBlockType('hq/building-highlights', {
        title: 'Fasilitas Unggulan Gedung',
        icon: 'building',
        category: 'hquarters',
        attributes: {
            title: { type: 'string', default: 'Fasilitas Gedung' },
            subtitle: { type: 'string', default: 'Standar kenyamanan dan infrastruktur bisnis modern.' },
            enabled: { type: 'boolean', default: true }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            var items = [
                {
                    img: '/BUILDING/lobby-utama.webp',
                    title: 'Grand Double-Height Lobby',
                    desc: 'Lobi megah dengan resepsionis dan sistem verifikasi tamu terpadu.'
                },
                {
                    img: '/LOGO/parking-lift.webp',
                    title: 'Lift Berkecepatan KONE',
                    desc: 'Akses cepat antar lantai dengan zonasi cerdas dan kartu akses privasi.'
                },
                {
                    img: '/security.webp',
                    title: '24/7 Security & CCTV',
                    desc: 'Keamanan perimeter penuh, turnstile access, dan kontrol pengawasan 24 jam.'
                }
            ];

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Fasilitas Gedung', initialOpen: true }, [
                        el(TextControl, { label: 'Judul Section', value: a.title, onChange: function(v) { set({ title: v }); } }),
                        el(TextControl, { label: 'Subjudul', value: a.subtitle, onChange: function(v) { set({ subtitle: v }); } }),
                        el(ToggleControl, { label: 'Tampilkan Section Ini', checked: a.enabled, onChange: function(v) { set({ enabled: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '✨ FASILITAS UNGGULAN GEDUNG'),
                    el('div', { className: 'hq-highlights-wrap' }, [
                        el('div', { style: { textAlign: 'center', maxWidth: '640px', margin: '0 auto' } }, [
                            el(RichText, {
                                tagName: 'h2',
                                className: 'hq-address-title',
                                value: a.title,
                                onChange: function(v) { set({ title: v }); }
                            }),
                            el(RichText, {
                                tagName: 'p',
                                className: 'hq-address-desc',
                                value: a.subtitle,
                                onChange: function(v) { set({ subtitle: v }); }
                            })
                        ]),
                        el('div', { className: 'hq-highlights-grid' }, items.map(function(item, idx) {
                            return el('div', { className: 'hq-highlight-card', key: idx }, [
                                el('img', { src: formatImgUrl(item.img), alt: item.title }),
                                el('div', { className: 'hq-highlight-body' }, [
                                    el('h3', { className: 'hq-highlight-title' }, item.title),
                                    el('p', { className: 'hq-highlight-desc' }, item.desc)
                                ])
                            ]);
                        }))
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 6. SPACES OVERVIEW GRID
    registerBlockType('hq/spaces-grid', {
        title: 'Pilihan Ruang (Spaces Overview)',
        icon: 'grid-view',
        category: 'hquarters',
        attributes: {
            title: { type: 'string', default: 'Pilihan Ruang Bisnis Sesuai Kebutuhan Anda' },
            subtitle: { type: 'string', default: 'SOHO Duplex, Premium Office, Function Room, Serviced & Virtual Office.' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            var spaces = [
                {
                    img: '/soho_office.webp',
                    badge: '2 Lantai Fungsional',
                    title: 'SOHO Duplex',
                    desc: 'Fleksibilitas kerja profesional dan hunian privat dalam satu unit.',
                    price: 'Hubungi Tim Leasing'
                },
                {
                    img: '/premium_office.webp',
                    badge: 'Korporat Eksklusif',
                    title: 'Premium Office',
                    desc: 'Lantai representatif 120-450 m² untuk tim 15 hingga 150+ anggota.',
                    price: 'Unit Tersedia'
                },
                {
                    img: '/serviced_office.webp',
                    badge: 'Langsung Pakai',
                    title: 'Serviced Office',
                    desc: 'Furnished lengkap, internet kecepatan tinggi, dan ruang rapat terpadu.',
                    price: 'Mulai Rp 2.500.000 / bln'
                },
                {
                    img: '/virtual_office.webp',
                    badge: 'Legalitas Bisnis',
                    title: 'Virtual Office',
                    desc: 'Alamat komersial CBD prestisius untuk pendirian legalitas usaha Anda.',
                    price: 'Mulai Rp 450.000 / bln'
                }
            ];

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Pilihan Ruang', initialOpen: true }, [
                        el(TextControl, { label: 'Judul Utama', value: a.title, onChange: function(v) { set({ title: v }); } }),
                        el(TextareaControl, { label: 'Subjudul', value: a.subtitle, onChange: function(v) { set({ subtitle: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '🏢 PILIHAN RUANG BISNIS'),
                    el('div', { className: 'hq-spaces-wrap' }, [
                        el('div', { style: { textAlign: 'center', maxWidth: '680px', margin: '0 auto' } }, [
                            el(RichText, {
                                tagName: 'h2',
                                className: 'hq-address-title',
                                value: a.title,
                                onChange: function(v) { set({ title: v }); }
                            }),
                            el(RichText, {
                                tagName: 'p',
                                className: 'hq-address-desc',
                                value: a.subtitle,
                                onChange: function(v) { set({ subtitle: v }); }
                            })
                        ]),
                        el('div', { className: 'hq-spaces-grid' }, spaces.map(function(s, idx) {
                            return el('div', { className: 'hq-space-card', key: idx }, [
                                el('img', { src: formatImgUrl(s.img), alt: s.title }),
                                el('div', { className: 'hq-space-body' }, [
                                    el('span', { className: 'hq-space-badge' }, s.badge),
                                    el('h4', { className: 'hq-space-title' }, s.title),
                                    el('p', { className: 'hq-space-desc' }, s.desc),
                                    el('div', { className: 'hq-space-price' }, s.price)
                                ])
                            ]);
                        }))
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 7. SOHO SPECS & DETAILS
    registerBlockType('hq/soho-specs', {
        title: 'Detail Spesifikasi & Denah SOHO',
        icon: 'admin-home',
        category: 'hquarters',
        attributes: {
            headline: { type: 'string', default: 'Dua fungsi dalam satu unit' },
            headlineDesc: { type: 'string', default: 'Tata ruang fungsional yang menggabungkan area kerja profesional dan hunian privat.' },
            price: { type: 'string', default: 'Hubungi Tim Leasing' },
            availability: { type: 'string', default: 'Unit Terbatas' },
            specSqm: { type: 'string', default: '80 - 120 m²' },
            specFloor: { type: 'string', default: 'Lantai 3-16' },
            specPower: { type: 'string', default: '5.500 - 11.000 VA' },
            specCeiling: { type: 'string', default: '3.2 Meter' },
            heroImg: { type: 'string', default: '/soho_office.webp' },
            floorplanImg: { type: 'string', default: '' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Harga & Ketersediaan SOHO', initialOpen: true }, [
                        el(TextControl, { label: 'Teks Harga', value: a.price, onChange: function(v) { set({ price: v }); } }),
                        el(SelectControl, {
                            label: 'Status Ketersediaan',
                            value: a.availability,
                            options: [
                                { label: 'Tersedia', value: 'Tersedia' },
                                { label: 'Unit Terbatas', value: 'Unit Terbatas' },
                                { label: 'Sold Out', value: 'Sold Out' }
                            ],
                            onChange: function(v) { set({ availability: v }); }
                        }),
                        el(TextControl, { label: 'Headline', value: a.headline, onChange: function(v) { set({ headline: v }); } }),
                        el(TextareaControl, { label: 'Deskripsi', value: a.headlineDesc, onChange: function(v) { set({ headlineDesc: v }); } })
                    ]),
                    el(PanelBody, { title: 'Spesifikasi Teknis', initialOpen: false }, [
                        el(TextControl, { label: 'Ukuran Unit', value: a.specSqm, onChange: function(v) { set({ specSqm: v }); } }),
                        el(TextControl, { label: 'Lantai', value: a.specFloor, onChange: function(v) { set({ specFloor: v }); } }),
                        el(TextControl, { label: 'Daya Listrik', value: a.specPower, onChange: function(v) { set({ specPower: v }); } }),
                        el(TextControl, { label: 'Tinggi Plafon', value: a.specCeiling, onChange: function(v) { set({ specCeiling: v }); } }),
                        el(TextControl, { label: 'URL Foto Suite', value: a.heroImg, onChange: function(v) { set({ heroImg: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '🛋️ SPESIFIKASI SOHO DUPLEX'),
                    el('div', { className: 'hq-specs-wrap' }, [
                        el('div', { className: 'hq-specs-topbar' }, [
                            el('span', { className: 'hq-status-badge' }, '● ' + (a.availability || 'Unit Terbatas')),
                            el('span', { className: 'hq-price-tag' }, a.price || 'Hubungi Tim Leasing')
                        ]),
                        el(RichText, {
                            tagName: 'h2',
                            className: 'hq-address-title',
                            value: a.headline,
                            onChange: function(v) { set({ headline: v }); }
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'hq-address-desc',
                            value: a.headlineDesc,
                            onChange: function(v) { set({ headlineDesc: v }); }
                        }),
                        el('div', { className: 'hq-specs-grid' }, [
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, a.specSqm || '80-120 m²'),
                                el('div', { className: 'hq-spec-lbl' }, 'Luas Unit')
                            ]),
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, a.specFloor || 'Lantai 3-16'),
                                el('div', { className: 'hq-spec-lbl' }, 'Zona Lantai')
                            ]),
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, a.specPower || '5.500 VA'),
                                el('div', { className: 'hq-spec-lbl' }, 'Daya Listrik')
                            ]),
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, a.specCeiling || '3.2 M'),
                                el('div', { className: 'hq-spec-lbl' }, 'Tinggi Plafon')
                            ])
                        ]),
                        el('img', {
                            className: 'hq-specs-preview-img',
                            src: formatImgUrl(a.heroImg || '/soho_office.webp'),
                            alt: 'SOHO Office Preview'
                        })
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 8. PREMIUM OFFICE SPECS
    registerBlockType('hq/premium-specs', {
        title: 'Detail Spesifikasi Premium Office',
        icon: 'building',
        category: 'hquarters',
        attributes: {
            headline: { type: 'string', default: 'Perusahaan Telah Bertumbuh. Saatnya Kantor Anda Berkembang.' },
            headlineDesc: { type: 'string', default: 'Kantor korporat representatif di CBD Asia Afrika.' },
            price: { type: 'string', default: 'Hubungi Tim Leasing' },
            availability: { type: 'string', default: 'Tersedia' },
            specSqm: { type: 'string', default: '120 - 450 m²' },
            specFloorload: { type: 'string', default: '250 kg/m²' },
            specCeiling: { type: 'string', default: '3.6 Meter' },
            heroImg: { type: 'string', default: '/premium_office.webp' },
            floorplanImg: { type: 'string', default: '' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Harga & Status', initialOpen: true }, [
                        el(TextControl, { label: 'Harga Mulai', value: a.price, onChange: function(v) { set({ price: v }); } }),
                        el(SelectControl, {
                            label: 'Status Ketersediaan',
                            value: a.availability,
                            options: [
                                { label: 'Tersedia', value: 'Tersedia' },
                                { label: 'Unit Terbatas', value: 'Unit Terbatas' }
                            ],
                            onChange: function(v) { set({ availability: v }); }
                        }),
                        el(TextControl, { label: 'Headline', value: a.headline, onChange: function(v) { set({ headline: v }); } }),
                        el(TextareaControl, { label: 'Deskripsi', value: a.headlineDesc, onChange: function(v) { set({ headlineDesc: v }); } }),
                        el(TextControl, { label: 'Luas Lantai', value: a.specSqm, onChange: function(v) { set({ specSqm: v }); } }),
                        el(TextControl, { label: 'Beban Lantai', value: a.specFloorload, onChange: function(v) { set({ specFloorload: v }); } }),
                        el(TextControl, { label: 'Tinggi Plafon', value: a.specCeiling, onChange: function(v) { set({ specCeiling: v }); } }),
                        el(TextControl, { label: 'URL Foto Suite', value: a.heroImg, onChange: function(v) { set({ heroImg: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '💼 SPESIFIKASI PREMIUM OFFICE'),
                    el('div', { className: 'hq-specs-wrap' }, [
                        el('div', { className: 'hq-specs-topbar' }, [
                            el('span', { className: 'hq-status-badge' }, '● ' + (a.availability || 'Tersedia')),
                            el('span', { className: 'hq-price-tag' }, a.price || 'Hubungi Tim Leasing')
                        ]),
                        el(RichText, {
                            tagName: 'h2',
                            className: 'hq-address-title',
                            value: a.headline,
                            onChange: function(v) { set({ headline: v }); }
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'hq-address-desc',
                            value: a.headlineDesc,
                            onChange: function(v) { set({ headlineDesc: v }); }
                        }),
                        el('div', { className: 'hq-specs-grid' }, [
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, a.specSqm || '120-450 m²'),
                                el('div', { className: 'hq-spec-lbl' }, 'Luas Unit')
                            ]),
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, a.specCeiling || '3.6 M'),
                                el('div', { className: 'hq-spec-lbl' }, 'Tinggi Plafon')
                            ]),
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, a.specFloorload || '250 kg/m²'),
                                el('div', { className: 'hq-spec-lbl' }, 'Beban Lantai')
                            ]),
                            el('div', { className: 'hq-spec-box' }, [
                                el('div', { className: 'hq-spec-val' }, 'Dedicated'),
                                el('div', { className: 'hq-spec-lbl' }, 'KONE Lift')
                            ])
                        ]),
                        el('img', {
                            className: 'hq-specs-preview-img',
                            src: formatImgUrl(a.heroImg || '/premium_office.webp'),
                            alt: 'Premium Office Suite Preview'
                        })
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 9. FUNCTION ROOM SPECS
    registerBlockType('hq/function-room-specs', {
        title: 'Function Room & Layout Kapasitas',
        icon: 'megaphone',
        category: 'hquarters',
        attributes: {
            heroTitle: { type: 'string', default: 'Function Room & Ruang Konferensi Modern' },
            price: { type: 'string', default: 'Mulai Rp 1.500.000 / Jam' },
            capTheatre: { type: 'string', default: 'Hingga 280 Pax' },
            capClassroom: { type: 'string', default: 'Hingga 140 Pax' },
            capUshape: { type: 'string', default: 'Hingga 70 Pax' },
            capRoundtable: { type: 'string', default: 'Hingga 120 Pax' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Layout Function Room', initialOpen: true }, [
                        el(TextControl, { label: 'Judul Utama', value: a.heroTitle, onChange: function(v) { set({ heroTitle: v }); } }),
                        el(TextControl, { label: 'Harga Sewa', value: a.price, onChange: function(v) { set({ price: v }); } }),
                        el(TextControl, { label: 'Theatre Setup', value: a.capTheatre, onChange: function(v) { set({ capTheatre: v }); } }),
                        el(TextControl, { label: 'Classroom Setup', value: a.capClassroom, onChange: function(v) { set({ capClassroom: v }); } }),
                        el(TextControl, { label: 'U-Shape Setup', value: a.capUshape, onChange: function(v) { set({ capUshape: v }); } }),
                        el(TextControl, { label: 'Round Table Banquet', value: a.capRoundtable, onChange: function(v) { set({ capRoundtable: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '🎤 FUNCTION ROOM & EVENT SPACE'),
                    el('div', { className: 'hq-specs-wrap' }, [
                        el('div', { className: 'hq-specs-topbar' }, [
                            el('span', { className: 'hq-status-badge' }, '● Ruang Serbaguna & Konferensi'),
                            el('span', { className: 'hq-price-tag' }, a.price || 'Mulai Rp 1.500.000 / Jam')
                        ]),
                        el(RichText, {
                            tagName: 'h2',
                            className: 'hq-address-title',
                            value: a.heroTitle,
                            onChange: function(v) { set({ heroTitle: v }); }
                        }),
                        el('div', { className: 'hq-cap-grid' }, [
                            el('div', { className: 'hq-cap-card' }, [
                                el('div', { className: 'hq-cap-icon' }, '🎭'),
                                el('div', { className: 'hq-cap-val' }, a.capTheatre || '280 Pax'),
                                el('div', { className: 'hq-cap-lbl' }, 'Theatre')
                            ]),
                            el('div', { className: 'hq-cap-card' }, [
                                el('div', { className: 'hq-cap-icon' }, '📚'),
                                el('div', { className: 'hq-cap-val' }, a.capClassroom || '140 Pax'),
                                el('div', { className: 'hq-cap-lbl' }, 'Classroom')
                            ]),
                            el('div', { className: 'hq-cap-card' }, [
                                el('div', { className: 'hq-cap-icon' }, '👥'),
                                el('div', { className: 'hq-cap-val' }, a.capUshape || '70 Pax'),
                                el('div', { className: 'hq-cap-lbl' }, 'U-Shape')
                            ]),
                            el('div', { className: 'hq-cap-card' }, [
                                el('div', { className: 'hq-cap-icon' }, '🍽️'),
                                el('div', { className: 'hq-cap-val' }, a.capRoundtable || '120 Pax'),
                                el('div', { className: 'hq-cap-lbl' }, 'Banquet')
                            ])
                        ]),
                        el('img', {
                            className: 'hq-specs-preview-img',
                            src: formatImgUrl('/ballroom.webp'),
                            alt: 'Function Room Ballroom'
                        })
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 10. SERVICED & VIRTUAL OFFICE SPECS
    registerBlockType('hq/serviced-specs', {
        title: 'Serviced & Virtual Office Specs',
        icon: 'desktop',
        category: 'hquarters',
        attributes: {
            soHeadline: { type: 'string', default: 'Ruang yang Siap Operasional Sejak Hari Pertama' },
            soPrice: { type: 'string', default: 'Mulai Rp 2.500.000 / Pax / Bulan' },
            voHeadline: { type: 'string', default: 'Alamat Bisnis yang Membangun Kepercayaan' },
            voPrice: { type: 'string', default: 'Mulai Rp 450.000 / Bulan' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Serviced Office', initialOpen: true }, [
                        el(TextControl, { label: 'Headline Serviced Office', value: a.soHeadline, onChange: function(v) { set({ soHeadline: v }); } }),
                        el(TextControl, { label: 'Harga Mulai', value: a.soPrice, onChange: function(v) { set({ soPrice: v }); } })
                    ]),
                    el(PanelBody, { title: 'Virtual Office', initialOpen: false }, [
                        el(TextControl, { label: 'Headline Virtual Office', value: a.voHeadline, onChange: function(v) { set({ voHeadline: v }); } }),
                        el(TextControl, { label: 'Harga Mulai', value: a.voPrice, onChange: function(v) { set({ voPrice: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '🖥️ SERVICED & VIRTUAL OFFICE'),
                    el('div', { className: 'hq-dual-specs-wrap' }, [
                        el('div', { className: 'hq-dual-card' }, [
                            el('img', { src: formatImgUrl('/serviced_office.webp'), alt: 'Serviced Office' }),
                            el('span', { className: 'hq-status-badge' }, 'Furnished & Ready'),
                            el('h3', { className: 'hq-highlight-title', style: { marginTop: '12px' } }, 'Serviced Office'),
                            el(RichText, {
                                tagName: 'p',
                                className: 'hq-highlight-desc',
                                value: a.soHeadline,
                                onChange: function(v) { set({ soHeadline: v }); }
                            }),
                            el('div', { className: 'hq-price-tag', style: { marginTop: '14px' } }, a.soPrice)
                        ]),
                        el('div', { className: 'hq-dual-card' }, [
                            el('img', { src: formatImgUrl('/virtual_office.webp'), alt: 'Virtual Office' }),
                            el('span', { className: 'hq-status-badge' }, 'Legalitas Bisnis CBD'),
                            el('h3', { className: 'hq-highlight-title', style: { marginTop: '12px' } }, 'Virtual Office'),
                            el(RichText, {
                                tagName: 'p',
                                className: 'hq-highlight-desc',
                                value: a.voHeadline,
                                onChange: function(v) { set({ voHeadline: v }); }
                            }),
                            el('div', { className: 'hq-price-tag', style: { marginTop: '14px' } }, a.voPrice)
                        ])
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 11. FAQ ACCORDION
    registerBlockType('hq/faq', {
        title: 'Tanya Jawab (FAQ Accordion)',
        icon: 'editor-help',
        category: 'hquarters',
        attributes: {
            title: { type: 'string', default: 'Pertanyaan yang Sering Diajukan' },
            q1: { type: 'string', default: 'Bagaimana prosedur penyewaan kantor di HQuarters?' },
            a1: { type: 'string', default: 'Anda dapat menghubungi tim leasing kami via WhatsApp atau mengisi formulir survei untuk jadwal peninjauan unit.' },
            q2: { type: 'string', default: 'Apakah tersedia opsi sewa fleksibel atau siap pakai?' },
            a2: { type: 'string', default: 'Ya, kami menyediakan Serviced Office yang siap huni (furnished) serta SOHO duplex dan lantai korporat.' },
            q3: { type: 'string', default: 'Apa saja fasilitas pendukung di gedung HQuarters?' },
            a3: { type: 'string', default: 'Gedung dilengkapi lift berkecepatan tinggi KONE, gym & kolam renang rooftop, area lounge, keamanan 24 jam, dan parkir luas.' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Daftar Pertanyaan FAQ', initialOpen: true }, [
                        el(TextControl, { label: 'Judul Section', value: a.title, onChange: function(v) { set({ title: v }); } }),
                        el(TextControl, { label: 'Pertanyaan 1', value: a.q1, onChange: function(v) { set({ q1: v }); } }),
                        el(TextareaControl, { label: 'Jawaban 1', value: a.a1, onChange: function(v) { set({ a1: v }); } }),
                        el(TextControl, { label: 'Pertanyaan 2', value: a.q2, onChange: function(v) { set({ q2: v }); } }),
                        el(TextareaControl, { label: 'Jawaban 2', value: a.a2, onChange: function(v) { set({ a2: v }); } }),
                        el(TextControl, { label: 'Pertanyaan 3', value: a.q3, onChange: function(v) { set({ q3: v }); } }),
                        el(TextareaControl, { label: 'Jawaban 3', value: a.a3, onChange: function(v) { set({ a3: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '❓ TANYA JAWAB (FAQ)'),
                    el('div', { className: 'hq-faq-wrap' }, [
                        el('div', { style: { textAlign: 'center', marginBottom: '28px' } }, [
                            el(RichText, {
                                tagName: 'h2',
                                className: 'hq-address-title',
                                value: a.title,
                                onChange: function(v) { set({ title: v }); }
                            })
                        ]),
                        el('div', { className: 'hq-faq-item' }, [
                            el('div', { className: 'hq-faq-q' }, [
                                el(RichText, { tagName: 'span', value: a.q1, onChange: function(v) { set({ q1: v }); } }),
                                el('span', { style: { color: '#EA8E18', fontSize: '18px' } }, '▾')
                            ]),
                            el(RichText, { tagName: 'div', className: 'hq-faq-a', value: a.a1, onChange: function(v) { set({ a1: v }); } })
                        ]),
                        el('div', { className: 'hq-faq-item' }, [
                            el('div', { className: 'hq-faq-q' }, [
                                el(RichText, { tagName: 'span', value: a.q2, onChange: function(v) { set({ q2: v }); } }),
                                el('span', { style: { color: '#EA8E18', fontSize: '18px' } }, '▾')
                            ]),
                            el(RichText, { tagName: 'div', className: 'hq-faq-a', value: a.a2, onChange: function(v) { set({ a2: v }); } })
                        ]),
                        el('div', { className: 'hq-faq-item' }, [
                            el('div', { className: 'hq-faq-q' }, [
                                el(RichText, { tagName: 'span', value: a.q3, onChange: function(v) { set({ q3: v }); } }),
                                el('span', { style: { color: '#EA8E18', fontSize: '18px' } }, '▾')
                            ]),
                            el(RichText, { tagName: 'div', className: 'hq-faq-a', value: a.a3, onChange: function(v) { set({ a3: v }); } })
                        ])
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 12. GALLERY SECTION
    registerBlockType('hq/gallery', {
        title: 'Galeri Fasilitas Gedung',
        icon: 'format-gallery',
        category: 'hquarters',
        attributes: {
            title: { type: 'string', default: 'Galeri Fasilitas & Kenyamanan Gedung' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            var photos = [
                { src: '/rooftop_pool.webp', caption: 'Rooftop Swimming Pool' },
                { src: '/BUILDING/gym%2001.webp', caption: 'Fitness & Gym Center' },
                { src: '/BUILDING/executive-lounge.webp', caption: 'Executive Lounge' },
                { src: '/BUILDING/sky-terrace-deck.webp', caption: 'Sky Terrace Panorama' }
            ];

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Pengaturan Galeri', initialOpen: true }, [
                        el(TextControl, { label: 'Judul Galeri', value: a.title, onChange: function(v) { set({ title: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '🖼️ GALERI FASILITAS GEDUNG'),
                    el('div', { className: 'hq-gallery-wrap' }, [
                        el('div', { style: { textAlign: 'center' } }, [
                            el(RichText, {
                                tagName: 'h2',
                                className: 'hq-address-title',
                                value: a.title,
                                onChange: function(v) { set({ title: v }); }
                            })
                        ]),
                        el('div', { className: 'hq-gallery-grid' }, photos.map(function(p, i) {
                            return el('div', { className: 'hq-gallery-item', key: i }, [
                                el('img', { src: formatImgUrl(p.src), alt: p.caption }),
                                el('div', { className: 'hq-gallery-caption' }, p.caption)
                            ]);
                        }))
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

    // 13. CTA BANNER
    registerBlockType('hq/cta', {
        title: 'Banner CTA Konsultasi Ruang',
        icon: 'megaphone',
        category: 'hquarters',
        attributes: {
            titlePrefix: { type: 'string', default: 'Sedang mencari ruang ' },
            titleHighlight: { type: 'string', default: 'untuk bisnis?' },
            description: { type: 'string', default: 'Sampaikan jenis ruang yang Anda butuhkan. Tim HQuarters siap membantu memberikan informasi ketersediaan unit.' },
            buttonText: { type: 'string', default: 'Hubungi HQuarters' }
        },
        edit: function(props) {
            var a = props.attributes;
            var set = props.setAttributes;
            var blockProps = useBlockProps({ className: 'hq-visual-section' });

            return el(Fragment, {}, [
                el(InspectorControls, {}, [
                    el(PanelBody, { title: 'Konten Banner CTA', initialOpen: true }, [
                        el(TextControl, { label: 'Teks Awalan Judul', value: a.titlePrefix, onChange: function(v) { set({ titlePrefix: v }); } }),
                        el(TextControl, { label: 'Teks Highlight (Oranye)', value: a.titleHighlight, onChange: function(v) { set({ titleHighlight: v }); } }),
                        el(TextareaControl, { label: 'Deskripsi Paragraf', value: a.description, onChange: function(v) { set({ description: v }); } }),
                        el(TextControl, { label: 'Teks Tombol Aksi', value: a.buttonText, onChange: function(v) { set({ buttonText: v }); } })
                    ])
                ]),
                el('div', blockProps, [
                    el('div', { className: 'hq-section-tag' }, '📣 BANNER CTA KONSULTASI'),
                    el('div', { className: 'hq-cta-wrap' }, [
                        el('h2', { className: 'hq-cta-title' }, [
                            el(RichText, {
                                tagName: 'span',
                                value: a.titlePrefix,
                                onChange: function(v) { set({ titlePrefix: v }); }
                            }),
                            ' ',
                            el('span', { className: 'hq-highlight-text' }, a.titleHighlight || 'untuk bisnis?')
                        ]),
                        el(RichText, {
                            tagName: 'p',
                            className: 'hq-cta-desc',
                            value: a.description,
                            onChange: function(v) { set({ description: v }); }
                        }),
                        el('div', { style: { display: 'flex', justifyContent: 'center' } }, [
                            el('a', { href: '#', className: 'hq-btn-primary' }, [
                                (a.buttonText || 'Hubungi HQuarters'), ' →'
                            ])
                        ])
                    ])
                ])
            ]);
        },
        save: function() { return null; }
    });

})(window.wp);
