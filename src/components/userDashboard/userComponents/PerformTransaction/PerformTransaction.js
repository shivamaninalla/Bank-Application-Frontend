import React, { useState, useEffect } from 'react';
import './PerformTransaction.css';
import { fetchAllAccounts,performTransaction } from '../../../../services/CustomerServices';
import {failure,success} from '../../../../utils/Toast'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../../../services/AuthenticationServices';

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
        console.error("Error fetching accounts:", error);
      }
    };

    loadAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!senderAccount || !receiverAccount || !amount) {
      failure("All fields are required.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      failure("Amount must be a positive number.");
      return;
    }

    try {
      await performTransaction(senderAccount, receiverAccount, amount);
      success("Transaction completed successfully!")
      setSenderAccount("");
      setReceiverAccount("");
      setAmount("");
    } catch (error) {
      failure("Failed to perform transaction.")
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
      <ToastContainer/>
      </>)}
    </div>
  );
};

export default PerformTransaction;
