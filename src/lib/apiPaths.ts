export const apiPaths = {
	userData: (username: string) => `api/auth/users/${username}`,
	userProfile: () => `api/auth/profile`,
	userProjects: () => `api/auth/project`,
	userCertificate: () => `api/auth/certificate`,
	userEducation: () => `api/auth/education`,
	userWorkExperience: () => `api/auth/workExperience`,
	userSocialMedia: () => `api/auth/socialMedia`,
	userBlogPost: () => `api/auth/blogPost`,
};
