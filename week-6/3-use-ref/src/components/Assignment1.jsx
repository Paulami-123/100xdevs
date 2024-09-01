import { useEffect, useRef } from "react";


export function Assignment1() {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleButtonClick = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input type="text" placeholder="Enter text here" ref={inputRef}/>
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};
