const express = require("express")
const cors = require("cors")

const app = express()
const userRoute = require("./Routes/user")
const categoryRoute = require("./Routes/Categories/categories")
const transactionRoute = require("./Routes/Transaction/transactions")


require("dotenv").config();

//Fixes cors issues and enables credentials / middleware doesnt seem to be working.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Credentials", "true"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

//Enables the reading and use of json
app.use(express.json())

app.use("/user", userRoute)
app.use("/category", categoryRoute)
app.use("/transaction", transactionRoute)
  
//Configures cors to allow request from nextjs application
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
  }))

app.listen(3001, () =>{
    console.log("Server running on port 3001")
});


