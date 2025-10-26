import { getUserAbout } from '@/controllers/userAboutController';

export default async function AboutSection() {
	const userAboutContent = await getUserAbout();

	return (
		<div className="glass-container glass-section">
			<p className="section-title">About Myself</p>
			<p className="section-content">{userAboutContent?.aboutUser}</p>
		</div>
	);
}
