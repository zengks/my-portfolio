'use client';

import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import moonIcon from 'src/assets/icons/moon.svg';
import sunIcon from 'src/assets/icons/sun.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function NavBar() {
	const pathname = usePathname();
	const [theme, setTheme] = useState('light');

	return (
		<div className="flex justify-around items-center my-8">
			<Link href="/" className="tracking-[16]">
				<p className="logo logo-creative ps-[35]">steven</p>
			</Link>
			<div className="flex justify-between items-center gap-10">
				<nav className="flex justify-center gap-9 text-[15px] items-center">
					{MENU_ITEMS.map((item) => {
						const isActive = pathname === item.link;
						return (
							<Link
								key={item.name}
								href={item.link}
								className="group relative pb-1 text-neutral-600 hover:text-neutral-900 transition-colors"
							>
								{item.name.toUpperCase()}

								<span
									className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    h-[2px] bg-neutral-700 rounded-full
                    transition-all duration-400 ease-out
                    ${isActive ? 'w-[8px]' : 'w-0'}
                    ${'group-hover:w-full'}
                  `}
								/>
							</Link>
						);
					})}
				</nav>
			</div>
			<div className="flex justify-center items-center gap-2 me-3">
				<div className="group relative flex items-center justify-center w-10 h-10">
					<button
						onClick={() => setTheme('light')}
						className={`
              absolute p-2 rounded-full
              transition-all duration-300 ease-out hover:bg-neutral-200 cursor-pointer
              ${theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
              group-hover:translate-x-[-60%] group-hover:opacity-100 group-hover:scale-100
              group-hover:bg-neutral-100
            `}
					>
						<Image src={sunIcon} alt="Light Mode Icon" width={25} height={25} />
					</button>

					<button
						onClick={() => setTheme('dark')}
						className={`
              absolute p-2 rounded-full
              transition-all duration-300 ease-out hover:bg-neutral-200 cursor-pointer
              ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
              group-hover:translate-x-[50%] group-hover:opacity-100 group-hover:scale-100
              group-hover:bg-neutral-100
            `}
					>
						<Image src={moonIcon} alt="Dark Mode Icon" width={25} height={25} />
					</button>
				</div>
			</div>
		</div>
	);
}
