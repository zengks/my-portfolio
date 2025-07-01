import UserAbout from "./components/UserAbout";
import SideBar from "./components/SideBar";
import UserSkillSet from "./components/UserSkillSet";
import WorkExpSection from "./components/WorkExpSection";
import EducationSection from "./components/EducationSection";

export default function Home() {
  const borderStyle = {
    // border: "1px solid red",
  };
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
