import React, { useEffect, useState } from "react";
import './Errror.css'; // Ensure this is the correct filename
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const [errorDetails, setErrorDetails] = useState({});

  useEffect(() => {
    const storedErrorDetails = localStorage.getItem('errorDetails');
    if (storedErrorDetails) {
      setErrorDetails(JSON.parse(storedErrorDetails));
      localStorage.removeItem('errorDetails');
    }
  }, []);

  const { statusCode, errorType, message } = errorDetails;

  const handleGoHome = () => {
    navigate('/'); // Redirect to the home page or another specific route
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="error-container">
      <h1>{statusCode || "Error"}</h1>
      <h2>{errorType || "Something went wrong"}</h2>
      <p>{message || "An unexpected error occurred."}</p>
      <div className="button-container">
        <button className="home-link" onClick={handleGoHome}>Go to Home</button>
        <button className="back-link" onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
};

export default Error;
