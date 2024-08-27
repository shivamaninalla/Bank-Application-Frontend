import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Modal from "../../utils/Modal/Modal";
import AccountModal from "../../utils/Modal/AccountModal";
import { GetUserById, GetCustomerById } from "../../services/AdminServices";
import { verifyAdmin } from "../../services/AuthenticationServices";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [accountModal, setAccountModal] = useState(false);
  const [bankId, setBankId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseAccountModal = () => setAccountModal(false);
  const handleShowCustomerModal = () => setShowModal(true);
  const handleShowAccountModal = () => setAccountModal(true);

  const handleAddCustomer = async () => {
    try {
      const response = await GetUserById(userId);
      if (response) {
        navigate(`/admin-dashboard/add-customer/${userId}`);
        handleCloseModal();
      } else {
        navigate('/error');
        handleCloseModal();
      }
    } catch {
      navigate('/error');
      handleCloseModal();
    }
  };

  const handleAddAccount = async () => {
    try {
      const response = await GetCustomerById(customerId);
      if (response) {
        navigate(`/admin-dashboard/confirm-account-creation?bankId=${bankId}&customerId=${customerId}`);
        handleCloseAccountModal();
      }
      // } else {
      //   navigate('/error');
      //   handleCloseAccountModal();
      // }
    } catch {
      navigate('/error');
      handleCloseAccountModal();
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "addCustomer") {
      handleShowCustomerModal();
    } else if (tab === "viewCustomers") {
      navigate("/admin-dashboard/view-customers");
    } else if (tab === "addBankAccount") {
      handleShowAccountModal();
    } else if (tab === "viewTransactions") {
      navigate("/admin-dashboard/view-transactions");
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      if (!response.data) {
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      {isAdmin && (
        <>
          <button className="button" style={{
            backgroundcolor: "red",
            width: "70px",
            height: "40px",
            position: "absolute",
            right: "50px",
            top: '20px'
          }} onClick={handleLogout}>Logout</button>
          <h1>Admin Dashboard</h1>
          <div className="tabs">
            <button
              className={activeTab === "viewCustomers" ? "active" : ""}
              onClick={() => handleTabClick("viewCustomers")}
            >
              View Customers
            </button>
            <button
              className={activeTab === "addCustomer" ? "active" : ""}
              onClick={() => handleTabClick("addCustomer")}
            >
              Add Customer
            </button>
            <button
              className={activeTab === "addBankAccount" ? "active" : ""}
              onClick={() => handleTabClick("addBankAccount")}
            >
              Add Bank Account
            </button>
            <button
              className={activeTab === "viewTransactions" ? "active" : ""}
              onClick={() => handleTabClick("viewTransactions")}
            >
              View Transactions
            </button>
          </div>
        </>
      )}
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        handleAddCustomer={handleAddCustomer}
        userId={userId}
        setUserId={setUserId}
      />
      <AccountModal
        show={accountModal}
        handleClose={handleCloseAccountModal}
        handleAddAccount={handleAddAccount}
        customerId={customerId}
        setCustomerId={setCustomerId}
        bankId={bankId}
        setBankId={setBankId}
      />
    </div>
  );
};

export default AdminDashboard;
