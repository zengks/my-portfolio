import { getUserAbout } from '@/controllers/userAboutController';

export default async function AboutSection() {
	const userAboutContent = await getUserAbout();

	return (
		<div className="section-container">
			<section>
				<p className="section-title">About Myself</p>
				<p className="text-wrap">{userAboutContent?.aboutUser}</p>
			</section>
		</div>
	);
}
