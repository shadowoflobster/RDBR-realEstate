import React, { useState } from "react";
import dropDownIcon from "../SVGs/dropDown.svg"
import './Filter.css'

const Filter = () => {

    const[FilterOpen, setFilterOpen] = useState({
        region:false,
        price:false,
        area:false,
        bedrooms:false,
    });

    


    return (<div className="filterDiv">
        <button className="filterButton"><span>რეგიონი</span> <img src={dropDownIcon}/></button>
        <button className="filterButton"><span>საფასო კატეგორია</span><img src={dropDownIcon}/></button>
        <button className="filterButton"><span>ფართობი</span><img src={dropDownIcon}/></button>
        <button className="filterButton"><span>საძინებლების რაოდენობა</span><img src={dropDownIcon}/></button>

    </div>)
}


export default Filter;