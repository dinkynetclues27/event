
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import Joi from "joi";
import axios from "axios";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); 
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const schema = Joi.object({
    Email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required",
      }),
    Password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one special character, one digit, and be at least 6 characters long',
    }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = schema.validate({ Email, Password }, { abortEarly: false });
      if (error) throw new Error(error.details[0].message);
      const response = await axios.post("http://localhost:4000/api/user/login", { Email, Password });
     
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setSuccess("Login Successfully")
        console.log("Login successfully");
        if (Email === "admin@gmail.com") {
          navigate("/home");
        } else {
          navigate("/userhome");
        }
      }
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
    <div>
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
            {error && error.includes("email") && <div className="text-danger">{error}</div>}
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
            {error && error.includes("password") && <div className="text-danger">{error}</div>}
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <br />
        <br />
        <Link to="/forget">
        <button type="submit" className="btn btn-primary">
          Forget password
        </button>
        </Link>
        <Link to="/register">
          <button type="submit" className="btn btn-primary">
            Don't have account ? Register
          </button>
        </Link>
      </form>
    </div>
    </div>
  );
};

export default Login;
