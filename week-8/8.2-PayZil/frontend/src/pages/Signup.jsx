import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import Password from "../components/Password";

export default function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function sendRequest(){
        try{
            const response = await axios.post("http://localhost:3000/api/v2/user/signup", {
                email,
                password,
                firstName,
                lastName
            });
            const token = 'Bearer '+response.data.token;
            localStorage.setItem("token", token);
            const userId = response.data.userId;
            navigate("/dashboard?id="+userId+"&name="+firstName);
        }
        catch(error){
            setError(error.response.data.message);
        }
    }

    return (
        <div className="bg-gray-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox label={"First Name"} placeholder={"John"} onChange={e => {
                        setFirstName(e.target.value);
                    }} />
                    <InputBox label={"Last Name"} placeholder={"Doe"} onChange={e => {
                        setLastName(e.target.value);
                    }} />
                    <InputBox label={"Email"} placeholder={"johndoe@example.com"} onChange={e => {
                        setEmail(e.target.value);
                    }} />
                    <Password onChange={e => {
                        setPassword(e.target.value);
                    }} />
                    <div className="pt-4">
                        <Button label={"Sign Up"} onClick={sendRequest} />
                    </div>
                    <div className="text-red-500 font-bold pb-2">{error}</div>  
                    <BottomWarning label={"Already have an account?"} linkText={"Log In"} link={"/signin"}/>
                </div>
            </div>
        </div>
    )
}