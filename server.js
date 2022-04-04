require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors=require("cors");

//Establish Mongo DB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

//Use json middleware
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions)) 
 app.use(express.json());

//create routers
const authRouter = require("./routes/auth");
const moviesRouter = require("./routes/movies");

//setup the routes
app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);


app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));