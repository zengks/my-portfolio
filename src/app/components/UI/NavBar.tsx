'use client';
import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function NavBar() {
	const menuRef = useRef<HTMLAnchorElement>(null);
	const itemBubbleRef = useRef(null);
	const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

	const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const { offsetLeft, offsetWidth } = e.target as HTMLAnchorElement;
		setBubbleStyle({ left: offsetLeft, width: offsetWidth });
	};

	return (
		<nav className="glass-container glass-menu" ref={menuRef}>
			{MENU_ITEMS.map((item) => (
				<Link
					key={item.name}
					href={item.link}
					className="glass-menu-item"
					onMouseEnter={handleHover}
				>
					{item.name.toUpperCase()}
				</Link>
			))}
			<span
				ref={itemBubbleRef}
				className="glass-menu-span"
				style={{
					left: `${bubbleStyle.left}px`,
					width: `${bubbleStyle.width}px`,
				}}
			/>
		</nav>
	);
}
