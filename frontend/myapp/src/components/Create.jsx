import React from 'react'
import { useState } from 'react'

export const Create = () => {
    const [pId,setPid]=useState(0);
    const [pName,setPname]=useState("");
    const [pAge,setPage]=useState(0);
    const [pEmail,setPemail]=useState("");
    const [pPhone,setPphone]=useState(0);
    const [pPlace,setPplace]=useState("");
    
    const createfunction=()=>{
        console.log("created");
    }



    
  return (
    <div> 
        <div className="container">
            <div className="form-card">
        <h1>Enter your Details</h1>
    <form onSubmit={createfunction}>
        <label>Enter Name</label><br/>
           <input type="text" value={pName} onChange={e=>setPname(e.target.value)}></input><br/>
         
           <label>Enter Age</label><br/>
           <input type="number" value={pAge} onChange={e=>setPage(e.target.value)}/><br/>
          
           <label>Enter email id</label><br/>
           <input type="text" value={pEmail} onChange={e=>setPemail(e.target.value)}/><br/>

          <label>Enter phone no</label><br/>
           <input type="number" value={pPhone} onChange={e=>setPphone(e.target.value)}/><br/>

            <label>Enter place</label><br/>
           <input type="text" value={pPlace} onChange={e=>setPplace(e.target.value)}/><br/>




           <button type="submit">Create </button>
           
    </form>
    </div>
    </div>    
    
    
    </div>
  )
}
