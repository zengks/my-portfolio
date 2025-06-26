import { withAuth } from "@/lib/withAuth";
import { NextResponse, NextRequest } from "next/server";
import {
  getAllUserBlogPosts,
  updateUserBlogPosts,
} from "@/controllers/userBlogPostController";

export async function GET(): Promise<NextResponse> {
  return withAuth(async (session) => {
    try {
      const blogPosts = await getAllUserBlogPosts(session.user.id);
      return NextResponse.json({ blogPosts }, { status: 200 });
    } catch (error) {
      console.error("Error getting user blog posts: ", error);
      return NextResponse.json(
        { Error: "Failed to fetch user blog posts." },
        { status: 500 }
      );
    }
  })();
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return withAuth(async () => {
    try {
      const body = await request.json();
      const updatedBlogPosts = await updateUserBlogPosts(body);
      return NextResponse.json({ updatedBlogPosts }, { status: 200 });
    } catch (error) {
      console.error("Error updating user blog posts: ", error);
      return NextResponse.json(
        { Error: "Failed to update user blog posts." },
        { status: 500 }
      );
    }
  })(request);
}
