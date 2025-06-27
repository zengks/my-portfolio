import { NextRequest, NextResponse } from "next/server";
import {
  getAllUserEducation,
  updateUserEducation,
} from "@/controllers/userEducationController";
import { withAuth } from "@/lib/withAuth";

export async function GET(): Promise<NextResponse> {
  return withAuth(async (session) => {
    try {
      const education = await getAllUserEducation(session.user.id);
      return NextResponse.json({ education }, { status: 200 });
    } catch (error) {
      console.error("Error fetching user education: ", error);
      return NextResponse.json(
        { Error: "Failed to fetch user education data." },
        { status: 500 }
      );
    }
  })();
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return withAuth(async () => {
    try {
      const body = await request.json();
      const updatedEducation = await updateUserEducation(body);
      return NextResponse.json({ updatedEducation }, { status: 200 });
    } catch (error) {
      console.error("Error updating user education: ", error);
      return NextResponse.json(
        { Error: "Failed to update user education." },
        { status: 500 }
      );
    }
  })(request);
}
