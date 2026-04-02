import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

export const Create = () => {
  const [file, setFile] = useState(null);
  const [pId, setPid] = useState(0);
  const [pName, setPname] = useState("");
  const [pAge, setPage] = useState(0);
  const [pEmail, setPemail] = useState("");
  const [pPhone, setPphone] = useState(0);
  const [pPlace, setPplace] = useState("");

  const [errors, setErrors] = useState({});

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const [page, setpage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [search, setSearch] = useState(""); //search
  const [age, setAge] = useState(""); //filter

  const debouncedSearch = useDebounce(search, 500);
  const debouncedAge = useDebounce(age, 500);

  const token = localStorage.getItem("token");
  //delete

  const delperson = async (id) => {
    // setEditId(id);
    //console.log(editId);

    const persondel = data.find((prsn) => prsn.id === id);
    console.log(persondel);
    const res = await fetch(
      `http://localhost:3000/api/auth/delete/${persondel.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    displayPersons();
  };

  //edit function
  const edit = (id) => {
    //debugger;
    const person = data.find((user) => user.id === id);
    console.log(person);

    setEditId(id);
    setPname(person.name);
    setPage(person.age);
    setPemail(person.email);
    setPphone(person.phone);
    setPplace(person.place);
    setExistingImage(person.image);
  };

  useEffect(() => {
    displayPersons();
  }, [page, limit, debouncedSearch, debouncedAge]);

  const displayPersons = async () => {
    try {
      /*const res= await fetch("http://localhost:3000/api/auth/disp",{
      method:"GET",headers:{
        Authorization:`Bearer ${token}`,
      }
    });
    //debugger;
    const result=await res.json();
    console.log(typeof result);
   // console.log(typeof result.show);
    setData(result.show);
  */

      //paginated disp

      const res = await fetch(
        `http://localhost:3000/api/auth/display/?page=${page}&limit=${limit}&search=${debouncedSearch}&age=${debouncedAge?Number(debouncedAge):""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      if (result.length === 0) {
      }
      console.log(result);
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const createfunction = async (e) => {
    e.preventDefault();
    {
      /* if (!file) {
      alert("Please select an image");
      return;
    }*/
    }
    if (editId) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/auth/update/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: pName,
              age: pAge,
              email: pEmail,
              phone: pPhone,
              place: pPlace,
            }),
          },
        );
        const data = await res.json();
        console.log(data);
        displayPersons();
      } catch (err) {
        console.log(err.message);
      }
      setPname("");
      setPage("");
      setPemail("");
      setPphone("");
      setPplace("");
    } else {
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
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
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
    }
  };

  return (
    <div>
      
      <div className=/*"show-container"*/"flex flex-col justify-center items-center min-h-screen gap-8 p-6  bg-gray-900">
        <div className=/*"create-form-card"*/"p-6 w-96 shadow-lg rounded-md mt-3 bg-gray-800">
          <h1 className="font-bold text-3xl text-center text-blue-50">Enter your Details</h1>
          <form onSubmit={createfunction} className="text-white">
            <label className="block text-base mt-3 mb-2">IMAGE</label>
            <input  className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 " type="file" onChange={handleFileChange} />

            {existingImage && !file && <p>Selected file: {existingImage}</p>}<br/>

            <label className="block text-base mt-3 mb-2">Enter Name</label>
            
            <input className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
              type="text"
              value={pName}
              onChange={(e) => setPname(e.target.value)}
            ></input>
            <br />

            <label className="block text-base mt-3 mb-2">Enter Age</label>
            
            <input className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
              type="number"
              value={pAge}
              onChange={(e) => setPage(e.target.value)}
            />
            <br />

            <label className="block text-base mt-3 mb-2">Enter email id</label>
            
            <input className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
              type="text"
              value={pEmail}
              onChange={(e) => setPemail(e.target.value)}
            />
            <br />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <label className="block text-base mt-3 mb-2">Enter phone no</label>
            
            <input className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
              type="number"
              value={pPhone}
              onChange={(e) => setPphone(e.target.value)}
            />
            <br />

            <label className="block text-base mt-3 mb-2">Enter place</label>
            
            <input className="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 "
              type="text"
              value={pPlace}
              onChange={(e) => setPplace(e.target.value)}
            />
            <br />
            <button className="bg-blue-600 py-1 px-1 mt-3 rounded w-full text-blue-50  hover:bg-transparent font-semibold hover:text-blue-50" type="submit">Create </button>
          </form>
        </div>
<div className="flex gap-4 mb-5">  
  <label className="text-white text-4xl flex-1">Search</label>
        <input 
          className="border border-gray-500 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="search by email"
          onChange={(e) => {
            setSearch(e.target.value);
            setpage(1);
          }}
          value={search}
        ></input> 
         <label className="text-white text-4xl flex-1">Filter</label>

        <input
           className="border  border-gray-500 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="filter by age"
          onChange={(e) => {
            setAge(e.target.value);
            setpage(1);
          }}
          value={age}
        ></input>
        </div>
     {data.length===0 /*&& (search||age)*/?(<h1 style={{color:"white"}}>No user found</h1>):(
        <div className="table">
          <h1 className="font-semibold text-white text-3xl text-center"/*id="tableheading"*/>Person stored are these:</h1><br/>
          <table className="table-fixed rounded-xl w-full text-white border-t-blue-100 bg-gray-800 h-5"> 
            <thead>
              <tr>
                <th className="p-3 text-left">name</th>
                <th className="p-3">age</th>
                <th className="p-3 text-left">email</th>
                <th className="p-3 text-left">phone</th>
                <th className="p-3 text-left">place</th>
                <th className="p-3 text-left">image</th>
                <th colSpan={2} className="text-center">Choose Action</th>
                
              </tr>
            </thead>

            <tbody>
              {data.map((prsn) => (
                <tr key={prsn.id} className="border-t hover:bg-gray-500">
                  <td className="p-3">{prsn.name}</td>
                  <td className="p-3 text-center">{prsn.age}</td>
                  <td className="p-3">{prsn.email}</td>
                  <td className="p-3">{prsn.phone}</td>
                  <td className="p-3">{prsn.place}</td>
                  <td>
                    <img src={prsn.image}className="w-10 h-10 rounded object-cover" width={60}></img>
                  </td>
                  <td className="p-3">
                    <button className="text-yellow-300 mr-2 font-bold hover:underline text-center" onClick={() => edit(prsn.id)}>Edit</button>
                  </td>
                  <td className="p-3">
                    {" "}
                    <button className="text-red-500 font-bold hover:underline text-center " onClick={() => delperson(prsn.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        
          <button   className="px-4 py-2 bg-blue-600 text-white rounded 
             disabled:bg-gray-400 disabled:cursor-not-allowed mr-3  disabled:text-black"
            disabled={page === 1}
            style={{ width: 90 }}
            onClick={() => setpage(page - 1)}
          >
            previous
          </button>
          <button   className="px-4 py-2 bg-blue-600 text-white rounded 
             disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed mr-2"
            disabled={data.length < limit}
            style={{ width: 90 }}
            onClick={() => setpage(page + 1)}
          >
            next
          </button>
          <select className="border border-gray-600 text-white bg-gray-800 p-2 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setLimit(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div> )}  {/*/)}*/}
      </div>
    </div>
  );
};
