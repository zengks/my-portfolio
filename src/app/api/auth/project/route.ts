import { NextResponse, NextRequest } from "next/server";
import { withAuth } from "@/lib/withAuth";
import {
  getUserProject,
  updateUserProject,
} from "src/controllers/userProjectController";

export async function GET(): Promise<NextResponse> {
  return withAuth(async (session) => {
    try {
      const projects = await getUserProject(session.user.id);
      return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
      console.error("Error fetching user projects: ", error);
      return NextResponse.json(
        {
          Error: "Failed to fetch user projects",
        },
        { status: 500 }
      );
    }
  })();
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return withAuth(async () => {
    try {
      const body = await request.json();
      console.log("Request body for updating project: ", body);
      const updatedProjects = await updateUserProject(body);
      return NextResponse.json({ updatedProjects }, { status: 200 });
    } catch (error) {
      console.error("Error updating user project: ", error);
      return NextResponse.json(
        { Error: "Failed to update user project" },
        { status: 500 }
      );
    }
  })(request);
}
