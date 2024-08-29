import React from "react";
import { useNavigate, useParams , useSearchParams} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Table from "../../../../sharedComponents/Table/Table";
import "./ViewPassbook.css";
import { sanitizeTransactionData } from "../../../../utils/helpers/SanitizeData";
import ViewPassbookFilter from "./viewPassbookComponents/ViewPassbookFilter";
import { fetchPassbook } from "../../../../services/customerServices";
import { verifyUser } from "../../../../services/authenticationServices";
import { toast } from "react-toastify";
const ViewPassbook = () => {
  const routeParams=useParams();
  const accountNumber=routeParams.accountNumber;
  const navigate = useNavigate();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(5);
  // const [from, setFromDate] = useState();
  // const [to, setToDate] = useState();
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page") ) || 0;
  const size=parseInt(searchParams.get("size") ) || 5;
  const sortBy=(searchParams.get("sortBy") ) || "id";
  const direction=(searchParams.get("direction") ) || "asc";
  const from=(searchParams.get("from") ) || "";
  const to=(searchParams.get("to") ) || "";
  // const [sortBy, setSortBy] = useState("id");
  // const [direction, setDirection] = useState("asc");

  const [transactions, setTransactions] = useState([]);
  const [isUser,setIsUser]=useState();
  const getAllTransactions = async () => {
    
    try {
      const data = await fetchPassbook(
        from,
        to,
        page,
        size,
        sortBy,
        direction,
        accountNumber
      );
      if (data && data.content) {
        const sanitizedData = sanitizeTransactionData(data);
        setTransactions(sanitizedData);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      // console.error("Error fetching customers:", error);
      const statusCode = error.statusCode || "Unknown";
      const errorType = error.type || "Error";
      const message = error.message || "Error found";
      toast.error(`Error ${statusCode}: ${errorType}: ${message}`);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [page, size, sortBy, direction,from,to]);

  useEffect(() => {
    const checkUser = async () => {
      const response = await verifyUser(localStorage.getItem("authToken"));
      console.log("Response", response);
      if (!response.data) {
        navigate("/");
        return;
      } else {
        setIsUser(true);
      }
    };

    checkUser();
  }, [navigate]);
  return (
    <div className="view-transactions-container">
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
          <div className="title">View Passbook</div>
          <ViewPassbookFilter
            dataList={transactions.content && transactions.content.length > 0 ? Object.keys(transactions.content[0]) : []}
            // setFromDate={setFromDate}
            // setToDate={setToDate}
            // setSortBy={setSortBy}
            // setDirection={setDirection}
            // data={transactions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Table
            data={transactions}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </>)}
      
    </div>
  );
};

export default ViewPassbook;
