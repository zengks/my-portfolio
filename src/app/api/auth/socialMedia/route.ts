import { withAuth } from "@/lib/withAuth";
import { NextResponse, NextRequest } from "next/server";
import {
  getAllUserSocialMedia,
  updateUserSocialMedia,
} from "@/controllers/userSocialMedia";

export async function GET(): Promise<NextResponse> {
  return withAuth(async (session) => {
    try {
      const socialMedia = await getAllUserSocialMedia(session.user.id);
      return NextResponse.json({ socialMedia }, { status: 200 });
    } catch (error) {
      console.error("Error getting user social media,", error);
      return NextResponse.json(
        { Error: "Failed to get user social media." },
        { status: 500 }
      );
    }
  })();
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return withAuth(async () => {
    try {
      const body = await request.json();
      const updatedSocialMedia = await updateUserSocialMedia(body);
      return NextResponse.json({ updatedSocialMedia }, { status: 200 });
    } catch (error) {
      console.error("Error updating user social media.", error);
      return NextResponse.json(
        { Error: "Failed to update social media." },
        { status: 500 }
      );
    }
  })(request);
}
