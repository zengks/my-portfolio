'use client';

import { useState } from 'react';

export default function WorkAccordion() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="mb-3 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
			<button
				onClick={toggleAccordion}
				className="flex w-full items-center justify-between p-5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
			>
				<div className="flex-1 items-center grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-left pr-4">
					<span className="font-medium text-gray-900">Multimedia Developer</span>
					<span className="text-sm text-gray-700">British Columbia Institute of Technology</span>
					<span className="text-sm text-center text-gray-500">July, 2023 - Present</span>
				</div>

				<span
					className={`text-slate-800 transition-transform duration-500 ${
						isOpen ? 'rotate-45' : ''
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
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isOpen ? 'max-h-[1000px]' : 'max-h-0'
				}`}
			>
				<div className="p-5 border-t border-gray-200">
					<ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
						<li>
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
						<li>
							Material Tailwind is a framework that enhances Tailwind CSS with additional styles and
							components.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
