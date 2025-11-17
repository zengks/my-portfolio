import SkillRow from '../components/SkillRow';

import {
	MERN_STACK,
	MOBILE_DEV_SKILLS,
	NEXT_STACK,
	PROJECT_MANAGEMENT_TOOLS,
} from '@/lib/constant';

const iconWidth = 30;

export default function Skills() {
	return (
		<section className="section-container section-card text-wrap">
			<p className="section-title">Skills / Toolkit</p>
			<section className="section-skill-card ps-[20] py-[10] mb-3">
				<p className="skill-sort-title">MERN Stack</p>
				<SkillRow skillsArray={MERN_STACK} iconWidth={iconWidth} />
			</section>
			<section className="section-skill-card ps-[20] py-[10] mb-3">
				<p className="skill-sort-title">NextJS Stack</p>
				<SkillRow skillsArray={NEXT_STACK} iconWidth={iconWidth} />
			</section>
			<section className="section-skill-card ps-[20] py-[10] mb-3">
				<p className="skill-sort-title">Mobile App Development</p>
				<SkillRow skillsArray={MOBILE_DEV_SKILLS} iconWidth={iconWidth} />
			</section>
			<section className="section-skill-card ps-[20] py-[10] mb-3">
				<p className="skill-sort-title">Project Management Tools</p>
				<SkillRow skillsArray={PROJECT_MANAGEMENT_TOOLS} iconWidth={iconWidth} />
			</section>
		</section>
	);
}
