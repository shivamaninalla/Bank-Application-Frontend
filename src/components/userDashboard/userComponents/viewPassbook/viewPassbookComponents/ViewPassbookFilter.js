import React from "react";
import "./ViewPassbookFilter.css";

const ViewPassbookFilter = (props) => {
  const options = props.dataList
    .filter(
      (key) =>
        key !== "senderAccount" &&
        key !== "receiverAccount" &&
        key !== "transactionType"
    )
    .map((key) => (
      <option key={key} value={key}>
        {key}
      </option>
    ));

  const search = () => {
    const fromValue = document.querySelector("input[name='from']").value;
    const toValue = document.querySelector("input[name='to']").value;
    const sortByValue = document.querySelector("select[name='sortBy']").value;
    const directionValue = document.querySelector(
      "select[name='direction']"
    ).value;

    if (directionValue !== "Direction") {
      props.setDirection(directionValue);
    }
    if (sortByValue !== "Sort By") {
      props.setSortBy(sortByValue);
    }
    props.setFromDate(fromValue);
    props.setToDate(toValue);
  };

  const reset = () => {
    props.setFromDate("");
    props.setToDate("");
    props.setSortBy("id");
    props.setDirection("asc");
    document.querySelector("input[name='from']").value = "";
    document.querySelector("input[name='to']").value = "";
    document.querySelector("select[name='sortBy']").value = "Sort By";
    document.querySelector("select[name='direction']").value = "Direction";
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        <div className="filter-input">
          <label htmlFor="from">From Date</label>
          <input type="date" name="from" id="from" />
        </div>
        <div className="filter-input">
          <label htmlFor="to">To Date</label>
          <input type="date" name="to" id="to" />
        </div>
        <div className="filter-input">
          <label htmlFor="sortBy">Sort By</label>
          <select
            className="form-select"
            aria-label="Sort By"
            name="sortBy"
            id="sortBy"
          >
            <option value="Sort By" disabled>
              Sort By
            </option>
            {options}
          </select>
        </div>
        <div className="filter-input">
          <label htmlFor="direction">Direction</label>
          <select
            className="form-select"
            aria-label="Direction"
            name="direction"
            id="direction"
          >
            <option value="Direction" disabled>
              Direction
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="filter-actions">
          <button type="button" className="search-btn" onClick={search}>
            Search
          </button>
          <button type="button" className="reset-btn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPassbookFilter;
