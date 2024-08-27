import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import "./Pagination.css";


const CustomPagination = (props) => {
  const {  data ,searchParams,setSearchParams} = props;
  const { totalPages, page } = data;

  const renderPaginationItems = () => {
    const pages = [];
    
    if (totalPages > 0) {
      // First Page
      if (page > 0) {
        pages.push(
          <BootstrapPagination.Item
            key="first"
            className="pagination-control"
            onClick={() => 
            {
              const updatedParams=Object.fromEntries(searchParams);
              updatedParams.page=0;
              setSearchParams(updatedParams);
            }
            }
          >
            &lt;&lt;&lt;
          </BootstrapPagination.Item>
        );
      }

      // Previous Page
      if (page > 0) {
        pages.push(
          <BootstrapPagination.Item
            key="prev"
            className="pagination-control"
            onClick={() => {
              {
                const updatedParams=Object.fromEntries(searchParams);
                updatedParams.page=page-1;
                setSearchParams(updatedParams);
              }
            }}
          >
            &lt;&lt;
          </BootstrapPagination.Item>
        );
      }

      // Page Numbers
      for (let i = 0; i < totalPages; i++) {
        pages.push(
          <BootstrapPagination.Item
            key={i}
            className={`pagination-item ${i === page ? "active" : ""}`}
            onClick={() => {
              {
                const updatedParams=Object.fromEntries(searchParams);
                updatedParams.page=i;
                setSearchParams(updatedParams);
              }
            }}
          >
            {i + 1}
          </BootstrapPagination.Item>
        );
      }

      // Next Page
      if (page < totalPages - 1) {
        pages.push(
          <BootstrapPagination.Item
            key="next"
            className="pagination-control"
            onClick={() => {
              {
                const updatedParams=Object.fromEntries(searchParams);
                updatedParams.page=page+1;
                setSearchParams(updatedParams);
              }
            }}
          >
            &gt;&gt;
          </BootstrapPagination.Item>
        );
      }

      // Last Page
      if (totalPages > 0 && page < totalPages - 1) {
        pages.push(
          <BootstrapPagination.Item
            key="last"
            className="pagination-control"
            onClick={() => {{
              const updatedParams=Object.fromEntries(searchParams);
              updatedParams.page=totalPages-1;
              setSearchParams(updatedParams);
            }}}
          >
            &gt;&gt;&gt;
          </BootstrapPagination.Item>
        );
      }
    }

    return pages;
  };

  return (
    <div className="custom-pagination">
      <BootstrapPagination className="pagination">
        {renderPaginationItems()}
      </BootstrapPagination>
    </div>
  );
};

export default CustomPagination;