import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import SessionWrapper from './components/SessionWrapper';
import NavBar from './components/UI/NavBar';
import Footer from './components/UI/Footer';

import './globals.css';
import '@/styles/component.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'CZ',
	description: "CZ's portfolio website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head></head>
			<body>
				<NavBar />
				<SessionWrapper>{children}</SessionWrapper>
				<Footer />
			</body>
		</html>
	);
}
