import { MetadataRoute } from 'next';
import { mockPharmacies } from '@/lib/mock-data';
import { mockBlogPosts } from '@/lib/mock-blog';
import { slugify } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nobetcieczane-demo.vercel.app';

    // Statik Sayfalar
    const routes = [
        '',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dinamik Blog Sayfaları (Mock Blog'dan veya API'den)
    const blogRoutes = mockBlogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dinamik İl / İlçe Sayfaları (Mock/API veya Sabit Listeden)
    // Eşsiz şehir-ilçe kombinasyonlarını bul
    const uniqueLocations = Array.from(
        new Set(mockPharmacies.map(p => `${slugify(p.city)}/${slugify(p.district)}`))
    );

    const locationRoutes = uniqueLocations.map((loc) => ({
        url: `${baseUrl}/${loc}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'hourly' as const,     // Eczaneler sık değiştiği için
        priority: 0.9,
    }));

    return [...routes, ...locationRoutes, ...blogRoutes];
}
