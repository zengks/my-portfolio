import Image from 'next/image';
import Link from 'next/link';

import emoji from 'src/assets/images/emoji.jpg';
import { getUserProfile } from '@/controllers/userProfileController';

export default async function SideBar({ userId }: { userId: string }) {
	const profile = await getUserProfile(userId);
	return (
		<aside className="glass-container glass-sidebar rounded-2xl flex flex-col items-center justify-around h-1/2">
			<Image src={emoji} alt="my emoji style" className="rounded-full" />
			<p>Name: {`${profile?.firstName} ${profile?.lastName}`}</p>

			<p className="text-sm">{profile?.email}</p>

			<Link href="/contact">Contact Me</Link>
			<section className="flex justify-around">
				<p>social</p>
				<p>social</p>
				<p>social</p>
			</section>
		</aside>
	);
}
