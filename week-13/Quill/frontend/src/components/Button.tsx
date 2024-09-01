import { MouseEvent } from "react"

interface ButtonData{
  label : string,
  onClick : (e: MouseEvent<HTMLButtonElement>) => any
}

export default function Button({ label, onClick }:ButtonData){
    return(
        <div className="py-2">
          <button className="w-full bg-black text-center text-white text-md m-1 py-2 px-4 rounded-lg font-bold"
          onClick={onClick}>
            {label}
          </button>
        </div>
    )
}