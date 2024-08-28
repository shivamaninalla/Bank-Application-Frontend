import axios from "axios";
import { NotFoundError,InternalServerError,ValidationError,AlreadyAssigned,UnAuthorized } from "../utils/error/ApiError";


export const signin = async (email, password) => {
  try {
    const response = await axios.post(`http://localhost:8082/api/auth/signin`, {
      email: email,
      password: password,
    });

    return response;
  } catch (error) {
    if (error.response) {
      const { status, message } = error.response.data;
      console.log(error.response.data)
      if (status === 400) {
        throw new ValidationError(message || "Internal Server Error");
      }
      if (status === 404) {
        throw new NotFoundError(message || "Not Found");
      }
      if (status === 401) {
        throw new UnAuthorized(message || "Unauthorized");
      }
    } else {
      throw new InternalServerError("Internal Server Error");
    }
  }
};
export const signup=async (user)=>{
  try {
    const response = await axios.post(`http://localhost:8082/api/auth/signup`, user);
    return response;
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
        if (status === 400) {
          throw new ValidationError(message || "Internal Server Error");
        }
        if (status === 404) {
          throw new NotFoundError(message || "Not Found");
        }
        if (status === 401) {
          throw new UnAuthorized(message || "Unauthorized");
        }
      } else {
        throw new InternalServerError("Internal Server Error")
      }
    }
  };

export const verifyAdmin = async (token) => {
  if(token==null){
    return false;
  }
  try {
    const response = await axios.get(`http://localhost:8082/api/auth/verifyAdmin`, {
      params: {
        auth:token
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const verifyUser = async (token) => {
  if(token==null){
    return false;
  }
  try {
    const response = await axios.get(`http://localhost:8082/api/auth/verifyUser`, {
      params: {
        auth:token
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

