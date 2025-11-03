import ProjectAccordion from '../components/ProjectAccordion';
import SideBar from '../components/SideBar';

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
				<p>Work History</p>
				<Suspense fallback={<div>Loading...</div>}>
					<ProjectAccordion />
				</Suspense>
			</section>
		</main>
	);
}
