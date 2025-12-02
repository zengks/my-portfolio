import { useState } from 'react';
import Image from 'next/image';

export default function SearchBrands() {
	const [query, setQuery] = useState('');
	const [selectedBrand, setSelectedBrand] = useState(null);
	const [results, setResults] = useState([]);

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

	const handleSubmit = async () => {
		if (query !== '') {
			const data = await getBrandInfo(query);
			setResults(data);
		}
	};

	return (
		<div>
			<label>Brand Search</label>
			<div>
				<input onChange={(e) => setQuery(e.target.value)} />
				<button type="submit" onClick={handleSubmit}>
					Search
				</button>
			</div>

			<div>
				Results
				<section className="border-2 overflow-scroll">
					{results &&
						results.map((each, index) => (
							<div
								key={index}
								className="flex items-center border-b-gray-300 hover:bg-amber-100"
								onClick={() => {
									setSelectedBrand(each);
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
				</section>
			</div>
		</div>
	);
}
