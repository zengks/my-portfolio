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

		const payload = {
			id: selectedWorkExp?.id,
			jobTitle: formData.get('jobTitle'),
			company: (selectedCompanyInfo && selectedCompanyInfo.name) ?? formData.get('company'),
			companyLogoUrl: (selectedCompanyInfo && selectedCompanyInfo.logo_url) ?? '',
			startYear: Number(formData.get('startYear')),
			endYear: Number(formData.get('endYear')),
		};

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
						<label htmlFor="jobTitle">Job Title: </label>
						<input
							type="text"
							id="jobTitle"
							name="jobTitle"
							defaultValue={selectedWorkExp?.jobTitle}
							required
						/>
					</div>
					<div>
						<label htmlFor="company">Company: </label>
						<input
							type="text"
							id="company"
							name="company"
							defaultValue={selectedWorkExp?.company}
							required
						/>
					</div>

					<div className="border-2 overflow-scroll">
						<div className="flex items-center justify-between">
							<label>Company Icon: </label>
							{selectedCompanyInfo ? (
								<Image
									src={selectedCompanyInfo.logo_url}
									alt={selectedCompanyInfo.name}
									width={30}
									height={30}
								/>
							) : (
								<Image
									src={DefaultCompanyIcon}
									alt={selectedWorkExp?.company ?? 'company icon placeholder'}
									width={30}
									height={30}
								/>
							)}
							<input
								type="string"
								id="companyLogoUrl"
								name="companyLogoUrl"
								className="border"
								defaultValue={selectedWorkExp?.companyLogoUrl ?? ''}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<button type="button" onClick={handleIconSearch}>
								Search
							</button>
						</div>

						{results &&
							isSearchBrand &&
							results.map((each: COMPANY_INFO, index: number) => (
								<div
									key={index}
									className="flex items-center border-b-gray-300 hover:bg-amber-100"
									onClick={() => {
										setSelectedCompanyInfo(each);
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
					</div>

					<div>
						<label htmlFor="startYear">Start Year: </label>
						<input
							type="number"
							id="startYear"
							name="startYear"
							defaultValue={selectedWorkExp?.startYear}
							required
						/>
					</div>
					<div>
						<label htmlFor="endYear">End Year: </label>
						<input
							type="number"
							id="endYear"
							name="endYear"
							defaultValue={selectedWorkExp?.endYear ?? ''}
						/>
					</div>
					<button type="submit">{selectedWorkExp ? 'Update' : 'Add'}</button>
					<button type="button" onClick={closeModal}>
						Cancel
					</button>
				</form>
			</div>
		</section>
	);
}
