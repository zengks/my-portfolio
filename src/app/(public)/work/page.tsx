import WorkAccordion from '../../components/WorkAccordion';
import { getUserWorkExp } from '@/controllers/userWorkExpController';

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
