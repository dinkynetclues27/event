import React,{FC,useState,useEffect} from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

interface Userprop{

}
const User:React.FC<Userprop> = () =>{
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [users,setUsers] = useState<string[]>([]);

    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
      }, [token, navigate]);
    return(
        <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar/>
            <div className="col py-3">
             
        
        <div className="container">
            <h2> Users </h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Active</th>

                        <th>Approve</th>
                        <th>Update</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                        <td></td>

                        <td></td>

                        <td></td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
    </div>
    )
}

export default User