import express from "express"
import {signup,display,insert,deleteperson,update,signin} from "../controllers/authController.js"

const router=express.Router();

router.post("/signup",signup); //signup route
router.get("/disp",display); //display
router.post("/insert",insert);//insert
router.delete("/delete/:id",deleteperson);//delete
router.put("/update/:id",update);//update 
router.post("/signin",signin);//signin


export default router;