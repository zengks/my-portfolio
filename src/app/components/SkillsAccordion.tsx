'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Skill } from 'types/skillType';
import { SKILLS_MAP } from '@/lib/constant';
import DefaultProgrammingIcon from '@/assets/icons/defaultProgramming.svg';

export default function SkillsAccordion({ skill }: { skill: Skill }) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleAccordion = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="mb-3 rounded-lg border border-gray-200 bg-neutral-50 shadow-sm overflow-hidden">
			<button
				onClick={toggleAccordion}
				className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100  focus:outline-none focus:ring-gray-900 focus:ring-opacity-50"
			>
				<div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-4 items-center pr-4">
					<span className="md:col-span-4 text-gray-900">{skill.subCategoryName}</span>

					<span className="md:col-span-6 flex flex-wrap items-center gap-2">
						{skill &&
							skill.skills.length > 0 &&
							skill.skills.map((each, index) => (
								<div key={index} className="relative group/icon">
									{SKILLS_MAP[each as keyof typeof SKILLS_MAP] ? (
										<Image
											src={SKILLS_MAP[each as keyof typeof SKILLS_MAP]}
											alt={`${each} icon`}
											width={30}
											height={30}
											className="object-contain opacity-80 group-hover/icon:opacity-100 transition-opacity"
										/>
									) : (
										<Image
											src={DefaultProgrammingIcon}
											alt={`${each} icon`}
											width={30}
											height={30}
											className="object-contain opacity-80 group-hover/icon:opacity-100 transition-opacity"
										/>
									)}
								</div>
							))}
					</span>
				</div>

				<span
					className={`shrink-0 text-gray-400 bg-gray-50 rounded-full p-1 transition-all duration-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 ${
						isOpen ? 'rotate-45 bg-indigo-50 text-indigo-600' : ''
					}`}
				>
					<svg
						xmlns="http://www.w3.0.0.svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
					</svg>
				</span>
			</button>

			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="p-5 pt-0 border-t border-gray-100 mt-2">
					<div className="mt-4 text-gray-600 leading-relaxed">
						<h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
							Description
						</h4>
						{skill.description}
					</div>
				</div>
			</div>
		</div>
	);
}
