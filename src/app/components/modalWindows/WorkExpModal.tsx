'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { WorkExperience } from 'types/workExpType';
import Image from 'next/image';
import DefaultCompanyIcon from '@/assets/icons/defaultCompany.svg';
type COMPANY_INFO = {
	name: string;
	logo_url: string;
};

export default function WorkExpModal({
	isOpen,
	closeModal,
	username,
	selectedWorkExp,
}: {
	isOpen: boolean;
	closeModal: () => void;
	username: string;
	selectedWorkExp: WorkExperience | null;
}) {
	const [query, setQuery] = useState('');
	const [selectedCompanyInfo, setSelectedCompanyInfo] = useState<COMPANY_INFO | null>(null);
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

		const isEditing = !!selectedWorkExp;
		const method = isEditing ? 'PUT' : 'POST';
		console.log(method);
		const payload = {
			id: selectedWorkExp?.id,
			jobTitle: formData.get('jobTitle'),
			company: (selectedCompanyInfo && selectedCompanyInfo.name) ?? formData.get('company'),
			companyLogoUrl: (selectedCompanyInfo && selectedCompanyInfo.logo_url) ?? '',
			startMonth: Number(formData.get('startMonth')),
			startYear: Number(formData.get('startYear')),
			endMonth: Number(formData.get('endMonth')),
			endYear: Number(formData.get('endYear')),
		};

		console.log(payload);

		try {
			const response = await fetch(`/api/users/${username}/work`, {
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
					<h2 className="modal-header-title">Edit Work Experience</h2>
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
							<label htmlFor="jobTitle" className="modal-label-text">
								Job Title <span className="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="jobTitle"
								name="jobTitle"
								className="modal-input"
								defaultValue={selectedWorkExp?.jobTitle}
								required
							/>
						</div>

						<div>
							<label htmlFor="company" className="flex items-center flex-1 mb-1">
								Company
								<span>
									{selectedCompanyInfo ? (
										<Image
											src={selectedCompanyInfo.logo_url}
											alt={selectedCompanyInfo.name}
											width={25}
											height={25}
										/>
									) : (
										<Image
											src={DefaultCompanyIcon}
											alt={selectedWorkExp?.company ?? 'company icon placeholder'}
											width={25}
											height={25}
										/>
									)}
								</span>
							</label>

							<div className="flex items-center">
								<input
									type="text"
									id="company"
									name="company"
									className="modal-input"
									placeholder="Enter company name..."
									value={query}
									onChange={(e) => {
										setQuery(e.target.value);
										if (selectedCompanyInfo?.name !== e.target.value) {
											setSelectedCompanyInfo(null);
										}
									}}
								/>
								<button type="button" onClick={handleIconSearch} className="modal-primary-btn ms-3">
									Search
								</button>
							</div>
						</div>
						<div className={!isSearchBrand ? 'sr-only' : 'icon-result-container'}>
							<span>Results</span>
							{results &&
								results.map((each: COMPANY_INFO, index: number) => (
									<div
										key={index}
										className="icon-result-row"
										onClick={() => {
											setSelectedCompanyInfo(each);
											setQuery(each.name);
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
									defaultValue={selectedWorkExp?.startMonth}
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
									defaultValue={selectedWorkExp?.startYear}
									required
								/>
							</div>
							<div>
								<label htmlFor="endMonth" className="modal-label-text">
									End Month:{' '}
								</label>
								<input
									type="number"
									id="endMonth"
									name="endMonth"
									className="modal-input"
									defaultValue={selectedWorkExp?.endMonth ?? ''}
								/>
							</div>
							<div>
								<label htmlFor="endYear" className="modal-label-text">
									End Year:{' '}
								</label>
								<input
									type="number"
									id="endYear"
									name="endYear"
									className="modal-input"
									defaultValue={selectedWorkExp?.endYear ?? ''}
								/>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" onClick={closeModal} className="modal-secondary-btn">
							Cancel
						</button>
						<button type="submit" className="modal-primary-btn">
							{selectedWorkExp ? 'Update' : 'Add'}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
