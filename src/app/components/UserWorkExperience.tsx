import { WorkExperience } from "types/workExp";

export default function UserWorkExperience({
  workExperience,
}: {
  workExperience: WorkExperience[] | undefined;
}) {
  return (
    <>
      Your Work Experience
      {workExperience ? (
        <div>
          {workExperience.length === 0 && <div>No work experience added.</div>}
          {workExperience.length > 0 &&
            workExperience.map((workExp: WorkExperience) => (
              <div key={workExp.id}>
                <p>-----------------------------------------------</p>
                <p>ID: {workExp.id}</p>
                <p>User ID: {workExp.userId}</p>
                <p>Job Title: {workExp.jobTitle}</p>
                <p>Company: {workExp.company}</p>
                <p>Start Date: {workExp.startDate}</p>
                <p>End Date: {workExp.endDate}</p>
                <p>Job Description: {workExp.description}</p>
                <p>Created At: {workExp.createdAt}</p>
                <p>Updated At: {workExp.updatedAt}</p>
                <p>-----------------------------------------------</p>
                <br />
              </div>
            ))}
        </div>
      ) : (
        <div>Loading your work experience...</div>
      )}
    </>
  );
}
