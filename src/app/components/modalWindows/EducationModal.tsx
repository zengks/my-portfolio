'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { Education } from 'types/educationType';
import Image from 'next/image';
import DefaultSchoolIcon from '@/assets/icons/defaultSchool.svg';
import { handleKeyDown } from '@/lib/utility';

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
	const [isManualEntry, setIsManualEntry] = useState(false);
	const [manualSchoolName, setManualSchoolName] = useState('');

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

		let finalLogoUrl = '';
		let finalSchoolName = '';

		if (isManualEntry) {
			finalLogoUrl = DefaultSchoolIcon.src;
		} else if (selectedEduInfo) {
			finalLogoUrl = selectedEduInfo.logo_url;
		} else if (selectedEducation) {
			finalLogoUrl = selectedEducation.schoolLogoUrl || '';
		}

		if (isManualEntry) {
			finalSchoolName = manualSchoolName;
		} else if (selectedEduInfo) {
			finalSchoolName = selectedEduInfo.name;
		} else if (selectedEducation) {
			finalSchoolName = selectedEducation.school || '';
		}

		const payload = {
			id: selectedEducation?.id,
			school: finalSchoolName,
			degree: formData.get('degree'),
			fieldOfStudy: formData.get('fieldOfStudy'),
			schoolLogoUrl: finalLogoUrl,
			startMonth: Number(formData.get('startMonth')),
			startYear: Number(formData.get('startYear')),
			endMonth: Number(formData.get('endMonth')),
			endYear: Number(formData.get('endYear')),
			description: formData.get('description'),
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

			setSelectedEduInfo(null);
			setQuery('');
			setManualSchoolName('');
			setIsManualEntry(false);
			setIsSearchBrand(false);
			setResults([]);
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

	const handleManualConfirm = () => {
		if (manualSchoolName !== '') {
			setSelectedEduInfo({
				name: manualSchoolName,
				logo_url: DefaultSchoolIcon.src,
			});
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

				<form
					onSubmit={handleSubmit}
					onKeyDown={handleKeyDown}
					className="flex flex-col flex-1 overflow-hidden"
				>
					<div className="p-6 overflow-y-auto space-y-6">
						<div>
							<div className="flex justify-between items-center mb-1">
								<label className="flex items-center flex-1 mb-1">
									School <span className="text-red-500">*</span>
									<span className="ms-2">
										{selectedEduInfo ? (
											<Image
												src={selectedEduInfo.logo_url || DefaultSchoolIcon}
												alt={selectedEduInfo.name}
												width={25}
												height={25}
											/>
										) : selectedEducation ? (
											<Image
												src={selectedEducation.schoolLogoUrl || DefaultSchoolIcon}
												alt={selectedEducation.school}
												width={25}
												height={25}
											/>
										) : (
											<div></div>
										)}
									</span>
									<span className="ms-2">
										{selectedEduInfo
											? selectedEduInfo.name
											: selectedEducation
												? selectedEducation.school
												: ''}
									</span>
								</label>
								<div>
									<input
										id="manualEntry"
										type="checkbox"
										value={isManualEntry ? 'true' : 'false'}
										onChange={() => setIsManualEntry(!isManualEntry)}
									/>
									<label htmlFor="manualEntry" className="ms-2">
										Enter school manually
									</label>
								</div>
							</div>

							<div className={`flex items-center ${isManualEntry ? 'hidden' : ''}`}>
								<input
									placeholder="Search school here..."
									className="modal-input"
									type="text"
									id="schoolLogoUrl"
									name="schoolLogoUrl"
									value={query}
									onChange={(e) => {
										setQuery(e.target.value);
									}}
									required={!isManualEntry && selectedEducation === null}
								/>
								<button
									type="button"
									onClick={handleIconSearch}
									className="modal-primary-btn ms-3 cursor-pointer"
								>
									Search
								</button>
							</div>

							<div className={`${isManualEntry ? '' : 'hidden'} flex items-center`}>
								<Image
									src={DefaultSchoolIcon}
									alt="Default School Icon Placeholder"
									width={25}
									height={25}
								/>
								<input
									placeholder="Enter school name..."
									className="modal-input ms-2"
									type="text"
									id="manualSchoolEntry"
									name="manualSchoolEntry"
									value={manualSchoolName ?? ''}
									onChange={(e) => setManualSchoolName(e.target.value)}
									required={isManualEntry && selectedEducation === null}
								/>
								<button
									type="button"
									onClick={handleManualConfirm}
									className="modal-primary-btn ms-3 cursor-pointer"
								>
									Confirm
								</button>
							</div>

							{query !== '' && results.length > 0 && (
								<div className={!isSearchBrand ? 'sr-only' : 'icon-result-container'}>
									<span>Results</span>
									{results.map((each: EDUCATION_INFO, index: number) => (
										<div
											key={index}
											className="icon-result-row cursor-pointer"
											onClick={() => {
												setSelectedEduInfo(each);
												setQuery(each.name);
												setIsSearchBrand(false);
												setResults([]);
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
							)}
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
								<label htmlFor="startMonth" className="modal-label-text">
									Start Month <span className="text-red-500">*</span>
								</label>
								<input
									type="number"
									id="startMonth"
									name="startMonth"
									className="modal-input"
									defaultValue={selectedEducation?.startMonth}
									required
								/>
							</div>
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
								<label htmlFor="endMonth" className="modal-label-text">
									End Month
								</label>
								<input
									type="number"
									id="endMonth"
									name="endMonth"
									className="modal-input"
									defaultValue={selectedEducation?.endMonth ?? ''}
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
						<div>
							<label htmlFor="description" className="modal-label-text">
								Description
							</label>
							<textarea
								rows={3}
								name="description"
								className="modal-input"
								defaultValue={selectedEducation?.description ?? ''}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button
							className="modal-secondary-btn"
							type="button"
							onClick={() => {
								setSelectedEduInfo(null);
								setQuery('');
								closeModal();
							}}
						>
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
