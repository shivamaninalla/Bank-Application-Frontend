import axios from "axios";
import { NotFoundError,InternalServerError,ValidationError,AlreadyAssigned } from "../utils/error/ApiError";

export const getAllCustomers = async (page, size, sortBy, direction) => {
  try {
    const response = await axios.get(
      `http://localhost:8082/api/admin`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: { page, size, sortBy, direction },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};
export const getAllTransactions = async (
  from,
  to,
  page,
  size,
  sortBy,
  direction
) => {
  try {
    console.log(from, to);
    const response = await axios.get(
      `http://localhost:8082/api/admin/transactions`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: { from, to, page, size, sortBy, direction },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};

export const getCustomerById = async(customerID) => {
  try {
    const response = await axios.get(`http://localhost:8082/api/admin/${customerID}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
        );
      return response
      }
      catch(error){
        if(error && error.response){
          const {status,message}=error.response.data;
          if(status===404){
            throw new NotFoundError(message);
          }
          throw new InternalServerError("Internal Server Error");
        }
      }
  };


export const createCustomer = async (firstName, lastName, userId) => {
  try {
    const response = await axios.post(
      `http://localhost:8082/api/admin/add/${userId}`,
      {
        firstName: firstName,
        lastName: lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    console.log("CreateCustomer response:", response);
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};


  
  export const createAccount = async (bankId, customerId) => {
    try {
      const response = await axios.post(
        `http://localhost:8082/api/admin/${customerId}/account/${bankId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      if(error && error.response){
        const {status,message}=error.response.data;
        if(status===404){
          throw new NotFoundError(message);
        }
        if(status===409){
          throw new AlreadyAssigned(message);
        }
        throw new InternalServerError("Internal Server Error");
      }
    }
  };
  
export const activateAccount = () => {};
export const deactivateAccount = () => {};
export const activateCustomer = async (customerID) => {
  try {
    const response = await axios.put(
      `http://localhost:8082/api/admin/active/${customerID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};

export const getUserById = async (userID) => {
  try {
    const response = await axios.get(
      `http://localhost:8082/api/admin/users/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};

export const deactivateCustomer = async (customerID) => {
  try {
    const response = await axios.delete(
      `http://localhost:8082/api/admin/customer/${customerID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if(error && error.response){
      const {status,message}=error.response.data;
      if(status===404){
        throw new NotFoundError(message);
      }
      if(status===409){
        throw new AlreadyAssigned(message);
      }
      throw new InternalServerError("Internal Server Error");
    }
  }
};