import { useState } from "react"

export default function Password({onChange}){
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="px-5">
            <div className="text-sm font-bold py-2 text-left">
                Password
            </div>
            <div>
                <input onChange={onChange} type={
                    showPassword ? "text" : "password"
                } className="w-full text-sm border border-slate-300 rounded px-2 py-1" />
            </div>
            <div className="flex items-center pt-2">
                <input type="checkbox" value={showPassword} onChange={() =>
                    setShowPassword((prev) => !prev)
                    }
                className="cursor-pointer"/>
                <div className="pl-2">Show Password</div>
            </div>
        </div>
    )
}