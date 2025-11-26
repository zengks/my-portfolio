import SkillRow from './SkillRow';
import ViewMore from './ViewMoreLink';
import { getUserSkills } from '@/controllers/userSkillController';

const iconWidth = 25;

export default async function SkillSection() {
	const skillsData = await getUserSkills('zengks');
	return (
		<section className="section-container section-card">
			<p className="section-title">Core Technical Skills</p>
			<section className="section-container section-card text-wrap">
				{skillsData &&
					skillsData.length > 0 &&
					skillsData.map((each) => (
						<section key={each.id} className="section-skill-card ps-[20] py-[10] mb-3">
							<p className="skill-sort-title">{each.categoryName}</p>
							<SkillRow skillsArray={each.skills} iconWidth={iconWidth} />
						</section>
					))}
			</section>
			<ViewMore target_url="/skills" />
		</section>
	);
}
