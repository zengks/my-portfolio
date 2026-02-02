import { Metadata } from 'next';

import WorkAccordion from '../../components/accordion/WorkAccordion';
import { getUserWorkExp } from '@/controllers/userWorkExpController';

export const metadata: Metadata = {
	title: 'Work History | Professional Experience',
	description:
		'A timeline of my professional experience in software engineering, including roles, responsibilities, and achievements.',
};

export default async function Work() {
	const workData = await getUserWorkExp('zengks');
	return (
		<section className="section-container section-card">
			<p className="section-title">Work History</p>
			{workData &&
				workData.length > 0 &&
				workData.map((work) => <WorkAccordion work={work} key={work.id} />)}
		</section>
	);
}
