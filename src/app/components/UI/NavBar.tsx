import { MENU_ITEMS } from '@/lib/constant';
import Link from 'next/link';

import moonIcon from 'src/assets/icons/moon.svg';
import sunIcon from 'src/assets/icons/sun.svg';
import Image from 'next/image';

export default function NavBar() {
	return (
		<div className="flex justify-between items-center my-8 ">
			<Link href="/" className="tracking-[16]">
				<p className="logo logo-creative ms-30">steven</p>
			</Link>
			<div className="flex justify-between items-center  gap-10">
				<nav className="flex justify-center gap-9 text-[15px] items-center">
					{MENU_ITEMS.map((item) => (
						<Link key={item.name} href={item.link}>
							{item.name.toUpperCase()}
						</Link>
					))}
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
