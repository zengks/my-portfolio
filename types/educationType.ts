export interface Education {
	id: number;
	school: string;
	degree: string;
	fieldOfStudy: string | null;
	schoolLogoUrl: string | null;
	city: string | null;
	province: string | null;
	country: string | null;
	startYear: number;
	endYear: number | null;
	gpa: number | null;
	description: string | null;
}
