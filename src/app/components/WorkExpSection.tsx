import { WorkExperience } from 'types/workExpType';
import { getUserWorkExp } from '@/controllers/userWorkExpController';
import ViewMore from './ViewMoreLink';

export default async function WorkExpSection() {
	const workData = await getUserWorkExp('zengks');
	const sortedWorkData = workData
		? [...workData].sort((a: WorkExperience, b: WorkExperience) => {
				return Number(b.startYear) - Number(a.startYear);
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
							<p>{`${data.startYear} - ${data.endYear ? data.endYear : 'Present'}`}</p>
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
