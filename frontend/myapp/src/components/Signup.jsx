import React, { use } from "react";

import { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
export const Signup = () => {


const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors]=useState({});


  const handlesubmit = (e) => {
    e.preventDefault();
    let newErrors={};
   
if(!email){
  newErrors.email="Email is required"
}
else if(!email.includes("@")||!email.includes(".")){
  newErrors.email="@ / (.) is missing"
}
if(!password){
  newErrors.password="Password is required"
}
else if(password.length<3){
  newErrors.password="Password length has to be more than 3"
}

setErrors(newErrors);


if(Object.keys(newErrors).length===0){
 console.log("sign up ");
    navigate("/");
}

   
  };
  return (
    
    <div className="container">
     <div className="form-card">
      <h1>SIGN UP</h1>
     <form onSubmit={handlesubmit}>
        <label>Enter Email</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <label>Enter Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}<br/>
        <button type="submit">Sign Up</button>
        <p>Already have account<Link to="/">SignIn</Link></p>
      </form></div></div>
    
  );
};

