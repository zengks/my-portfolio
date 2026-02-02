import { Metadata } from 'next';

import UserAbout from './components/landingPage/UserAbout';
import WorkExpSection from './components/landingPage/WorkExpSection';
import EducationSection from './components/landingPage/EducationSection';
import CertificateSection from './components/landingPage/CertificateSection';
import SkillSection from './components/landingPage/SkillSection';

export const metadata: Metadata = {
	title: {
		absolute: 'Steven | Full Stack Developer in Vancouver, BC',
	},
	description:
		'Portfolio of Steven, a Full Stack Developer, based in Vancouver, BC (Greater Vancouver), specializing in Next.js, React, and modern web technologies. View projects, skills, and contact information.',
	alternates: {
		canonical: 'https://www.czsteven.com',
	},
	openGraph: {
		title: 'Steven | Web Developer in Vancouver, BC',
		description: 'Local Full Stack Developer specializing in Next.js, React, and modern web tech.',
		url: 'https://www.czsteven.com',
		siteName: "Steven's Portfolio",
		locale: 'en_CA',
		type: 'website',
	},
};

export default async function Home() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Steven',
		url: 'https://www.czsteven.com',
		jobTitle: 'Full Stack Developer',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Vancouver',
			addressRegion: 'BC',
			addressCountry: 'Canada',
		},
		sameAs: ['https://github.com/zengks', 'https://www.linkedin.com/in/chenzeng91/'],
	};

	return (
		<section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<UserAbout />
			<SkillSection />
			<WorkExpSection />
			<EducationSection />
			<CertificateSection />
		</section>
	);
}
