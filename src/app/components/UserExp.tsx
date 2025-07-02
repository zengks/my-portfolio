import { WorkExperience } from "types/workExp";

export default function UserExp({ data }: { data: WorkExperience }) {
  return (
    <div className="glass-container glass-card">
      <p>{data.company}</p>
      <p>{data.jobTitle}</p>
      <p>{data.description}</p>
      <p>{new Date(data.startDate).toLocaleDateString()}</p>
      <p>{new Date(data.endDate).toLocaleDateString()}</p>
    </div>
  );
}
