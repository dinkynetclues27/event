import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword: React.FC = () => {
  const [Email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/user/forgetpassword', { Email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="border p-4">
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Email: </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              value={Email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
        {message && <div className="mt-3">{message}</div>}
      </form>
    </div>
  );
};

export default ForgetPassword;
