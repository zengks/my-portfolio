"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserAbout from "./components/UserAbout";
import SideBar from "./components/SideBar";
import UserSkillSet from "./components/UserSkillSet";
import WorkExpSection from "./components/WorkExpSection";
import EducationSection from "./components/EducationSection";

import { fetchUserByUsername } from "@/controllers/userController";

import { Profile } from "types/profile";
import { WorkExperience } from "types/workExp";
import { Education } from "types/education";

export default function Home() {
  // Allow authenticated users to edit their own data online.
  const { data: session, status } = useSession();
  const router = useRouter();

  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [aboutUser, setAboutUser] = useState<string>("");
  const [profile, setProfile] = useState<Profile | undefined>();
  const [userSkills, setUserSkills] = useState<[]>([]);
  const [workExperience, setWorkExperience] = useState<
    WorkExperience[] | undefined
  >();
  const [education, setEducation] = useState<Education[] | undefined>();
  const [user, setUser] = useState(null);

  const borderStyle = {
    // border: "1px solid red",
  };

  const username = session?.user.username;
  useEffect(() => {
    if (status === "unauthenticated" && username) {
      router.replace("/users/login");
    }
    console.log("current user", username);
    const loadUserData = async () => {
      try {
        const [userData] = await Promise.all([fetchUserByUsername(username)]);
        setUser(userData);
      } catch (error) {
        console.log("Failed to load user data: ", error);
      }
    };
    loadUserData();
  }, [router, status, username]);
  return (
    <div>
      <main className="flex">
        <section className="flex-20/100" style={borderStyle}>
          <SideBar />
        </section>
        <section className="flex-80/100 pl-15 pr-60" style={borderStyle}>
          {console.log(user)}
          <UserAbout data={user?.aboutUser} />
          <UserSkillSet />
          <WorkExpSection workExp={user?.workExperience} />
          <EducationSection education={user?.education} />
        </section>
      </main>
    </div>
  );
}
