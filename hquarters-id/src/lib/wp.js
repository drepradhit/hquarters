const API = '/wp-json/wp/v2';

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WP API error ${res.status}`);
  return res.json();
}

export function stripHtml(html) {
  if (!html) return '';
  let text = '';
  if (typeof DOMParser !== 'undefined') {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      text = doc.body.textContent || '';
    } catch {
      text = html.replace(/<[^>]*>/g, '');
    }
  } else {
    text = html.replace(/<[^>]*>/g, '');
  }
  return text
    .replace(/&#038;|&amp;/gi, '&')
    .replace(/&#8211;|&#8212;/gi, '–')
    .replace(/&#8216;|&#8217;/gi, "'")
    .replace(/&#8220;|&#8221;/gi, '"')
    .replace(/\[\s*(\.{2,}|…|&hellip;)\s*\]/gi, '...')
    .replace(/\[\.\.\.\]/g, '...')
    .replace(/\[\.\.\]/g, '...')
    .replace(/\[…\]/g, '...')
    .replace(/&hellip;/gi, '...')
    .trim();
}

export function cleanElementorContent(html) {
  if (!html) return '';
  if (typeof DOMParser === 'undefined') return html;
  try {
    const doc = new DOMParser().parseFromString(html || '', 'text/html');
    const containers = doc.querySelectorAll('.elementor-widget-container');
    if (containers.length) {
      return Array.from(containers).map((c) => c.innerHTML).join('\n');
    }
    return html;
  } catch {
    return html;
  }
}

export function formatDate(iso, lang = 'id') {
  try {
    const locale = lang === 'en' ? 'en-GB' : 'id-ID';
    return new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function estimateReadTime(html, lang = 'id') {
  const words = stripHtml(html).trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return lang === 'en' ? `${minutes} min read` : `${minutes} menit baca`;
}

function postToArticle(post, lang = 'id') {
  const media = post._embedded && post._embedded['wp:featuredmedia'];
  const image = media && media[0] && media[0].source_url;
  const terms = post._embedded && post._embedded['wp:term'];
  const cats = terms && terms[0] ? terms[0].map((t) => stripHtml(t.name)) : [];
  
  let categoryLabel = cats.join(', ');
  if (!categoryLabel || categoryLabel.toLowerCase() === 'uncategorized') {
    categoryLabel = lang === 'en' ? 'Business Insights' : 'Wawasan Bisnis';
  }

  return {
    id: String(post.id),
    slug: post.slug,
    categoryLabel,
    title: stripHtml(post.title?.rendered || ''),
    excerpt: stripHtml(post.excerpt?.rendered || ''),
    author: (post.yoast_head_json && post.yoast_head_json.author) || 'HQuarters',
    date: formatDate(post.date, lang),
    readTime: estimateReadTime(post.content?.rendered || '', lang),
    image: image || '/LOGO/hquarters-logo-wordmark.webp?v=20260822',
  };
}

export async function fetchArticles(lang = 'id') {
  const posts = await get(`${API}/posts?per_page=12&_embed`);
  return posts.map((post) => postToArticle(post, lang));
}

export async function fetchArticle(id, lang = 'id') {
  const post = await get(`${API}/posts/${id}?_embed`);
  return {
    ...postToArticle(post, lang),
    contentHtml: cleanElementorContent(post.content?.rendered || ''),
  };
}

