import type { Metadata } from 'next';
import { Manrope, Lora, Hurricane } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { auth } from '@/lib/auth';

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
	metadataBase: new URL('https://www.czsteven.com'),

	title: {
		template: "%s | Steven's Portfolio",
		default: "Steven's Portfolio",
	},

	description: 'Full-stack developer portfolio showcasing projects and skills.',

	openGraph: {
		type: 'website',
		locale: 'en_CA',
		siteName: "Steven's Portfolio",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	const username = session?.user?.username;
	return (
		<html lang="en" className={`${manrope.variable} ${lora.variable} ${hurricane.variable}`}>
			<body className="flex flex-col min-h-screen max-w-360 mx-auto">
				<SessionWrapper>
					<NavBar username={username ?? null} />
					<main className="flex flex-col lg:flex-row flex-1">
						<section className="w-full lg:w-1/3 xl:w-1/4">
							<SideBar />
						</section>
						<section className="w-full lg:w-2/3 xl:w-3/4">{children}</section>
					</main>
					<Footer />
				</SessionWrapper>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
