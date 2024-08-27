import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ConfirmAccountCreation.css';
import { success, failure } from '../../../../utils/Toast';
import { CreateAccount } from '../../../../services/AdminServices';
import { ToastContainer } from 'react-toastify';

const ConfirmAccountCreation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const bankId = searchParams.get('bankId');
  const customerId = searchParams.get('customerId');

  const handleConfirm = async () => {
    try {
      const response = await CreateAccount(bankId, customerId);
      console.log(response);
      if (response) {
        success("Account Created Successfully");
        setTimeout(()=>{
          navigate('/admin-dashboard/view-accounts');
        },8000)
      } else {
        failure("Failed to Create Account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      failure("An error occurred while creating the account");
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard'); 
  };

  return (
    <div className="confirmation-container">
      <h2>Confirm Account Creation</h2>
      <p>Please review the details below and confirm the account creation.</p>
      <div className="confirmation-details">
        <p><strong>Bank ID:</strong> {bankId}</p>
        <p><strong>Customer ID:</strong> {customerId}</p>
      </div>
      <div className="confirmation-actions">
        <button className="btn btn-primary" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ConfirmAccountCreation;
