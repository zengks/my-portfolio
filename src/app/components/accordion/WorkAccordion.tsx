'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { WorkExperience } from 'types/workExpType';
import DefaultCompanyIcon from '@/assets/icons/defaultCompany.svg';
import Markdown from 'react-markdown';
import { getMonthInWords } from '@/lib/utility';

export default function WorkAccordion({ work }: { work: WorkExperience }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="mb-3 rounded-lg border border-gray-200 bg-neutral-50 shadow-sm overflow-hidden">
			<button
				onClick={toggleAccordion}
				className="flex w-full items-center justify-between p-5 hover:bg-gray-100 focus:outline-none focus:ring-gray-900 focus:ring-opacity-50 cursor-pointer"
			>
				<div className="flex items-start justify-start text-left pr-4 text-sm tracking-wide">
					<div className="shrink-0 mt-1">
						{work.companyLogoUrl ? (
							<Image src={work.companyLogoUrl} alt={work.company} width={58} height={58} />
						) : (
							<Image
								src={DefaultCompanyIcon}
								alt={work.company ?? 'company icon placeholder'}
								width={58}
								height={58}
							/>
						)}
					</div>

					<div className="ms-3">
						<p className="text-gray-900 text-[16px]">{work.jobTitle}</p>
						<p className="text-gray-700 text-[14px]">{work.company}</p>
						<p className="text-gray-500 text-[14px]">{`${work.employmentType} ${work.locationType}`}</p>
						<p className="text-gray-500 text-[14px]">{`${getMonthInWords(work.startMonth)} ${work.startYear} - ${work.endMonth ? getMonthInWords(work.endMonth) : ''} ${
							work.endYear ? work.endYear : 'Present'
						}`}</p>
						<p className="text-gray-500 text-[14px]">{`${work.city}, ${work.province}, ${work.country}`}</p>
					</div>
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
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isOpen ? 'max-h-[1000px]' : 'max-h-0'
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
								{work.description}
							</Markdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
