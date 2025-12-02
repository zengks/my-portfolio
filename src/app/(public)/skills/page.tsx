import { getUserSkills } from '@/controllers/userSkillController';
import SkillsAccordion from '@/app/components/accordion/SkillsAccordion';

export default async function Skills() {
	const skillsData = await getUserSkills('zengks');
	return (
		<section className="section-container section-card text-wrap">
			{skillsData &&
				skillsData.length > 0 &&
				skillsData.map((each, index) => (
					<section key={index}>
						<SkillsAccordion skill={each} />
					</section>
				))}
		</section>
	);
}
