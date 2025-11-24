export interface Profile {
	id: number;
	userId: string;
	username: string;
	firstName: string;
	lastName: string | null;
	email: string;
	jobTitle: string | null;
	bioLink: string | null;
	imageLink: string | null;
	city: string | null;
	province: string | null;
	country: string | null;
	resumeUrl: string | null;
	linkedInUrl: string | null;
	githubUrl: string | null;
}
