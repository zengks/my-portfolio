import { Education } from "types/education";

export default function UserEducation({
  education,
}: {
  education: Education[] | undefined;
}) {
  return (
    <>
      Your Education List
      {education ? (
        <div>
          {education.length === 0 && <div>No education added.</div>}
          {education.length > 0 &&
            education.map((each) => (
              <div key={each.id}>
                <p>-----------------------------------------------</p>
                <p>ID: {each.id}</p>
                <p>User ID: {each.userId}</p>
                <p>School: {each.school}</p>
                <p>Degree: {each.degree}</p>
                <p>Field of Study: {each.fieldOfStudy}</p>
                <p>Start Date: {each.startDate}</p>
                <p>End Date: {each.endDate}</p>
                <p>GPA: {each.gpa}</p>
                <p>Description: {each.description}</p>
                <p>Created At: {each.createdAt}</p>
                <p>Updated At: {each.updatedAt}</p>
                <p>-----------------------------------------------</p>
                <br />
              </div>
            ))}
        </div>
      ) : (
        <div>Loading your education list...</div>
      )}
    </>
  );
}
