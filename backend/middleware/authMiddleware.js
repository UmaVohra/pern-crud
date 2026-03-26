import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

export const verifytoken= (req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];//for accesing token

    if(!token){
        return res.status(404).json({error:"access denied"});
    }
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;//store the verified user
        next();
    }catch(err){
        res.status(403).json({error:"invalid token"});

    }
};