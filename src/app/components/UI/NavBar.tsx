'use client';

import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

// import moonIcon from 'src/assets/icons/moon.svg';
// import sunIcon from 'src/assets/icons/sun.svg';
// import Image from 'next/image';

export default function NavBar() {
	const pathname = usePathname();
	// const [theme, setTheme] = useState('light');
	const { data: session, status } = useSession();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const closeMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="relative flex justify-between lg:justify-around items-center my-8 px-6 lg:px-0">
			<Link href="/" className="tracking-[16]" onClick={closeMenu}>
				<p className="logo logo-creative lg:ps-[35px]">steven</p>
			</Link>
			<div className="hidden lg:flex justify-between items-center gap-10">
				<nav className="flex justify-center gap-10 text-[15px] items-center">
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
                    h-0.5 bg-neutral-700 rounded-full
                    transition-all duration-400 ease-out
                    ${isActive ? 'w-2' : 'w-0'}
                    ${'group-hover:w-full'}
                  `}
								/>
							</Link>
						);
					})}
					{status === 'authenticated' && (
						<Link
							key="dashboard"
							href={`/${session.user.username}/dashboard`}
							className="group relative pb-1 text-neutral-600 hover:text-neutral-900 transition-colors"
						>
							Dashboard
							<span
								className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2
                    h-0.5 bg-neutral-700 rounded-full
                    transition-all duration-400 ease-out
                    ${pathname === `/${session.user.username}/dashboard` ? 'w-2' : 'w-0'}
                    ${'group-hover:w-full'}
                  `}
							/>
						</Link>
					)}
				</nav>
			</div>

			<button
				onClick={toggleMenu}
				className="lg:hidden text-neutral-600 focus:outline-none z-50"
				aria-label="Toggle Menu"
			>
				{isMobileMenuOpen ? (
					<svg
						className="w-6 h-6 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				) : (
					<svg
						className="w-6 h-6 cursor-pointer"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				)}
			</button>

			{isMobileMenuOpen && (
				<div className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 py-6 lg:hidden z-40 flex flex-col items-center gap-6 animate-in slide-in-from-top-5 fade-in duration-200">
					{MENU_ITEMS.map((item) => (
						<Link
							key={item.name}
							href={item.link}
							onClick={closeMenu}
							className={`text-md font-medium transition-colors ${
								pathname === item.link ? 'text-black' : 'text-neutral-500 hover:text-neutral-900'
							}`}
						>
							{item.name.toUpperCase()}
						</Link>
					))}
					{status === 'authenticated' && (
						<Link
							href={`/${session.user.username}/dashboard`}
							onClick={closeMenu}
							className="text-lg font-medium text-neutral-500 hover:text-neutral-900"
						>
							Dashboard
						</Link>
					)}
				</div>
			)}

			{/* only for style purposes */}
			<div className="hidden lg:block"></div>
			{/* light/dark mode to be implemented in the future */}
			{/* <div className="flex justify-center items-center gap-2 me-3">
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
			</div> */}
		</div>
	);
}
