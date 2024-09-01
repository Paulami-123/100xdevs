import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import axios from "axios";
import { DATABASE_URL } from "../config";
import { useState } from "react";
import ActionButton from "./ActionButton";

interface BlogCardData {
  id : string,
  authorName : string,
  title : string,
  content : string,
  publishedDate : string,
  type : 'myBlogs' | 'allBlogs',
  published : boolean
}

export const BlogCard = ({ id, authorName, title, content, publishedDate, published, type } : BlogCardData)=>{

    const words = content.trim().split(/\s+/);
    const time = Math.ceil(words.length/100);
    const [publish, setPublish] = useState(published);
    const [error, setError] = useState('');

    async function sendRequest(action : boolean){
      const response = await axios.put(`${DATABASE_URL}/api/v1/blog`, {
        id : id,
        published : action
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
      }
      })
      console.log(response);
      setPublish(response.data.response.published)
    }
    return (
        <div className="p-4 flex justify-center">
          <Link to={`/blog/${id}`}>
            <div className="max-w-xl border-b border-slate-200 flex justify-center">
              <div>
                <div className="flex text-base gap-1 py-1 items-center">
                  {type!=="myBlogs" ? 
                  <div className="flex text-base gap-1 py-1 items-center">
                    <Avatar authorName={authorName} size={8}></Avatar>
                    <div>
                      {authorName} · 
                    </div> 
                  </div>
                  : null}
                  <div className="text-gray-500">
                    {publishedDate}
                  </div>
                </div>
                <div className="text-2xl font-bold py-1">
                  {title}
                </div>
                <div className="text-md py-1">
                  {content.slice(0, 400)} {content.length>400 ? "..." : null}
                </div>
                <div className="text-sm text-gray-500 py-5">
                  {time} minute{time>1 ? "s" : null} read
                </div>
                {error ? <div className="text-sm font-bold text-red-400">{error}</div> : null}
              </div>
            </div>
          </Link>
          {type==='myBlogs'?
          <div className="px-4 grid grid-rows-6">
            {publish ? 
            <ActionButton action={publish} onClick={()=>{
              sendRequest(false)
            }} /> : 
            <ActionButton action={publish} onClick={()=>{
              sendRequest(true)
            }} />
            }
            <ActionButton action={"delete"} onClick={async()=>{
              try{
                await axios.delete(`${DATABASE_URL}/api/v1/blog/delete/${id}`, {
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                })
                location.reload();
              }
              catch(err){
                //@ts-ignore
                setError(err.response.data.error);
              }
            }} />
          </div>
          : null}
        </div>
    )
}