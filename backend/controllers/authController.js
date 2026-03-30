// const createPerson=require('../services/authServices.js');
import { upload } from '../routes/uploadRoutes.js';
import { createPerson , displayPerson,dispPaginated, insertPerson,deletePerson,updatePerson,signinPerson } from '../services/authServices.js';
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
//paginated display
export const pagedisp= async(req,res)=>{
try{
    const page=parseInt(req.query.page)||1; //default pg1 nd limit 5  
    const limit=parseInt(req.query.limit)||5;
    const search=req.query.search||"";
    const age=req.query.age||"";
    const disp=await dispPaginated(page,limit,search,age);

    res.json(disp);


}
catch (err){
    res.status(404).json({error:err.message});
}
}

export const insert=async(req,res)=>{
    try{
        const {name,age,email,phone,place}=req.body;
       //const imageLink = await upload.single()
        const person=await insertPerson(name,age,email,phone,place/*,imageLink*/);
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
        const result=await signinPerson(email,password);
       
         return res.json({message:"login done",token:result.token,user:result.user});
    }
    catch(err){
        res.status(404).json({error:err.message});
    }

}
//module.exports={signup};
