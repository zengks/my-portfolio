import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
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
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    return NextResponse.json({ NewUser: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating a user: ", error);
    return NextResponse.json(
      { Error: "Failed to create a new user" },
      { status: 500 }
    );
  }
}
