import React, { useState } from "react";
import "./CityDropDown.css";

const CityDropDown = ({ cities, onSelect, }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (city) => {
    setSelectedCity(city); // Set the selected region
    onSelect(city);
    setIsOpen(false); // Close dropdown after selection
  };


  return (
    <div className="cityDropdown">
      <div className="cityDropdownSelected">
        <div className="dropDownLabel" onClick={toggleDropdown}>
          {selectedCity ? selectedCity.name : "აირჩიე ქალაქი"}
        </div>
      </div>
      {isOpen && (
        <div className="dropDownList">
          {cities.length > 0 ? (
            cities.map((city) => (
              <div
                key={city.id} 
                className="dropDownItem"
                onClick={() => handleSelect(city)}
              >
                <span className="dropDownItemSpan">{city.name}</span>
              </div>
            ))
          ) : (
            <div className="dropDownItem">აირჩიეთ ქალაქი</div> 
          )}
        </div>
      )}
    </div>
  );
};

export default CityDropDown;