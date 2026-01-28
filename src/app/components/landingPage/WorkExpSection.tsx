import { WorkExperience } from 'types/workExpType';
import { getUserWorkExp } from '@/controllers/userWorkExpController';
import WorkAccordion from '../accordion/WorkAccordion';
import ViewMore from '../ViewMoreLink';

export default async function WorkExpSection() {
	const workData = await getUserWorkExp('zengks');

	const sortedWorkData = workData
		? [...workData].sort((a: WorkExperience, b: WorkExperience) => {
				const getEndDateValue = (work: WorkExperience) => {
					if (!work.endYear) return Infinity;
					return work.endYear * 12 + (work.endMonth || 0);
				};

				const getStartDateValue = (work: WorkExperience) => {
					return work.startYear * 12 + work.startMonth;
				};

				const endValueA = getEndDateValue(a);
				const endValueB = getEndDateValue(b);

				if (endValueA !== endValueB) {
					return endValueB - endValueA;
				}

				return getStartDateValue(b) - getStartDateValue(a);
			})
		: null;
	return (
		<section className="section-container section-card">
			<p className="section-title">Recent Work Experience</p>

			{sortedWorkData && sortedWorkData.length > 0 ? (
				<section className="flex flex-col gap-2">
					{sortedWorkData?.map((data: WorkExperience) => (
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
