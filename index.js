import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"; 

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({limit:"30mb", extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}));
app.use(cors())
const url = 'mongodb://localhost:27017/memoriesMern'; 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port,()=> console.log(`App is running on port ${port}`)))
    .catch(err => {
        console.error("Connection error", err);
    });

app.use("/posts",postRoutes);    



