export const uploadImage=(req,res)=>{
    try{
        
       res.json({
            message:"image uploaded",
            file:req.file //req.file stores the 1 image file 

        });
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};