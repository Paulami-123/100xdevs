import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";
import Password from "../components/Password";

export default function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function sendRequest(){
        try{
            const response = await axios.post("http://localhost:3000/api/v2/user/signin",{
                email,
                password
            });

            const token = 'Bearer '+response.data.token;
            localStorage.setItem("token", token);
            const userId = response.data.userId;
            const firstName = response.data.firstName;
            navigate("/dashboard?id="+userId+"&name="+firstName);
        }
        catch(error){
            setError(error.response.data.message)
        }
    }
    return (
        <div className="bg-gray-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign In"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox label={"Email"} placeholder={"johndoe@example.com"} onChange={(e)=>{
                        setEmail(e.target.value);
                    }} />
                    <Password onChange={(e)=>{
                        setPassword(e.target.value);
                    }} />
                    <div className="pt-4">
                        <Button label={"Sign In"} onClick={sendRequest} />
                    </div>
                    <div className="text-red-500 font-bold pb-2">{error}</div> 
                    <BottomWarning label={"Don't have an account?"} linkText={"Sign Up"} link={"/signup"} />
                </div>
            </div>
        </div>
    )
}