import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";

export default function SendMoney(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [response, setResponse] = useState("");
    const [color, setColor] = useState("");

    async function sendRequest(){
        try{
            const transferResponse = await axios.post("http://localhost:3000/api/v2/account/transfer", {
                to: id,
                amount
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setResponse(transferResponse.data.message);
            setColor("green");
        }
        catch(err){
            setResponse("Insufficient balance.");
            setColor("red");
        }
    }

    return (
        <div className="bg-gray-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 shadow-lg text-center p-2 h-max px-4">
                    <div className="mb-7 p-6">
                        <Heading label={"Send Money"} />
                    </div>
                    <div className=" flex items-center pl-4">
                        <div className="bg-green-400 rounded-full h-12 w-12 flex justify-center">
                            <div className="flex flex-col justify-center h-full text-xl text-[#FFFFFF] font-medium">
                                {name[0]}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center h-full ml-4 text-2xl font-bold">
                            {name}
                        </div>
                    </div>
                    <div>
                        <InputBox label={"Amount (in ₹)"} placeholder={"Enter amount"} onChange={(e) => {
                            setAmount(e.target.value);
                        }} />
                    </div>
                    <div className="py-6 px-4">
                        <button onClick={sendRequest} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            Initiate Transfer
                        </button>
                        <div className={`flex justify-start text-sm font-medium text-${color}-500 pt-2`}>
                            {response}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}