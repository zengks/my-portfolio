import Image from 'next/image';
import Link from 'next/link';
import emoji from 'src/assets/images/emoji.jpg';
import { getUserProfile } from '@/controllers/userProfileController';

export default async function SideBar() {
	const profileData = await getUserProfile();
	return (
		<aside className="glass-container glass-sidebar rounded-2xl flex flex-col items-center justify-around h-1/2">
			<Image src={emoji} alt="my emoji style" className="rounded-full" priority />
			<p>
				Name:{' '}
				{profileData ? `${profileData.firstName} ${profileData.lastName || ''}` : 'Loading...'}
			</p>

			<p className="text-sm">{profileData ? profileData.email : 'Loading...'}</p>

			<Link href="/contact">Contact Me</Link>
			<section className="flex justify-around">
				<p>social</p>
				<p>social</p>
				<p>social</p>
			</section>
		</aside>
	);
}
