import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard(){
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [color, setColor] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(()=>{
        const getData = async() => {
            const response = await axios.get("http://localhost:3000/api/v2/user/data", {
                headers :  {
                    Authorization: localStorage.getItem("token")
                }
            });
            if(response.data){
                setBalance(response.data.user.balance);
                setColor(response.data.user.color);
            }
        }
        getData();
    }, []);

    return (
        <div>
            {id===null ? (
                <div className="bg-gray-300 h-screen flex justify-center">
                    <div className="flex flex-col justify-center text-red-500 font-bold text-8xl">
                        ERROR
                    </div>
                </div>
                ) : (
                <div>
                    <AppBar color={color} userId={id} />
                    <div className="m-8">
                        <Balance balance={balance} />
                        <Users userId = {id} />
                    </div>
                </div>
            )}
        </div>
    )
}