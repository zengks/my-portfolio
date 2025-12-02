import ViewMore from '../ViewMoreLink';
import { getUserSkills } from '@/controllers/userSkillController';
import SkillsAccordion from '../accordion/SkillsAccordion';

const TARGET_CATEGORIES = ['Core Skills', 'Web Development'];

export default async function SkillSection() {
	const skillsData = await getUserSkills('zengks');
	return (
		<section className="section-container section-card">
			<p className="section-title">Technical Skills</p>
			<section>
				{skillsData &&
					skillsData.length > 0 &&
					TARGET_CATEGORIES.map((eachCategory) => (
						<div
							key={eachCategory}
							className="mb-5 rounded-lg border py-2 px-4 border-gray-200 bg-neutral-50 shadow-sm "
						>
							<p className="text-lg font-light tracking-wider text-gray-700 uppercase mb-3">
								{eachCategory}
							</p>
							{skillsData
								.filter((skill) => skill.categoryName === eachCategory)
								.map((each, index) => (
									<section key={index}>
										<SkillsAccordion skill={each} />
									</section>
								))}
						</div>
					))}
			</section>
			<ViewMore target_url="/skills" />
		</section>
	);
}
