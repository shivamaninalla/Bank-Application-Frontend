import React from "react";
import './Table.css';
import CustomPagination from "../Pagination/CustomPagination";
import CustomDropdown from '../Dropdown/CustomDropdown';

const Table = ({ data, searchParams,setSearchParams,customRenderers = {} }) => {
  const content = data?.content || [];

  if (content.length > 0) {
    // Generate the table headers dynamically
    const tableHeaders = (
      <tr>
        {Object.keys(content[0]).map((key) => (
          <th key={key}>{key.toUpperCase()}</th>
        ))}
        {Object.keys(customRenderers).length > 0 && <th>ACTION</th>}
      </tr>
    );

    // Generate the table data dynamically
    const tableData = content.map((item, index) => (
      <tr key={index}>
        {Object.keys(item).map((key) => (
          <td key={key}>{item[key]}</td>
        ))}
        {Object.keys(customRenderers).length > 0 && (
          <td>
            {Object.entries(customRenderers).map(([actionKey, renderer]) => (
              <div key={actionKey}>
                {renderer(item)}
              </div>
            ))}
          </td>
        )}
      </tr>
    ));

    return (
      <div className="table-container">
        <table className="table">
          <thead className="thead">{tableHeaders}</thead>
          <tbody>{tableData}</tbody>
        </table>
        <div className="pagination-section">
          <CustomDropdown searchParams={searchParams} setSearchParams={setSearchParams} data={data} className="custom-dropdown" />
          <CustomPagination searchParams={searchParams} setSearchParams={setSearchParams} data={data} />
        </div>
      </div>
    );
  }

  return null; // Return null if there's no data
};

export default Table;
