import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";


export const Signin = () => {
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errors, setErrors] = useState({});

    const handlesubmit =(e)=>{
        e.preventDefault();
        let newErrors={};
        if(!email){
          newErrors.email="email is required."
          
        }
        else if(!email.includes("@")||!email.includes(".")){
          newErrors.email="email must have @ / (.)"
          
        }
        if(!password){
          newErrors.password="Password is required"
          
        }
        else if(password.length<3){
          newErrors.password="Password length has to be more than 3"
          
        }
        setErrors(newErrors);

        

    if(Object.keys(newErrors).length===0){
        console.log("sign in ");
        navigate("/Create");}
        
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
           {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
           <label>Enter Password</label><br/>
           <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
           {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
           <button type="submit">Sign in </button>
           <p>Don't have an account?<Link to="/Signup">Signup</Link></p>

        </form></div></div>






    </div>
  )
}

