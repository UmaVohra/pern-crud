import express from "express"
import multer from "multer"
import { uploadImage } from "../controllers/uploadController.js";
const router=express.Router();

const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,"uploads/")
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+" "+file.originalname);

        }
    }
);

export const upload=multer({storage});// creates 'upload' object with file storage details 


router.post("/image",upload.single("image"),uploadImage);
export default router;