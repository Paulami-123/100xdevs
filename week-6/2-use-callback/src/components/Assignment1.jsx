import { useState } from "react";


export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    function handleIncrement() {
        setCount(count+1);
    }

    function handleDecrement() {
        setCount(count-1);
    }
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

const CounterButtons = ({ onIncrement, onDecrement }) => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
);
