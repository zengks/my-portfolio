import type { Metadata } from 'next';
import { Manrope, Lora, Hurricane } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

import SessionWrapper from './components/SessionWrapper';
import NavBar from './components/UI/NavBar';
import Footer from './components/UI/Footer';
import SideBar from './components/SideBar';

import './globals.css';

const manrope = Manrope({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-manrope',
});

const lora = Lora({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-lora',
});

const hurricane = Hurricane({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-hurricane',
});

export const metadata: Metadata = {
	title: 'Steven Portfolio',
	description: "CZ's portfolio website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${manrope.variable} ${lora.variable} ${hurricane.variable}`}>
			<body className="flex flex-col min-h-screen max-w-[1440px] mx-auto">
				<SessionWrapper>
					<NavBar />
					<main className="flex flex-col lg:flex-row flex-1">
						<section className="w-full lg:w-1/4">
							<SideBar />
						</section>
						<section className="w-full lg:w-3/4">{children}</section>
					</main>
					<Footer />
				</SessionWrapper>
				<Analytics />
			</body>
		</html>
	);
}
