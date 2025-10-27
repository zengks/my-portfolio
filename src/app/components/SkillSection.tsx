import {
	MOBILE_DEV_SKILLS,
	PROJECT_MANAGEMENT_TOOLS,
	MERN_STACK,
	NEXT_STACK,
} from '@/lib/constant';
import Image from 'next/image';

const iconWidth = 25;
const iconHeight = 25;

export default async function SkillSection() {
	return (
		<div className="section-container">
			<p className="section-title">Core Technical Skills</p>
			<section>
				{/* <p>Fullstack Development</p> */}
				<div className="skill-row">
					{MERN_STACK.map((skill, index) => (
						<div key={index} className="skill-item">
							<Image src={skill.src} alt={skill.altText} width={iconWidth} height={iconHeight} />
							<p>{skill.name}</p>
						</div>
					))}
				</div>
				<div className="skill-row">
					{NEXT_STACK.map((skill, index) => (
						<div key={index} className="skill-item">
							<Image src={skill.src} alt={skill.altText} width={iconWidth} height={iconHeight} />
							<p>{skill.name}</p>
						</div>
					))}
				</div>
			</section>
			<section>
				{/* <p>Mobile App Development</p> */}
				<div className="skill-row">
					{MOBILE_DEV_SKILLS.map((skill, index) => (
						<div key={index} className="skill-item">
							<Image src={skill.src} alt={skill.altText} width={iconWidth} height={iconHeight} />
							<p>{skill.name}</p>
						</div>
					))}
				</div>
			</section>
			<section>
				{/* <p>Project Management</p> */}
				<div className="skill-row">
					{PROJECT_MANAGEMENT_TOOLS.map((tool, index) => (
						<div key={index} className="skill-item">
							<Image src={tool.src} alt={tool.altText} width={iconWidth} height={iconHeight} />
							<p>{tool.name}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
