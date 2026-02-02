import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://www.czsteven.com';

	const routes = ['', '/about', '/projects', '/contact', '/myInfo', '/skills', '/work'].map(
		(route) => ({
			url: `${baseUrl}${route}`,
			lastModified: new Date(),
		})
	);

	return [...routes];
}
