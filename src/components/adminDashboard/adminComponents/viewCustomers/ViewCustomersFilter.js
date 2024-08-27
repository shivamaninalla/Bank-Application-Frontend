import React from 'react';
import './ViewCustomersFilter.css'

const ViewCustomersFilter = (props) => {
    const { data,searchParams,setSearchParams} = props;
    let options = [];

    const keyMapping = {
        "Customer ID": "id",
        "First Name": "firstName",
        "Last Name": "lastName"
    };

    if (data && data.content) {
        const keys = Object.keys(data.content[0]);
        options = keys.map((key, index) => {
            if(key!=="Status" && key!=="Action" && key!="Email"){
                return (
                    <option key={index} value={keyMapping[key]}>
                        {key}
                    </option>
                )
            }
            })
            }
    const search = () => {
        const sortByValue = document.querySelector("select[name='sortBy']").value;
        const directionValue = document.querySelector("select[name='direction']").value;
        console.log(sortByValue);
        console.log(directionValue)
        const updatedParams=Object.fromEntries(searchParams);
        updatedParams.sortBy=sortByValue;
        updatedParams.direction=directionValue;
        setSearchParams(updatedParams);
    };


    const reset = () => {
        document.querySelector("select[name='sortBy']").value = "Sort By";
        document.querySelector("select[name='direction']").value = "Direction";
        setSearchParams([]);
    };

    return (
        <div className="filter-wrapper">
            <div className="filter-container">
                <div className="filter-input">
                    <label htmlFor="sortBy">Sort By</label>
                    <select
                        className="form-select"
                        aria-label="Sort By"
                        name="sortBy"
                        id="sortBy"
                    >
                        <option value="" disabled>
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
                        <option value="" disabled>
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

export default ViewCustomersFilter;
