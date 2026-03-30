import express from "express"
import {signup,display,pagedisp,insert,deleteperson,update,signin} from "../controllers/authController.js"

import {verifytoken} from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/signup",signup); //signup route
router.get("/disp",verifytoken,display); //display
router.post("/insert",insert);//insert( now in upload controller)
router.delete("/delete/:id",verifytoken,deleteperson);//delete
router.put("/update/:id",verifytoken,update);//update 
router.post("/signin",signin);//signin

//paginated dispaly
router.get("/display",verifytoken,pagedisp);


export default router;