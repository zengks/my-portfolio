import UserAbout from "./components/UserAbout";
import SideBar from "./components/SideBar";
import UserSkillSet from "./components/UserSkillSet";
import WorkExpSection from "./components/WorkExpSection";
import EducationSection from "./components/EducationSection";

import { getUserByUsername } from "@/controllers/userController";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const user = await getUserByUsername("zengks");

  const isOwner = session?.user.username === user?.username;

  return user ? (
    <div>
      <main className="flex">
        <section className="flex-30/100 flex flex-col justify-between items-center">
          <SideBar userId={user?.id} />
        </section>
        <section className="flex-70/100 mr-30">
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
