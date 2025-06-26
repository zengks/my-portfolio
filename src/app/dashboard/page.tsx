"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SignOutButton } from "src/app/components/AuthButtons";
import UserProfileData from "../components/UserProfile";
import UserProject from "../components/UserProject";

import { fetchUserProfile } from "@/controllers/userProfileController";
import { fetchAllUserProjects } from "@/controllers/userProjectController";

import { Profile } from "types/profile";
import { Project } from "types/project";

export default function UsersPage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | undefined>();
  const [projects, setProjects] = useState<Project[] | undefined>();

  const username = session?.user?.username;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/users/login");
    }

    if (status === "loading") {
      setLoading(true);
      return;
    }

    const loadUserData = async () => {
      try {
        const [profileData, projectsData] = await Promise.all([
          fetchUserProfile(),
          fetchAllUserProjects(),
        ]);
        setProfile(profileData);
        setProjects(projectsData);
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
      {loading && <div>Loading...</div>}
      {status === "authenticated" && (
        <div>
          <h1>Current LoggedIn Users</h1>
          <br />
          <ul>
            <li>User ID: {session?.user?.id}</li>
            <li>Username: {session?.user?.username}</li>
            <li>User Role: {session?.user?.role}</li>
          </ul>
          <br />
          <h1>Your Profile</h1>
          <br />
          <UserProfileData profile={profile} />
          <br />
          <UserProject projects={projects} />
          <SignOutButton />
        </div>
      )}
    </>
  );
}
