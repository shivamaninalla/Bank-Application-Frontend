import React, { useState, useEffect } from 'react';
import { getUserByEmail, updateUser } from '../../../../services/customerServices';
import { success } from '../../../../utils/Toast'; 
import { ToastContainer, toast } from 'react-toastify';
import './Profile.css';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../../../services/authenticationServices';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserByEmail(localStorage.getItem("email"));
        setUser(data);
        const fullName = localStorage.getItem("fullName").split(" ");
        setFirstName(fullName[0] || "");
        setLastName(fullName[1] || "");
        console.log(data);
      } catch (error) {
        const statusCode = error.statusCode || "Unknown";
        const errorType = error.type || "Error";
        const message = error.message || "Error found";
        toast.error(`Error ${statusCode}: ${errorType}: ${message}`);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await verifyUser(localStorage.getItem("authToken"));
        if (!response.data) {
          navigate('/');
        } else {
          setIsUser(true);
        }
      } catch (error) {
        toast.error("User verification failed.");
        navigate('/');
      }
    };

    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUser(firstName, lastName, user.email);
      if (response) {
       success("Profile information submitted.");
      }
    } catch (error) {
      const statusCode = error.statusCode || "Unknown";
      const errorType = error.type || "Error";
      const message = error.message || "Error found";
      toast.error(`Error ${statusCode}: ${errorType}: ${message}`);
    }
  };

  return (
    <div className="profile-container">
      {isUser && (
        <>
          <button
            className="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <h1>Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} // Make editable
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} // Make editable
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={user.email || ""}
                readOnly // Non-editable
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <ToastContainer
  style={{
    width: "350px",
    borderRadius: "8px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "black", // Text color
  }}
  toastStyle={{
    backgroundColor: "green", // Light red background for the toast
    color: "black", // Dark red text color
    borderRadius: "8px",
    // boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    padding: "10px",
  }}
  progressStyle={{
    // background: "#f5c6cb", // Red progress bar
  }}
/>

        </>
      )}
    </div>
  );
};

export default Profile;
