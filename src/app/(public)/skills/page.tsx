import { getUserSkills } from '@/controllers/userSkillController';
import SkillsAccordion from '@/app/components/accordion/SkillsAccordion';

export default async function Skills() {
	const skillsData = await getUserSkills('zengks');

	const uniqueSkillCategories = () => {
		if (!skillsData) return [];
		const categories = skillsData.map((s) => s.categoryName);
		return Array.from(new Set(categories));
	};

	return (
		<section className="section-container section-card text-wrap">
			<p className="section-title">Technical Skills</p>
			{skillsData &&
				skillsData.length > 0 &&
				uniqueSkillCategories().map((eachCategory) => (
					<div
						key={eachCategory}
						className="mb-5 rounded-lg border py-2 px-4 border-gray-200 bg-neutral-50 shadow-sm"
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
	);
}
