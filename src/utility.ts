export const getYear = (date: Date | null): string => {
	if (!date) {
		return 'Present';
	} else {
		return new Date(date).getFullYear().toString();
	}
};

export const getBrandInfo = async (queryItem: string) => {
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
