import { NextRequest, NextResponse } from "next/server";
import {
  getUserWorkExp,
  updateUserWorkExp,
} from "@/controllers/userWorkExpController";
import { withAuth } from "@/lib/withAuth";

export async function GET() {
  return withAuth(async (session) => {
    try {
      const workExperience = await getUserWorkExp(session.user.id);
      return NextResponse.json({ workExperience }, { status: 200 });
    } catch (error) {
      console.error("Error fetching user work experience: ", error);
      return NextResponse.json(
        { Error: "Failed to fetch user work experience" },
        { status: 500 }
      );
    }
  })();
}

export async function PUT(request: NextRequest) {
  return withAuth(async () => {
    try {
      const body = await request.json();
      const updatedWorkExperience = await updateUserWorkExp(body);
      return NextResponse.json({ updatedWorkExperience }, { status: 200 });
    } catch (error) {
      console.error("Error updating user work experience: ", error);
      return NextResponse.json(
        { Error: "Failed to update user work experience" },
        { status: 500 }
      );
    }
  })(request);
}
