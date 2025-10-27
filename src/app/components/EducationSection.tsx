import { Education } from 'types/educationType';
import { getYear } from '@/utility';
import { getAllUserEducation } from '@/controllers/userEducationController';

export default async function EducationSection() {
	const eduData = await getAllUserEducation();
	if (!eduData) return;
	const sortedEduData = eduData
		? [...eduData].sort((a: Education, b: Education) => {
				return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
		  })
		: null;

	return (
		sortedEduData && (
			<div className="section-container">
				<p className="section-title">Education</p>
				{sortedEduData.length > 0 ? (
					<section className="flex flex-col gap-4">
						{sortedEduData.map((data: Education, index: number) => (
							<div className="columns-3" key={index}>
								<p>{`${data.degree} in ${data.fieldOfStudy}`}</p>
								<p>{data.school}</p>
								<p>{`${getYear(data.startDate)} - ${getYear(data.endDate)}`}</p>
							</div>
						))}
					</section>
				) : (
					<section>No eduction history</section>
				)}
			</div>
		)
	);
}
