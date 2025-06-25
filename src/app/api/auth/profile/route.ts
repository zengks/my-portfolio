import { NextRequest, NextResponse } from "next/server";
import {
  getUserProfile,
  updateUserProfile,
} from "controllers/userProfileController";
import { auth } from "lib/auth";

export async function GET() {
  const session = await auth();
  try {
    const profile = await getUserProfile(session?.user);
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    return NextResponse.json(
      { Error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const updatedUserProfile = await updateUserProfile(session?.user, body);
    return NextResponse.json({ updatedUserProfile }, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    return NextResponse.json(
      { Error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
