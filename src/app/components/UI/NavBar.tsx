'use client';
import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { useRef } from 'react';

export default function NavBar() {
	const menuRef = useRef<HTMLAnchorElement>(null);

	return (
		<div className="flex justify-around items-center my-8 sticky top-0 z-50">
			{/* This line of name needs to be in art style */}
			<Link href="/">Name Name</Link>
			<div className="flex justify-between items-center gap-8">
				<nav ref={menuRef} className="flex justify-center gap-5 text-[15px] items-center">
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
