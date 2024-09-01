import { useState } from "react";
import DropDownBtn from "./DropDownBtn";
import { useNavigate } from "react-router-dom";
import { useUserame } from "../hooks";

interface AvatarBtn{
  authorName? : string,
  size ?: number
}

export default function Avatar({authorName, size}: AvatarBtn){
  if(!authorName){
    const userName = useUserame()
    authorName = userName
  }
    let initials = authorName[0] ;
    const lastname = authorName.split(' ')[1];
    if(lastname){
      initials+=lastname[0]
    }
    if(!size){
      size=8
    }

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    return(
      <div>
        <button className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
          onClick={()=>{
            setIsOpen(!isOpen)
          }}>
          <span className="font-medium text-gray-600 dark:text-gray-300">{initials}</span>
        </button>
        {isOpen && 
          <div className="absolute top-12 right-0 bg-white flex flex-col items-start p-2 w-40 drop-shadow-md">
            <DropDownBtn label={"Sign Out"} onClick={()=>{
              localStorage.clear();
              navigate('/signup');
            }} />
            <DropDownBtn label={"Update"} onClick={()=>{
              navigate('/update')
            }} />
            <DropDownBtn label={"Delete Account"} onClick={()=>{
              navigate('/delete')
            }} />
          </div>
        }
      </div>
    )
  }