import TechSkill from "./TechSkill";
import { SKILLS } from "@/lib/constant";

export default function UserSkillSet() {
  return (
    <div className="glass-container glass-section">
      <p className="section-title">Core Skill Set</p>
      <section className="flex">
        {SKILLS.map((each, index) => {
          if (typeof each === "object" && each !== null) {
            return <TechSkill skill={each} key={index} />;
          } else {
            return null;
          }
        })}
      </section>
    </div>
  );
}
