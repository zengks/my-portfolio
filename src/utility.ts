export const getYear = (date: Date | null): string => {
	if (!date) {
		return 'Present';
	} else {
		return new Date(date).getFullYear().toString();
	}
};
