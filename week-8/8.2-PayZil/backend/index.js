const express = require("express");
const cors = require("cors");

const rootRouter = require("./routes/index");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v2", rootRouter);

app.listen(3000, ()=>{
    console.log(`Listening on PORT ${PORT}`);
})