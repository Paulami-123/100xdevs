//Without using setInterval, try to code a counter in Javascript. (Hint : setTimeout)

let count = 0;

function setTimer(){
    setTimeout(function(){
        count++;
        displayTime();
    }, 1000);
}

function displayTime(){
    setTimer();
    console.clear();
    console.log("counter : " + count);
}

// while(true){
//     displayTime();
// }
displayTime();