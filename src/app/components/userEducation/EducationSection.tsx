import UserEdu from './UserEdu';
import { getAllUserEducation } from '@/controllers/userEducationController';

export default async function EducationSection({ userId }: { userId: string }) {
	const eduHistory = await getAllUserEducation(userId);
	return (
		<div className="glass-container glass-section">
			<p className="section-title">Education</p>
			{eduHistory.length > 0 ? (
				<section>
					{eduHistory.map((each) => (
						<UserEdu data={each} key={each.id} />
					))}
				</section>
			) : (
				<section>Loading...</section>
			)}
		</div>
	);
}
