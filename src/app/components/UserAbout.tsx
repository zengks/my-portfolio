import { getUserAbout } from '@/controllers/userAboutController';

export default async function AboutSection() {
	const userAboutContent = await getUserAbout();
	return (
		<section className="section-container">
			<p className="section-title">About Myself</p>
			<p className="text-wrap">
				{userAboutContent && userAboutContent.aboutUser !== null
					? userAboutContent.aboutUser
					: 'Nothing to show'}
			</p>
		</section>
	);
}
