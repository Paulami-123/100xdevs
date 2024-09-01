import { Blog } from "../hooks";
import { decodeToken } from "react-jwt";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

interface UserData {
  name : string,
  id : string
}
export default function FullBlog({blog} : {blog : Blog}){
  const token = localStorage.getItem('token') || "";
  const user : UserData|null = decodeToken(token);
    return(
    <div className="h-screen w-screen justify-center flex-cols grid grid-cols-3">
      <div className="relative col-span-3 lg:col-span-2">
        <div className="p-10">
          <div className="font-bold text-4xl py-1">
            {blog.title}
          </div>
          <div className="flex justify-start gap-3">
            <div className="py-1 text-slate-400">Posted {blog.createdAt}</div>
            {blog.createdAt!==blog.editedAt ? 
            <div className="flex justify-start gap-3">
              <div className="py-1 text-slate-400"> | </div>
              <div className="py-1 text-slate-400">Last Edited {blog.editedAt}</div>
            </div> : null}
          </div>
          <div className="py-1">
            {blog.content}
          </div>
          {(user && user.id===blog.authorId)?
          <Link to={`/blog/edit/${blog.id}`} 
          className="absolute bottom-0 right-0 h-10 w-10 rounded-full flex justify-center items-center bg-slate-200 m-10">
            <div className="h-5 w-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
              </svg>
            </div>
          </Link> 
          :
          null}
        </div>
      </div>
      <div className="invisible lg:visible">
        <div className="m-10">
          <div className="font-semibold">Author</div>
          <div className="flex justify-start gap-3 items-center py-4">
            <div className="m-2">
              <Avatar authorName={(blog.author.name)? blog.author.name : "Anonymous"} size={8}></Avatar>
            </div>
            <div className="pl-2">
              <div className="font-bold text-lg">{blog.author.name}</div>
              {blog.author.about ? 
                <div className="text-slate-400">{blog.author.about}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}