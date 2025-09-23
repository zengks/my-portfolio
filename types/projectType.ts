export interface Project {
	id: number;
	userId: string;
	title: string | '';
	repo_link: string | '';
	project_link: string | '';
	description: string | '';
	preview_image_link: string | '';
	createdAt: string;
	updatedAt: string;
}
