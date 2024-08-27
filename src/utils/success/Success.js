import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const [successDetails, setSuccessDetails] = useState({});

  useEffect(() => {
    const storedSuccessDetails = localStorage.getItem('successDetails');
    if (storedSuccessDetails) {
      setSuccessDetails(JSON.parse(storedSuccessDetails));
      localStorage.removeItem('successDetails');
    }
  }, []);

  const { statusCode, message } = successDetails;

  const handleNavigation = () => {
    navigate(-2);
  };

  return (
    <div className="success-container">
      <h1>{statusCode || "Success"}</h1>
      <p>{message || "Operation completed successfully."}</p>
      <button className="success-home-link" onClick={handleNavigation}>Go Back</button>
    </div>
  );
};

export default Success;
