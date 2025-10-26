import type { Metadata } from 'next';
import SessionWrapper from './components/SessionWrapper';
import NavBar from './components/UI/NavBar';
import Footer from './components/UI/Footer';

import './globals.css';
import '@/styles/component.css';

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
			<body className="border-1 flex flex-col min-h-screen justify-between">
				<NavBar />
				<section className="w-85/100 mx-auto border-1">
					<SessionWrapper>{children}</SessionWrapper>
				</section>
				<Footer />
			</body>
		</html>
	);
}
