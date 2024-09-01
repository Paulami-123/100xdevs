import { MouseEvent } from "react";

interface BtnTask{
    label : string,
    onClick : (e: MouseEvent<HTMLButtonElement>) => any
}
export default function DropDownBtn({label, onClick} : BtnTask){
    return <div>
        <button onClick={onClick} className="hover:font-bold w-full text-left p-2">{label}</button>
    </div>
}