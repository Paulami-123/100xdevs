import React, { useState, useRef } from 'react';


export function Assignment2() {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);

    const handleReRender = () => {
        // Update state to force re-render
        setCount(Math.round(Math.random()*100));
    };

    countRef.current = countRef.current+1;

    return (
        <div>
            <p>This component has rendered {count} times.</p>
            <p>No! This component has rendered {countRef.current} times</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};