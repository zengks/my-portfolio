'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { Education } from 'types/educationType';
import Image from 'next/image';
import DefaultSchoolIcon from '@/assets/icons/defaultSchool.svg';

type EDUCATION_INFO = {
	name: string;
	logo_url: string;
};

export default function EducationModal({
	isOpen,
	closeModal,
	username,
	selectedEducation,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedEducation: Education | null;
}) {
	const [query, setQuery] = useState('');
	const [selectedEduInfo, setSelectedEduInfo] = useState<EDUCATION_INFO | null>(null);
	const [results, setResults] = useState([]);
	const [isSearchBrand, setIsSearchBrand] = useState(false);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeModal();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, closeModal]);

	if (!isOpen) return null;

	const getBrandInfo = async (queryItem: string) => {
		try {
			const response = await fetch(`https://api.logo.dev/search?q=${queryItem}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_LOGO_DEV_SECRET_KEY}`,
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Operation Failed!');
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			throw new Error('Failed to fetch brand information');
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const isEditing = !!selectedEducation;
		const method = isEditing ? 'PUT' : 'POST';

		const payload = {
			id: selectedEducation?.id,
			school: (selectedEduInfo && selectedEduInfo.name) ?? formData.get('school'),
			degree: formData.get('degree'),
			fieldOfStudy: formData.get('fieldOfStudy'),
			schoolLogoUrl: (selectedEduInfo && selectedEduInfo.logo_url) ?? '',
			startYear: Number(formData.get('startYear')),
			endYear: Number(formData.get('endYear')),
		};

		try {
			const response = await fetch(`/api/users/${username}/education`, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error('Operation Failed!');
			}

			closeModal();
		} catch (error) {
			console.log(error);
		}
	};

	const handleIconSearch = async () => {
		if (query !== '') {
			const data = await getBrandInfo(query);
			setResults(data);
			setIsSearchBrand(true);
		}
	};

	return (
		<section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-sm transition-opacity duration-300">
			<div
				className={`
          bg-white rounded-xl shadow-2xl w-[600px]
          transform transition-all duration-300 scale-100 opacity-100
          flex flex-col max-h-[90vh]
        `}
			>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="school">School: </label>
						<input
							type="text"
							id="school"
							name="school"
							defaultValue={selectedEducation?.school}
							required
						/>
					</div>
					<div className="flex items-center justify-between">
						<label>School Icon: </label>
						{selectedEduInfo ? (
							<Image
								src={selectedEduInfo.logo_url}
								alt={selectedEduInfo.name}
								width={30}
								height={30}
							/>
						) : (
							<Image
								src={DefaultSchoolIcon}
								alt={selectedEducation?.school ?? 'school icon placeholder'}
								width={30}
								height={30}
							/>
						)}
						<input
							type="string"
							id="schoolLogoUrl"
							name="schoolLogoUrl"
							className="border"
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type="button" onClick={handleIconSearch}>
							Search
						</button>
					</div>
					{results &&
						isSearchBrand &&
						results.map((each: EDUCATION_INFO, index: number) => (
							<div
								key={index}
								className="flex items-center border-b-gray-300 hover:bg-amber-100"
								onClick={() => {
									setSelectedEduInfo(each);
									setIsSearchBrand(false);
								}}
							>
								<Image
									className="me-4 mb-5"
									src={each.logo_url}
									alt={each.name}
									width={40}
									height={40}
								/>
								{each.name}
							</div>
						))}
					<div>
						<label htmlFor="degree">Degree: </label>
						<input
							type="text"
							id="degree"
							name="degree"
							defaultValue={selectedEducation?.degree}
							required
						/>
					</div>
					<div>
						<label htmlFor="fieldOfStudy">Field of Study: </label>
						<input
							type="text"
							id="fieldOfStudy"
							name="fieldOfStudy"
							defaultValue={selectedEducation?.fieldOfStudy ?? ''}
							required
						/>
					</div>
					<div>
						<label htmlFor="startYear">Start Year: </label>
						<input
							type="number"
							id="startYear"
							name="startYear"
							defaultValue={selectedEducation?.startYear}
							required
						/>
					</div>
					<div>
						<label htmlFor="endYear">End Year: </label>
						<input
							type="number"
							id="endYear"
							name="endYear"
							defaultValue={selectedEducation?.endYear ?? ''}
						/>
					</div>
					<button type="submit">{selectedEducation ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
