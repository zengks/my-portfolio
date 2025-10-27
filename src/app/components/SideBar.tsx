import Image from 'next/image';
import Link from 'next/link';
import profileIcon from 'src/assets/images/profile.svg';
import { getUserProfile } from '@/controllers/userProfileController';

export default async function SideBar() {
	const profileData = await getUserProfile();
	return (
		<aside className="section-sidebar flex flex-col items-center gap-6 relative">
			<Image
				src={profileIcon}
				alt="my emoji style"
				width={50}
				height={50}
				className="absolute top-0 translate-y-[-50%]"
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

			<section className="flex flex-col items-center gap-4">
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
