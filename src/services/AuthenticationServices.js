import axios from "axios";
import { ValidationError, NotFoundError, UnAuthorized } from "../utils/error/ApiError";

export const signin = async (email, password) => {
  try {
    const response = await axios.post(`http://localhost:8082/api/auth/signin`, {
      email: email,
      password: password,
    });

    return response;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        throw new ValidationError(data.message || "Failed to sign in. Please check your credentials and try again.");
      }
      if (status === 404) {
        throw new NotFoundError(data.message || "User not found.");
      }
      if (status === 401) {
        throw new UnAuthorized(data.message || "Unauthorized access.");
      }
      if (status === 500) {
        throw new Error(data.message || "An unexpected error occurred on the server. Please try again later.");
      }
    }

    throw new Error("An unexpected error occurred. Please try again later.");
  }
};
export const signup=async (user)=>{
  try {
    const response = await axios.post(`http://localhost:8082/api/auth/signup`, user);
    return response;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          throw new ValidationError(data.message || "Something error occured")
          }
        }
      }


}

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

