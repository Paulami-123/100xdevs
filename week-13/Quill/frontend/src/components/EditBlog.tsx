import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { DATABASE_URL } from "../config"
import { UpdateBlogInput } from "@paulami/medium-common"
import ActionButton from "./ActionButton"

interface EditParameters{
  blog ?: UpdateBlogInput,
  type : 'post' | 'put'
}

export const EditBlog = ({blog, type} : EditParameters) => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [blogData, setBlogData] = useState<UpdateBlogInput>({
    id : blog?.id ||"",
    title : blog?.title || "",
    content : blog?.content || "",
    published : true
  })

  async function sendRequest(data : UpdateBlogInput){
    try{
      await axios({
        url : `${DATABASE_URL}/api/v1/blog`,
        method : type,
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data : data
      })
      navigate('/myblogs')
    }
    catch(err){
      //@ts-ignore
      setError(err.response.data.error)
    }
  }

  return (
    <div className="relative h-screen w-screen">
      <div className="flex justify-center flex-cols">
        <div className="w-1/2 py-4">
          <div>
            <label>
              <textarea name="posttitle" rows={1} cols={70} maxLength={200} 
              className="border-l border-slate-300 text-4xl w-full h-[100px] p-4 outline outline-none leading-relaxed"
              placeholder="Title" onChange={(e)=>{
                setBlogData(c => ({
                  ...c, 
                  title : e.target.value
                }))
              }}>{blog?.title}</textarea>
            </label>
          </div>
          <div className="overscroll-contain">
            <label>
              <textarea id="content" name="postContent" rows={28} cols={70} className="w-full h-full p-4 outline outline-none" 
              placeholder="Tell your story..." onChange={(e)=>{
                setBlogData(c => ({
                  ...c,
                  content : e.target.value}))
              }} >{blog?.content}</textarea>
            </label>
          </div>
          {error ? <div className="text-sm font-bold text-red-400">{error}</div> : null}
        </div>
      </div>
      <div className="absolute top-36 right-16 grid grid-rows-2 gap-6">
        <ActionButton action={true} onClick={()=>{
          let newBlogData = {...blogData, published: false}
          setBlogData(newBlogData)
          sendRequest(newBlogData);
        }} />
        <ActionButton action={false} onClick={()=>{
          let newBlogData = {...blogData, published: true}
          setBlogData(newBlogData)
          sendRequest(newBlogData);
        }} />
      </div>
    </div>
  )
}