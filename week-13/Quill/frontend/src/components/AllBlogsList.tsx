import { BlogCard } from "./BlogCard"
import { BlogSkeleton } from "./BlogSkeleton";
import { useBlogs } from "../hooks"

export const AllBlogsList = () => {
    const { loading, blogs } = useBlogs();
    return (
        <div>
            {loading ? 
            <div className="justify-center grid grid-rows">
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
            :
            <div>
                {blogs.map(blog => <BlogCard key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt}
                    type={'allBlogs'}
                    published={blog.published}
                />)} 
            </div>}
        </div>
    )
}