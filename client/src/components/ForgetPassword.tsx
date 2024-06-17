import React,{FC,useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
interface Forgetprop{

}
const Forget : React.FC<Forgetprop> = () =>{
    const [Email, setEmail] = useState<string>("");
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        //   const { error } = schema.validate({ Email, Password }, { abortEarly: false });
        //   if (error) throw new Error(error.details[0].message);
          const response = await axios.post("http://localhost:4000/api/user/forget", { Email });
         
          if (response.status === 200) {
            const { token } = response.data;
          }
        } catch (error) {
        //   setError(error.response?.data.error || err.message);
        }
      };
    return(
        <div className="container mt-4">
      <form onSubmit={handleSubmit} className="border p-4">
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
            {/* {error && error.includes("email") && <div className="text-danger">{error}</div>} */}
          </div>
        </div>
        {/* <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Password:</label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              name="password"
            //   value={Password}
            //   onChange={handleChange}
            />
            {/* {error && error.includes("password") && <div className="text-danger">{error}</div>} */}
          {/* </div>
        </div> */} 
        <button type="submit" className="btn btn-primary">
          Reset Link
        </button>
        <br />
        <br />
        <Link to="/">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        </Link>
        {/* <Link to="/register">
          <button type="submit" className="btn btn-primary">
            Don't have account ? Register
          </button>
        </Link> */}
      </form>
    </div>
    )
}   

export default Forget