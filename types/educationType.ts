export interface Education {
	id: number;
	school: string;
	degree: string;
	fieldOfStudy: string | null;
	schoolLogoUrl: string | null;
	city: string | null;
	province: string | null;
	country: string | null;
	startMonth: number;
	startYear: number;
	endMonth: number | null;
	endYear: number | null;
	gpa: number | null;
	description: string | null;
}
