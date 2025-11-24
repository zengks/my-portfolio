export interface WorkExperience {
	id: number;
	jobTitle: string;
	company: string;
	startYear: number;
	endYear: number | null;
	description: string | null;
}
