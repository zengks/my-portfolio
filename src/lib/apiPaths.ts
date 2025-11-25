export const apiPaths = {
	userData: (username: string) => `api/auth/users/${username}`,
	userProfile: () => `api/auth/profile`,
	userProjects: () => `api/auth/project`,
	userCertificate: () => `api/auth/certificate`,
	userEducation: (username: string) => `api/auth/users/${username}/education`,
	userWorkExperience: () => `api/auth/workExperience`,
	userSocialMedia: () => `api/auth/socialMedia`,
	userBlogPost: () => `api/auth/blogPost`,
};
