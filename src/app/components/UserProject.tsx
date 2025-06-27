import { Project } from "types/project";

export default function UserProject({
  projects,
}: {
  projects: Project[] | undefined;
}) {
  return (
    <>
      Your Projects
      {projects ? (
        <div>
          {projects?.length === 0 && <div>No projects added.</div>}
          {projects?.length > 0 &&
            projects?.map((project: Project) => (
              <div key={project.id}>
                <p>-----------------------------------------------</p>
                <p>Title: {project.title}</p>
                <p>Project ID: {project.id}</p>
                <p>User ID: {project.userId}</p>
                <p>Repo Link: {project.repo_link}</p>
                <p>Project Link: {project.project_link}</p>
                <p>Description: {project.description}</p>
                <p>Image: {project.preview_image_link}</p>
                <p>Created At: {project.createdAt}</p>
                <p>Updated At: {project.updatedAt}</p>
                <p>-----------------------------------------------</p>
                <br />
              </div>
            ))}
        </div>
      ) : (
        <div>Loading your projects...</div>
      )}
    </>
  );
}
