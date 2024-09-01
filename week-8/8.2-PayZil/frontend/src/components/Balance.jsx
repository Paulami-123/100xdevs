import { useEffect, useState } from "react";

export default function Balance({balance}){
    const [amount, setAmount] = useState("");
    useEffect(()=>{
        const value = balance.toLocaleString('en-IN');
        setAmount(value);
    }, [balance]); 

    return (
        <div className="px-8 py-2 flex items-center justify-start">
            <div className="font-bold text-lg pr-2">
                Your Balance
            </div>
            <div className="font-semibold text-lg">
                ₹ {amount}
            </div>
        </div>
    )
}