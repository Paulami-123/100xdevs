// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be
// ```
// hello world my name is raman
// ```

const fs = require("fs");

function removeSpaces() {
  fs.readFile("./passage.txt", "utf-8", function (err, data) {
    if (err) {
      console.log("ERROR!!! Could not read file.");
    } else {
      console.log("File read successfully.");
      console.log("Contents : ");
      console.log(data);

      let updatedData = data.replace(/\s+/g, " ").trim();
      fs.writeFile("./passage.txt", updatedData, (err) => {
        if (err) {
          console.log("ERROR!!! Could not write to file.");
        } else {
          console.log("Data updation successful.");
        }
      });
    }
  });
}

removeSpaces();
