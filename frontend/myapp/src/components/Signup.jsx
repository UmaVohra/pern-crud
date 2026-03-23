import React from "react";

import { useState } from "react";
import {Link} from "react-router-dom"
export const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("sign up ");
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
        <label>Enter Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Sign Up</button>
        <p>Already have account<Link to="/">SignIn</Link></p>
      </form></div></div>
    
  );
};

