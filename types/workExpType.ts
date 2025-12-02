export interface WorkExperience {
	id: number;
	jobTitle: string;
	company: string;
	companyLogoUrl: string | null;
	city: string | null;
	province: string | null;
	country: string | null;
	locationType: string | null;
	employmentType: string | null;
	startYear: number;
	endYear: number | null;
	description: string | null;
}
