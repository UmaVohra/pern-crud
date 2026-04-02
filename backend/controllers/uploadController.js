import { insertPerson } from "../services/authServices.js";

export const uploadImage=async (req,res)=>{
    try{
         console.log("BODY:", req.body);
        const {name,age,email,phone,place}=req.body;

        const baseurl=`${req.protocol}://${req.get("host")}`;

       // const image=req.file?req.file.filename:null;
       const image=req.file?`${baseurl}/uploads/${req.file.filename}`:null;

        const person= await insertPerson(name,age,email,phone,place,image);
       res.json({
            message:"image uploaded & data inserted ",
            file:req.file ,//req.file stores the 1 image file 
            person
        });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};