import { Education } from 'types/educationType';
import { getAllUserEducation } from '@/controllers/userEducationController';

export default async function EducationSection() {
	const eduData = await getAllUserEducation('zengks');
	const sortedEduData = eduData
		? [...eduData].sort((a: Education, b: Education) => {
				return b.startYear - a.startYear;
		  })
		: null;

	return (
		<section className="section-container section-card">
			<p className="section-title">Education</p>
			{sortedEduData && sortedEduData.length > 0 ? (
				<section className="flex flex-col gap-2">
					{sortedEduData.map((data: Education, index: number) => (
						<div className="columns-3" key={index}>
							<p>{`${data.degree} in ${data.fieldOfStudy}`}</p>
							<p>{data.school}</p>
							<p>{`${data.startYear} - ${data.endYear}`}</p>
						</div>
					))}
				</section>
			) : (
				<section>No eduction history found.</section>
			)}
		</section>
	);
}
