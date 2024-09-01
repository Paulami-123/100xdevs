import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

let GLOBAL_ID = 1;

export default function Users({userId}){
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v2/user/bulk?filter=" + filter)
        .then(response =>{
            setUsers(response.data.Users);
        })
    }, [filter]);

    return (
        <div className="px-8 py-2 items-center justify-start">
            <div className="font-bold text-lg pr-2 pb-2">
                Users
            </div>
            <input onChange={(e)=>{
                setFilter(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full text-sm border border-slate-300 rounded px-2 py-1" />
            <div>
                {users.filter(function(user){
                    return user._id!==userId
                }).map(user => <User key={user._id} user={user} /> )} 
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className={`h-12 w-12 rounded-full bg-${user.color}-200 text-${user.color}-500 items-center flex justify-center font-medium text-lg mt-1 mr-2`}>
                    {user.firstName[0]}
                </div>
                <div className="font-bold text-sm">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send Money"} onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} />
            </div>
        </div>
    )
}