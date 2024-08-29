import React, { useState, useEffect } from "react";
import {
  fetchAllAccounts,
  depositAmount,
} from "../../../../services/customerServices"; // Adjust the import path as needed
import { failure, success } from "../../../../utils/Toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Deposit.css";
import { verifyUser } from "../../../../services/authenticationServices";

const Deposit = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAllAccounts();
        console.log("Fetched accounts:", data);
        setAccounts(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        // console.error("Error fetching accounts:", error);
        const statusCode=error.statusCode || "Unknown";
        const errorType=error.type||"Error"
        const message=error.message|| "Error found"
        failure(`error ${statusCode}: ${errorType}: ${message}`)
        setAccounts([]); // Fallback to empty array on error
      }
    };

    loadAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAccount || !amount) {
      failure("All fields are required.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      failure("Amount must be a positive number.");
      return;
    }

    try {
      await depositAmount(selectedAccount, amount);
      success("Deposit completed successfully!");
      setSelectedAccount("");
      setAmount("");
    } catch (error) {
      failure("Failed to perform deposit.");
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      console.log(response);
      if (!response.data) {
        navigate("/");
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="deposit-container">
      {isUser && (
        <>
          <button
            className="button"
            onClick={() => {
              navigate(-1);
            }}
            style={{
              width: "60px",
            }}
          >
            Back
          </button>
          <h1>Deposit Funds</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="account">Account</label>
              <select
                id="account"
                className="form-control"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                required
              >
                <option value="">Select an account</option>
                {Array.isArray(accounts) &&
                  accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.accountNumber}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Deposit
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
    backgroundColor: "black", // Light red background for the toast
    color: "white", // Dark red text color
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

export default Deposit;
