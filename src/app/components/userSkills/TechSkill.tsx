import Image from 'next/image';

type Skill = {
	name: string;
	logo: Array<{ logoSrc: string; logoAlt: string }>;
	description: string;
};

export default function TechSkill({ skill }: { skill: Skill }) {
	return (
		<div className="glass-container glass-card mr-2 text-sm">
			<section className="flex border-b-1 border-black/20 py-1">
				{skill.logo.length > 0 &&
					skill.logo.map((each, index) => (
						<Image key={index} src={each.logoSrc} alt={each.logoAlt} width={20} height={20} />
					))}
			</section>
			<p>{skill.name}</p>
			<p>{skill.description}</p>
		</div>
	);
}
