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
			{/* <section>
				<SkillRow skillsArray={MERN_STACK} iconWidth={iconWidth} />

				<SkillRow skillsArray={NEXT_STACK} iconWidth={iconWidth} />
			</section>
			<section>
				<SkillRow skillsArray={MOBILE_DEV_SKILLS} iconWidth={iconWidth} />
			</section>
			<section>
				<SkillRow skillsArray={PROJECT_MANAGEMENT_TOOLS} iconWidth={iconWidth} />
			</section> */}
		</div>
	);
}
