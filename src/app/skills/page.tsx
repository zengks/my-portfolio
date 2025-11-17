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
		<section className="section-container text-wrap">
			<p className="section-title">Skills / Toolkit</p>
			<div>
				<p className="skill-sort-title">MERN Stack</p>
				<SkillRow skillsArray={MERN_STACK} iconWidth={iconWidth} />
			</div>
			<div>
				<p className="skill-sort-title">NextJS Stack</p>
				<SkillRow skillsArray={NEXT_STACK} iconWidth={iconWidth} />
			</div>
			<div>
				<p className="skill-sort-title">Mobile App Development</p>
				<SkillRow skillsArray={MOBILE_DEV_SKILLS} iconWidth={iconWidth} />
			</div>
			<div>
				<p className="skill-sort-title">Project Management Tools</p>
				<SkillRow skillsArray={PROJECT_MANAGEMENT_TOOLS} iconWidth={iconWidth} />
			</div>
		</section>
	);
}
