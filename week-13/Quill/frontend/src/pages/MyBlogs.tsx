import AppBar from "../components/AppBar";
import { Link } from "react-router-dom";
import { MyBlogsList } from "../components/MyBlogsList";

export default function MyBlogs(){
    return <div>
        <AppBar />
        <div className="h-screem flex flex-col items-center justify-start py-16">
            <div className="w-1/2 border-b border-slate-300 flex justify start gap-5 items-center">
                <Link to={'/blog/create'} className="text-slate-300 text-4xl items-center focus:text-black">+</Link>
                <Link to={'/myblogs'} className="text-black text-xl items-center">My Blogs</Link>
                <Link to={'/blogs'} className="text-slate-300 text-xl items-center">All Blogs</Link>
            </div>
            <div>
                <MyBlogsList />
            </div>
        </div>
    </div>
}