// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './Modal.css'
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ show, handleClose, handleAddCustomer, userId, setUserId }) => {
  return (
    <BootstrapModal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal"
      backdropClassName="custom-backdrop"
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Add Customer</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        </form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddCustomer}>
          Add Customer
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
