import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Admin panelini arama motorlarına kapat
        },
        sitemap: 'https://nobetcieczane-demo.vercel.app/sitemap.xml',
    };
}
