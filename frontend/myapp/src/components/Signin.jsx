import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";


export const Signin = () => {
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handlesubmit =(e)=>{
        e.preventDefault();
        console.log("sign in ");
        navigate("/Create");
        
    }
  return (
    <div>
          <div className="container">
            <div className="form-card">
        <h1>SIGN IN</h1>

        <form onSubmit={handlesubmit}>
           <label>
            Enter Email
           </label><br/>
           <input type="text" value={email} onChange={e=>setEmail(e.target.value)}></input><br/>
           <label>Enter Password</label><br/>
           <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
           <button type="submit">Sign in </button>
           <p>Don't have an account?<Link to="/Signup">Signup</Link></p>

        </form></div></div>






    </div>
  )
}

