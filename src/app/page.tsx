import NavBar from "./components/UI/NavBar";
import UserAbout from "./components/UserAbout";
import SideBar from "./components/SideBar";
import UserSkillSet from "./components/UserSkillSet";
import WorkExpSection from "./components/WorkExpSection";
import EducationSection from "./components/EducationSection";

export default function Home() {
  return (
    <>
      <div className="glass-container outer-glass-container">
        {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl" /> */}
        <NavBar />
        <main className="flex">
          <section style={{ border: "1px solid red" }} className="flex-10/100">
            <SideBar />
          </section>
          <section style={{ border: "1px solid red" }} className="flex-90/100">
            <UserAbout />
            <UserSkillSet />
            <WorkExpSection />
            <EducationSection />
          </section>
        </main>
      </div>
      <footer className="glass-footer">
        <div className="text-center">
          © {new Date().getFullYear()} Steven Zeng. All Rights Reserved
        </div>
      </footer>
    </>
  );
}
