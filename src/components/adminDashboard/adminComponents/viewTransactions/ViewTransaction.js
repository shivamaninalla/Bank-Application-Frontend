import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../../../sharedComponents/Table/Table";
import { verifyAdmin } from "../../../../services/AuthenticationServices";
import { sanitizeTransactionData } from "../../../../utils/helpers/SanitizeData";
import { getAllTransactions as fetchAllTransactions } from "../../../../services/AdminServices";
import ViewTransactionFilter from "./ViewTransactionFilter";
import "./viewTransaction.css";

// const ViewTransaction = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);
//   const [size, setSize] = useState(5);
//   const [from, setFromDate] = useState("");
//   const [to, setToDate] = useState("");
//   const [sortBy, setSortBy] = useState("id");
//   const [direction, setDirection] = useState("asc");
//   const [transactions, setTransactions] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const getAllTransactions = async () => {
//     try {
//       const data = await fetchAllTransactions(
//         from,
//         to,
//         page,
//         size,
//         sortBy,
//         direction
//       );
//       if (data && data.content) {
//         const sanitizedData = sanitizeTransactionData(data);
//         setTransactions(sanitizedData);
//       } else {
//         setTransactions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     }
//   };

//   useEffect(() => {
//     getAllTransactions();
//   }, [page, size, sortBy, direction, from, to]);

//   useEffect(() => {
//     const checkAdmin = async () => {
//       try {
//         const response = await verifyAdmin(localStorage.getItem("authToken"));
//         if (!response.data) {
//           navigate("/");
//         } else {
//           setIsAdmin(true);
//         }
//       } catch (error) {
//         console.error("Admin verification failed:", error);
//         navigate("/");
//       }
//     };

//     checkAdmin();
//   }, [navigate]);

//   return (
//     <div className="view-transactions-container">
//       {isAdmin && (
//         <>
//           <div>
//             <button
//               className="button"
//               onClick={() => {
//                 navigate(-1);
//               }}
//             >
//               Back
//             </button>
//           </div>
//           <div className="title">View Transactions</div>
// <ViewTransactionFilter
//   dataList={
//     transactions.content && transactions.content.length > 0
//       ? Object.keys(transactions.content[0])
//       : []
//   }
//   setFromDate={setFromDate}
//   setToDate={setToDate}
//   setSortBy={setSortBy}
//   setDirection={setDirection}
// />
//           <Table
//             data={transactions.content || []}
//             setPage={setPage}
//             setSize={setSize}
//             setDirection={setDirection}
//             setSortBy={setSortBy}
//           />
//         </>
//       )}
//     </div>
//   );
// };

const ViewTransaction = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 0;
  const size = parseInt(searchParams.get("size")) || 5;
  const sortBy = searchParams.get("sortBy") || "firstName";
  const direction = searchParams.get("direction") || "asc";
  //   const [from, setFromDate] = useState("");
  //   const [to, setToDate] = useState("");
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const [transactions, setTransactions] = useState([]);

  const getAllTransactions = async () => {
    try {
      const data = await fetchAllTransactions(
        from,
        to,
        page,
        size,
        sortBy,
        direction
      );
      if (data && data.content) {
        console.log("Fetched Data:", data);
        const sanitizedData = sanitizeTransactionData(data);
        setTransactions(sanitizedData);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [page, size, sortBy, direction, from, to]);

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await verifyAdmin(localStorage.getItem("authToken"));
      console.log("Admin Check Response:", response);
      if (!response) {
        navigate("/");
        return;
      } else {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div className="view-transactions-container">
      {isAdmin && (
        <>
          <div>
            <button className="back-button" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="title">View Transactions</div>
          <ViewTransactionFilter
            // dataList={
            //   transactions.content && transactions.content.length > 0
            //     ? Object.keys(transactions.content[0])
            //     : []
            // }
            
            data={transactions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Table
            data={transactions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </>
      )}
    </div>
  );
};

export default ViewTransaction;
