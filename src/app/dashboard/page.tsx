"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SignOutButton } from "@/app/components/UI/AuthButtons";
import UserProfileData from "../components/UserProfile";
import UserProject from "../components/UserProject";
import UserCertificate from "../components/UserCertificate";
import UserWorkExperience from "../components/UserWorkExperience";
import UserEducation from "../components/UserEducation";
import UserBlogPosts from "../components/UserBlogPosts";
import UserSocialMedia from "../components/UserSocialMedia";

import { fetchUserProfile } from "@/controllers/userProfileController";
import { fetchAllUserProjects } from "@/controllers/userProjectController";
import { fetchAllUserCertificate } from "@/controllers/userCertificateController";
import { fetchAllUserWorkExperience } from "@/controllers/userWorkExpController";
import { fetchAllUserEducation } from "@/controllers/userEducationController";
import { fetchAllUserBlogPosts } from "@/controllers/userBlogPostController";
import { fetchAllUserSocialMedia } from "@/controllers/userSocialMedia";

import { Profile } from "types/profile";
import { Project } from "types/project";
import { Certificate } from "types/certificate";
import { WorkExperience } from "types/workExp";
import { Education } from "types/education";
import { BlogPost } from "types/blogPost";
import { SocialMedia } from "types/socialMedia";

export default function UsersPage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | undefined>();
  const [projects, setProjects] = useState<Project[] | undefined>();
  const [certificate, setCertificate] = useState<Certificate[] | undefined>();
  const [workExperience, setWorkExperience] = useState<
    WorkExperience[] | undefined
  >();
  const [education, setEducation] = useState<Education[] | undefined>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[] | undefined>();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[] | undefined>();

  const username = session?.user?.username;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/users/login");
    }

    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }

    const loadUserData = async () => {
      try {
        const [
          profileData,
          projectsData,
          certificateData,
          workExpData,
          educationData,
          blogPostsData,
          socialMediaData,
        ] = await Promise.all([
          fetchUserProfile(),
          fetchAllUserProjects(),
          fetchAllUserCertificate(),
          fetchAllUserWorkExperience(),
          fetchAllUserEducation(),
          fetchAllUserBlogPosts(),
          fetchAllUserSocialMedia(),
        ]);
        setProfile(profileData);
        setProjects(projectsData);
        setCertificate(certificateData);
        setWorkExperience(workExpData);
        setEducation(educationData);
        setBlogPosts(blogPostsData);
        setSocialMedia(socialMediaData);
      } catch (error) {
        console.log("Failed to load user data, ", error);
      }
    };

    if (status === "authenticated" && username) {
      loadUserData();
    }
  }, [router, status, username]);

  return (
    <>
      {loading && <div>Loading current user...</div>}
      {status === "authenticated" && (
        <div>
          <h1>Current Logged In Users</h1>
          <p>-----------------------------------------------</p>
          <ul>
            <li>User ID: {session?.user?.id}</li>
            <li>Username: {session?.user?.username}</li>
            <li>User Role: {session?.user?.role}</li>
          </ul>
          <br />
          <UserProfileData profile={profile} />
          <br />
          <UserProject projects={projects} />
          <br />
          <UserCertificate certificate={certificate} />
          <br />
          <UserWorkExperience workExperience={workExperience} />
          <br />
          <UserEducation education={education} />
          <br />
          <UserBlogPosts blogPosts={blogPosts} />
          <br />
          <UserSocialMedia socialMedia={socialMedia} />
          <br />
          <SignOutButton />
        </div>
      )}
    </>
  );
}
