import { BlogPost } from "types/blogPost";

export default function UserBlogPosts({
  blogPosts,
}: {
  blogPosts: BlogPost[] | undefined;
}) {
  return (
    <>
      Your Blog Posts
      {blogPosts ? (
        <div>
          {blogPosts.length === 0 && <div>No blog posts added.</div>}
          {blogPosts.length > 0 &&
            blogPosts.map((blogPost: BlogPost) => (
              <div key={blogPost.id}>
                <p>-----------------------------------------------</p>
                <p>ID: {blogPost.id}</p>
                <p>Author ID: {blogPost.authorId}</p>
                <p>Title: {blogPost.title}</p>
                <p>Content: {blogPost.content}</p>
                <p>Published: {blogPost.published}</p>
                <p>Views: {blogPost.viewsCount}</p>
                <p>Created At: {blogPost.createdAt}</p>
                <p>Updated At: {blogPost.updatedAt}</p>
                <p>-----------------------------------------------</p>
                <br />
              </div>
            ))}
        </div>
      ) : (
        <div>Loading your blog posts...</div>
      )}
    </>
  );
}
