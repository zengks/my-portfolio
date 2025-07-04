import { WorkExperience } from "types/workExp";

export default function UserExp({ data }: { data: WorkExperience }) {
  const getYear = (date: Date | null): string => {
    if (!date) {
      return "Present";
    } else {
      return new Date(date).getFullYear().toString();
    }
  };
  return (
    <div className="glass-container glass-card mr-3">
      <p className="border-b-1 border-black/20 py-1 font-bold">
        {data.company.toUpperCase()}
      </p>
      <p className="py-2">{data.jobTitle}</p>
      <p className="pb-2">{data.description}</p>
      <p className="pb-2">{`${getYear(data.startDate)} - ${getYear(
        data.endDate
      )}`}</p>
    </div>
  );
}
