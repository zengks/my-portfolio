import { NextResponse, NextRequest } from "next/server";
import { withAuth } from "@/lib/withAuth";
import {
  getUserCertificate,
  updateUserCertificate,
} from "@/controllers/userCertificateController";

export async function GET(): Promise<NextResponse> {
  return withAuth(async (session) => {
    try {
      const certificate = await getUserCertificate(session.user.id);
      return NextResponse.json({ certificate }, { status: 200 });
    } catch (error) {
      console.error("Error fetching user certificate: ", error);
      return NextResponse.json(
        { Error: "Failed to fetch user certificate." },
        { status: 500 }
      );
    }
  })();
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return withAuth(async () => {
    try {
      const body = await request.json();
      const updatedCertificate = await updateUserCertificate(body);
      return NextResponse.json({ updatedCertificate }, { status: 200 });
    } catch (error) {
      console.error("Error updating user certificate: ", error);
      return NextResponse.json(
        { Error: "Failed to update user certificate" },
        { status: 500 }
      );
    }
  })(request);
}
