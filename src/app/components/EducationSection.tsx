import { Education } from 'types/educationType';
import { getYear } from '@/utility';
import { getAllUserEducation } from '@/controllers/userEducationController';

export default async function EducationSection() {
	const eduData = await getAllUserEducation();
	if (!eduData) return;
	return (
		<div className="section-container">
			<p className="section-title">Education</p>
			{eduData.length > 0 ? (
				<section className="w-80/100">
					{eduData.map((data: Education, index: number) => (
						<div className="section-container flex justify-between" key={index}>
							<p>{`${data.degree} in ${data.fieldOfStudy}`}</p>
							<p>{data.school}</p>
							<p>{`${getYear(data.startDate)} - ${getYear(data.endDate)}`}</p>
						</div>
					))}
				</section>
			) : (
				<section>Loading...</section>
			)}
		</div>
	);
}
