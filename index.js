import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"; 
import dotenv from "dotenv"

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}));
app.use(cors())
app.use("/posts",postRoutes);    
const url = process.env.CONNECTING_URL ; 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port,()=> console.log(`App is running on port ${port}`)))
    .catch(err => {
        console.error("Connection error", err);
    });




