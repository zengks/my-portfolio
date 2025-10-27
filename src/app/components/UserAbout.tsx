import { getUserAbout } from '@/controllers/userAboutController';

export default async function AboutSection() {
	const userAboutContent = await getUserAbout();

	return (
		<div className="section-container">
			<p className="section-title">About Myself</p>
			<p className="w-2xl text-wrap">{userAboutContent?.aboutUser}</p>
		</div>
	);
}
