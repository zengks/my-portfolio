"use client";

import { SignOutButton } from "src/app/components/AuthButtons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiPaths } from "src/lib/apiPaths";

import { Profile } from "types/profile";

export default function UsersPage() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [profile, setProfile] = useState<Profile | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

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

    if (status === "authenticated" && username) {
      const fetchProfile = async () => {
        try {
          const res = await fetch(apiPaths.userProfile());
          const data = await res.json();
          setProfile(data.profile);
        } catch (error) {
          console.error("Error fetching user profile: ", error);
        }
      };
      fetchProfile();
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
          {profile ? (
            <div>
              <ul>
                <li>Profile ID: {profile.id}</li>
                <li>Profile User ID: {profile.userId}</li>
                <li>First Name: {profile.firstName}</li>
                <li>Last Name: {profile.lastName}</li>
                <li>Email: {profile.email}</li>
                <li>Bio: {profile.bio}</li>
                <li>Image Link: {profile.imageLink}</li>
                <li>Created At: {profile.createdAt}</li>
                <li>Updated At: {profile.updatedAt}</li>
              </ul>
            </div>
          ) : (
            <div>Profile Loading...</div>
          )}
          <br />
          <SignOutButton />
        </div>
      )}
    </>
  );
}
