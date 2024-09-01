import React, { useState, useCallback } from 'react';


export function Assignment2() {
    const [inputText, setInputText] = useState('');

    // Your code starts here
    function showAlert() {
        alert(inputText);
    }
    // Your code ends here

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter some text"
            />
            <Alert showAlert={showAlert} />
        </div>
    );
};

function Alert({showAlert}) {
    return <button onClick={showAlert}>Show Alert</button>
}

