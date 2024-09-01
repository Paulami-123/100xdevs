import { ChangeEvent } from "react"

interface InputData {
    type? : string
    label : string,
    placeholder ?: string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void
}

export default function InputField({ type, label, placeholder, onChange } : InputData){
    return(
        <div className="py-2">
            <div className="text-md font-bold p-1">{label}</div>
            <input type={type || "text"} className="outline outline-2 outline-slate-200 rounded-lg m-1 py-2 px-4 w-full text-md text-black"
            placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}