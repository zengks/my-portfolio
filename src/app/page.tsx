"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import UserAbout from "./components/UserAbout";
import SideBar from "./components/SideBar";
import UserSkillSet from "./components/UserSkillSet";
import WorkExpSection from "./components/WorkExpSection";
import EducationSection from "./components/EducationSection";

import { fetchUserProfile } from "@/controllers/userProfileController";

import { Profile } from "types/profile";
import { WorkExperience } from "types/workExp";
import { Education } from "types/education";

export default function Home() {
  // Allow authenticated users to edit their own data online.
  const { data: session, status } = useSession();

  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [aboutUser, setAboutUser] = useState<string>("");
  const [profile, setProfile] = useState<Profile | undefined>();
  const [userSkills, setUserSkills] = useState<[]>([]);
  const [workExperience, setWorkExperience] = useState<
    WorkExperience[] | undefined
  >();
  const [education, setEducation] = useState<Education[] | undefined>();

  const borderStyle = {
    // border: "1px solid red",
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const [profileData] = await Promise.all([fetchUserProfile()]);
        setProfile(profileData);
      } catch (error) {
        console.log("Failed to load user data: ", error);
      }
    };
    loadUserData();
  }, []);
  return (
    <div>
      <main className="flex">
        <section className="flex-20/100" style={borderStyle}>
          <SideBar />
        </section>
        <section className="flex-80/100 pl-15 pr-60" style={borderStyle}>
          <UserAbout />
          <UserSkillSet />
          <WorkExpSection />
          <EducationSection />
        </section>
      </main>
    </div>
  );
}
