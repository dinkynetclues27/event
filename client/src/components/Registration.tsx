// import React,{FC,useEffect,useState} from "react";
// import {Link,useNavigate} from 'react-router-dom'
// import Joi from "joi";
// import axios from "axios";

// interface RegistrationProps{}
// const Registration: React.FC<RegistrationProps> = () =>{
//     const [Email, setEmail] = useState<string>("");
//     const [Password, setPassword] = useState<string>("");
//     const [Name,setName] = useState<string>("");
//     const [Mobile_No,setMobile_No] = useState<string>("");
//     const [Gender, setGender] = useState<string>("male");
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (name === "email") setEmail(value);
//         if (name === "password") setPassword(value);
//         if (name === 'name') setName(value);
//         if (name === 'mobile') setMobile_No(value);
//         if (name === "gender") setGender(value);
//       };

      
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//     //   const { error } = schema.validate({ Email, Password }, { abortEarly: false });
//     //   if (error) throw new Error(error.details[0].message);
//       const response = await axios.post("http://localhost:4000/api/user/register", { Name ,Email, Password,Mobile_No,Gender });
     
//       navigate('/')
//     } catch (error) {
//     //   setError(error.response?.data.error || err.message);
//     }
//   };
//     return(
//         <div className="container mt-4">
//         <form onSubmit={handleSubmit} className="border p-4">
//         <div className="row mb-3">
//             <label className="col-sm-2 col-form-label">Name: </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="name"
//                 value={Name}
//                 onChange={handleChange}
//               />
//               {error && error.includes("name") && <div className="text-danger">{error}</div>}
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-2 col-form-label">Email: </label>
//             <div className="col-sm-10">
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={Email}
//                 onChange={handleChange}
//               />
//               {error && error.includes("email") && <div className="text-danger">{error}</div>}
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-2 col-form-label">Password:</label>
//             <div className="col-sm-10">
//               <input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={Password}
//                 onChange={handleChange}
//               />
//               {error && error.includes("password") && <div className="text-danger">{error}</div>}
//             </div>
//           </div>
//           <div className="row mb-3">
//             <label className="col-sm-2 col-form-label">Mobile Number: </label>
//             <div className="col-sm-10">
//               <input
//                 type="text"
//                 className="form-control"
//                 name="mobile"
//                 value={Mobile_No}
//                 onChange={handleChange}
//               />
//               {error && error.includes("mobile") && <div className="text-danger">{error}</div>}
//             </div>
//           </div>
//           <div className="row mb-3">
//           <label className="col-sm-2 col-form-label">Gender:</label>
//           <div className="col-sm-10">
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="gender"
//                 value="Male"
//                 checked={Gender === "Male"}
//                 onChange={handleChange}
//               />
//               <label className="form-check-label">Male</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="gender"
//                 value="Female"
//                 checked={Gender === "Female"}
//                 onChange={handleChange}
//               />
//               <label className="form-check-label">Female</label>
//             </div>
//           </div>
//         </div>
//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//           <br />
//           <br />
//           {/* <Link to="/register">
//             <button type="submit" className="btn btn-primary">
//               Don't have account ? Register
//             </button>
//           </Link> */}
//         </form>
//       </div>

//     )
// }

// export default Registration


import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Mobile_No, setMobile_No] = useState("");
  const [Gender, setGender] = useState("Male"); 
  const [error, setError] = useState<string | null>(null); 
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "mobile") setMobile_No(value);
    if (name === "gender") setGender(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/user/register", {
        Name,
        Email,
        Password,
        Mobile_No,
        Gender,
      });
      console.log(response.data); 
      setSuccess("Registration successful");
      setError(null);
      navigate('/'); 
    } catch (error:any) {
      if (error.response) {
        
        console.error('Error response:', error.response.data);
        setError(error.response.data.error || "Server Error");
      } else if (error.request) {
        
        console.error('No response received:', error.request);
        setError("No response from server");
      } else {
       
        console.error('Error setting up request:', error.message);
        setError(error.message);
      }
      setSuccess(null);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="border p-4">
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Name: </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="name"
              value={Name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Email: </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              name="email"
              value={Email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Password:</label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              name="password"
              value={Password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Mobile Number: </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="mobile"
              value={Mobile_No}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Gender:</label>
          <div className="col-sm-10">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Male"
                checked={Gender === "Male"}
                onChange={handleChange}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="Female"
                checked={Gender === "Female"}
                onChange={handleChange}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
