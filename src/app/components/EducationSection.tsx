import { Education } from 'types/educationType';
import { getUserEducation } from '@/controllers/userEducationController';

export default async function EducationSection() {
	const eduData = await getUserEducation('zengks');
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
						<div className="columns-4 items-center border text-[15px]" key={index}>
							<p className="border">{`${data.degree}`}</p>
							<p className="border">{`${data.fieldOfStudy}`}</p>
							<p className="border">{data.school}</p>
							<p className="border">{`${data.startYear} - ${data.endYear}`}</p>
						</div>
					))}
				</section>
			) : (
				<section>No eduction history found.</section>
			)}
		</section>
	);
}
