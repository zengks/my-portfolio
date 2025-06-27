import { NextRequest, NextResponse } from "next/server";
import {
  getUserProfile,
  updateUserProfile,
} from "src/controllers/userProfileController";

import { withAuth } from "@/lib/withAuth";

export async function GET(): Promise<NextResponse> {
  return withAuth(async (session) => {
    try {
      const profile = await getUserProfile(session.user.id);

      return NextResponse.json({ profile }, { status: 200 });
    } catch (error) {
      console.error("Error fetching user profile: ", error);
      return NextResponse.json(
        { Error: "Failed to fetch user profile" },
        { status: 500 }
      );
    }
  })();
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return withAuth(async (session) => {
    try {
      const body = await request.json();
      const updatedUserProfile = await updateUserProfile(
        session?.user.id,
        body
      );
      return NextResponse.json({ updatedUserProfile }, { status: 200 });
    } catch (error) {
      console.error("Error updating user profile: ", error);
      return NextResponse.json(
        { Error: "Failed to update user profile" },
        { status: 500 }
      );
    }
  })(request);
}
