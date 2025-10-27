'use client';
import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { useRef } from 'react';

export default function NavBar() {
	const menuRef = useRef<HTMLAnchorElement>(null);

	return (
		<div className="flex justify-around items-center mt-5">
			{/* This line of name needs to be in art style */}
			<Link href="/">Name Name</Link>
			<div className="flex justify-between items-center gap-8">
				<nav ref={menuRef} className="flex justify-center gap-8 items-center">
					{MENU_ITEMS.map((item) => (
						<Link key={item.name} href={item.link}>
							{item.name.toUpperCase()}
						</Link>
					))}
				</nav>
				<p>Theme Button</p>
			</div>
		</div>
	);
}
