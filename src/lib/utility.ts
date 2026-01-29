export const getMonthInWords = (monthInNumber: number): string => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return months[monthInNumber - 1] || '';
};

export const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
	if (e.key === 'Enter') {
		const target = e.target as HTMLElement;

		if (target.tagName === 'TEXTAREA') {
			return;
		}

		e.preventDefault();
	}
};

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
