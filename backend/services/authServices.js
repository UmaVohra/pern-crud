// const pool=require("../db");
//signup
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv"
dotenv.config();

export const createPerson= async(email,password)=>{//signup
     const hashedPassword=await bcrypt.hash(password,10);

   // const personExist=await pool.query("select * from person where email=$1",[email]);
   // if(personExist.rows.length>0)
     //   throw new console.error("user already exists");

    //const result=await pool.query("insert into person(email,password)values ($1,$2) returning *",[email,password]);
     const result=await pool.query("insert into person(email,password)values ($1,$2) returning *",[email,hashedPassword]);
    return result.rows[0];
};

export const displayPerson=async()=>{
    const result=await pool.query("select * from person");

    return result.rows;
};

//paginated display
export const dispPaginated=async(page,limit,search,age)=>{
    const offset=(page-1)*limit;

    let query="select * from person where 1=1";

    if(search){
        query+=` and email ilike '%${search}%'`;
    }
    if(age){
        query+=` and age=${age}`;
    }
   
    query+=` limit ${limit} offset ${offset}`;
    console.log(query);


   /* const paginatedresult=await pool.query("select * from person limit $1 offset $2",[limit,offset]);*/
   const paginatedresult=await pool.query(query);
    return paginatedresult.rows;
};





export const insertPerson=async(name,age,email,phone,place,image)=>{
    const result=await pool.query("insert into person(name,age,email,phone,place,image)values ($1,$2,$3,$4,$5,$6) returning *",[name,age,email,phone,place,image]);
    return result.rows[0];
}

export const deletePerson=async(id)=>{
    await pool.query("delete from person where id=$1",[id]);
}

export const updatePerson=async(id,name,age,email,phone,place)=>{
    const result=await pool.query("update person set name=$1,age=$2,email=$3,phone=$4,place=$5 where id=$6 returning *",[name,age,email,phone,place,id]);
    return result.rows[0];
 
}
export const signinPerson=async(email,password)=>{
    const result=await pool.query("select * from person where email=$1",[email]);
    if(result.rows.length===0) throw new Error ("user not found");
    const user=result.rows[0];
    const valid=await bcrypt.compare(password,user.password);
    if(!valid ) throw new Error("passwords not matching");

    //generate token
    const token = jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
    console.log("token",token);
    return {token,user:{email:user.email}};//returning an object
}


// module.exports={createPerson};