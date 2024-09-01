//Code a counter in Javascript that should go up as time goes by in intervals of 1 second

let count = 0;

function setTimer(){
    setInterval(function(){
        count++;
        display();
    }, 1000);
}

function display(){
    console.clear();
    console.log("counter : " + count);
}

setTimer();