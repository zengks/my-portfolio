import Image from 'next/image';
import Link from 'next/link';
import emoji from 'src/assets/images/emoji.jpg';
import { getUserProfile } from '@/controllers/userProfileController';

export default async function SideBar() {
	const profileData = await getUserProfile();
	return (
		<aside className="section-container flex flex-col items-center gap-6 w-50">
			<Image
				src={emoji}
				alt="my emoji style"
				width={80}
				height={80}
				className="rounded-full"
				priority
			/>

			<section className="text-center">
				<p>
					{profileData ? `${profileData.firstName} ${profileData.lastName || ''}` : 'Loading...'}
				</p>

				<p>FullStack Developer</p>
			</section>

			<section className="flex justify-around items-center">
				<p>LinkedIn</p>
				<p>GitHub</p>
			</section>

			<section className="section-container flex flex-col items-center gap-4">
				<p className="text-sm">{profileData ? profileData.email : 'Loading...'}</p>
				<p>My Location</p>
			</section>

			<section>
				<Link href="/contact">Contact Me</Link>
				<p>Download Resume</p>
			</section>
		</aside>
	);
}
