const pool=require("../db");

//signup
const createPerson= async(email,password)=>{
    const personExist=await pool.query("select * from person where email=$1",[email]);
    if(personExist.rows.length>0)
        throw new console.error("user already exists");

    const result=await pool.query("insert into person(email,password)values ($1,$2) returning *");
     
    return result.rows[0];
};

module.exports={createPerson};