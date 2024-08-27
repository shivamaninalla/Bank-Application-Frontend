import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreateCustomer, GetUserById } from "../../../../services/AdminServices";
import "./AddCustomer.css";
import { verifyAdmin } from "../../../../services/AuthenticationServices";

const AddCustomer = () => {
  const { userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await verifyAdmin(localStorage.getItem("authToken"));
        console.log("Admin verification response:", response);
        if (!response.data) {
          navigate('/');
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error verifying admin:", error);
        navigate('/error');
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating customer with:", { firstName, lastName, userId });
      const result = await CreateCustomer(firstName, lastName, userId);
      console.log("Customer created successfully:", result);

      localStorage.setItem(
        "successDetails",
        JSON.stringify({
          statusCode: 200,
          message: "Customer created successfully!",
        })
      );
      navigate("/success");
    } catch (error) {
      console.error("Failed to create customer:", error);
      navigate("/error");
    }
  };

  return (
    <div className="add-customer-container">
      {isAdmin && (
        <>
          <div>
            <button
              className="button"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          <h1>Add Customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default AddCustomer;
