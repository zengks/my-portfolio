import SkillRow from '../../components/SkillRow';
import { getUserSkills } from '@/controllers/userSkillController';

const iconWidth = 30;

export default async function Skills() {
	const skillsData = await getUserSkills('zengks');
	return (
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
	);
}
