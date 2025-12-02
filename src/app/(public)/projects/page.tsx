import ProjectAccordion from '@/app/components/accordion/ProjectAccordion';

import { getUserProject } from '@/controllers/userProjectController';

export default async function Projects() {
	const projects = await getUserProject('zengks');
	console.log(projects);
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
