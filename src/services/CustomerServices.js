import axios from "axios";
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:8082/api/auth/getCurrentUser`,
      {
        params: {
          email: email,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPassbook = async (
  from,
  to,
  page,
  size,
  sortBy,
  direction,
  accountNumber
) => {
  try {
    const response = await axios.get(
      `http://localhost:8082/api/customer/passbook/${accountNumber}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        params: {
          from: from,
          to: to,
          page: page,
          size: size,
          sortBy: sortBy,
          direction: direction,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const fetchAllAccounts = async () => {
  try {
    const response = await axios.get('http://localhost:8082/api/customer/accounts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data.content; // Ensure this is an array
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};


export const performTransaction = async (
  senderAccount,
  receiverAccount,
  amount
) => {
  try {
    const response = await axios.post(
      "http://localhost:8082/api/customer/transactions",
      null,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        params: {
          senderAccountNumber: senderAccount,
          receiverAccountNumber: receiverAccount,
          amount: amount,
        },
      }
    );
    console.log("Transaction response:", response);
    return response.data;
  } catch (error) {
    console.error("Transaction error:", error);
    throw error;
  }
};

export const depositAmount = async (accountNumber, amount) => {
  try {
    const response = await axios.put(
      `http://localhost:8082/api/customer/transactions/${accountNumber}/deposit`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        params: {
          amount: amount,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// export const profileUpdate = async (firstName, lastName, email, password) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:8082/api/customer/profile`,
//       {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: password,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       }
//     );
//     return response
//   } catch (error) {
//     console.error(error);
//   }
// };

export const updateUser=async(firstName,lastName,email)=>{
  try{
    const response=await axios.put(`http://localhost:8082/api/customer/profile`,
      {
        firstName:firstName,
        lastName:lastName,
        email:email
        
      },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("authToken")}`

    }})
    console.log("In update user")
    console.log(firstName,lastName,email)
    return response;
  }
  catch(error){
    console.error(error);
  }
}

