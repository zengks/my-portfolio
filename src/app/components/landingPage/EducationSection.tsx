import { Education } from 'types/educationType';
import { getUserEducation } from '@/controllers/userEducationController';
import EducationAccordion from '../accordion/EducationAccordion';

export default async function EducationSection() {
	const eduData = await getUserEducation('zengks');

	return (
		<section className="section-container section-card">
			<p className="section-title">Education</p>
			{eduData && eduData.length > 0 ? (
				<section className="flex flex-col gap-2">
					{eduData.map((data: Education, index: number) => (
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
