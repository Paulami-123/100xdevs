import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useMyBlogs } from "../hooks"

export const MyBlogsList = () => {
    const { loading, blogs } = useMyBlogs();
    return (
        <div>
            {loading ? 
            <div className="flex justify-center grid grid-rows">
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
            :
            <div>
                {blogs.map(blog => <BlogCard key={Math.floor(Math.random()*Math.pow(10, 7))}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt}
                    published={blog.published}
                    type={"myBlogs"}
                />)} 
            </div>}
        </div>
    )
}