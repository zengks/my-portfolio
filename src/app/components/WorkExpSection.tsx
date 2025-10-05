import { WorkExperience } from 'types/workExpType';
import { getYear } from '@/utility';

export default async function WorkExpSection({ workExp }: { workExp: WorkExperience[] }) {
	return (
		<div className="glass-container glass-section">
			<p className="section-title">Work Experience</p>

			{workExp.length > 0 ? (
				<section className="flex">
					{workExp.map((data: WorkExperience, index: number) => (
						// <UserExp data={each} key={each.id} />
						<div className="glass-container glass-card mr-3 py-3 px-2" key={index}>
							<p className="border-b-1 border-black/20 py-1 font-bold">
								{data.company.toUpperCase()}
							</p>
							<p className="py-2">{data.jobTitle}</p>
							<p className="pb-2">{data.description}</p>
							<p className="pb-2">{`${getYear(data.startDate)} - ${getYear(data.endDate)}`}</p>
						</div>
					))}
				</section>
			) : (
				<section>Loading...</section>
			)}
		</div>
	);
}
