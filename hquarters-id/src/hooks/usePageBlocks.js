import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export function usePageBlocks(slug) {
  const { language } = useLanguage();
  const [blocks, setBlocks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`/wp-json/hq/v1/page-blocks?slug=${encodeURIComponent(slug)}&lang=${encodeURIComponent(language)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && Array.isArray(data.blocks)) {
          setBlocks(data.blocks);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug, language]);

  return { blocks, loading };
}
