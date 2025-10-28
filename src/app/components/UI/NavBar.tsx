'use client';
import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { useRef } from 'react';

import moonIcon from 'src/assets/icons/moon.svg';
import sunIcon from 'src/assets/icons/sun.svg';
import Image from 'next/image';

export default function NavBar() {
	const menuRef = useRef<HTMLAnchorElement>(null);

	return (
		<div className="flex justify-between items-center my-8 sticky top-0 z-50">
			{/* This line of name needs to be in art style */}
			<Link href="/">Name Name</Link>
			<div className="flex justify-between items-center gap-10">
				<nav ref={menuRef} className="flex justify-center gap-9 text-[15px] items-center me-15">
					{MENU_ITEMS.map((item) => (
						<Link key={item.name} href={item.link}>
							{item.name.toUpperCase()}
						</Link>
					))}
				</nav>
				<div className="flex justify-center items-center gap-2 me-4">
					<button>
						<Image src={sunIcon} alt="Light Mode Icon" width={25} height={25} />
					</button>
					<button>
						<Image src={moonIcon} alt="Dark Mode Icon" width={25} height={25} />
					</button>
				</div>
			</div>
		</div>
	);
}
