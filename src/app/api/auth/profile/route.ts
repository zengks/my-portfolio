import { NextRequest, NextResponse } from "next/server";
import {
  getUserProfile,
  updateUserProfile,
} from "src/controllers/userProfileController";
import { auth } from "src/lib/auth";

export async function GET() {
  const session = await auth();
  try {
    if (!session?.user?.id) {
      return NextResponse.json(
        { Error: "User not authenticated" },
        { status: 401 }
      );
    }
    const profile = await getUserProfile(session.user.id);
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
  const session = await auth();
  try {
    const body = await request.json();
    if (!session?.user?.id) {
      return NextResponse.json(
        { Error: "User not authenticated" },
        { status: 401 }
      );
    }

    const updatedUserProfile = await updateUserProfile(session?.user.id, body);
    return NextResponse.json({ updatedUserProfile }, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    return NextResponse.json(
      { Error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
