import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const awaitedParams = await params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: awaitedParams.id },
    });
    if (!user) {
      return NextResponse.json({ Error: "User not found." }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error in api/auth/users/[id]", error);
    return NextResponse.json({ Error: "Server error" }, { status: 500 });
  }
}
