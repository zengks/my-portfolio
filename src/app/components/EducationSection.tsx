import { Education } from 'types/educationType';
import { getYear } from '@/utility';
export default async function EducationSection({ eduHistory }: { eduHistory: Education[] }) {
	return (
		<div className="glass-container glass-section">
			<p className="section-title">Education</p>
			{eduHistory.length > 0 ? (
				<section>
					{eduHistory.map((data: Education, index: number) => (
						<div
							className="glass-container glass-card flex justify-between mb-2 px-3 py-2 font-bold"
							key={index}
						>
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
