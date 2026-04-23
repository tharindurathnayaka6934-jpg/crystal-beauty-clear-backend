import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

export function saveUser(req,res){

    if(req.body.role=="admin"){
        if(req.user==null){
            res.status(403).json({
                message:"Please login as admin before creating an admin account"
            });
            return;
        }
        if(req.user.role!="admin"){
            res.status(403).json({
                message:"You  are not authorized create an admin accoint"
            });
            return;
        }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password , 10)

    const user = new User({
        email : req.body.email,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : hashedPassword,
        role : req.body.role,
    });



    user.save().then(()=>{
        res.json({
            message : "user saved successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message: "User saved unsuccessful"
        })
    })

}

export function loginUser(req,res){
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({
        email:email
    }).then((user)=>{
        if(user==null){
            res.status(404).json({
                message:"Invalid email"
            })
        }else{
            const isPasswordCorrect=bcrypt.compareSync(password,user.password)
            if(isPasswordCorrect){

                const userData = {
                    email:user.email,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    role:user.role,
                    phone:user.phone,
                    isDisable:user.isDisable,
                    isEmailVerified:user.isEmailVerified
                }

                const token = jwt.sign(userData,process.env.JWT_KEY)

                res.json({
                    message: "Login successful",
                    token:token,
                })
                
            }else{
                res.status(403).json({
                    message:"Invalid password"
                })
            }
        }
    })
}