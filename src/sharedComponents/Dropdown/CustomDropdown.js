import React, { useEffect, useState } from 'react'
import './Dropdown.css'
const Dropdown = (props) => {
    const {  data, searchParams,setSearchParams} = props;
    const [size,setSize]=useState(parseInt(searchParams.get("size") )|| 5)

    useEffect(()=>{
      setSize(parseInt(searchParams.get("size") )|| 5)
    },[searchParams])

    // const { totalElements, size } = data;
    const options = () => {
      const sizes = [];
      for (let i = 1; i < props.data.totalElements; i++) {
        if (i % 5 === 0 && i <= props.data.totalElements) {
          sizes.push(<option value={i}>{i}</option>);
        }
      }
      if (props.data.totalElements % 5 !== 0) {
        const roundedSize = Math.ceil(props.data.totalElements / 5) * 5;
        sizes.push(<option value={roundedSize}>{roundedSize}</option>);
      }
      return sizes;
    }; 
    const handleChange = (e) => {
      const updatedParams=Object.fromEntries(searchParams);
              updatedParams.page=0;
              updatedParams.size=e.target.value;
              setSearchParams(updatedParams);
              
    };
  

  return (
    <div className="dropdown-container">
            <select id="dropdown" className="form-select dropdown" aria-label="Select page size" onChange={handleChange} value={size}>
                <option value="" disabled selected>
                    Element size
                </option>
                {options()}
            </select>
        </div>

  )
}

export default Dropdown
