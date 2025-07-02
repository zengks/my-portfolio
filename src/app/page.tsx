// "use client";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

import UserAbout from "./components/UserAbout";
import SideBar from "./components/SideBar";
import UserSkillSet from "./components/UserSkillSet";
import WorkExpSection from "./components/WorkExpSection";
import EducationSection from "./components/EducationSection";

import {
  fetchUserByUsername,
  getUserByUsername,
} from "@/controllers/userController";

import { User } from "types/user";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  // Allow authenticated users to edit their own data online.
  //   const { data: session } = useSession();

  //   const [user, setUser] = useState<User | undefined>();

  const borderStyle = {
    // border: "1px solid red",
  };

  //   const username = session?.user.username;
  const session = await getServerSession(authOptions);

  const user = await getUserByUsername("zengks");
  console.log(user);

  const isOwner = session?.user.username === user?.username;

  //   useEffect(() => {
  //     const loadUserData = async () => {
  //       try {
  //         const userData: User | undefined = await fetchUserByUsername("zengks");
  //         setUser(userData);
  //       } catch (error) {
  //         console.log("Failed to load user data: ", error);
  //       }
  //     };
  //     loadUserData();
  //   }, [username]);

  return (
    <div>
      <main className="flex">
        <section className="flex-20/100" style={borderStyle}>
          <SideBar profile={user?.profile} />
        </section>
        <section className="flex-80/100 pl-15 pr-60" style={borderStyle}>
          <UserAbout about={user?.aboutUser ?? ""} />
          <UserSkillSet />
          <WorkExpSection workExp={user?.workExperience} />
          <EducationSection education={user?.education} />
          {isOwner && <button>Edit</button>}
        </section>
      </main>
    </div>
  );
}
