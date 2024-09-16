import React, { useState } from "react";
import dropDownIcon from "../SVGs/dropDown.svg"
import RegionFilterPopup from "../FilterPopup/RegionFilterPopup"
import './Filter.css'

const Filter = () => {
 const[activeFilter,setActiveFilter] = useState(null);
 const[selectedFilters,setSelectedFilters] = useState({
    region:[],
    price:'',
    area:'',
    bedrooms:''
 });

 const handleCheckboxSelect = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const currentSelections = prevFilters[filterType];
      const isSelected = currentSelections.includes(value);
      
      // Add or remove the value from the array
      const updatedSelections = isSelected
        ? currentSelections.filter(item => item !== value)  // Remove if already selected
        : [...currentSelections, value];  // Add if not selected

      return {
        ...prevFilters,
        [filterType]: updatedSelections
      };
    });
  };
 
 const applyFilter =() => {
console.log('applyFilter')
 }
 
 
 const toggleFilter = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);  
    } else {
      setActiveFilter(filter);  
    }
  };
   



    return (
    <>
    <div className="filterDiv">
        <button name="region" className="filterButton" onClick={() => toggleFilter('region')}><span>რეგიონი</span> <img src={dropDownIcon}/></button>
        <button name="price" className="filterButton" onClick={() => toggleFilter('price')}><span>საფასო კატეგორია</span><img src={dropDownIcon}/></button>
        <button name="area" className="filterButton" onClick={() => toggleFilter('area')}><span>ფართობი</span><img src={dropDownIcon}/></button>
        <button name="bedrooms" className="filterButton" onClick={() => toggleFilter('bedrooms')}><span>საძინებლების რაოდენობა</span><img src={dropDownIcon}/></button>
        
    </div>
    {activeFilter === 'region' && (
        <RegionFilterPopup></RegionFilterPopup>
      )}
    </>)
}


export default Filter;