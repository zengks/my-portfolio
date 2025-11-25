import { getUserProjectByUsername } from '@/controllers/userProjectController';
import ProjectAccordion from './ProjectAccordion';
import { Project } from 'types/projectType';

export default async function ProjectList() {
	const projectData = await getUserProjectByUsername();
	return (
		<div>
			{projectData?.length ? (
				<div>
					{projectData.map((project: Project, index: number) => (
						<div key={index}>
							<ProjectAccordion project={project} />
						</div>
					))}
				</div>
			) : (
				<p>No projects found</p>
			)}
		</div>
	);
}
