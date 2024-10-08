import React, { useState, useEffect } from 'react';
import './PerformTransaction.css';
import { fetchAllAccounts,performTransaction } from '../../../../services/customerServices';
import {failure,success} from '../../../../utils/Toast'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../../../services/authenticationServices';
import { toast } from 'react-toastify';
import validator from 'validator';

const PerformTransaction = () => {
  const [accounts, setAccounts] = useState([]);
  const [senderAccount, setSenderAccount] = useState("");
  const [receiverAccount, setReceiverAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isUser,setIsUser]=useState();
  const navigate=useNavigate();
  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAllAccounts();
        setAccounts(data);
      } catch (error) {
        // console.error("Error fetching accounts:", error);
        const statusCode = error.statusCode || "Unknown";
      const errorType = error.type || "Error";
      const message = error.message || "Error found";
      toast.error(`Error ${statusCode}: ${errorType}`);
      }
    };

    loadAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senderAccount || !receiverAccount || !amount) {
      failure("All fields are required.");
      return;

      // const statusCode = error.statusCode || "Unknown";
      // const errorType = error.type || "Error";
      // const message = error.message || "Error found";
      // toast.error(`Error ${statusCode}: ${errorType}: ${message}`);
      // return;
    }
    if(!validator.isNumeric(receiverAccount)){
      failure("Please enter valid recevier account number")
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      failure("Amount must be a positive number.");
      return;
      // const statusCode = error.statusCode || "Unknown";
      // const errorType = error.type || "Error";
      // const message = error.message || "Error found";
      // toast.error(`Error ${statusCode}: ${errorType}: ${message}`);
      // return;
    }

    try {
      await performTransaction(senderAccount, receiverAccount, amount);
      success("Transaction completed successfully!")
      setSenderAccount("");
      setReceiverAccount("");
      setAmount("");
    } catch (error) {
      // failure("Failed to perform transaction.")
      const statusCode = error.statusCode || "Unknown";
      const errorType = error.type || "Error";
      const message = error.message || "Error found";
      toast.error(`Error ${statusCode}: ${errorType}: ${message}`);
    }
  };
  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      console.log(response)
      if (!response.data) {
        navigate('/');
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate]);
  return (
    <div className="perform-transaction-container">
      {isUser && (<>
        <div>
            <button
              className="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
      <h1>Perform Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="senderAccount">Sender Account</label>
          <select
            id="senderAccount"
            className="form-control"
            value={senderAccount}
            onChange={(e) => setSenderAccount(e.target.value)}
            required
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.accountNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="receiverAccount">Receiver Account</label>
          <input
            type="text"
            id="receiverAccount"
            className="form-control"
            value={receiverAccount}
            onChange={(e) => setReceiverAccount(e.target.value)}
            required
          />
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
          Transfer
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
      </>)}
    </div>
  );
};

export default PerformTransaction;
