import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const Create = () => {
  const [file, setFile] = useState(null);
  const [pId, setPid] = useState(0);
  const [pName, setPname] = useState("");
  const [pAge, setPage] = useState(0);
  const [pEmail, setPemail] = useState("");
  const [pPhone, setPphone] = useState(0);
  const [pPlace, setPplace] = useState("");

  const [errors, setErrors] = useState({});

  const [data,setData]=useState([]);
const [editId, setEditId] = useState(null);
  const [existingImage,setExistingImage]=useState("");



  const token=localStorage.getItem("token");
//delete

const delperson= async (id)=>{
 // setEditId(id);
  //console.log(editId);

 const persondel=data.find(prsn=>prsn.id===id);
console.log(persondel);
 const res= await fetch(`http://localhost:3000/api/auth/delete/${persondel.id}`,{
  method:"DELETE",headers:{
    Authorization:`Bearer ${token}`,

  }
 });

displayPersons();
}






//edit function
const edit=(id)=>{
  //debugger;
  const person=data.find(user=>user.id===id);
  console.log(person);

  setEditId(id);
  setPname(person.name);
  setPage(person.age);
  setPemail(person.email);
  setPphone(person.phone);
  setPplace(person.place);
  setExistingImage(person.image);


 

}

  useEffect(()=>{
    displayPersons();
  },[]);

const displayPersons=async()=>{
  try{
    const res= await fetch("http://localhost:3000/api/auth/disp",{
      method:"GET",headers:{
        Authorization:`Bearer ${token}`,
      }
    });
    //debugger;
    const result=await res.json();
    console.log(typeof result);
   // console.log(typeof result.show);
    setData(result.show);

  }
  catch(err){
    console.log(err);
  }
}



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const createfunction = async (e) => {
    e.preventDefault();
  {/* if (!file) {
      alert("Please select an image");
      return;
    }*/} 
    if(editId){
      try{
        const res=await fetch(`http://localhost:3000/api/auth/update/${editId}`,{
          method:"PUT",
            headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`,
      
    }, body: JSON.stringify({
      name: pName,
      age: pAge,
      email: pEmail,
      phone: pPhone,
      place: pPlace,
    })
        })
       const data = await res.json();
      console.log(data);
      displayPersons();
      }catch(err){
        console.log(err.message);
      }
    }
 else{
    const formData = new FormData(); //special js object to store file+text data
    formData.append("name", pName);
    formData.append("age", pAge);
    formData.append("email", pEmail);
    formData.append("phone", pPhone);
    formData.append("place", pPlace);
    formData.append("image", file);

    let newErrors = {};
    if (!pEmail) {
      newErrors.email = "email is required.";
    } else if (!pEmail.includes("@") || !pEmail.includes(".")) {
      newErrors.email = "email must have @ / (.)";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("created");
    }

    try {
      const res = await fetch("http://localhost:3000/api/upload/image", {
        method: "POST",headers:{
        Authorization:`Bearer ${token}`,
      },
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      displayPersons();
    } catch (err) {
      console.log(err);
    }

    setPname("");
    setPage("");
    setPemail("");
    setPphone("");
    setPplace("");
    setFile(null);
  }};

  return (
    <div>
      <div className="show-container">
        <div className="create-form-card">
          <h1>Enter your Details</h1>
          <form onSubmit={createfunction}>
            <label>IMAGE</label>
            <input type="file" onChange={handleFileChange} />
           
            {existingImage && !file && 
            <p>Selected file: {existingImage}</p>
            }

            <label>Enter Name</label>
            <br />
            <input
              type="text"
              value={pName}
              onChange={(e) => setPname(e.target.value)}
            ></input>
            <br />

            <label>Enter Age</label>
            <br />
            <input
              type="number"
              value={pAge}
              onChange={(e) => setPage(e.target.value)}
            />
            <br />

            <label>Enter email id</label>
            <br />
            <input
              type="text"
              value={pEmail}
              onChange={(e) => setPemail(e.target.value)}
            />
            <br />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <label>Enter phone no</label>
            <br />
            <input
              type="number"
              value={pPhone}
              onChange={(e) => setPphone(e.target.value)}
            />
            <br />

            <label>Enter place</label>
            <br />
            <input
              type="text"
              value={pPlace}
              onChange={(e) => setPplace(e.target.value)}
            />
            <br />
            <button type="submit">Create </button>
          </form>
        </div>
        <div className="table">
          <h1 id="tableheading">person stored are these</h1>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>age</th>
                <th>email</th>
                <th>phone</th>
                <th>place</th>
                <th>image</th>
              </tr>
            </thead><tbody>
             {data.map((prsn)=>(<tr key={prsn.id}>
              <td>{prsn.name}</td>
              <td>{prsn.age}</td>
              <td>{prsn.email}</td>
              <td>{prsn.phone}</td>
              <td>{prsn.place}</td>
              <td><img src={`http://localhost:3000/uploads/${prsn.image}`}width={60}></img></td>
              <td><button onClick={()=>edit(prsn.id)}>Edit</button></td>
              <td> <button onClick={()=>delperson(prsn.id)}>Delete</button></td>
             </tr>

             ))}

            </tbody>
          </table>
        </div>
        
      </div>
      

    </div>
  );
};
