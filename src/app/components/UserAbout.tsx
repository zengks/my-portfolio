import { getUserAbout } from '@/controllers/userAboutController';
import ViewMore from './ViewMoreLink';

export default async function AboutSection() {
	const userAboutContent = await getUserAbout();
	return (
		<section className="section-container section-card relative">
			<p className="section-title">About Myself</p>
			<p className="text-wrap">
				{userAboutContent && userAboutContent.aboutUser !== null
					? userAboutContent.aboutUser
					: 'Nothing to show'}
			</p>
			<ViewMore target_url="/about" />
		</section>
	);
}
