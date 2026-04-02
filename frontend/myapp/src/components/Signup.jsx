import React from "react";

import { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
export const Signup = () => {


const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors]=useState({});


  const handlesubmit = async(e) => {
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
const body={email:email,password:password};
 const res=await fetch("http://localhost:3000/api/auth/signup",{
  method:"POST",headers:
  {
   "Content-type":"application/json",
  },
  body:JSON.stringify(body),
 });
 const resp=await res.json();
 if(!res.ok){
  console.log("error ",resp.error);
  return;
 }
 console.log(resp);
    navigate("/");
}

   
  };
  return (
    
    <div className=/*"container"*/"flex justify-center items-center h-screen bg-gray-900">
     <div className=/*"form-card"*/"p-6 w-96 shadow-lg rounded-md mt-3 bg-gray-800">
      <h1 className=" text-3xl block font-bold text-center text-white">SIGN UP</h1>
     <form onSubmit={handlesubmit} className="text-white">
        <label className="block text-base mt-3 mb-2">Enter Email</label>
        
        <input className="border rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <label className="block text-base mt-3 mb-2">Enter Password</label>
        <input className="border rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}<br/>
        <button className="mt-5 text-blue-50 bg-blue-600 rounded-md hover:bg-transparent hover:text-blue-50 font:semi-bold  py-1 w-full" type="submit">Sign Up</button>
        <p className="font-bold mt-3 text-blue-50 text-center">Already have account <Link to="/">SignIn</Link></p>
      </form></div></div>
    
  );
};

