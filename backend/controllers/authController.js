// const createPerson=require('../services/authServices.js');
import { createPerson , displayPerson, insertPerson,deletePerson,updatePerson,signinPerson } from '../services/authServices.js';
//controller function for sign up
 export const signup= async(req,res)=>{
    try{
         console.log("body",req.body);
        const {email,password}=req.body;
       const person=await createPerson(email,password);
       res.json({message:"sign up successful",person});
    }
    catch(err){
        console.log(err.message);
         res.status(500).json({ error: err.message });


    }
}
export const display=async(req,res)=>{
    try{
        const show=await displayPerson();
        res.json({message:"showing persons stored",show});
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
}

export const insert=async(req,res)=>{
    try{
        const {name,age,email,phone,place}=req.body;
        const person=await insertPerson(name,age,email,phone,place);
        res.json({message:"insert successful",person});
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
}
export const deleteperson=async(req,res)=>{
    try{
        const {id}=req.params;
        await deletePerson(id);
        res.json({message:"delete successful"});


    }

    catch(err){
        res.status(404).json({error:err.message});
    }

}

export const update=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,age,email,phone,place}=req.body;
        const updt=await updatePerson(id,name,age,email,phone,place);
        res.json({message:"updated successfully",updt});
    }
    catch(err){
        res.status(404).json({error:err.message});
    }
}
export const signin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const result=await signinPerson(email);
        if (!result){
          return res.status(404).json({message:"person not found"});
        }
        if (result.password!==password){
            return res.status(401).json({message:"invalid password"});
        }
         return res.json({message:"login done",result});
    }
    catch(err){
        res.status(404).json({error:err.message});
    }

}
//module.exports={signup};
