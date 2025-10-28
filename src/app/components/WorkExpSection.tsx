import { WorkExperience } from 'types/workExpType';
import { getYear } from '@/utility';
import { getUserWorkExpByUsername } from '@/controllers/userWorkExpController';

// const TABLE_HEADERS = ['Company', 'Job Title', 'Duration'];

export default async function WorkExpSection() {
	const workData = await getUserWorkExpByUsername();
	if (!workData) return;
	const sortedWorkData = workData
		? [...workData].sort((a: WorkExperience, b: WorkExperience) => {
				return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
		  })
		: null;
	return (
		sortedWorkData && (
			<div className="section-container">
				<p className="section-title">Recent Work Experience</p>
				{sortedWorkData.length > 0 ? (
					<>
						<section className="columns-3">
							{/* {TABLE_HEADERS.map((header, index) => (
								<p key={index} className="italic font-extrabold ">
									{header}
								</p>
							))} */}
						</section>
						<section className="flex flex-col gap-2">
							{sortedWorkData.map((data: WorkExperience, index: number) => (
								<div className="columns-3" key={index}>
									<p>{data.company.toUpperCase()}</p>
									<p>{data.jobTitle}</p>
									<p>{`${getYear(data.startDate)} - ${getYear(data.endDate)}`}</p>
								</div>
							))}
						</section>
					</>
				) : (
					<section>
						<p>No Work History</p>
					</section>
				)}
			</div>
		)
	);
}
