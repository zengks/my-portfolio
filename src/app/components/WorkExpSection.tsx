import UserExp from "./UserExp";
import { WorkExperience } from "types/workExp";

export default function WorkExpSection({
  workExp,
}: {
  workExp: WorkExperience[];
}) {
  return (
    <div className="glass-container glass-section">
      <p className="section-title">Work Exp</p>

      {workExp ? (
        <section className="flex justify-around">
          {workExp.map((each) => (
            <UserExp data={each} key={each.id} />
          ))}
        </section>
      ) : (
        <section>Loading...</section>
      )}
    </div>
  );
}
