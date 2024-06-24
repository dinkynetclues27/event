import React, { FC, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Userprop {}

const User: FC<Userprop> = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUsers();
    }
  }, [token, navigate]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user", {
        headers: {
          Authorization: `${token}`,
        },
      }); 
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      
    }
  };

  const handleUpdateClick = (user: any) => {
    setSelectedUser(user);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/api/user/${selectedUser.id}`, {
        Status: selectedUser.Status,
        Request: selectedUser.Request,
      });
      setSelectedUser(null);
      getUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${id}`);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col py-3">
          <div className="container">
            <h2>Users</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Status</th>
                  <th>Request</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Mobile_No}</td>
                    <td>{user.Status}</td>
                    <td>{user.Request}</td>
                    <td>  <button style={{color:"black",backgroundColor:"white"}} onClick={() => handleUpdateClick(user)}>
                        Update
                      </button></td>
                    <td>
                      <button style={{color:"black",backgroundColor:"white"}} onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedUser && (
              <div className="update-form">
                <h3>Update User</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label>Status</label>
                    <select
                      name="Status"
                      value={selectedUser.Status}
                      onChange={handleFormChange}
                      className="form-control"
                    >
                      <option value="active">Active</option>
                      <option value="deactive">Deactive</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Request</label>
                    <select
                      name="Request"
                      value={selectedUser.Request}
                      onChange={handleFormChange}
                      className="form-control"
                    >
                      <option value="pending">Pending</option>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
