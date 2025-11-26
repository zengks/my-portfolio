import Image from 'next/image';
import { SKILLS_MAP } from '@/lib/constant';

export default function SkillRow({
	skillsArray,
	iconWidth,
}: {
	skillsArray: string[];
	iconWidth: number;
}) {
	return (
		<div className="skill-row">
			{skillsArray.map((each, index: number) => (
				<div key={index} className="skill-item">
					<Image
						src={SKILLS_MAP[each as keyof typeof SKILLS_MAP]}
						alt={`${each} icon`}
						height={32}
						className="size-6 md:size-8"
						width={iconWidth}
					/>
					<p>{each}</p>
				</div>
			))}
		</div>
	);
}
