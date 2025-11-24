export interface Project {
	id: number;
	title: string;
	repo_link: string | null;
	project_link: string | null;
	description: string | null;
	preview_image_link: string | null;
	tech_stack: Array<string>;
	projectYear: number;
}
