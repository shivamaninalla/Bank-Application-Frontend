import React, { useEffect, useState } from 'react';
import './ViewCustomersFilter.css'

const ViewCustomersFilter = (props) => {
    const { data,searchParams,setSearchParams} = props;

    // const [from,setFrom]=useState(searchParams.get("from")|| "");
    // const [to,setTo]=useState(searchParams.get("to")|| "");
    const [sortBy,setSortBy]=useState(searchParams.get("sortBy")|| "Sort By");
    const [direction,setDirection]=useState(searchParams.get("direction")|| "Direction");


    useEffect(()=>{
        // setFrom(searchParams.get("from")|| "")
        // setTo(searchParams.get("to")|| "")
        setSortBy(searchParams.get("sortBy")|| "Sort By")
        setDirection(searchParams.get("direction")|| "Direction")
    },[searchParams])

    let options = [];

    const keyMapping = {
        // "Customer ID": "id",
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
        // document.querySelector("select[name='sortBy']").value = "Sort By";
        // document.querySelector("select[name='direction']").value = "Direction";
        // setFrom("")
        // setTo("")
        setSortBy("SortBy")
        setDirection("Direction")
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
                        value={sortBy}
                        onChange={(e)=>{
                            setSortBy(e.target.value)
                        }}
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
                        value={direction}
                        onChange={(e)=>{
                            setDirection(e.target.value)
                        }}
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
