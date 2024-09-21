import React, { useState } from "react";
import "./RegionDropDown.css";

const RegionDropDown = ({ regions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (region) => {
    setSelectedRegion(region); // Set the selected region
    onSelect(region);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="regionDropdown">
      <div className="regionDropdownSelected">
        <div className="dropDownLabel" onClick={toggleDropdown}>
          {selectedRegion ? selectedRegion.name : "აირჩიე რეგიონი"}
        </div>
      </div>
      {isOpen && (
        <div className="dropDownList">
          {regions.map((region) => (
            <div
              key={region.id} // Ensure each item has a unique key
              className="dropDownItem"
              onClick={() => handleSelect(region)}
            >
             <span className="dropDownItemSpan"> {region.name}</span> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionDropDown;
