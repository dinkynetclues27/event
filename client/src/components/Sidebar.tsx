import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a href="#" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li className="nav-item">
            <a href="/home" className="nav-link align-middle px-0 text-white">
              <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
            </a>
          </li>
          <li>
            {/* <a href="/product" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Product</span> </a> */}
            <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
            <li className="w-100">
                <a href="/user" className="nav-link px-0"> <span className="d-none d-sm-inline text-white">User</span> </a>
              </li>
              <li className="w-100">
                <a href="/event" className="nav-link px-0 text-white"> <span className="d-none d-sm-inline text-white">Event</span> </a>
              </li>
              {/* <li>
                <a href="#" className="nav-link px-0 text-white"> <span className="d-none d-sm-inline text-white">Item</span> 2 </a>
              </li> */}
            </ul>
          </li>
          {/* Add other menu items here */}
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            {/* <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" /> */}
            <span className="d-none d-sm-inline mx-1">Admin</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            {/* <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li> */}
            {/* <li>
              <hr className="dropdown-divider" />
            </li> */}
            <li><a className="dropdown-item" href="#" onClick={handleLogout}>Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;