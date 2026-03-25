// const pool=require("../db");
//signup
import { pool } from "../db.js";
export const createPerson= async(email,password)=>{//signup

   // const personExist=await pool.query("select * from person where email=$1",[email]);
   // if(personExist.rows.length>0)
     //   throw new console.error("user already exists");

    const result=await pool.query("insert into person(email,password)values ($1,$2) returning *",[email,password]);
     
    return result.rows[0];
};

export const displayPerson=async()=>{
    const result=await pool.query("select * from person");

    return result.rows;
}

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
export const signinPerson=async(email)=>{
    const result=await pool.query("select * from person where email=$1",[email]);
    return result.rows[0];
}


// module.exports={createPerson};