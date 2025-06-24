import { NextRequest, NextResponse } from "next/server";
import { getUserProfile } from "controllers/userProfileController";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const profile = await getUserProfile(params.username);
    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile: ", params.username, error);
    return NextResponse.json(
      { Error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
