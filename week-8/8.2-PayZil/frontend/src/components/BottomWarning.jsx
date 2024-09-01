import { Link } from "react-router-dom";

export default function BottomWarning({label, linkText, link}){
    return (
        <div className="flex justify-center font-medium text-sm py-2">
            <div>
                {label}
            </div>
            <Link to={link} className="pl-1 cursor-pointer underline">
                {linkText}
            </Link>
        </div>
    )
}