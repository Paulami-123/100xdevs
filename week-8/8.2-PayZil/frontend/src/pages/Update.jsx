import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import Password from "../components/Password";

export default function Update(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function sendRequest(){
        try{
            const response = await axios.put("http://localhost:3000/api/v2/user/update",{
                firstName,
                lastName,
                password
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setMessage(response.data.message);
        }
        catch(err){
            setError(err.response.data.error);
        }
    }

    return (
        <div className="bg-gray-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Update Information"} />
                    <SubHeading label={"Enter credentials that you want to update"} />
                    <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=>{
                        setFirstName(e.target.value);
                    }} />
                    <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e)=>{
                        setLastName(e.target.value);
                    }} />
                    <Password onChange={(e)=>{
                        setPassword(e.target.value);
                    }} /> 
                    <div className="pt-4">
                        <Button label={"Update Information"} onClick={sendRequest} />
                    </div>
                    {message ?
                    <div className="text-green-500 font-bold pb-2">{message}</div> 
                    :
                    <div className="text-red-500 font-bold pb-2">{error}</div>
                    }
                    <div className="pb-4 px-4 flex items-center justify-start">
                        <button onClick={() => {
                            navigate("/dashboard?id="+id+"&name="+firstName);
                        }}>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                                <div className="pl-2">Go back</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}