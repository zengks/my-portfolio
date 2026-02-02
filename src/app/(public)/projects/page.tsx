import { Metadata } from 'next';

import ProjectAccordion from '@/app/components/accordion/ProjectAccordion';
import { getUserProject } from '@/controllers/userProjectController';

export const metadata: Metadata = {
	title: 'Projects | Portfolio Showcase',
	description:
		'Browse my latest web development projects. A showcase of applications built with Next.js, React, Node.js, and more.',
	openGraph: {
		title: "Steven\'s Project Portfolio",
		description: 'Case studies and live demos of my software engineering work.',
	},
};

export default async function Projects() {
	const projects = await getUserProject('zengks');
	return (
		<>
			<section className="section-container section-card">
				<p className="section-title">Projects</p>
				{projects &&
					projects.length > 0 &&
					projects.map((each) => <ProjectAccordion key={each.id} project={each} />)}
			</section>
		</>
	);
}
