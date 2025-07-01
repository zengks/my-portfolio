import TechSkill from "./TechSkill";

export default function UserSkillSet() {
  return (
    <div className="glass-container glass-section">
      <p className="section-title">Core Skill Set</p>
      <section className="flex justify-around">
        <TechSkill />
        <TechSkill />
        <TechSkill />
        <TechSkill />
        <TechSkill />
      </section>
    </div>
  );
}
