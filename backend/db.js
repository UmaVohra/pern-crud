// const {Pool}=require("pg");
import { Pool } from "pg";
export const pool=new Pool({
    user:"postgres",
    password:"1234",
    host:"localhost",
    port:5432,
    database:"person_db"
});

// module.exports=pool;

