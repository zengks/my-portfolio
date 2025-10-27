import { WorkExperience } from 'types/workExpType';
import { getYear } from '@/utility';
import { getUserWorkExpByUsername } from '@/controllers/userWorkExpController';

export default async function WorkExpSection() {
	const workData = await getUserWorkExpByUsername();
	return (
		workData && (
			<div className="section-container">
				<p className="section-title">Recent Work Experience</p>
				{workData.length > 0 ? (
					<section className="flex flex-col gap-4">
						{workData.map((data: WorkExperience, index: number) => (
							<div className="flex justify-between items-center text-center" key={index}>
								<p className="font-bold">{data.company.toUpperCase()}</p>
								<p>{data.jobTitle}</p>
								<p>{data.description}</p>
								<p>{`${getYear(data.startDate)} - ${getYear(data.endDate)}`}</p>
							</div>
						))}
					</section>
				) : (
					<section>Loading...</section>
				)}
			</div>
		)
	);
}
