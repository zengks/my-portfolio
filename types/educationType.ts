export interface Education {
	id: number;
	school: string;
	degree: string;
	fieldOfStudy: string | null;
	startYear: number;
	endYear: number | null;
	gpa: number | null;
	description: string | null;
}
