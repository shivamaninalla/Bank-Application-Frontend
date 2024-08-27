import React, { useEffect, useState } from "react";
import { sanitizeData } from "../../../../utils/helpers/SanitizeData";
import { getAllCustomers as fetchAllCustomers } from "../../../../services/AdminServices";
import Table from "../../../../sharedComponents/Table/Table";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ViewCustomers.css";
import ViewCustomersFilter from "../viewCustomers/ViewCustomersFilter";
import { verifyAdmin } from "../../../../services/AuthenticationServices";

const ViewCustomers = () => {
  const navigate = useNavigate();
  const [searchParams,setSearchParams]=useSearchParams();
  const page=parseInt(searchParams.get("page") ) || 0;
  const size=parseInt(searchParams.get("size") ) || 5;
  const sortBy=(searchParams.get("sortBy") ) || "firstName";
  const direction=(searchParams.get("direction") ) || "asc";


  const [customers, setCustomers] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const getAllCustomers = async () => {
    try {
      const data = await fetchAllCustomers(page, size, sortBy, direction);
      if (data && data.content) {
        const sanitizedData = sanitizeData(
          data,
          ["customer_id", "firstName", "lastName", "email", "active"],
          setCustomers
        );
        setCustomers(sanitizedData);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, [page, size, sortBy, direction]);

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
    <div className="view-customers-container">
      {isAdmin && (
        <>
          <div>
            <button
              className="back-button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
          <div className="title">View Customers</div>
          <ViewCustomersFilter
            data={customers}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <Table
            data={customers}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </>
      )}
    </div>
  );
};

export default ViewCustomers;
