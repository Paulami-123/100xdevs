// Make a clock that updates every second, and shows time in the following formats - 
//  - HH:MM::SS (Eg. 13:45:23)
//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

let hrs = 0;
let min = 0;
let sec = 0;

function setTimer(fnToCall){
    setInterval(()=>{
        hrs = new Date().getHours();
        min = new Date().getMinutes();
        sec = new Date().getSeconds();
        fnToCall();
    }, 1000);
}

function time12hrs(){
    let ap = ""
    if(hrs>12){
        hrs = hrs-12;
        ap += "PM";
    }
    else{
        ap += "AM";
    }
    let time = `${hrs.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')} ${ap}`;
    console.clear();
    console.log(time);
}

function time24hrs(){
    let time = `${hrs.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')} Hrs`;
    console.clear();
    console.log(time);
}

setTimer(time24hrs);