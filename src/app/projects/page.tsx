// import ProjectAccordion from '../components/projects/ProjectAccordion';
import SideBar from '../components/SideBar';
import ProjectList from '../components/projects/ProjectList';

import { Suspense } from 'react';

export default function Projects() {
	return (
		<main className="flex">
			<section className="w-1/4">
				<Suspense fallback={<div>Loading...</div>}>
					<SideBar />
				</Suspense>
			</section>
			<section className="w-3/4">
				<p>Projects</p>
				<Suspense fallback={<div>Loading...</div>}>
					<ProjectList />
				</Suspense>
			</section>
		</main>
	);
}
