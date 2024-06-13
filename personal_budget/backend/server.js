const express = require("express")
const cors = require("cors")

const app = express()
const userRoute = require("./Routes/user")


require("dotenv").config();

//Enables the reading and use of json
app.use(express.json())

app.use("/user", userRoute)

app.listen(3001, () =>{
    console.log("Server running on port 3001")
});

//Configures cors to allow request from nextjs application
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }))
  app.use(express.json());
