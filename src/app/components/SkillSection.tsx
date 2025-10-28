import {
	MOBILE_DEV_SKILLS,
	PROJECT_MANAGEMENT_TOOLS,
	MERN_STACK,
	NEXT_STACK,
} from '@/lib/constant';
import SkillRow from './SkillRow';

const iconWidth = 25;

export default async function SkillSection() {
	return (
		<div className="section-container">
			<p className="section-title">Core Technical Skills</p>
			<section>
				<SkillRow skillsArray={MERN_STACK} iconWidth={iconWidth} />

				<SkillRow skillsArray={NEXT_STACK} iconWidth={iconWidth} />
			</section>
			<section>
				<SkillRow skillsArray={MOBILE_DEV_SKILLS} iconWidth={iconWidth} />
			</section>
			<section>
				<SkillRow skillsArray={PROJECT_MANAGEMENT_TOOLS} iconWidth={iconWidth} />
			</section>
		</div>
	);
}
