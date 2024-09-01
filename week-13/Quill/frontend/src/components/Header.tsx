import { Link } from "react-router-dom";

interface HeaderData {
    heading : string,
    subHeading ?: string,
    linkTxt ?: string,
    to ?: string
}

export default function Header({ heading, subHeading, linkTxt, to } : HeaderData){
    return(
        <div className="p-2">
            <div className="font-bold text-4xl py-2">
                {heading}
            </div>
            {to ?
            <div className="flex justify-center text-slate-400 text-md gap-1">
                {subHeading}
                <Link className="underline underline-offset-1" to={to}>{linkTxt}</Link>
            </div>
            : null}
        </div>
    )
}