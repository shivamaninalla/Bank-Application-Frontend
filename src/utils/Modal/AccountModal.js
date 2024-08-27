import React from 'react';
import './Modal.css';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const AccountModal = ({ show, handleClose, handleAddAccount, customerId, setCustomerId, bankId, setBankId }) => {
  return (
    <BootstrapModal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal"
      backdropClassName="custom-backdrop"
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Add Bank Account</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="bankId">Bank ID: </label>
            <input
              type="text"
              className="form-control"
              id="bankId"
              value={bankId || ''}
              onChange={(e) => setBankId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerId">Customer ID: </label>
            <input
              type="text"
              className="form-control"
              id="customerId"
              value={customerId || ''}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
        </form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddAccount}>
          Add Account
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default AccountModal;
