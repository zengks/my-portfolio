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
		<section className="modal-container">
			<div className="modal-window">
				<div className="modal-header">
					<h2 className="modal-header-title">Edit Education</h2>
					<button
						onClick={closeModal}
						className="text-gray-400 hover:text-gray-600 transition-colors"
					>
						<span className="sr-only">Close</span>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
					<div className="p-6 overflow-y-auto space-y-6">
						<div>
							<label className="flex items-center flex-1 mb-1">
								School<span className="text-red-500">*</span>
								<span>
									{selectedEduInfo ? (
										<Image
											src={selectedEduInfo.logo_url}
											alt={selectedEduInfo.name}
											width={25}
											height={25}
										/>
									) : (
										<Image
											src={DefaultSchoolIcon}
											alt={selectedEducation?.school ?? 'school icon placeholder'}
											width={25}
											height={25}
										/>
									)}
								</span>
							</label>

							<div className="flex items-center">
								<input
									placeholder="Enter school name..."
									className="modal-input"
									type="text"
									id="schoolLogoUrl"
									name="schoolLogoUrl"
									value={selectedEduInfo ? selectedEduInfo.name : ''}
									onChange={(e) => setQuery(e.target.value)}
								/>
								<button type="button" onClick={handleIconSearch} className="modal-primary-btn ms-3">
									Search
								</button>
							</div>
						</div>
						<div className={!isSearchBrand ? 'sr-only' : 'icon-result-container'}>
							<span>Results</span>
							{results &&
								results.map((each: EDUCATION_INFO, index: number) => (
									<div
										key={index}
										className="icon-result-row"
										onClick={() => {
											setSelectedEduInfo(each);
											setIsSearchBrand(false);
										}}
									>
										<Image
											className="rounded-xl"
											src={each.logo_url}
											alt={each.name}
											width={50}
											height={50}
										/>
										{each.name}
									</div>
								))}
						</div>

						<div>
							<label htmlFor="degree" className="modal-label-text">
								Degree <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="degree"
								name="degree"
								className="modal-input"
								defaultValue={selectedEducation?.degree}
								required
							/>
						</div>

						<div>
							<label htmlFor="fieldOfStudy" className="modal-label-text">
								Field of Study <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="fieldOfStudy"
								name="fieldOfStudy"
								className="modal-input"
								defaultValue={selectedEducation?.fieldOfStudy ?? ''}
								required
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="startYear" className="modal-label-text">
									Start Year <span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									id="startYear"
									name="startYear"
									className="modal-input"
									defaultValue={selectedEducation?.startYear}
									required
								/>
							</div>
							<div>
								<label htmlFor="endYear" className="modal-label-text">
									End Year
								</label>
								<input
									type="number"
									id="endYear"
									name="endYear"
									className="modal-input"
									defaultValue={selectedEducation?.endYear ?? ''}
								/>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button className="modal-secondary-btn" type="button" onClick={closeModal}>
							Cancel
						</button>
						<button type="submit" className="modal-primary-btn">
							{selectedEducation ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
