'use client';
import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { useRef } from 'react';

export default function NavBar() {
	const menuRef = useRef<HTMLAnchorElement>(null);

	return (
		<div className="flex justify-around items-center border-1">
			{/* This line of name needs to be in art style */}
			<p>Name Name</p>
			<nav ref={menuRef} className="flex justify-center gap-4 items-center">
				{MENU_ITEMS.map((item) => (
					<Link key={item.name} href={item.link} className="border-1">
						{item.name.toUpperCase()}
					</Link>
				))}
			</nav>
			<p>Theme Change Button</p>
		</div>
	);
}
