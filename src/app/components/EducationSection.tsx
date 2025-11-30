import { Education } from 'types/educationType';
import { getUserEducation } from '@/controllers/userEducationController';
import EducationAccordion from './EducationAccordion';

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
						<div key={index}>
							<EducationAccordion education={data} />
						</div>
					))}
				</section>
			) : (
				<section>No eduction history found.</section>
			)}
		</section>
	);
}
