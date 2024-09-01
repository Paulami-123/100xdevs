// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 

const fs = require("fs");


function product(a, b){
    for(let i=0; i<=b; i++){
        let p = a*i;
    }
    console.log("-------------------------");
    console.log();
    console.log("Expensive operation complete.");
    console.log();
    console.log("-------------------------");
}

function read(){
    fs.readFile("../a.txt", "utf-8", function(err, data){
        if(err){
            console.log("Failed to read file.");
        }
        else{
            console.log(data);
        }
    });

    
// Try to do an expensive operation below the file read and see how it affects the output. 

    console.log();
    console.log("Reading from file:");
    console.log();

// Make the expensive operation more and more expensive and see how it affects the output. 
    
    //Sync funtion

    /*If the expensive operation is synchronous then readfile will wait till the operation is complete 
    no matter how time consuming the operation is.*/

    product(3, 1000000000);

    //Async function

    /*In case of an async expensive operation, the operations are executed ain order of completion*/
    setTimeout(()=>{
        console.log("-------------------------");
        console.log();
        console.log("Expensive operation complete.");
        console.log();
        console.log("-------------------------");
    }, 10000)
    
}


read();




