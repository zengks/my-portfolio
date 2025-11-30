'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Education } from 'types/educationType';
import DefaultSchoolIcon from '@/assets/icons/defaultSchool.svg';

export default function EducationAccordion({ education }: { education: Education }) {
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
				<div className=" items-center flex justify-start text-left pr-4 text-sm tracking-wide">
					{education.schoolLogoUrl ? (
						<Image src={education.schoolLogoUrl} alt={education.school} width={58} height={58} />
					) : (
						<Image
							src={DefaultSchoolIcon}
							alt={education.school ?? 'school icon placeholder'}
							width={58}
							height={58}
						/>
					)}

					<div className="ms-3">
						<p className="text-gray-900 text-[16px]">{education.school}</p>
						<p className="text-gray-700 text-[14px]">{`${education.degree}, ${education.fieldOfStudy}`}</p>
						<p className="text-gray-500 text-[14px]">{`${education.startYear} - ${
							education.endYear ? education.endYear : 'Present'
						}`}</p>
					</div>
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
				<div className="p-5 border-t border-gray-200 text-gray-700">{education.description}</div>
			</div>
		</div>
	);
}
