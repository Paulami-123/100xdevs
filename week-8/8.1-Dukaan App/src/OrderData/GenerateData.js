const orders = [];


for(let i=0; i<20; i++){
    // console.log(amt);
    let obj = {
        id : Math.round(Math.random()*Math.pow(10, 6)),
        status : getStatus(),
        transactionId : Math.round(Math.random()*Math.pow(10, 12)),
        refundDate : `${getDate()}`,
        amount : `₹ ${getAmount()}`
    }
    orders.push(obj);
}

function getStatus(){
    const status = ["Successful", "Processing", "Failed"];
    let idx = Math.round(Math.random()*2);
    return status[idx];
}

function getDate(){
    let start = new Date(2001, 0, 1);
    let end = new Date();
    let str = String(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())));
    let date = str.substring(4, 15);
    let time = str.substring(16, 24);
    str = date + ", " + time;
    return str;
}

function getAmount(){
    let amt = Math.round(Math.random()*Math.pow(10, 4));
    let amtString = amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return amtString;
}

function generateData(){
    console.log("[");
    for(let i=0; i<orders.length; i++){
        console.log(orders[i]);
        process.stdout.write(", ");
        console.log();
    }
    console.log("]");
}

generateData();