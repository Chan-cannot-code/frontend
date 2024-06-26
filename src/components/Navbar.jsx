import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
 const state = useSelector((state) => state.handleCart);

 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const navigator = useNavigate();

 const token = localStorage.getItem("token");
 const fullname = localStorage.getItem("full_name");

 useEffect(() => {
  if (token) {
   setIsLoggedIn(true);
  }
 }, []);

 const history = useNavigate();

 // You might have a function to check if the user is authenticated
 const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
 };

 const handleDashboardClick = () => {
  if (isAuthenticated()) {
   history("/dashboard");
  } else {
   history("/login");
  }
 };

 // handle logout

 const handleLogout = async () => {
  try {
   let res = await fetch("http://127.0.0.1:8000/api/logout", {
    method: "DELETE",
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   if (res.ok) {
    toast.success("Account logout successful");
    setTimeout(() => {
     localStorage.clear();
     setIsLoggedIn(false);
     navigator("/");
    }, 3000);
   }
  } catch (err) {
   console.log(err);
  }
 };

 return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light py-1 sticky-top">
   <ToastContainer />
   <div className="container d-flex align-items-center">
    <NavLink
     className="navbar-brand fw-bold fs-4 px-2 d-flex align-items-center gap-2"
     to="/"
    >
     <img
      src="/public/favicon.ico"
      style={{ height: "50px", width: "50px" }}
      alt=""
     />
     CarsuMart
    </NavLink>
    <button
     className="navbar-toggler mx-2"
     type="button"
     data-toggle="collapse"
     data-target="#navbarSupportedContent"
     aria-controls="navbarSupportedContent"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
     <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <ul className="navbar-nav m-auto text-center">
      <li className="nav-item d-flex align-items-center">
       <NavLink className="nav-link" to="/">
        Home{" "}
       </NavLink>
      </li>
      <li className="nav-item d-flex align-items-center">
       <NavLink className="nav-link" to="/product">
        Products
       </NavLink>
      </li>
      <li className="nav-item d-flex align-items-center">
       <NavLink className="nav-link" to="/about">
        About
       </NavLink>
      </li>
      <li className="nav-item d-flex align-items-center">
       <NavLink className="nav-link" to="/contact">
        Contact
       </NavLink>
      </li>
      <li
       onClick={handleDashboardClick}
       className="nav-item d-flex align-items-center nav-link cursor-pointer"
      >
       Dashboard
      </li>
     </ul>
     <div className="buttons text-center d-flex align-items-center">
      {isLoggedIn ? (
       <Dropdown className="m-2">
        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
         {fullname}
        </Dropdown.Toggle>
        <Dropdown.Menu>
         <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
       </Dropdown>
      ) : (
       <div>
        <NavLink to="/login" className="btn btn-outline-dark m-2">
         <i className="fa fa-sign-in-alt mr-1"></i> Login
        </NavLink>
        <NavLink to="/register" className="btn btn-outline-dark m-2">
         <i className="fa fa-user-plus mr-1"></i> Register
        </NavLink>
       </div>
      )}
      <NavLink to="/cart" className="btn btn-outline-dark m-2">
       <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}){" "}
      </NavLink>
     </div>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
