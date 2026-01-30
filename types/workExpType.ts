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
	startMonth: number;
	startYear: number;
	endMonth: number | null;
	endYear: number | null;
	description: string | null;
}
