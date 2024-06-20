import React, {useContext,useEffect} from "react";
import {Link, useNavigate } from "react-router-dom";

const Navigate = () => {
    const navigate = useNavigate();
        return(
            <ul className="nav nav-pills bg-info position-fixed" style={{ top:0,width: "100%", zIndex: 1000}}>
            <div className="d-flex gap-4">


      <div className="d-flex justify-content-center align-items-center gap-4">
         <li className="nav-item">
    <a className="nav-link text-dark" href="/">Home</a>
  </li>
        <li className="nav-item">
    <a className="nav-link text-dark" href="/cart">Events</a>
  </li>
 
 </div>
 </div>
 </ul>
        )
}

export default Navigate;