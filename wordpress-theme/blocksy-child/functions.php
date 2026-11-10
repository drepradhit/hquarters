<?php
/**
 * Blocksy Child Theme functions and definitions
 * Includes HQuarters Headless CMS, Media Library Integration, Page Meta Boxes,
 * Revisions/Rollback System, Yoast SEO REST API, Article Enhancements & 301 Redirects.
 */

// Enqueue styles & Google Fonts
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style(
        'hq-google-fonts',
        'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
        [],
        null
    );
    wp_enqueue_style('child-style', get_stylesheet_uri(), ['parent-style', 'hq-google-fonts'], '20261106v1');
});

// =========================================================================
// 1. SEO 301 REDIRECTS (Brief Implementasi Halaman Artikel Hal. 18-19)
// =========================================================================
add_action('template_redirect', function () {
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    $path = trim(parse_url($request_uri, PHP_URL_PATH), '/');

    // Redirect /blog, /id/insights, /en/insights -> /insights/
    if (in_array($path, ['blog', 'updates', 'id/insights', 'en/insights'], true)) {
        wp_redirect(home_url('/insights/'), 301);
        exit;
    }

    // 9 URL Mappings from Brief Hal. 19
    $article_slugs = [
        '6012' => '/studio-foto-senjakara-jadi-salah-satu-tenant-di-hquarters/',
        '5522' => '/garuda-indonesia-resmi-buka-kantor-penjualan-di-hquarters/',
        '5423' => '/7-alasan-bisnis-kreatif-edukasi-cocok-sewa-kantor-di-bandung-cbd/',
        '5355' => '/sewa-ruang-kantor-bandung-pilihan-alternatif-selain-jakarta/',
        '3758' => '/elemen-penting-dalam-perencanaan-design-untuk-ruang-kantor/',
        '3483' => '/7-tips-design-ruang-kantor-yang-fungsional-dan-nyaman/',
        '3369' => '/8-tips-desain-ruang-kantor-kecil-minimalis-yang-efektif/',
        '2806' => '/msig-indonesia-pilihan-tepat-berkantor-di-pusat-bisnis/',
        '2840' => '/wajib-tahu-7-tips-memilih-lokasi-kantor-terbaik-bagi-perusahaan/',
    ];

    foreach ($article_slugs as $id => $slug) {
        if ($path === "id/insights/{$id}" || $path === "en/insights/{$id}" || $path === "insights/{$id}") {
            wp_redirect(home_url($slug), 301);
            exit;
        }
    }
});

// =========================================================================
// 2. SINGLE POST & INSIGHTS ENHANCEMENTS
// =========================================================================
add_action('wp_footer', function () {
    if (is_single()) {
        $post_title = get_the_title();
        $global_opts = get_option('hq_copy_global', []);
        $wa_num = !empty($global_opts['global_whatsapp']) ? preg_replace('/[^0-9]/', '', $global_opts['global_whatsapp']) : '628111908319';
        $wa_prefill = rawurlencode('Halo, saya baca artikel "' . $post_title . '" dan ingin tanya soal kantor di HQuarters.');
        $wa_link = 'https://wa.me/' . $wa_num . '?text=' . $wa_prefill;
        ?>
        <!-- Reading Progress Bar -->
        <div id="hq-reading-progress" style="position:fixed;top:0;left:0;height:4px;width:0%;background-color:#B45F06;z-index:999999;transition:width 0.1s linear;"></div>

        <!-- Mobile Bottom Sticky Bar -->
        <div id="hq-article-mobile-bar" style="display:none;" class="hq-mobile-only-bar">
            <a href="<?php echo esc_url($wa_link); ?>" target="_blank" rel="noopener noreferrer" id="btn-article-bar-wa" class="hq-btn-wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <span>Chat WhatsApp</span>
            </a>
            <button id="btn-article-share" class="hq-btn-share" onclick="hqShareArticle()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
        </div>

        <script>
        window.addEventListener('scroll', function() {
            var docElem = document.documentElement;
            var docBody = document.body;
            var scrollTop = docElem['scrollTop'] || docBody['scrollTop'];
            var scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight;
            var scrollPercent = scrollBottom > 0 ? (scrollTop / scrollBottom) * 100 : 0;
            var bar = document.getElementById('hq-reading-progress');
            if (bar) bar.style.width = scrollPercent + '%';
        });

        function hqShareArticle() {
            if (navigator.share) {
                navigator.share({
                    title: <?php echo json_encode($post_title); ?>,
                    url: window.location.href
                }).catch(function(){});
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Tautan artikel berhasil disalin!');
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            var sideLinks = document.querySelectorAll('.elementor-widget-container a[href*="wa.me"], aside a[href*="wa.me"]');
            if (sideLinks.length > 0 && !document.getElementById('btn-article-side-wa')) {
                sideLinks[0].id = 'btn-article-side-wa';
                if (!sideLinks[0].href.includes('text=')) {
                    sideLinks[0].href = <?php echo json_encode($wa_link); ?>;
                }
            }

            var allWaLinks = document.querySelectorAll('a[href*="wa.me"]');
            if (allWaLinks.length > 1) {
                var lastWa = allWaLinks[allWaLinks.length - 1];
                if (!lastWa.id && lastWa.id !== 'btn-article-bar-wa') {
                    lastWa.id = 'btn-article-end-wa';
                    if (!lastWa.href.includes('text=')) {
                        lastWa.href = <?php echo json_encode($wa_link); ?>;
                    }
                }
            }

            var productLinks = document.querySelectorAll('a[href*="/spaces/"], a[href*="/soho"], a[href*="/premium-office"]');
            productLinks.forEach(function(el) {
                if (!el.id) el.id = 'btn-article-product';
            });
        });
        </script>
        <?php
    } elseif (is_page('insights') || is_page(6471)) {
        ?>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            var h1s = document.querySelectorAll('h1.elementor-heading-title');
            h1s.forEach(function(h1) {
                if (h1.innerText.includes('Ruang Lebih Baik')) {
                    h1.innerHTML = 'Artikel dan Informasi <span style="color:#EA8E18;">Ruang Bisnis</span>';
                }
            });

            var waLinks = document.querySelectorAll('a[href*="wa.me"]');
            waLinks.forEach(function(link) {
                if (!link.id) link.id = 'btn-insights-cta-wa';
            });
        });
        </script>
        <?php
    }
});

// =========================================================================
// 3. ADMIN ASSETS: WordPress Media Library & Custom Picker
// =========================================================================
add_action('admin_enqueue_scripts', function ($hook) {
    if (strpos($hook, 'hquarters-cms') !== false || $hook === 'post.php' || $hook === 'post-new.php') {
        wp_enqueue_media();
        add_action('admin_footer', 'hq_admin_media_picker_script');
    }
});

function hq_admin_media_picker_script() {
    ?>
    <script>
    jQuery(document).ready(function($) {
        $(document).on('click', '.hq-media-btn', function(e) {
            e.preventDefault();
            var btn = $(this);
            var targetInputId = btn.data('target');
            var previewId = btn.data('preview');

            var mediaFrame = wp.media({
                title: 'Pilih Gambar dari Media Library HQuarters',
                button: { text: 'Gunakan Gambar Ini' },
                multiple: false
            });

            mediaFrame.on('select', function() {
                var attachment = mediaFrame.state().get('selection').first().toJSON();
                $('#' + targetInputId).val(attachment.url).trigger('change');
                if (previewId && $('#' + previewId).length) {
                    $('#' + previewId).attr('src', attachment.url).show();
                }
            });

            mediaFrame.open();
        });

        $(document).on('click', '.hq-media-clear-btn', function(e) {
            e.preventDefault();
            var targetInputId = $(this).data('target');
            var previewId = $(this).data('preview');
            $('#' + targetInputId).val('').trigger('change');
            if (previewId && $('#' + previewId).length) {
                $('#' + previewId).hide().attr('src', '');
            }
        });
    });
    </script>
    <?php
}

// =========================================================================
// 4. INTEGRASI MENU PAGES WORDPRESS (Row Action & Meta Box)
// =========================================================================

// Tambah link "⚡ Edit Konten HQuarters" di daftar Pages (edit.php?post_type=page)
add_filter('page_row_actions', function ($actions, $post) {
    $slug = $post->post_name;
    $is_en = (strpos($slug, '-en') !== false || $slug === 'home-en');
    $tab = $is_en ? 'en' : 'id';
    
    $clean_slug = str_replace('-en', '', $slug);
    if ($clean_slug === 'hquarters-home' || $clean_slug === 'home') $clean_slug = 'home';

    $url = admin_url('admin.php?page=hquarters-cms&tab=' . $tab . '&section=' . esc_attr($clean_slug));
    $actions['hq_cms'] = '<a href="' . esc_url($url) . '" style="color:#EA8E18;font-weight:bold;">⚡ Edit Konten HQuarters</a>';
    return $actions;
}, 10, 2);

// Daftarkan Meta Box di Halaman Edit Page (post.php)
add_action('add_meta_boxes_page', function () {
    add_meta_box(
        'hq_page_meta_box',
        '🏢 Pengelolaan Konten Website HQuarters (Headless React CMS)',
        'hq_render_page_meta_box',
        'page',
        'normal',
        'high'
    );
});

function hq_render_page_meta_box($post) {
    $slug = $post->post_name;
    $is_en = (strpos($slug, '-en') !== false || $slug === 'home-en');
    $lang = $is_en ? 'en' : 'id';
    $clean_slug = str_replace('-en', '', $slug);
    if ($clean_slug === 'hquarters-home' || $clean_slug === 'home') $clean_slug = 'home';

    $live_url = 'https://hquarters.co.id/' . $lang . '/';
    if ($clean_slug === 'soho') $live_url .= 'spaces/soho';
    elseif ($clean_slug === 'premium-office') $live_url .= 'spaces/premium-office';
    elseif ($clean_slug === 'serviced-office') $live_url .= 'spaces/serviced-office';
    elseif ($clean_slug === 'virtual-office') $live_url .= 'spaces/virtual-office';
    elseif ($clean_slug === 'events') $live_url .= 'events';
    elseif ($clean_slug === 'building') $live_url .= 'building';
    elseif ($clean_slug === 'location') $live_url .= 'location';
    elseif ($clean_slug === 'companies') $live_url .= 'companies';
    elseif ($clean_slug === 'find-space') $live_url .= 'find-space';
    elseif ($clean_slug === 'spaces') $live_url .= 'spaces';

    $cms_url = admin_url('admin.php?page=hquarters-cms&tab=' . $lang . '&section=' . esc_attr($clean_slug));
    ?>
    <div style="padding:12px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
        <div style="background:#f8fafc;border-left:4px solid #EA8E18;padding:12px 16px;border-radius:4px;margin-bottom:15px;">
            <p style="margin:0;font-size:14px;color:#1e293b;">
                Halaman ini terhubung langsung dengan website frontend modern HQuarters (React SPA). Seluruh konten, gambar, denah lantai, spesifikasi, dan harga dikelola melalui <strong>HQuarters CMS</strong> untuk menjamin kecepatan website 99-100/100 dan tampilan interaktif.
            </p>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <a href="<?php echo esc_url($cms_url); ?>" class="button button-primary button-large" style="background:#EA8E18;border-color:#d47e10;font-weight:bold;padding:6px 18px;">
                ⚡ Buka Formulir Lengkap HQuarters CMS (Versi <?php echo strtoupper($lang); ?>)
            </a>
            <a href="<?php echo esc_url($live_url); ?>" target="_blank" class="button button-secondary button-large" style="font-weight:600;">
                🔗 Lihat Halaman Live (<?php echo esc_html($live_url); ?>)
            </a>
        </div>
        <p style="margin-top:10px;font-size:12px;color:#64748b;">
            *Catatan SEO: Judul (SEO Title), Meta Description, dan Focus Keyword yang Anda isi pada kotak <strong>Yoast SEO</strong> di bawah ini otomatis tersinkronisasi ke frontend React.
        </p>
    </div>
    <?php
}

// =========================================================================
// 5. HQUARTERS CMS ADMIN DASHBOARD
// =========================================================================

add_action('admin_menu', function () {
    add_menu_page(
        'HQuarters CMS',
        'HQuarters CMS',
        'edit_pages',
        'hquarters-cms',
        'hq_cms_render_admin_page',
        'dashicons-building',
        3
    );

    add_submenu_page(
        'hquarters-cms',
        '🇮🇩 Versi Indonesia',
        '🇮🇩 Versi Indonesia (/id)',
        'edit_pages',
        'hquarters-cms&tab=id',
        'hq_cms_render_admin_page'
    );

    add_submenu_page(
        'hquarters-cms',
        '🇬🇧 Versi English',
        '🇬🇧 Versi English (/en)',
        'edit_pages',
        'hquarters-cms&tab=en',
        'hq_cms_render_admin_page'
    );

    add_submenu_page(
        'hquarters-cms',
        '⚙️ Global & WhatsApp',
        '⚙️ Global & WhatsApp & Promo',
        'edit_pages',
        'hquarters-cms&tab=global',
        'hq_cms_render_admin_page'
    );

    add_submenu_page(
        'hquarters-cms',
        '🕒 Riwayat Versi',
        '🕒 Riwayat Versi (Restore)',
        'edit_pages',
        'hquarters-cms&tab=history',
        'hq_cms_render_admin_page'
    );

    add_submenu_page(
        'hquarters-cms',
        '📖 Panduan / README',
        '📖 Panduan / README',
        'edit_pages',
        'hquarters-cms&tab=readme',
        'hq_cms_render_admin_page'
    );
});

// Dashboard Widget
add_action('wp_dashboard_setup', function () {
    wp_add_dashboard_widget(
        'hq_cms_readme_widget',
        '🏢 HQuarters CMS — Pusat Pengelolaan Konten Website',
        'hq_render_dashboard_readme_widget'
    );
});

function hq_render_dashboard_readme_widget() {
    ?>
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 4px 0;">
        <p style="font-size:14px;color:#1e293b;line-height:1.5;margin-top:0;">
            Selamat datang di panel admin <strong>HQuarters Business Residence</strong>. Gunakan menu pintasan di bawah untuk mengelola teks, gambar, denah lantai, harga unit, artikel berita, atau membaca panduan lengkap.
        </p>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;margin:16px 0;">
            <a href="admin.php?page=hquarters-cms&tab=id" class="button" style="text-align:center;padding:8px 12px;height:auto;font-weight:600;border-left:4px solid #EA8E18;">
                🇮🇩 Edit Versi Indonesia (/id)
            </a>
            <a href="admin.php?page=hquarters-cms&tab=en" class="button" style="text-align:center;padding:8px 12px;height:auto;font-weight:600;border-left:4px solid #3b82f6;">
                🇬🇧 Edit Versi English (/en)
            </a>
            <a href="admin.php?page=hquarters-cms&tab=global" class="button" style="text-align:center;padding:8px 12px;height:auto;font-weight:600;border-left:4px solid #f59e0b;">
                ⚙️ Global, Promo &amp; WA
            </a>
            <a href="edit.php" class="button" style="text-align:center;padding:8px 12px;height:auto;font-weight:600;border-left:4px solid #10b981;">
                📰 Kelola Artikel (Wawasan)
            </a>
            <a href="admin.php?page=hquarters-cms&tab=history" class="button" style="text-align:center;padding:8px 12px;height:auto;font-weight:600;border-left:4px solid #8b5cf6;">
                🕒 Riwayat &amp; Restore
            </a>
            <a href="admin.php?page=hquarters-cms&tab=readme" class="button button-primary" style="text-align:center;padding:8px 12px;height:auto;font-weight:600;background:#EA8E18;border-color:#d47e10;">
                📖 Buka Panduan / README
            </a>
        </div>
    </div>
    <?php
}

// Render Main CMS Page
function hq_cms_render_admin_page() {
    if (!current_user_can('edit_pages')) {
        wp_die(__('You do not have sufficient permissions to access this page.'));
    }

    $active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'id';
    if (!in_array($active_tab, ['id', 'en', 'global', 'history', 'readme'])) {
        $active_tab = 'id';
    }

    $saved = false;
    $restored = false;

    // Handle Restore Action
    if (isset($_POST['hq_restore_nonce']) && wp_verify_nonce($_POST['hq_restore_nonce'], 'hq_restore_action')) {
        $target_lang = sanitize_text_field($_POST['hq_restore_lang'] ?? '');
        $idx = intval($_POST['hq_restore_index'] ?? -1);
        if (in_array($target_lang, ['id', 'en', 'global']) && $idx >= 0) {
            $history = get_option('hq_copy_history_' . $target_lang, []);
            if (isset($history[$idx]['data'])) {
                update_option('hq_copy_' . $target_lang, $history[$idx]['data']);
                $restored = true;
            }
        }
    }

    // Handle Save Action (Strict Isolation per Tab)
    if (isset($_POST['hq_cms_nonce']) && wp_verify_nonce($_POST['hq_cms_nonce'], 'hq_cms_save_action')) {
        $curr_user = wp_get_current_user()->display_name ?: 'Administrator';
        
        if ($active_tab === 'id' && isset($_POST['hq_copy_id'])) {
            $current_data = get_option('hq_copy_id', []);
            if (!empty($current_data)) {
                $history = get_option('hq_copy_history_id', []);
                array_unshift($history, [
                    'time' => time(),
                    'date' => current_time('mysql'),
                    'user' => $curr_user,
                    'data' => $current_data
                ]);
                update_option('hq_copy_history_id', array_slice($history, 0, 10));
            }
            update_option('hq_copy_id', wp_unslash($_POST['hq_copy_id']));
            $saved = true;
        } elseif ($active_tab === 'en' && isset($_POST['hq_copy_en'])) {
            $current_data = get_option('hq_copy_en', []);
            if (!empty($current_data)) {
                $history = get_option('hq_copy_history_en', []);
                array_unshift($history, [
                    'time' => time(),
                    'date' => current_time('mysql'),
                    'user' => $curr_user,
                    'data' => $current_data
                ]);
                update_option('hq_copy_history_en', array_slice($history, 0, 10));
            }
            update_option('hq_copy_en', wp_unslash($_POST['hq_copy_en']));
            $saved = true;
        } elseif ($active_tab === 'global' && isset($_POST['hq_copy_global'])) {
            $current_data = get_option('hq_copy_global', []);
            if (!empty($current_data)) {
                $history = get_option('hq_copy_history_global', []);
                array_unshift($history, [
                    'time' => time(),
                    'date' => current_time('mysql'),
                    'user' => $curr_user,
                    'data' => $current_data
                ]);
                update_option('hq_copy_history_global', array_slice($history, 0, 10));
            }
            update_option('hq_copy_global', wp_unslash($_POST['hq_copy_global']));
            $saved = true;
        }
    }

    $copy_id = get_option('hq_copy_id', []);
    $copy_en = get_option('hq_copy_en', []);
    $copy_global = get_option('hq_copy_global', []);
    ?>
    <div class="wrap" style="max-width: 1100px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="display:flex;align-items:center;gap:12px;margin-bottom:20px;font-size:26px;">
            <span class="dashicons dashicons-building" style="font-size:32px;width:32px;height:32px;color:#EA8E18;"></span>
            HQuarters Content &amp; Media CMS
        </h1>

        <?php if ($saved): ?>
            <div class="notice notice-success is-dismissible" style="border-left-color:#EA8E18;padding:12px 16px;background:#fff;">
                <p style="margin:0;font-size:14px;color:#1e293b;">
                    <strong>✅ Perubahan berhasil disimpan!</strong> Frontend live website langsung terupdate secara instan. Riwayat versi tersimpan otomatis.
                </p>
            </div>
        <?php endif; ?>

        <?php if ($restored): ?>
            <div class="notice notice-warning is-dismissible" style="border-left-color:#8b5cf6;padding:12px 16px;background:#fff;">
                <p style="margin:0;font-size:14px;color:#1e293b;">
                    <strong>🔄 Versi berhasil dipulihkan (Restored)!</strong> Konten telah dikembalikan ke kondisi sebelumnya.
                </p>
            </div>
        <?php endif; ?>

        <!-- TAB NAVIGATION -->
        <h2 class="nav-tab-wrapper" style="margin-bottom:24px;border-bottom:2px solid #cbd5e1;">
            <a href="?page=hquarters-cms&tab=id" class="nav-tab <?php echo $active_tab === 'id' ? 'nav-tab-active' : ''; ?>" style="<?php echo $active_tab === 'id' ? 'background:#fff;border-bottom-color:#fff;font-weight:bold;color:#EA8E18;' : ''; ?>">
                🇮🇩 Versi Indonesia (/id)
            </a>
            <a href="?page=hquarters-cms&tab=en" class="nav-tab <?php echo $active_tab === 'en' ? 'nav-tab-active' : ''; ?>" style="<?php echo $active_tab === 'en' ? 'background:#fff;border-bottom-color:#fff;font-weight:bold;color:#3b82f6;' : ''; ?>">
                🇬🇧 Versi English (/en)
            </a>
            <a href="?page=hquarters-cms&tab=global" class="nav-tab <?php echo $active_tab === 'global' ? 'nav-tab-active' : ''; ?>" style="<?php echo $active_tab === 'global' ? 'background:#fff;border-bottom-color:#fff;font-weight:bold;color:#f59e0b;' : ''; ?>">
                ⚙️ Global, WA &amp; Promo
            </a>
            <a href="?page=hquarters-cms&tab=history" class="nav-tab <?php echo $active_tab === 'history' ? 'nav-tab-active' : ''; ?>" style="<?php echo $active_tab === 'history' ? 'background:#fff;border-bottom-color:#fff;font-weight:bold;color:#8b5cf6;' : ''; ?>">
                🕒 Riwayat &amp; Restore
            </a>
            <a href="?page=hquarters-cms&tab=readme" class="nav-tab <?php echo $active_tab === 'readme' ? 'nav-tab-active' : ''; ?>" style="<?php echo $active_tab === 'readme' ? 'background:#fff;border-bottom-color:#fff;font-weight:bold;color:#0f172a;' : ''; ?>">
                📖 Panduan &amp; Jawaban Client (README)
            </a>
        </h2>

        <?php if ($active_tab === 'readme'): ?>
            <?php hq_render_readme_tab(); ?>
        <?php elseif ($active_tab === 'history'): ?>
            <?php hq_render_history_tab(); ?>
        <?php elseif ($active_tab === 'global'): ?>
            <form method="post" action="?page=hquarters-cms&tab=global">
                <?php wp_nonce_field('hq_cms_save_action', 'hq_cms_nonce'); ?>
                <?php hq_render_global_fields($copy_global); ?>
                <p class="submit" style="margin-top:30px;position:sticky;bottom:15px;background:rgba(255,255,255,0.96);padding:15px 20px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);border:1px solid #e2e8f0;z-index:20;">
                    <button type="submit" class="button button-primary button-large" style="background:#EA8E18;border-color:#d47e10;font-weight:bold;padding:10px 32px;height:auto;font-size:15px;cursor:pointer;border-radius:8px;">
                        Simpan Pengaturan Global
                    </button>
                </p>
            </form>
        <?php else: ?>
            <div style="background:#fff;border-radius:12px;padding:20px 24px;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid #e2e8f0;margin-bottom:24px;">
                <h2 style="margin-top:0;font-size:17px;color:#0f172a;">
                    💡 Pengelolaan Konten Versi <?php echo $active_tab === 'id' ? 'Indonesia (/id)' : 'English (/en)'; ?>
                </h2>
                <p style="color:#475569;line-height:1.6;margin-bottom:0;font-size:13.5px;">
                    • Anda dapat mengganti teks, memilih gambar/denah dari WordPress Media Library, mengubah harga, kapasitas, dan status ketersediaan unit.<br>
                    • Setiap tab bahasa bersifat <strong>100% independen</strong> (Anti-Overwrite).<br>
                    • Setiap kali disimpan, sistem otomatis membuat snapshot versi yang dapat dipulihkan di tab <strong>🕒 Riwayat &amp; Restore</strong>.
                </p>
            </div>

            <form method="post" action="?page=hquarters-cms&tab=<?php echo $active_tab; ?>">
                <?php wp_nonce_field('hq_cms_save_action', 'hq_cms_nonce'); ?>
                <input type="hidden" name="hq_active_tab" value="<?php echo $active_tab; ?>">

                <?php
                if ($active_tab === 'id') {
                    hq_render_fields_for_lang('id', $copy_id);
                } else {
                    hq_render_fields_for_lang('en', $copy_en);
                }
                ?>

                <p class="submit" style="margin-top:30px;position:sticky;bottom:15px;background:rgba(255,255,255,0.96);padding:15px 20px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);border:1px solid #e2e8f0;z-index:20;">
                    <button type="submit" class="button button-primary button-large" style="background:#EA8E18;border-color:#d47e10;font-weight:bold;padding:10px 32px;height:auto;font-size:15px;cursor:pointer;border-radius:8px;">
                        Simpan Perubahan Versi <?php echo $active_tab === 'id' ? 'Indonesia' : 'English'; ?>
                    </button>
                    <span style="margin-left:15px;color:#64748b;font-size:13px;">
                        *Perubahan langsung aktif secara live di <strong><?php echo $active_tab === 'id' ? 'hquarters.co.id/id/' : 'hquarters.co.id/en/'; ?></strong>.
                    </span>
                </p>
            </form>
        <?php endif; ?>
    </div>
    <?php
}

// =========================================================================
// 6. GLOBAL SETTINGS, WHATSAPP & PROMO TAB
// =========================================================================
function hq_render_global_fields($saved) {
    $val = function($key, $default = '') use ($saved) {
        return esc_attr(isset($saved[$key]) && $saved[$key] !== '' ? $saved[$key] : $default);
    };
    $checked = function($key, $default = '1') use ($saved) {
        $v = isset($saved[$key]) ? $saved[$key] : $default;
        return $v === '1' ? 'checked' : '';
    };
    ?>
    <div style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            1. Kontak WhatsApp Resmi (Seluruh Website)
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Nomor WhatsApp Resmi</label></th>
                <td>
                    <input type="text" name="hq_copy_global[global_whatsapp]" value="<?php echo $val('global_whatsapp', '+62 811-1908-319'); ?>" style="width:100%;max-width:400px;">
                    <p class="description">Nomor WhatsApp utama yang digunakan pada tombol WhatsApp Floating, Header, Promo Modal, dan Footer.</p>
                </td>
            </tr>
            <tr>
                <th><label>Pesan Default Pembuka WhatsApp</label></th>
                <td>
                    <textarea name="hq_copy_global[global_wa_prefill]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['global_wa_prefill']) ? $saved['global_wa_prefill'] : 'Halo tim HQuarters Bandung! Saya ingin menanyakan tentang ketersediaan ruang kantor.'); ?></textarea>
                </td>
            </tr>
        </table>
    </div>

    <div style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            2. Promo Popup Modal (Work. Live. Invest)
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Aktifkan Popup Promo</label></th>
                <td>
                    <label style="font-weight:600;">
                        <input type="hidden" name="hq_copy_global[promo_enabled]" value="0">
                        <input type="checkbox" name="hq_copy_global[promo_enabled]" value="1" <?php echo $checked('promo_enabled', '1'); ?>>
                        Tampilkan popup promo otomatis ketika pengunjung scroll halaman
                    </label>
                </td>
            </tr>
            <tr>
                <th><label>Banner Gambar Promo</label></th>
                <td>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="text" id="promo_banner_img" name="hq_copy_global[promo_banner_img]" value="<?php echo $val('promo_banner_img', '/promo/promo-banner.webp'); ?>" style="flex:1;">
                        <button type="button" class="button hq-media-btn" data-target="promo_banner_img" data-preview="promo_banner_preview">Pilih dari Media Library</button>
                        <button type="button" class="button hq-media-clear-btn" data-target="promo_banner_img" data-preview="promo_banner_preview">Hapus</button>
                    </div>
                    <div style="margin-top:10px;">
                        <img id="promo_banner_preview" src="<?php echo $val('promo_banner_img', '/promo/promo-banner.webp'); ?>" style="max-height:160px;border-radius:8px;border:1px solid #e2e8f0;display:<?php echo !empty($saved['promo_banner_img']) ? 'block' : 'block'; ?>;">
                    </div>
                </td>
            </tr>
            <tr>
                <th><label>Teks Tombol Aksi Promo</label></th>
                <td>
                    <input type="text" name="hq_copy_global[promo_cta_text]" value="<?php echo $val('promo_cta_text', 'Tanya Promo via WhatsApp'); ?>" style="width:100%;max-width:400px;">
                </td>
            </tr>
        </table>
    </div>

    <div style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            3. Pengaturan Visibilitas Section Website
        </h3>
        <p style="color:#64748b;font-size:13px;margin-bottom:15px;">Centang untuk menampilkan section, atau hilangkan centang untuk menyembunyikan section tanpa menghapus datanya.</p>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Section Tenant / Partner Logos</label></th>
                <td>
                    <input type="hidden" name="hq_copy_global[sec_partners_enabled]" value="0">
                    <label><input type="checkbox" name="hq_copy_global[sec_partners_enabled]" value="1" <?php echo $checked('sec_partners_enabled', '1'); ?>> Tampilkan logo tenant / perusahaan di Beranda</label>
                </td>
            </tr>
            <tr>
                <th><label>Section Building Highlights</label></th>
                <td>
                    <input type="hidden" name="hq_copy_global[sec_highlights_enabled]" value="0">
                    <label><input type="checkbox" name="hq_copy_global[sec_highlights_enabled]" value="1" <?php echo $checked('sec_highlights_enabled', '1'); ?>> Tampilkan ringkasan fasilitas gedung di Beranda</label>
                </td>
            </tr>
            <tr>
                <th><label>Tombol Floating WhatsApp</label></th>
                <td>
                    <input type="hidden" name="hq_copy_global[sec_floating_wa_enabled]" value="0">
                    <label><input type="checkbox" name="hq_copy_global[sec_floating_wa_enabled]" value="1" <?php echo $checked('sec_floating_wa_enabled', '1'); ?>> Tampilkan tombol WhatsApp mengapung di pojok kanan bawah</label>
                </td>
            </tr>
            <tr>
                <th><label>Section CTA Konsultasi Bawah</label></th>
                <td>
                    <input type="hidden" name="hq_copy_global[sec_cta_enabled]" value="0">
                    <label><input type="checkbox" name="hq_copy_global[sec_cta_enabled]" value="1" <?php echo $checked('sec_cta_enabled', '1'); ?>> Tampilkan banner CTA konsultasi di bagian bawah sebelum footer</label>
                </td>
            </tr>
        </table>
    </div>
    <?php
}

// =========================================================================
// 7. RIWAYAT VERSI & RESTORE TAB
// =========================================================================
function hq_render_history_tab() {
    $hist_id = get_option('hq_copy_history_id', []);
    $hist_en = get_option('hq_copy_history_en', []);
    $hist_global = get_option('hq_copy_history_global', []);
    ?>
    <div style="background:#fff;border-radius:12px;padding:30px;border:1px solid #e2e8f0;">
        <h2 style="margin-top:0;font-size:20px;color:#0f172a;border-bottom:2px solid #8b5cf6;padding-bottom:10px;">
            🕒 Riwayat Versi &amp; Pemulihan (Version History &amp; Revisions)
        </h2>
        <p style="color:#475569;line-height:1.6;font-size:14px;">
            Setiap kali Anda menekan tombol <strong>Simpan Perubahan</strong>, sistem otomatis menyimpan snapshot data sebelumnya. Jika terjadi kesalahan input atau ingin mengembalikan konten ke versi terdahulu, Anda dapat menekan tombol <strong>Pulihkan (Restore)</strong> pada daftar di bawah.
        </p>

        <!-- Versi ID History -->
        <h3 style="margin-top:24px;font-size:16px;color:#EA8E18;">🇮🇩 Riwayat Versi Bahasa Indonesia (/id)</h3>
        <?php if (empty($hist_id)): ?>
            <p style="color:#94a3b8;font-style:italic;">Belum ada riwayat revisi yang tersimpan. Snapshot akan otomatis dibuat saat Anda menyimpan perubahan.</p>
        <?php else: ?>
            <table class="widefat striped" style="margin-top:10px;">
                <thead>
                    <tr>
                        <th style="width:50px;">#</th>
                        <th>Waktu Penyimpanan</th>
                        <th>Disimpan Oleh</th>
                        <th style="width:140px;text-align:center;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($hist_id as $i => $item): ?>
                    <tr>
                        <td><strong><?php echo $i + 1; ?></strong></td>
                        <td><?php echo esc_html($item['date']); ?> (<?php echo human_time_diff($item['time']); ?> lalu)</td>
                        <td><?php echo esc_html($item['user']); ?></td>
                        <td style="text-align:center;">
                            <form method="post" style="display:inline;" onsubmit="return confirm('Apakah Anda yakin ingin memulihkan versi tanggal <?php echo esc_attr($item['date']); ?>? Konten saat ini akan digantikan.');">
                                <?php wp_nonce_field('hq_restore_action', 'hq_restore_nonce'); ?>
                                <input type="hidden" name="hq_restore_lang" value="id">
                                <input type="hidden" name="hq_restore_index" value="<?php echo $i; ?>">
                                <button type="submit" class="button button-small" style="color:#8b5cf6;font-weight:600;">🔄 Pulihkan</button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>

        <!-- Versi EN History -->
        <h3 style="margin-top:30px;font-size:16px;color:#3b82f6;">🇬🇧 Riwayat Versi English (/en)</h3>
        <?php if (empty($hist_en)): ?>
            <p style="color:#94a3b8;font-style:italic;">Belum ada riwayat revisi yang tersimpan.</p>
        <?php else: ?>
            <table class="widefat striped" style="margin-top:10px;">
                <thead>
                    <tr>
                        <th style="width:50px;">#</th>
                        <th>Waktu Penyimpanan</th>
                        <th>Disimpan Oleh</th>
                        <th style="width:140px;text-align:center;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($hist_en as $i => $item): ?>
                    <tr>
                        <td><strong><?php echo $i + 1; ?></strong></td>
                        <td><?php echo esc_html($item['date']); ?> (<?php echo human_time_diff($item['time']); ?> lalu)</td>
                        <td><?php echo esc_html($item['user']); ?></td>
                        <td style="text-align:center;">
                            <form method="post" style="display:inline;" onsubmit="return confirm('Apakah Anda yakin ingin memulihkan versi tanggal <?php echo esc_attr($item['date']); ?>?');">
                                <?php wp_nonce_field('hq_restore_action', 'hq_restore_nonce'); ?>
                                <input type="hidden" name="hq_restore_lang" value="en">
                                <input type="hidden" name="hq_restore_index" value="<?php echo $i; ?>">
                                <button type="submit" class="button button-small" style="color:#3b82f6;font-weight:600;">🔄 Pulihkan</button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}

// =========================================================================
// 8. RENDER FIELDS PER BAHASA (ID & EN)
// =========================================================================
function hq_render_fields_for_lang($lang, $saved) {
    $val = function($key, $default = '') use ($saved) {
        return esc_attr(isset($saved[$key]) && $saved[$key] !== '' ? $saved[$key] : $default);
    };
    $is_id = ($lang === 'id');
    ?>

    <!-- 1. BERANDA (HERO & LOKASI & HIGHLIGHTS) -->
    <div id="section-home" style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            1. Beranda (Home / Hero Utama &amp; Lokasi)
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Deskripsi Hero Utama</label></th>
                <td>
                    <textarea name="hq_copy_<?php echo $lang; ?>[hero_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['hero_desc']) ? $saved['hero_desc'] : ($is_id ? 'Ruang bisnis modern yang fleksibel, dalam satu gedung di jalan asia afrika CBD bandung' : 'From your first business address to your corporate headquarters, HQuarters gives you the space to start, work, own and grow — in the heart of Asia Afrika, Bandung.')); ?></textarea>
                </td>
            </tr>
            <tr>
                <th><label>Badge Lokasi Gedung</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[loc_address_badge]" value="<?php echo $val('loc_address_badge', $is_id ? 'LOKASI GEDUNG' : 'HQUARTERS — ASIA AFRIKA — BANDUNG'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Judul Lokasi Gedung</label></th>
                <td>
                    <div style="display:flex;gap:10px;">
                        <input type="text" name="hq_copy_<?php echo $lang; ?>[loc_address_title_prefix]" value="<?php echo $val('loc_address_title_prefix', $is_id ? 'Di Jl. Asia Afrika, ' : 'Your Address Says Something '); ?>" style="flex:1;" placeholder="Teks awal">
                        <input type="text" name="hq_copy_<?php echo $lang; ?>[loc_address_title_highlight]" value="<?php echo $val('loc_address_title_highlight', $is_id ? 'Bandung' : 'About Your Business.'); ?>" style="flex:1;color:#EA8E18;font-weight:bold;" placeholder="Teks oranye">
                    </div>
                </td>
            </tr>
            <tr>
                <th><label>Deskripsi Lokasi Gedung</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[loc_address_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['loc_address_desc']) ? $saved['loc_address_desc'] : ($is_id ? 'Berada di Jl. Asia Afrika No. 158, pusat perbankan dan kawasan bisnis utama Bandung.' : "When clients, partners, or candidates walk in, they form an impression before the meeting even starts. HQuarters offers a modern, professional business environment in Bandung's most iconic district.")); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Teks Tombol Lokasi</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[loc_address_btn]" value="<?php echo $val('loc_address_btn', $is_id ? 'Buka petunjuk arah' : 'Discover The Location'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Judul Fasilitas di Beranda</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[highlights_title]" value="<?php echo $val('highlights_title', $is_id ? 'Fasilitas Gedung' : 'Building Amenities'); ?>" style="width:100%;color:#EA8E18;font-weight:bold;"></td>
            </tr>
        </table>
    </div>

    <!-- 2. SOHO DUPLEX -->
    <div id="section-soho" style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            2. SOHO (Small Office Home Office)
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Foto Utama / Hero Unit SOHO</label></th>
                <td>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="text" id="soho_hero_img_<?php echo $lang; ?>" name="hq_copy_<?php echo $lang; ?>[soho_hero_img]" value="<?php echo $val('soho_hero_img', '/SPACES/SOHO/SOHO 01.webp?v=20260825'); ?>" style="flex:1;">
                        <button type="button" class="button hq-media-btn" data-target="soho_hero_img_<?php echo $lang; ?>" data-preview="soho_hero_prev_<?php echo $lang; ?>">Pilih dari Media Library</button>
                    </div>
                    <div style="margin-top:8px;">
                        <img id="soho_hero_prev_<?php echo $lang; ?>" src="<?php echo $val('soho_hero_img', '/SPACES/SOHO/SOHO 01.webp?v=20260825'); ?>" style="max-height:120px;border-radius:6px;border:1px solid #e2e8f0;">
                    </div>
                </td>
            </tr>
            <tr>
                <th><label>Denah Lantai / Floor Plan SOHO</label></th>
                <td>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="text" id="soho_floorplan_img_<?php echo $lang; ?>" name="hq_copy_<?php echo $lang; ?>[soho_floorplan_img]" value="<?php echo $val('soho_floorplan_img', ''); ?>" style="flex:1;" placeholder="Pilih file denah arsitektur SOHO (PNG/JPG/WebP)">
                        <button type="button" class="button hq-media-btn" data-target="soho_floorplan_img_<?php echo $lang; ?>" data-preview="soho_fp_prev_<?php echo $lang; ?>">Pilih dari Media Library</button>
                    </div>
                    <?php if (!empty($saved['soho_floorplan_img'])): ?>
                    <div style="margin-top:8px;">
                        <img id="soho_fp_prev_<?php echo $lang; ?>" src="<?php echo esc_url($saved['soho_floorplan_img']); ?>" style="max-height:120px;border-radius:6px;border:1px solid #e2e8f0;">
                    </div>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th><label>Headline SOHO</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[soho_headline]" value="<?php echo $val('soho_headline', $is_id ? 'Dua fungsi dalam satu unit' : 'Life Changes. Business Changes.'); ?>" style="width:100%;color:#EA8E18;font-weight:bold;"></td>
            </tr>
            <tr>
                <th><label>Deskripsi Headline SOHO</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[soho_headline_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['soho_headline_desc']) ? $saved['soho_headline_desc'] : ($is_id ? 'Tata ruang fungsional yang menggabungkan area kerja profesional untuk operasional bisnis dan area privat yang nyaman dalam satu unit.' : 'Today a startup office. Tomorrow a home office. Later a private living space.')); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Harga Mulai Unit SOHO</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[soho_price]" value="<?php echo $val('soho_price', $is_id ? 'Hubungi Tim Leasing' : 'Contact Leasing'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Status Ketersediaan Unit</label></th>
                <td>
                    <select name="hq_copy_<?php echo $lang; ?>[soho_availability]" style="min-width:240px;">
                        <option value="Tersedia" <?php selected($val('soho_availability', 'Tersedia'), 'Tersedia'); ?>>Tersedia (Available)</option>
                        <option value="Unit Terbatas" <?php selected($val('soho_availability'), 'Unit Terbatas'); ?>>Unit Terbatas (Limited Units)</option>
                        <option value="Sold Out" <?php selected($val('soho_availability'), 'Sold Out'); ?>>Sold Out / Penuh</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label>Ukuran Unit SOHO</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[soho_spec_sqm]" value="<?php echo $val('soho_spec_sqm', '80 - 120 m²'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Pilihan Lantai</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[soho_spec_floor]" value="<?php echo $val('soho_spec_floor', $is_id ? 'Lantai 3-16' : 'Floors 3-16'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Kapasitas Listrik</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[soho_spec_power]" value="<?php echo $val('soho_spec_power', '5.500 - 11.000 VA'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Tinggi Plafon</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[soho_spec_ceiling]" value="<?php echo $val('soho_spec_ceiling', '3.2 Meter'); ?>" style="width:100%;"></td>
            </tr>
        </table>
    </div>

    <!-- 3. PREMIUM OFFICE -->
    <div id="section-premium-office" style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            3. Premium Office (Korporasi &amp; Corporate Floors)
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Foto Utama / Hero Premium Office</label></th>
                <td>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="text" id="prem_hero_img_<?php echo $lang; ?>" name="hq_copy_<?php echo $lang; ?>[prem_hero_img]" value="<?php echo $val('prem_hero_img', '/SPACES/PREMIUM/PREMIUM 01.webp?v=20260825'); ?>" style="flex:1;">
                        <button type="button" class="button hq-media-btn" data-target="prem_hero_img_<?php echo $lang; ?>" data-preview="prem_hero_prev_<?php echo $lang; ?>">Pilih dari Media Library</button>
                    </div>
                    <div style="margin-top:8px;">
                        <img id="prem_hero_prev_<?php echo $lang; ?>" src="<?php echo $val('prem_hero_img', '/SPACES/PREMIUM/PREMIUM 01.webp?v=20260825'); ?>" style="max-height:120px;border-radius:6px;border:1px solid #e2e8f0;">
                    </div>
                </td>
            </tr>
            <tr>
                <th><label>Denah Lantai / Floor Plan</label></th>
                <td>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="text" id="prem_floorplan_img_<?php echo $lang; ?>" name="hq_copy_<?php echo $lang; ?>[prem_floorplan_img]" value="<?php echo $val('prem_floorplan_img', ''); ?>" style="flex:1;" placeholder="Pilih denah layout Premium Office">
                        <button type="button" class="button hq-media-btn" data-target="prem_floorplan_img_<?php echo $lang; ?>">Pilih dari Media Library</button>
                    </div>
                </td>
            </tr>
            <tr>
                <th><label>Headline Pertumbuhan Kantor</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[prem_headline]" value="<?php echo $val('prem_headline', $is_id ? 'Perusahaan Telah Bertumbuh. Saatnya Kantor Anda Berkembang.' : 'Your Company Has Grown. Your Office Should Too.'); ?>" style="width:100%;color:#EA8E18;font-weight:bold;"></td>
            </tr>
            <tr>
                <th><label>Deskripsi Headline</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[prem_headline_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['prem_headline_desc']) ? $saved['prem_headline_desc'] : ($is_id ? 'Tim bertambah. Klien bertambah. Ekspektasi ikut naik. Kantor pun menjadi bagian dari identitas perusahaan Anda.' : 'Teams grow. Clients grow. Expectations rise. The office becomes part of your corporate identity.')); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Rentang Ukuran Ruang</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[prem_spec_sqm]" value="<?php echo $val('prem_spec_sqm', '120 - 450 m²'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Kekuatan Beban Lantai (Floor Load)</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[prem_spec_floorload]" value="<?php echo $val('prem_spec_floorload', '250 kg/m²'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Tinggi Plafon</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[prem_spec_ceiling]" value="<?php echo $val('prem_spec_ceiling', '3.6 Meter'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Status Ketersediaan</label></th>
                <td>
                    <select name="hq_copy_<?php echo $lang; ?>[prem_availability]" style="min-width:240px;">
                        <option value="Tersedia" <?php selected($val('prem_availability', 'Tersedia'), 'Tersedia'); ?>>Tersedia (Available)</option>
                        <option value="Unit Terbatas" <?php selected($val('prem_availability'), 'Unit Terbatas'); ?>>Unit Terbatas (Limited Units)</option>
                    </select>
                </td>
            </tr>

            <!-- 3 KARTU INFORMASI -->
            <tr><td colspan="2"><hr style="margin:16px 0;border-top:1px dashed #cbd5e1;"><strong>3 Kartu Layanan Premium Office:</strong></td></tr>
            <tr>
                <th><label>Kartu 1 (Kapasitas Kantor)</label></th>
                <td>
                    <input type="text" name="hq_copy_<?php echo $lang; ?>[prem_c1_title]" value="<?php echo $val('prem_c1_title', $is_id ? 'Pilih Kantor Sesuai Kebutuhan Tim' : 'Choose Office Space Based on Team Needs'); ?>" style="width:100%;margin-bottom:6px;" placeholder="Judul Kartu 1">
                    <textarea name="hq_copy_<?php echo $lang; ?>[prem_c1_desc]" rows="2" style="width:100%;margin-bottom:6px;" placeholder="Deskripsi"><?php echo esc_textarea(isset($saved['prem_c1_desc']) ? $saved['prem_c1_desc'] : ($is_id ? 'Jumlah anggota tim dan aktivitas sehari-hari menentukan kebutuhan ruang kantor. Sampaikan kebutuhan perusahaan Anda untuk mengetahui pilihan unit dan kapasitasnya.' : 'Your team size and daily activities determine your office space requirements. Share your company’s needs to explore available units and their capacity.')); ?></textarea>
                    <input type="text" name="hq_copy_<?php echo $lang; ?>[prem_c1_cta]" value="<?php echo $val('prem_c1_cta', $is_id ? 'Konsultasikan Kebutuhan Ruang' : 'Consult Space Requirements'); ?>" style="width:100%;" placeholder="Teks Tombol">
                </td>
            </tr>
            <tr>
                <th><label>Kartu 2 (Tata Ruang Kantor)</label></th>
                <td>
                    <input type="text" name="hq_copy_<?php echo $lang; ?>[prem_c2_title]" value="<?php echo $val('prem_c2_title', $is_id ? 'Rencanakan Tata Ruang Kantor Anda' : 'Plan Your Office Layout'); ?>" style="width:100%;margin-bottom:6px;" placeholder="Judul Kartu 2">
                    <textarea name="hq_copy_<?php echo $lang; ?>[prem_c2_desc]" rows="2" style="width:100%;margin-bottom:6px;" placeholder="Deskripsi"><?php echo esc_textarea(isset($saved['prem_c2_desc']) ? $saved['prem_c2_desc'] : ($is_id ? 'Pelajari denah unit untuk menilai pembagian area kerja, ruang rapat, dan kebutuhan pendukung lainnya. Gunakan detail ruang sebagai acuan sebelum menentukan pilihan kantor.' : 'Review floor plans to assess the division of work areas, meeting rooms, and other supporting facilities. Use space details as a reference before deciding on an office.')); ?></textarea>
                    <input type="text" name="hq_copy_<?php echo $lang; ?>[prem_c2_cta]" value="<?php echo $val('prem_c2_cta', $is_id ? 'Minta Denah dan Detail Unit' : 'Request Floor Plans and Details'); ?>" style="width:100%;" placeholder="Teks Tombol">
                </td>
            </tr>
            <tr>
                <th><label>Kartu 3 (Fasilitas Gedung)</label></th>
                <td>
                    <input type="text" name="hq_copy_<?php echo $lang; ?>[prem_c3_title]" value="<?php echo $val('prem_c3_title', $is_id ? 'Lihat Langsung Fasilitas Gedung' : 'Experience Building Facilities Directly'); ?>" style="width:100%;margin-bottom:6px;" placeholder="Judul Kartu 3">
                    <textarea name="hq_copy_<?php echo $lang; ?>[prem_c3_desc]" rows="2" style="width:100%;margin-bottom:6px;" placeholder="Deskripsi"><?php echo esc_textarea(isset($saved['prem_c3_desc']) ? $saved['prem_c3_desc'] : ($is_id ? 'Tinjau fasilitas dan lingkungan gedung saat survei kantor. Tanyakan ketentuan akses dan penggunaannya untuk menilai kesesuaiannya dengan kebutuhan operasional perusahaan.' : 'Review the building amenities and environment during your office tour. Ask about access terms and usage to evaluate fit with your operational needs.')); ?></textarea>
                    <input type="text" name="hq_copy_<?php echo $lang; ?>[prem_c3_cta]" value="<?php echo $val('prem_c3_cta', $is_id ? 'Jadwalkan Survei Kantor' : 'Schedule an Office Tour'); ?>" style="width:100%;" placeholder="Teks Tombol">
                </td>
            </tr>
        </table>
    </div>

    <!-- 4. FUNCTION ROOM / EVENT SPACES -->
    <div id="section-events" style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            4. Function Room &amp; Event Spaces (Ruang Pertemuan &amp; Konferensi)
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Judul Hero Function Room</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[fr_hero_title]" value="<?php echo $val('fr_hero_title', $is_id ? 'Function Room & Ruang Konferensi Modern' : 'Function Room & Modern Event Space'); ?>" style="width:100%;color:#EA8E18;font-weight:bold;"></td>
            </tr>
            <tr>
                <th><label>Deskripsi Hero</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[fr_hero_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['fr_hero_desc']) ? $saved['fr_hero_desc'] : ($is_id ? 'Ruang serbaguna untuk seminar, gathering korporasi, pelatihan, dan acara privat di pusat bisnis Bandung.' : 'Versatile function spaces for seminars, corporate gatherings, workshops, and private banquets in Bandung CBD.')); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Harga Sewa Mulai</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[fr_price]" value="<?php echo $val('fr_price', $is_id ? 'Mulai Rp 1.500.000 / Jam' : 'Starting from IDR 1,500,000 / Hour'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Kapasitas Layout Theatre</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[fr_cap_theatre]" value="<?php echo $val('fr_cap_theatre', $is_id ? 'Hingga 280 Pax' : 'Up to 280 Pax'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Kapasitas Layout Classroom</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[fr_cap_classroom]" value="<?php echo $val('fr_cap_classroom', $is_id ? 'Hingga 140 Pax' : 'Up to 140 Pax'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Kapasitas Layout U-Shape</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[fr_cap_ushape]" value="<?php echo $val('fr_cap_ushape', $is_id ? 'Hingga 70 Pax' : 'Up to 70 Pax'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Kapasitas Layout Round Table</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[fr_cap_roundtable]" value="<?php echo $val('fr_cap_roundtable', $is_id ? 'Hingga 120 Pax' : 'Up to 120 Pax'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Tinggi Plafon Akustik</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[fr_spec_ceiling]" value="<?php echo $val('fr_spec_ceiling', '3.8 Meter'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Foto Layout Theatre</label></th>
                <td>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="text" id="fr_theatre_img_<?php echo $lang; ?>" name="hq_copy_<?php echo $lang; ?>[fr_theatre_img]" value="<?php echo $val('fr_theatre_img', '/Function Room/Theatre.webp?v=20260825'); ?>" style="flex:1;">
                        <button type="button" class="button hq-media-btn" data-target="fr_theatre_img_<?php echo $lang; ?>">Pilih dari Media Library</button>
                    </div>
                </td>
            </tr>
            <tr>
                <th><label>Denah Tata Ruang Function Room</label></th>
                <td>
                    <div style="display:flex;gap:10px;align-items:center;">
                        <input type="text" id="fr_floorplan_img_<?php echo $lang; ?>" name="hq_copy_<?php echo $lang; ?>[fr_floorplan_img]" value="<?php echo $val('fr_floorplan_img', ''); ?>" style="flex:1;" placeholder="Pilih denah function room">
                        <button type="button" class="button hq-media-btn" data-target="fr_floorplan_img_<?php echo $lang; ?>">Pilih dari Media Library</button>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <!-- 5. SERVICED OFFICE & VIRTUAL OFFICE -->
    <div id="section-serviced-office" style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            5. Serviced Office &amp; Virtual Office
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Serviced Office - Subheadline</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[so_subheadline]" value="<?php echo $val('so_subheadline', $is_id ? 'Ruang yang Siap Operasional Sejak Hari Pertama' : 'Move-In Ready Workspace From Day One'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Serviced Office - Deskripsi</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[so_copy]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['so_copy']) ? $saved['so_copy'] : ($is_id ? 'Tanpa renovasi. Tanpa pengadaan perabot. Tanpa menunggu. Bawa tim Anda dan mulai bekerja.' : 'No fit-outs. No furniture procurement. No delays. Bring your team and start working immediately.')); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Serviced Office - Harga Mulai</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[so_price]" value="<?php echo $val('so_price', $is_id ? 'Mulai Rp 2.500.000 / Pax / Bulan' : 'From IDR 2,500,000 / Pax / Month'); ?>" style="width:100%;"></td>
            </tr>
            <tr><td colspan="2"><hr style="margin:16px 0;border-top:1px dashed #cbd5e1;"></td></tr>
            <tr>
                <th><label>Virtual Office - Subheadline</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[vo_subheadline]" value="<?php echo $val('vo_subheadline', $is_id ? 'Alamat Bisnis yang Membangun Kepercayaan' : 'A Business Address That Builds Trust'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Virtual Office - Deskripsi</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[vo_copy]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['vo_copy']) ? $saved['vo_copy'] : ($is_id ? 'Bangun citra profesional dan tingkatkan kredibilitas bisnis Anda dengan alamat kantor prestisius di pusat bisnis Bandung.' : 'Build a professional image and elevate your business credibility with a prestigious business address in Bandung city center.')); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Virtual Office - Harga Mulai</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[vo_price]" value="<?php echo $val('vo_price', $is_id ? 'Mulai Rp 450.000 / Bulan' : 'From IDR 450,000 / Month'); ?>" style="width:100%;"></td>
            </tr>
        </table>
    </div>

    <!-- 6. GEDUNG & LOKASI -->
    <div id="section-building" style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            6. Halaman Gedung &amp; Lokasi
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Gedung - Judul Hero</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[bld_hero_title]" value="<?php echo $val('bld_hero_title', $is_id ? 'Gedung Bisnis Terintegrasi di Pusat Kota Bandung' : 'Built for Business. Designed for Life.'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Gedung - Deskripsi Hero</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[bld_hero_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['bld_hero_desc']) ? $saved['bld_hero_desc'] : ($is_id ? 'HQuarters dirancang untuk menghadirkan lingkungan kerja yang profesional, efisien, dan mendukung produktivitas perusahaan Anda.' : 'A commercial address built to international standards, offering the infrastructure modern enterprise requires.')); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Lokasi - Judul Hero</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[loc_hero_title]" value="<?php echo $val('loc_hero_title', $is_id ? 'Lokasi Strategis di Pusat Bisnis Bandung' : 'Bandung’s Most Prestigious Commercial Address.'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Lokasi - Deskripsi Hero</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[loc_hero_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['loc_hero_desc']) ? $saved['loc_hero_desc'] : ($is_id ? 'Berada di koridor Asia Afrika, dikelilingi oleh institusi finansial, hotel terkemuka, dan akses transportasi utama kota.' : 'Situated in the historic commercial corridor, surrounded by premier financial institutions, luxury hotels, and transit nodes.')); ?></textarea></td>
            </tr>
        </table>
    </div>

    <!-- 7. CTA & FOOTER -->
    <div id="section-footer" style="background:#fff;border-radius:12px;padding:24px;border:1px solid #e2e8f0;margin-bottom:24px;">
        <h3 style="margin-top:0;border-bottom:2px solid #EA8E18;padding-bottom:10px;color:#0f172a;font-size:16px;">
            7. Bagian Bawah (CTA Konsultasi &amp; Footer)
        </h3>
        <table class="form-table">
            <tr>
                <th style="width:240px;"><label>Judul CTA</label></th>
                <td>
                    <div style="display:flex;gap:10px;">
                        <input type="text" name="hq_copy_<?php echo $lang; ?>[cta_title_prefix]" value="<?php echo $val('cta_title_prefix', $is_id ? 'Sedang mencari ruang ' : 'Where Will Your Business '); ?>" style="flex:1;">
                        <input type="text" name="hq_copy_<?php echo $lang; ?>[cta_title_highlight]" value="<?php echo $val('cta_title_highlight', $is_id ? 'untuk bisnis?' : 'Go Next?'); ?>" style="flex:1;color:#EA8E18;font-weight:bold;">
                    </div>
                </td>
            </tr>
            <tr>
                <th><label>Deskripsi CTA</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[cta_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['cta_desc']) ? $saved['cta_desc'] : ($is_id ? 'Konsultasikan kebutuhan ruang kantor Anda langsung dengan tim HQuarters.' : 'Start from an address. Build your team. Own your space. Or move your company to its next headquarters. Whatever comes next, start at HQuarters.')); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Teks Tombol CTA</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[cta_btn_text]" value="<?php echo $val('cta_btn_text', $is_id ? 'Hubungi HQuarters' : 'Find My Space'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Deskripsi Footer</label></th>
                <td><textarea name="hq_copy_<?php echo $lang; ?>[footer_desc]" rows="2" style="width:100%;"><?php echo esc_textarea(isset($saved['footer_desc']) ? $saved['footer_desc'] : ($is_id ? 'HQuarters Business Residence — Integrasi ruang kantor premium dan hunian fleksibel di pusat bisnis Asia Afrika Bandung.' : "HQuarters Business Residence — The premier integration of luxury workspace and flexible residences in Bandung's Asia Afrika CBD.")); ?></textarea></td>
            </tr>
            <tr>
                <th><label>Alamat Lengkap Gedung</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[footer_address]" value="<?php echo $val('footer_address', $is_id ? 'Jl. Asia Afrika No. 158, Bandung, Jawa Barat 40261' : 'Jl. Asia Afrika No. 158, Bandung, West Java 40261'); ?>" style="width:100%;"></td>
            </tr>
            <tr>
                <th><label>Teks Hak Cipta (Copyright)</label></th>
                <td><input type="text" name="hq_copy_<?php echo $lang; ?>[footer_copyright]" value="<?php echo $val('footer_copyright', $is_id ? '© 2026 HQuarters Business Residence. Hak cipta dilindungi undang-undang.' : '© 2026 HQuarters Business Residence. All rights reserved.'); ?>" style="width:100%;"></td>
            </tr>
        </table>
    </div>
    <?php
}

// =========================================================================
// 9. PANDUAN PENGGUNAAN (README TAB)
// =========================================================================
function hq_render_readme_tab() {
    ?>
    <div style="background:#fff;border-radius:12px;padding:32px 36px;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.05);line-height:1.75;color:#334155;font-size:14.5px;">
        <h2 style="font-size:24px;color:#0f172a;margin-top:0;border-bottom:3px solid #EA8E18;padding-bottom:12px;">
            📖 Panduan Resmi Pengelolaan Website HQuarters (Dokumentasi CMS)
        </h2>

        <p style="font-size:15px;color:#475569;">
            Dokumentasi ini menjelaskan secara lengkap seluruh kapabilitas pengelolaan konten mandiri, arsitektur headless modern, jawaban atas 5 pertanyaan utama klien, dan pemetaan komponen per halaman.
        </p>

        <!-- JAWABAN 5 PERTANYAAN KLIEN -->
        <div style="background:#eff6ff;border-radius:10px;padding:22px 26px;border:1px solid #bfdbfe;margin:24px 0;">
            <h3 style="margin-top:0;color:#1e3a8a;font-size:18px;">
                🎯 Jawaban Terperinci atas 5 Pertanyaan Klien
            </h3>
            
            <div style="margin-top:16px;">
                <h4 style="color:#1e3a8a;margin-bottom:6px;font-size:15px;">1. SEO: Bagaimana Yoast SEO diterapkan ke frontend React?</h4>
                <p style="margin-top:0;color:#1e40af;">
                    Setiap halaman di frontend React (<code>/id/</code> dan <code>/en/</code>) telah diintegrasikan langsung dengan data Yoast SEO dari WordPress:
                    <br>• <strong>Server-Side Pre-rendered Meta:</strong> File HTML awal di <code>/id/index.html</code> dan <code>/en/index.html</code> telah ditanamkan tag <code>&lt;title&gt;</code>, <code>&lt;meta name="description"&gt;</code>, <code>&lt;link rel="canonical"&gt;</code>, OpenGraph Facebook, dan Twitter Card yang berasal dari Yoast SEO.
                    <br>• <strong>Dynamic Client-Side Routing:</strong> Saat pengunjung berpindah halaman di dalam website React, hook <code>updatePageSEO()</code> secara dinamis memperbarui <code>document.title</code> dan meta tags sesuai halaman yang dibuka.
                    <br>• <strong>Contoh Hasil Live:</strong> Title Beranda: <em>"Sewa Kantor Bandung & SOHO Asia Afrika | HQuarters Business Residence"</em>. Canonical URL: <code>https://hquarters.co.id/id/</code>.
                </p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#1e3a8a;margin-bottom:6px;font-size:15px;">2. Pemetaan Halaman: URL Website vs Menu WordPress</h4>
                <p style="margin-top:0;color:#1e40af;">
                    Anda dapat mengedit melalui 2 jalur yang saling terhubung:
                    <br>• <strong>Jalur 1: Lewat Menu WordPress Pages:</strong> Buka <code>Pages > All Pages</code>, klik tombol <strong>⚡ Edit Konten HQuarters</strong> pada halaman yang diinginkan.
                    <br>• <strong>Jalur 2: Lewat HQuarters CMS:</strong> Gunakan tab 🇮🇩 <strong>Versi Indonesia</strong> atau 🇬🇧 <strong>Versi English</strong>.
                </p>
                <table style="width:100%;border-collapse:collapse;margin-top:10px;font-size:13px;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #bfdbfe;">
                    <thead>
                        <tr style="background:#dbeafe;color:#1e3a8a;text-align:left;">
                            <th style="padding:8px 12px;border:1px solid #bfdbfe;">Nama Produk / Halaman</th>
                            <th style="padding:8px 12px;border:1px solid #bfdbfe;">Halaman WordPress (Pages)</th>
                            <th style="padding:8px 12px;border:1px solid #bfdbfe;">Live URL Indonesia</th>
                            <th style="padding:8px 12px;border:1px solid #bfdbfe;">Live URL English</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Beranda (Home)</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">hquarters-home / home-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">SOHO Duplex</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">soho / soho-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/spaces/soho</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/spaces/soho</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Premium Office</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">premium-office / premium-office-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/spaces/premium-office</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/spaces/premium-office</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Serviced Office</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">serviced-office / serviced-office-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/spaces/serviced-office</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/spaces/serviced-office</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Virtual Office</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">virtual-office / virtual-office-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/spaces/virtual-office</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/spaces/virtual-office</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Function Room (Events)</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">events / events-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/events</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/events</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Fasilitas Gedung</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">building / building-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/building</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/building</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Lokasi Strategis</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">location / location-en</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/location</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/location</td></tr>
                        <tr><td style="padding:6px 12px;border:1px solid #bfdbfe;">Wawasan &amp; Artikel</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">Posts > All Posts</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/id/insights</td><td style="padding:6px 12px;border:1px solid #bfdbfe;">/en/insights</td></tr>
                    </tbody>
                </table>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#1e3a8a;margin-bottom:6px;font-size:15px;">3. Preview, Drafts, dan Pemulihan Versi (Restore)</h4>
                <p style="margin-top:0;color:#1e40af;">
                    • <strong>Live Preview:</strong> Pada setiap form edit dan meta box, terdapat tombol <em>"Lihat Halaman Live"</em> untuk mengecek hasil secara langsung.<br>
                    • <strong>Pemulihan Versi (Rollback):</strong> Setiap kali Anda mengklik tombol "Simpan Perubahan", CMS secara otomatis merekam snapshot versi lengkap (data, waktu, dan nama user) ke dalam tab <strong>🕒 Riwayat &amp; Restore</strong>. Jika terjadi salah ketik atau data ingin dikembalikan ke versi sebelumnya, cukup klik <strong>🔄 Pulihkan</strong> maka konten akan kembali 100% seperti semula.
                </p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#1e3a8a;margin-bottom:6px;font-size:15px;">4. Pembuatan Halaman Baru / Landing Page Mandiri</h4>
                <p style="margin-top:0;color:#1e40af;">
                    • <strong>Artikel Berita / Wawasan Baru:</strong> 100% mandiri melalui menu <code>Posts > Add New Post</code>. Otomatis memiliki layout modern, share button, reading progress bar, dan tombol WhatsApp.<br>
                    • <strong>Landing Page Promosi Khusus:</strong> Jika Anda membuat halaman baru di WordPress lewat menu <code>Pages > Add New</code>, Anda dapat memilih template standar atau meminta developer mendaftarkan rute React baru jika membutuhkan animasi interaktif 3D khusus.
                </p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="color:#1e3a8a;margin-bottom:6px;font-size:15px;">5. Komponen &amp; Fitur yang Dapat Dikelola 100% Mandiri</h4>
                <p style="margin-top:0;color:#1e40af;">
                    ✅ <strong>Gambar, Galeri &amp; Denah Lantai (Floor Plan):</strong> Menggunakan WordPress Media Library bawaan (upload langsung JPG/PNG/WebP).<br>
                    ✅ <strong>Harga, Promo &amp; Ketersediaan Unit:</strong> Input harga, pilihan status ("Tersedia", "Unit Terbatas", "Sold Out"), dan spesifikasi daya/plafon/lantai.<br>
                    ✅ <strong>Konten &amp; Call-to-Action:</strong> Seluruh judul, subjudul, deskripsi, FAQ, teks tombol, dan nomor WhatsApp resmi.<br>
                    ✅ <strong>Visibilitas Section:</strong> Menampilkan / menyembunyikan popup promo, partner logos, amenities highlights, dan floating WhatsApp melalui tombol toggle di tab <strong>⚙️ Global, WA &amp; Promo</strong>.
                </p>
            </div>
        </div>
    </div>
    <?php
}

// =========================================================================
// 10. REST API ENDPOINT LENGKAP (HYDRATION & YOAST SEO)
// =========================================================================
add_action('rest_api_init', function () {
    register_rest_route('hq/v1', '/content', [
        'methods' => 'GET',
        'callback' => function ($request) {
            $lang = $request->get_param('lang') === 'en' ? 'en' : 'id';
            $lang_data = get_option('hq_copy_' . $lang, []);
            $global_data = get_option('hq_copy_global', []);

            // Ambil Yoast SEO data untuk sinkronisasi
            $seo_map = [];
            $pages_query = get_posts([
                'post_type' => 'page',
                'posts_per_page' => 50,
                'post_status' => 'publish'
            ]);
            foreach ($pages_query as $p) {
                $seo_map[$p->post_name] = [
                    'title' => get_post_meta($p->ID, '_yoast_wpseo_title', true),
                    'desc' => get_post_meta($p->ID, '_yoast_wpseo_metadesc', true),
                    'canonical' => get_post_meta($p->ID, '_yoast_wpseo_canonical', true),
                ];
            }

            $merged = array_merge(
                is_array($global_data) ? $global_data : [],
                is_array($lang_data) ? $lang_data : []
            );

            return new WP_REST_Response([
                'status' => 'success',
                'lang' => $lang,
                'content' => $merged,
                'seo' => $seo_map
            ], 200);
        },
        'permission_callback' => '__return_true'
    ]);
});


// =========================================================================
// 11. GUTENBERG CUSTOM SECTION BLOCKS (CLIENT VISUAL REORDERING & EDITING)
// =========================================================================

// A. Register custom category
add_filter('block_categories_all', function ($categories, $post) {
    return array_merge([
        [
            'slug'  => 'hquarters',
            'title' => '🏢 HQuarters Section Blocks',
            'icon'  => 'building',
        ],
    ], $categories);
}, 10, 2);

// B1. Theme support for editor styles (Option 1 - Visual Gutenberg WYSIWYG)
add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_editor_style('css/hq-editor.css');
});

// B2. Enqueue Gutenberg block scripts and visual WYSIWYG styles
add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_style(
        'hq-editor-fonts',
        'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap',
        [],
        null
    );
    wp_enqueue_style(
        'hq-editor-styles',
        get_stylesheet_directory_uri() . '/css/hq-editor.css',
        ['hq-editor-fonts'],
        '20261110_1'
    );
    wp_enqueue_script(
        'hq-gutenberg-blocks',
        get_stylesheet_directory_uri() . '/js/hq-blocks.js',
        ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'],
        '20261110_1',
        true
    );
});

// C. Restrict allowed block types for pages so design stays 100% consistent
add_filter('allowed_block_types_all', function ($allowed_blocks, $editor_context) {
    if (!empty($editor_context->post) && $editor_context->post->post_type === 'page') {
        return [
            'hq/hero',
            'hq/business-journey',
            'hq/address-statement',
            'hq/partners',
            'hq/building-highlights',
            'hq/spaces-grid',
            'hq/soho-specs',
            'hq/premium-specs',
            'hq/function-room-specs',
            'hq/serviced-specs',
            'hq/gallery',
            'hq/faq',
            'hq/cta'
        ];
    }
    return $allowed_blocks;
}, 10, 2);

// D. REST API endpoint to retrieve parsed Gutenberg blocks for any page
add_action('rest_api_init', function () {
    register_rest_route('hq/v1', '/page-blocks', [
        'methods'             => 'GET',
        'callback'            => 'hq_rest_get_page_blocks',
        'permission_callback' => '__return_true',
    ]);
});

function hq_rest_get_page_blocks($request) {
    $slug = sanitize_text_field($request->get_param('slug') ?? '');
    $lang = sanitize_text_field($request->get_param('lang') ?? 'id');
    $page_id = (int)$request->get_param('id');

    $post = null;
    if ($page_id > 0) {
        $post = get_post($page_id);
    } elseif (!empty($slug)) {
        $slug_candidates = [$slug];
        if ($lang === 'en') {
            $slug_candidates[] = $slug . '-en';
            $slug_candidates[] = str_replace('-id', '-en', $slug);
            if ($slug === 'home' || $slug === 'hquarters-home') {
                $slug_candidates[] = 'home-en';
            }
        } else {
            $slug_candidates[] = $slug . '-id';
            if ($slug === 'home' || $slug === 'home-id') {
                $slug_candidates[] = 'hquarters-home';
            }
        }

        foreach ($slug_candidates as $cand) {
            $args = [
                'name'        => $cand,
                'post_type'   => 'page',
                'post_status' => 'publish',
                'numberposts' => 1
            ];
            $posts = get_posts($args);
            if (!empty($posts)) {
                $post = $posts[0];
                break;
            }
        }
    }

    if (!$post) {
        return new WP_REST_Response([
            'status' => 'not_found',
            'blocks' => []
        ], 200);
    }

    $parsed = parse_blocks($post->post_content);
    $blocks = [];

    foreach ($parsed as $b) {
        if (!empty($b['blockName']) && strpos($b['blockName'], 'hq/') === 0) {
            $blocks[] = [
                'name'  => $b['blockName'],
                'attrs' => !empty($b['attrs']) ? $b['attrs'] : (object)[]
            ];
        }
    }

    return new WP_REST_Response([
        'status'   => 'success',
        'page_id'  => $post->ID,
        'title'    => get_the_title($post->ID),
        'slug'     => $post->post_name,
        'blocks'   => $blocks,
        'count'    => count($blocks)
    ], 200);
}

// E. Admin action or init hook to setup default Gutenberg templates on pages
add_action('admin_init', function() {
    if (!isset($_GET['hq_init_blocks']) || $_GET['hq_init_blocks'] !== '1') {
        return;
    }
    if (!current_user_can('manage_options')) {
        return;
    }

    $pages_map = [
        'hquarters-home' => '<!-- wp:hq/hero {"headline":"Ruang bisnis modern yang fleksibel, dalam satu gedung di jalan asia afrika CBD bandung","badge":"CBD ASIA AFRIKA BANDUNG"} /-->\n<!-- wp:hq/business-journey /-->\n<!-- wp:hq/address-statement {"titlePrefix":"Di Jl. Asia Afrika,","titleHighlight":"Bandung"} /-->\n<!-- wp:hq/partners {"title":"DIPERCAYA OLEH PERUSAHAAN TERKEMUKA","enabled":true} /-->\n<!-- wp:hq/building-highlights {"title":"Fasilitas Gedung","enabled":true} /-->\n<!-- wp:hq/cta {"titlePrefix":"Sedang mencari ruang ","titleHighlight":"untuk bisnis?"} /-->',
        'home-en' => '<!-- wp:hq/hero {"headline":"Modern, flexible business spaces in a prime CBD building on Asia Afrika Bandung","badge":"BANDUNG ASIA AFRIKA CBD"} /-->\n<!-- wp:hq/business-journey /-->\n<!-- wp:hq/address-statement {"titlePrefix":"On Jl. Asia Afrika,","titleHighlight":"Bandung"} /-->\n<!-- wp:hq/partners {"title":"TRUSTED BY LEADING ENTERPRISES","enabled":true} /-->\n<!-- wp:hq/building-highlights {"title":"Building Highlights","enabled":true} /-->\n<!-- wp:hq/cta {"titlePrefix":"Looking for space ","titleHighlight":"for your business?"} /-->',
        'soho' => '<!-- wp:hq/soho-specs {"headline":"Dua fungsi dalam satu unit","price":"Hubungi Tim Leasing","availability":"Unit Terbatas","specSqm":"80 - 120 m²"} /-->\n<!-- wp:hq/cta /-->',
        'soho-en' => '<!-- wp:hq/soho-specs {"headline":"Life Changes. Business Changes.","price":"Contact Leasing Team","availability":"Limited Units","specSqm":"80 - 120 sqm"} /-->\n<!-- wp:hq/cta /-->',
        'premium-office' => '<!-- wp:hq/premium-specs {"headline":"Perusahaan Telah Bertumbuh. Saatnya Kantor Anda Berkembang.","price":"Hubungi Tim Leasing","availability":"Tersedia","specSqm":"120 - 450 m²"} /-->\n<!-- wp:hq/cta /-->',
        'premium-office-en' => '<!-- wp:hq/premium-specs {"headline":"Your Company Has Grown. Your Office Should Too.","price":"Contact Leasing Team","availability":"Available","specSqm":"120 - 450 sqm"} /-->\n<!-- wp:hq/cta /-->',
        'events' => '<!-- wp:hq/function-room-specs {"heroTitle":"Function Room & Ruang Konferensi Modern","price":"Mulai Rp 1.500.000 / Jam"} /-->\n<!-- wp:hq/cta /-->',
        'events-en' => '<!-- wp:hq/function-room-specs {"heroTitle":"Function Room & Modern Event Space","price":"Starting from IDR 1,500,000 / Hour"} /-->\n<!-- wp:hq/cta /-->',
    ];

    foreach ($pages_map as $slug => $content) {
        $posts = get_posts([
            'name' => $slug,
            'post_type' => 'page',
            'post_status' => 'any',
            'numberposts' => 1
        ]);
        if (!empty($posts)) {
            $p = $posts[0];
            update_post_meta($p->ID, '_hq_legacy_content', $p->post_content);
            wp_update_post([
                'ID'           => $p->ID,
                'post_content' => $content
            ]);
            delete_post_meta($p->ID, '_elementor_edit_mode');
        }
    }

    wp_die('Gutenberg blocks initialized successfully! <a href="' . admin_url('edit.php?post_type=page') . '">Kembali ke Daftar Pages</a>');
});
