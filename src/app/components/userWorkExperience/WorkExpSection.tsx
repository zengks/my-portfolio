import UserExp from './UserExp';
import { getUserWorkExp } from '@/controllers/userWorkExpController';

export default async function WorkExpSection({ userId }: { userId: string }) {
	const workExp = await getUserWorkExp(userId);
	return (
		<div className="glass-container glass-section">
			<p className="section-title">Work Experience</p>

			{workExp.length > 0 ? (
				<section className="flex">
					{workExp.map((each) => (
						<UserExp data={each} key={each.id} />
					))}
				</section>
			) : (
				<section>Loading...</section>
			)}
		</div>
	);
}
