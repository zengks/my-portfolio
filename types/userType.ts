import { BlogPost } from './blogPostType';
import { Certificate } from './certificateType';
import { Education } from './educationType';
import { Profile } from './profileType';
import { Project } from './projectType';
import { SocialMedia } from './socialMediaType';
import { WorkExperience } from './workExpType';

export interface User {
	id: string;
	username: string;
	role: string;
	aboutUser: string | null;
	updatedAt: Date;
	createdAt: Date;
	blogPost: BlogPost[];
	certificate: Certificate[];
	education: Education[];
	profile: Profile | null;
	project: Project[];
	socialMedia: SocialMedia[];
	workExperience: WorkExperience[];
}

export interface UserUpdateInput {
	password?: string;
}
