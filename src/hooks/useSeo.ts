import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}

const SITE_URL = 'https://сайт-удачи.рф';

const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

export const useSeo = ({ title, description, path = '/', noindex = false }: SeoOptions) => {
  useEffect(() => {
    document.title = title;
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    setMetaTag('property', 'og:title', title);
    setMetaTag('name', 'twitter:title', title);

    const url = `${SITE_URL}${path}`;
    setMetaTag('property', 'og:url', url);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, path]);
};