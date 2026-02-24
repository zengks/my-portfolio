import { getUserSkills } from '@/controllers/userSkillController';
import SkillsAccordion from '@/app/components/accordion/SkillsAccordion';
import { Metadata } from 'next';
import type { Skill } from 'types/skillType';

export const metadata: Metadata = {
	title: 'Technical Skills | Full Stack Developer',
	description:
		"Explore Steven's technical proficiency and expertise in various programming languages, frameworks, and tools.",
	openGraph: {
		title: 'Technical Skills | Steven',
		description:
			"A breakdown of Steven's technical stack including JavaScript, React, Node.js, and Cloud Infrastructure.",
	},
};

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
			new Set(
				skillsData.map((s: Skill) => s.categoryName).filter((name): name is string => name !== null)
			)
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
			{/* Hidden for SEO */}
			<h1 className="sr-only">Technical Skills and Proficiency</h1>
			<p className="section-title">Technical Skills</p>
			{skillsData &&
				skillsData.length > 0 &&
				uniqueSkillCategories().map((eachCategory: string) => (
					<div
						key={eachCategory}
						className="mb-5 rounded-lg border py-2 px-4 border-gray-200 bg-neutral-50 shadow-sm"
					>
						<p className="text-lg font-light tracking-wider text-gray-700 uppercase mb-3">
							{eachCategory}
						</p>
						{skillsData
							.filter((skill) => skill.categoryName === eachCategory)
							.map((each: Skill, index: number) => (
								<section key={index}>
									<SkillsAccordion skill={each} />
								</section>
							))}
					</div>
				))}
		</section>
	);
}
