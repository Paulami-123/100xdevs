import { useMemo, useState } from "react";


export function Assignment1() {
    const [input, setInput] = useState(0);
    // Your solution starts here
    const expensiveValue = useMemo(()=>{
        let factorial = 1;
        for(let i=input; i>1; i--){
            factorial*=i;
        }
        return factorial;
    }, [input]); 
    // Your solution ends here

    return (
        <div>
            <input 
                type="number"  
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}