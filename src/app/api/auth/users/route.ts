import { NextRequest, NextResponse } from "next/server";
import {
  getAllUsers,
  createUser,
  checkUserExists,
} from "controllers/userController";

export async function GET() {
  try {
    const users = await getAllUsers();
    if (!users || users.length === 0) {
      return NextResponse.json({ Error: "No users found." }, { status: 404 });
    }
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users: ", error);
    return NextResponse.json(
      { Error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const userExists = await checkUserExists(username);

    if (userExists) {
      return NextResponse.json(
        { Error: "User already exists." },
        { status: 409 }
      );
    }

    const newUser = await createUser(username, password);
    return NextResponse.json({ NewUser: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating a user: ", error);
    return NextResponse.json(
      { Error: "Failed to create a new user" },
      { status: 500 }
    );
  }
}
