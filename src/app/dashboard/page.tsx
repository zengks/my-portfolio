'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { SignOutButton } from '@/app/components/UI/AuthButtons';

import { fetchUserProfile } from '@/controllers/userProfileController';
import { fetchAllUserProjects } from '@/controllers/userProjectController';
import { fetchAllUserCertificate } from '@/controllers/userCertificateController';
import { fetchAllUserWorkExperience } from '@/controllers/userWorkExpController';
import { fetchAllUserEducation } from '@/controllers/userEducationController';
import { fetchAllUserBlogPosts } from '@/controllers/userBlogPostController';
import { fetchAllUserSocialMedia } from '@/controllers/userSocialMedia';

// import { Profile } from 'types/profileType';
// import { Project } from 'types/projectType';
// import { Certificate } from 'types/certificateType';
// import { WorkExperience } from 'types/workExpType';
// import { Education } from 'types/educationType';
// import { BlogPost } from 'types/blogPostType';
// import { SocialMedia } from 'types/socialMediaType';

export default function UsersPage() {
	const { data: session, status } = useSession();

	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	// const [profile, setProfile] = useState<Profile | undefined>();
	// const [projects, setProjects] = useState<Project[] | undefined>();
	// const [certificate, setCertificate] = useState<Certificate[] | undefined>();
	// const [workExperience, setWorkExperience] = useState<WorkExperience[] | undefined>();
	// const [education, setEducation] = useState<Education[] | undefined>();
	// const [blogPosts, setBlogPosts] = useState<BlogPost[] | undefined>();
	// const [socialMedia, setSocialMedia] = useState<SocialMedia[] | undefined>();

	const username = session?.user?.username;

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.replace('/users/login');
		}

		if (status === 'loading') {
			setLoading(true);
		} else {
			setLoading(false);
		}

		const loadUserData = async () => {
			try {
				const [
					// profileData,
					// projectsData,
					// certificateData,
					// workExpData,
					// educationData,
					// blogPostsData,
					// socialMediaData,
				] = await Promise.all([
					fetchUserProfile(),
					fetchAllUserProjects(),
					fetchAllUserCertificate(),
					fetchAllUserWorkExperience(),
					fetchAllUserEducation(),
					fetchAllUserBlogPosts(),
					fetchAllUserSocialMedia(),
				]);
				// setProfile(profileData);
				// setProjects(projectsData);
				// setCertificate(certificateData);
				// setWorkExperience(workExpData);
				// setEducation(educationData);
				// setBlogPosts(blogPostsData);
				// setSocialMedia(socialMediaData);
			} catch (error) {
				console.log('Failed to load user data, ', error);
			}
		};

		if (status === 'authenticated' && username) {
			loadUserData();
		}
	}, [router, status, username]);

	return (
		<>
			{loading && <div>Loading current user...</div>}
			{status === 'authenticated' && (
				<div>
					<h1>Current Logged In Users</h1>
					<p>-----------------------------------------------</p>
					<ul>
						<li>User ID: {session?.user?.id}</li>
						<li>Username: {session?.user?.username}</li>
						<li>User Role: {session?.user?.role}</li>
					</ul>

					<br />
					<SignOutButton />
				</div>
			)}
		</>
	);
}
