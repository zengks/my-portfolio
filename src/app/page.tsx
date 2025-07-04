import UserAbout from "./components/UserAbout";
import SideBar from "./components/SideBar";
import UserSkillSet from "./components/UserSkillSet";
import WorkExpSection from "./components/WorkExpSection";
import EducationSection from "./components/EducationSection";

import { getUserByUsername } from "@/controllers/userController";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const borderStyle = {
    // border: "1px solid red",
  };

  const session = await getServerSession(authOptions);

  const user = await getUserByUsername("zengks");

  const isOwner = session?.user.username === user?.username;

  return user ? (
    <div>
      <main className="flex">
        <section className="flex-20/100" style={borderStyle}>
          <SideBar profile={user.profile} />
        </section>
        <section className="flex-80/100 pl-15 pr-60" style={borderStyle}>
          <UserAbout about={user?.aboutUser ?? ""} />
          <UserSkillSet />
          <WorkExpSection userId={user?.id} />
          <EducationSection userId={user?.id} />
          {isOwner && <button>Edit</button>}
        </section>
      </main>
    </div>
  ) : (
    <></>
  );
}
