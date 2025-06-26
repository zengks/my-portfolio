import { Project } from "types/project";

export default function UserProject({
  projects,
}: {
  projects: Project[] | undefined;
}) {
  return (
    <>
      {projects && (
        <div>
          {projects?.length === 0 && <div>No projects added.</div>}
          {projects?.length > 0 &&
            projects?.map((project: Project) => (
              <div key={project.id}>
                <p>Title: {project.title}</p>
                <p>User ID: {project.userId}</p>
                <p>Repo Link: {project.repo_link}</p>
                <p>Project Link: {project.project_link}</p>
                <p>Description: {project.description}</p>
                <p>Image: {project.preview_image_link}</p>
                <p>Created At: {project.createdAt}</p>
                <p>Updated At: {project.updatedAt}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
