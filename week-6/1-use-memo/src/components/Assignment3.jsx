import React, { useState, useMemo } from 'react';


export const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        // Add more items as needed
    ]);

    // Your code starts here
    const totalValue = useMemo(()=>{
        let amount = 0;
        items.map(item => {
            amount+=item.value;
        });
        return amount;
    }, [items]);
    // Your code ends here

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: ${totalValue}</p>
        </div>
    );
};
