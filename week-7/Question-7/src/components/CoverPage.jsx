import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function CoverPage(){
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  return <div>
    <div className="h-screen">
      <div className="relative w-full">
        <img className="object-contain" src="https://static.vecteezy.com/system/resources/previews/007/740/967/original/abstract-art-gold-tropical-leaves-background-luxury-wallpaper-with-watercolor-tropical-leaf-framed-exotic-color-free-vector.jpg" />
      </div>
      <div className="absolute top-24 left-96 py-16">
        <div className="text-6xl p-8 font-dance font-extrabold">
          Get Customised Birthday Cards !!!
        </div>
      </div>
      <div className="absolute top-72 left-96 ml-48 w-1/4 outline outline-white outline-2 rounded-lg">
        <div className="grid grid-row-4 gap-4 p-5">
          <input type="text" placeholder="Enter name" onChange={(e)=>{
            setName(e.target.value)
          }}
          className="p-4 rounded-lg focus:outline-[#fdba74]" />
          <input type="text" placeholder="Enter age" onChange={(e)=>{
            setAge(Number(e.target.value))
          }}
          className="p-4 rounded-lg focus:outline-[#fdba74]" /> 
          <button className="flex p-4 rounded-lg bg-[#fdba74] font-medium justify-center gap-2" 
          onClick={()=>{
            navigate("/card1?name="+name+"&age="+age);
          }}>
            Generate Birthday Cards 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
}