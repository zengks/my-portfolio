import { WorkExperience } from 'types/workExpType';
import { getYear } from '@/utility';
import { getUserWorkExpByUsername } from '@/controllers/userWorkExpController';
import ViewMore from './ViewMoreLink';

// const TABLE_HEADERS = ['Company', 'Job Title', 'Duration'];

export default async function WorkExpSection() {
	const workData = await getUserWorkExpByUsername();
	const sortedWorkData = workData
		? [...workData].sort((a: WorkExperience, b: WorkExperience) => {
				return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
		  })
		: null;
	return (
		<section className="section-container section-card">
			<p className="section-title">Recent Work Experience</p>

			{sortedWorkData && sortedWorkData.length > 0 ? (
				<section className="flex flex-col gap-2">
					{sortedWorkData?.map((data: WorkExperience, index: number) => (
						<div className="columns-3" key={index}>
							<p>{data.company.toUpperCase()}</p>
							<p>{data.jobTitle}</p>
							<p>{`${getYear(data.startDate)} - ${getYear(data.endDate)}`}</p>
						</div>
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
