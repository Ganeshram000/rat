import { getServices, getProjects } from '@/lib/db';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neevsaathi.com';
  const currentDate = new Date().toISOString();

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
    '/estimate',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
