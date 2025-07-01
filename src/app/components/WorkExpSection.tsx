import UserExp from "./UserExp";

export default function WorkExpSection() {
  return (
    <div className="glass-container glass-section">
      <p className="section-title">Work Exp</p>
      <section className="flex justify-around">
        <UserExp />
        <UserExp />
        <UserExp />
        <UserExp />
        <UserExp />
      </section>
    </div>
  );
}
