'use client';

import { useState } from 'react';
import { Project } from 'types/projectType';
import Image from 'next/image';
import { SKILLS_MAP } from '@/lib/constant';
import Markdown from 'react-markdown';
import NewTabIcon from '@/assets/icons/newTab.svg';

export default function ProjectAccordion({ project }: { project: Project }) {
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
				<div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-4 items-center pe-4">
					<span className="md:col-span-4 text-gray-900">{project.title}</span>

					<span className="md:col-span-6 flex flex-wrap items-center gap-2">
						{project.tech_stack.map((tech, index) => (
							<div key={index} className="relative group/icon" title={tech}>
								<Image
									src={SKILLS_MAP[tech as keyof typeof SKILLS_MAP]}
									alt={`${tech} icon`}
									width={28}
									height={28}
									className="object-contain opacity-80 group-hover/icon:opacity-100 transition-opacity"
								/>
							</div>
						))}
					</span>

					<span className="md:col-span-2 text-sm font-medium text-gray-500 md:text-right">
						{project.projectYear === 0 ? 'Ongoing' : project.projectYear}
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
						<div className="prose prose-slate list-disc max-w-none">
							<Markdown
								components={{
									ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
									ol: ({ ...props }) => <ol className="list-decimal pl-5 space-y-1" {...props} />,
									li: ({ ...props }) => <li className="pl-1" {...props} />,
								}}
							>
								{project.description}
							</Markdown>
						</div>
					</div>

					{(project.repo_link || project.project_link) && (
						<div className="mt-4 flex gap-3">
							<a
								href={project.repo_link || '/'}
								target="_blank"
								className="flex items-center hover:underline italic"
							>
								View Repo <Image src={NewTabIcon} alt="New Tab Icon" width={20} />
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
