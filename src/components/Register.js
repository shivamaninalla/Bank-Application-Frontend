import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/AuthenticationServices";
import './Register.css';
import 'react-toastify/dist/ReactToastify.css';
import { success,failure } from "../utils/Toast";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const name = formRef.current.querySelector("input[name='firstName']").value;
    const email = formRef.current.querySelector("input[name='email']").value;
    const password = formRef.current.querySelector("input[name='password']").value;
    const admin = formRef.current.querySelector("input[name='isAdmin']").checked;

    try {
      const response=await signup({ name, email, password, admin });
      if(response){
        success("Registration completed Successfully");
      formRef.current.reset();
      setTimeout(()=>{
        navigate('/');
      },8000)
      }
      
    } catch (error) {
      failure("Registration failed. Please try again.");
      console.error("Registration failed", error.message);
    }



  };

  return (
    <div className="register-container">
      <form className="register-form" ref={formRef} onSubmit={handleRegistration}>
        <p className="register-form-title">Register</p>
        <div className="register-input-container">
          <input type="text" name="firstName" placeholder="Enter name" required />
        </div>
        <div className="register-input-container">
          <input type="email" name="email" placeholder="Enter email" required />
        </div>
        <div className="register-input-container">
          <input type="password" name="password" placeholder="Enter password" required />
        </div>
        <div className="register-checkbox-container">
          <input type="checkbox" name="isAdmin" />
          <label>Admin</label>
        </div>
        <button type="submit" className="register-submit">
          Register
        </button>
        <div className="register-link">
          Already have an account? <Link to='/'>Login</Link>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Register;
