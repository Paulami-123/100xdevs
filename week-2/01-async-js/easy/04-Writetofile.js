// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

async function write(){
    fs.readFile("../content.txt", "utf-8", function(err, data){
        if(err){
            console.log("Could not retrieve content");
        }
        else{
            fs.writeFile("../a.txt", "\n\n" + data, {flag: 'a+'}, (err)=>{
                if(err){
                    console.log("Failed to write to file");
                }
                else{
                    console.log("Writing successful");
                }
            });
        }
    });
}

write();

//How to copy content of a file in a variable?