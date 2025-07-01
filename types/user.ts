import { BlogPost } from "./blogPost";
import { Certificate } from "./certificate";
import { Education } from "./education";
import { Profile } from "./profile";
import { Project } from "./project";
import { SocialMedia } from "./socialMedia";
import { WorkExperience } from "./workExp";

export interface User {
  id: string;
  username: string;
  role: string;
  aboutUser: string | "";
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
