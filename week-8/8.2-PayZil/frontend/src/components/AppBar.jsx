import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function AppBar({color, userId}){
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [showOptions, setShowOptions] = useState(false);
    const username = searchParams.get("name");

    return (
        <div className="shadow h-14 w-full px-5 py-2 border border-slate-300 flex justify-between items-center font-medium">
            <div className="h-full ml-4 flex items-center">
                PayZil App
            </div>
            <div className=" flex items-center">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello {username}!
                </div>
                <div className="relative inline-block text-left">
                    <div className={`bg-${color}-200 rounded-full h-12 w-12 flex justify-center`} onClick={()=>{
                        setShowOptions(!showOptions);
                    }}>
                        <div tabIndex="0" role="button" className={`flex flex-col justify-center h-full text-xl text-${color}-500`}>
                            {username[0]? username[0] : 'A'}
                        </div>
                    </div>
                    {showOptions ? (
                    <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg">
                        <div className="py-1">
                            <button onClick={()=>{
                                navigate("/update/?id="+userId);
                            }} className="py-2 px-3 hover:font-bold">
                                Update
                            </button>
                            <button onClick={()=>{
                                localStorage.removeItem("token");
                                navigate("/signup");
                            }} className="py-2 px-3 hover:font-bold">
                                Sign Out
                            </button>
                        </div>
                    </div>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </div>
    )
}