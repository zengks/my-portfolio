'use client';

import { useState } from 'react';
import { Project } from 'types/projectType';
import Image from 'next/image';

import { SKILLS_MAP } from '@/lib/constant';

export default function ProjectAccordion({ project }: { project: Project }) {
	const [isHidden, setIsHidden] = useState(false);

	const toggleAccordion = () => {
		setIsHidden((prev) => !prev);
	};

	return (
		<div className="border-b bg-amber-200 border-slate-400 mx-auto">
			<button
				onClick={toggleAccordion}
				className="w-full flex justify-between items-center py-5 px-5 text-slate-800 hover:bg-amber-900 cursor-pointer"
			>
				<span>{project.title}</span>
				<span className="flex justify-between items-center gap-3">
					{project.tech_stack.map((each, index: number) => (
						<Image
							key={index}
							src={SKILLS_MAP[each as keyof typeof SKILLS_MAP]}
							alt="My icon description"
							width={32}
							height={32}
						/>
					))}
				</span>
				<span
					id="icon-1"
					className={`text-slate-800 transition-transform duration-500 ${
						isHidden ? 'rotate-45' : ''
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="w-4 h-4"
					>
						<path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
					</svg>
				</span>
			</button>
			<div
				id="content-1"
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isHidden ? 'max-h-[500px]' : 'max-h-0'
				}`}
			>
				<div className="pb-5 text-sm text-slate-500">
					<ul>
						<li>
							{' '}
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							{' '}
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							{' '}
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							{' '}
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							{' '}
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							{' '}
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							{' '}
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
