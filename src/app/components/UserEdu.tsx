import type { Education } from "types/education";

export default function Education({ data }: { data: Education }) {
  const getYear = (date: Date | null): string => {
    if (!date) {
      return "Present";
    } else {
      return new Date(date).getFullYear().toString();
    }
  };
  return (
    <div className="glass-container glass-card flex justify-between mb-2 px-3 py-2 font-bold">
      <p>{`${data.degree} in ${data.fieldOfStudy}`}</p>
      <p>{data.school}</p>
      <p>{`${getYear(data.startDate)} - ${getYear(data.endDate)}`}</p>
    </div>
  );
}
