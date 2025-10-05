import Image from 'next/image';
import Link from 'next/link';
import { Profile } from 'types/profileType';

import emoji from 'src/assets/images/emoji.jpg';

export default async function SideBar({ profile }: { profile: Profile | null }) {
	return (
		<aside className="glass-container glass-sidebar rounded-2xl flex flex-col items-center justify-around h-1/2">
			<Image src={emoji} alt="my emoji style" className="rounded-full" priority />
			<p>Name: {profile ? `${profile.firstName} ${profile.lastName || ''}` : 'Loading...'}</p>

			<p className="text-sm">{profile ? profile.email : 'Loading...'}</p>

			<Link href="/contact">Contact Me</Link>
			<section className="flex justify-around">
				<p>social</p>
				<p>social</p>
				<p>social</p>
			</section>
		</aside>
	);
}
