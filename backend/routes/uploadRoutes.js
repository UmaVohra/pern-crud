import express from "express"
import multer from "multer"
import { uploadImage } from "../controllers/uploadController.js";

import {verifytoken} from "../middleware/authMiddleware.js";
const router=express.Router();

const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,"uploads/") //null for no error occured
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+" "+file.originalname);

        }
    }
);

export const upload=multer({storage});// creates 'upload' object with file storage details 


router.post("/image",verifytoken,upload.single("image"),uploadImage);
export default router;