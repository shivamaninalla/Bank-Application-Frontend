import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../services/AuthenticationServices";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserByEmail } from "../services/CustomerServices";
import './Login.css';
import validator from "validator";
import { failure } from "../utils/Toast";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const redirection = async (e) => {
    e.preventDefault();

    const email = formRef.current.querySelector("input[type='email']").value;
    const password = formRef.current.querySelector("input[type='password']").value;

    if(!validator.isEmail(email)){
      failure("Please enter valid email")
    }
    

    try {
      const response = await signin(email, password);

      const token = response.headers["authorization"];
      if (token) {
        localStorage.setItem("authToken", token);
      }

      if (response && response.data) {
        const roles = response.data.roles;
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/admin-dashboard");
        } else {
          const user = await getUserByEmail(response.data.email);
          const id = user.userId;
          localStorage.setItem('fullName', user.userName);
          localStorage.setItem('id', id);
          localStorage.setItem('email', user.email);
          navigate(`/user-dashboard/${id}`);
        }
      }
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorType = error.type || "Error";
      const message = error.message || "Error found";
      toast.error(`Error ${statusCode}: ${errorType}: ${message}`);
    }
  };

  return (
    <div className="container">
      <form className="form" ref={formRef}>
        <p className="form-title">Login to your Account</p>
        <div className="input-container">
          <input type="email" placeholder="Enter email" required />
        </div>
        <div className="input-container">
          <input type="password" placeholder="Enter password" required />
        </div>
        <div className="register-link">
          New user? <Link to='/register'>Create an Account</Link>
        </div>
        <button type="submit" className="submit" onClick={redirection}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
