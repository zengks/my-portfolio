import Image from 'next/image';

type skillItemType = {
	name: string;
	src: string;
	altText: string;
};

type skillRowProps = {
	skillsArray: Array<skillItemType>;
	iconWidth: number;
};

export default function SkillRow({ skillsArray, iconWidth }: skillRowProps) {
	return (
		<div className="skill-row">
			{skillsArray.map((skill: skillItemType, index: number) => (
				<div key={index} className="skill-item">
					<Image src={skill.src} alt={skill.altText} width={iconWidth} />
					<p>{skill.name}</p>
				</div>
			))}
		</div>
	);
}
