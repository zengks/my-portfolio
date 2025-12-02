import prisma from '@/lib/prisma';
import { BlogPost } from 'types/blogPostType';

export async function getAllUserBlogPosts(authorId: string) {
	return await prisma.blogPost.findMany({
		where: { userId: authorId },
	});
}

async function updateOneBlogPost(blogPostId: number, blogPostData: BlogPost) {
	return await prisma.blogPost.update({
		where: { id: blogPostId },
		data: blogPostData,
	});
}

export async function updateUserBlogPosts(newBlogPostData: BlogPost[]) {
	if (newBlogPostData.length === 0) throw new Error('No blog post data to update.');

	const updatedBlogPosts = Promise.all(
		newBlogPostData.map((each) => updateOneBlogPost(each.id, each))
	);
	return updatedBlogPosts;
}
