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
