import { getUserSkills } from '@/controllers/userSkillController';
import SkillsAccordion from '@/app/components/accordion/SkillsAccordion';

export default async function Skills() {
	const skillsData = await getUserSkills('zengks');

	const PREFERRED_ORDER = [
		'Core Skills',
		'Professional Workflow',
		'QA & Testing',
		'CMS & E-Commerce',
		'Actively Learning',
	];

	const uniqueSkillCategories = () => {
		if (!skillsData) return [];

		const categories = Array.from(
			new Set(skillsData.map((s) => s.categoryName).filter((name): name is string => name !== null))
		);

		return categories.sort((a, b) => {
			const indexA = PREFERRED_ORDER.indexOf(a);
			const indexB = PREFERRED_ORDER.indexOf(b);

			if (indexA === -1) return 1;
			if (indexB === -1) return -1;

			return indexA - indexB;
		});
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
