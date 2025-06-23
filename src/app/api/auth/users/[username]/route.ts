import { NextRequest, NextResponse } from "next/server";
import {
  getUserByUsername,
  updateUser,
  deleteUser,
} from "controllers/userController";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const user = await getUserByUsername(params.username);
    if (!user) {
      return NextResponse.json({ Error: "User not found." }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching the user", error);
    return NextResponse.json({ Error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const newUserData = await request.json();
    const updatedUser = await updateUser(params.username, newUserData);
    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error in updating the user", error);
    return NextResponse.json({ Error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const deletedUser = await deleteUser(params.username);
    return NextResponse.json({ deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error in deleting the user", error);
    return NextResponse.json({ Error: "Server error" }, { status: 500 });
  }
}
