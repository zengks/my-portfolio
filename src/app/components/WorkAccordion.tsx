'use client';

import { useState } from 'react';

export default function WorkAccordion() {
	const [isHidden, setIsHidden] = useState(false);

	const toggleAccordion = () => {
		console.log('toggled');
		setIsHidden((prev) => !prev);
	};

	return (
		<div className="border-b bg-amber-200 border-slate-400">
			<button
				onClick={toggleAccordion}
				className="w-full flex justify-between items-center py-5 px-5 text-slate-800 hover:bg-amber-900 cursor-pointer"
			>
				<span>Multimedia Developer</span>
				<span>British Columbia Institute of Technology</span>
				<span>July, 2023 - Present</span>
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
