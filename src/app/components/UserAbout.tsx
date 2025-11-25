import { getUserAbout } from '@/controllers/userAboutController';
import ViewMore from './ViewMoreLink';

export default async function AboutSection() {
	const data = await getUserAbout();
	return (
		<section className="section-container section-card relative">
			<p className="section-title">About Myself</p>
			{data?.aboutUser && data?.aboutUser.length > 0 && (
				<p className="text-wrap">{data.aboutUser[0].aboutContent}</p>
			)}
			<ViewMore target_url="/about" />
		</section>
	);
}
