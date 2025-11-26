import { getUserAbout } from '@/controllers/userAboutController';
import ViewMore from './ViewMoreLink';

export default async function AboutSection() {
	const userAbout = await getUserAbout('zengks');
	return (
		<section className="section-container section-card relative">
			<p className="section-title">About Myself</p>
			{userAbout && userAbout.length > 0 && (
				<>
					<p className="section-title">{userAbout[0].header}</p>
					<p className="text-wrap">{userAbout[0].aboutContent}</p>
				</>
			)}
			<ViewMore target_url="/about" />
		</section>
	);
}
