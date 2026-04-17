import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middlewares/auth.js';
import orderRouter from './routes/orderRouter.js';

const app = express();

mongoose.connect("mongodb://adminTharindu:123abc@ac-17ph1vk-shard-00-00.40i1k8g.mongodb.net:27017,ac-17ph1vk-shard-00-01.40i1k8g.mongodb.net:27017,ac-17ph1vk-shard-00-02.40i1k8g.mongodb.net:27017/?ssl=true&replicaSet=atlas-7a71gq-shard-0&authSource=admin&appName=Cluster0").then(
    () =>{
        console.log("Connect to the database");
    }
).catch(
    (err) =>{
        console.log("Connection failed",err);
    }
);

app.use(bodyParser.json());
app.use(verifyJWT);

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})