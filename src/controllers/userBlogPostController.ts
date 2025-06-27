import prisma from "@/lib/prisma";
import { apiPaths } from "@/lib/apiPaths";
import { BlogPost } from "types/blogPost";

export async function getAllUserBlogPosts(authorId: string) {
  return await prisma.blogPost.findMany({
    where: { authorId },
  });
}

async function updateOneBlogPost(blogPostId: number, blogPostData: BlogPost) {
  return await prisma.blogPost.update({
    where: { id: blogPostId },
    data: blogPostData,
  });
}

export async function updateUserBlogPosts(newBlogPostData: BlogPost[]) {
  if (newBlogPostData.length === 0)
    throw new Error("No blog post data to update.");

  const updatedBlogPosts = Promise.all(
    newBlogPostData.map((each) => updateOneBlogPost(each.id, each))
  );
  return updatedBlogPosts;
}

// client-side api call
export async function fetchAllUserBlogPosts(): Promise<BlogPost[] | undefined> {
  try {
    const res = await fetch(apiPaths.userBlogPost());
    const data = await res.json();
    return data.blogPosts;
  } catch (error) {
    console.error("Error fetching user blog posts: ", error);
    return undefined;
  }
}
