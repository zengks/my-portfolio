'use client';

import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import moonIcon from 'src/assets/icons/moon.svg';
import sunIcon from 'src/assets/icons/sun.svg';
import Image from 'next/image';

export default function NavBar() {
	const pathname = usePathname();

	return (
		<div className="flex justify-around items-center my-8">
			<Link href="/" className="tracking-[16]">
				<p className="logo logo-creative ps-[40]">steven</p>
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
			<div className="flex justify-center items-center gap-2 me-4">
				<button>
					<Image src={sunIcon} alt="Light Mode Icon" width={25} height={25} />
				</button>
				<button>
					<Image src={moonIcon} alt="Dark Mode Icon" width={25} height={25} />
				</button>
			</div>
		</div>
	);
}
