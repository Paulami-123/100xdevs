import { ChangeEvent, useState } from "react"
import InputField from "./InputField";

interface PasswordInput {
    label ?: string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void
}
export default function Password({label, onChange} : PasswordInput){
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <InputField label={label ? label : "Enter your password"} type={
                    showPassword ? "text" : "password"
                } onChange={onChange} />
            <div className="flex items-center pt-2">
                <input type="checkbox" onChange={() =>
                    setShowPassword((prev) => !prev)
                    }
                className="cursor-pointer"/>
                <div className="pl-2">Show Password</div>
            </div>
        </div>
    )
}