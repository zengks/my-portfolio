import type { Metadata } from 'next';
import { Manrope, Lora, Hurricane } from 'next/font/google';

import SessionWrapper from './components/SessionWrapper';
import NavBar from './components/UI/NavBar';
import Footer from './components/UI/Footer';

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
	weight: '400', // Hurricane only has 400 weight
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
			<body className="flex flex-col min-h-screen justify-between">
				<NavBar />
				<section>
					<SessionWrapper>{children}</SessionWrapper>
				</section>
				<Footer />
			</body>
		</html>
	);
}
