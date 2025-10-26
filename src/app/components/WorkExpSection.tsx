import { WorkExperience } from 'types/workExpType';
import { getYear } from '@/utility';
import { getUserWorkExpByUsername } from '@/controllers/userWorkExpController';

export default async function WorkExpSection() {
	const workData = await getUserWorkExpByUsername();
	return (
		workData && (
			<div className="section-container">
				<p className="section-title">Work Experience</p>

				{workData.length > 0 ? (
					<section className="w-50/100">
						{workData.map((data: WorkExperience, index: number) => (
							<div
								className="section-container flex justify-between items-center gap-5"
								key={index}
							>
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
