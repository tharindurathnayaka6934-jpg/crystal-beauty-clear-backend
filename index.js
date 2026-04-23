import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middlewares/auth.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_URL).then(
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