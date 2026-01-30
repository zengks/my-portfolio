import { WorkExperience } from 'types/workExpType';
import { getUserWorkExp } from '@/controllers/userWorkExpController';
import WorkAccordion from '../accordion/WorkAccordion';
import ViewMore from '../ViewMoreLink';

export default async function WorkExpSection() {
	const workData = await getUserWorkExp('zengks');

	return (
		<section className="section-container section-card">
			<p className="section-title">Recent Work Experience</p>

			{workData && workData.length > 0 ? (
				<section className="flex flex-col gap-2">
					{workData.slice(0, 3)?.map((data: WorkExperience) => (
						<WorkAccordion work={data} key={data.id} />
					))}
					<ViewMore target_url="/work" />
				</section>
			) : (
				<section>
					<p>No Work History Found.</p>
				</section>
			)}
		</section>
	);
}
