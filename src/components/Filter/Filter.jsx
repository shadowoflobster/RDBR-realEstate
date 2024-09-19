import React, { useState } from "react";
import dropDownIcon from "../SVGs/dropDown.svg";
import RegionFilterPopup from "../FilterPopup/RegionFilterPopup/RegionFilterPopup";
import PriceFilterPopup from "../FilterPopup/PriceFilterPopup/PriceFilterPopup";
import AreaFilterPopup from "../FilterPopup/AreaFilterPopup/AreaFilterPopup";
import BedroomFilterPopup from "../FilterPopup/BedroomFilterPopup/BedroomFilterPopup";
import ShowSelectedFilters from "../ShowSelectedFilters/ShowSelectedFilters";
import "./Filter.css";

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    region: [],
    price: { min: "", max: "" },
    area: { min: "", max: "" },
    bedrooms: [],
  });

  const handleCheckboxSelect = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const currentSelections = prevFilters[filterType] || [];
      const isSelected = currentSelections.includes(value);
      const updatedSelections = isSelected
        ? currentSelections.filter((item) => item !== value)
        : [...currentSelections, value];

      console.log(`Updated ${filterType} selections:`, updatedSelections); // Debug statement

      return {
        ...prevFilters,
        [filterType]: updatedSelections,
      };
    });
  };

  const handlePriceChange = (type, value) => {
    console.log(`Price change - ${type}:`, value); // Debug statement

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        [type]: value,
      },
    }));
  };
  const handleAreaChange = (type, value) => {
    console.log(`Area change - ${type}:`, value);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      area: {
        ...prevFilters.area,
        [type]: value,
      },
    }));
  };

  const handleBedroomsChange = (value) => {
    console.log(`Bedrooms change - `);
  };

  const applyFilter = () => {
    console.log("Applied filters: ", selectedFilters); // Debug statement
  };

  const toggleFilter = (filter) => {
    console.log(`Toggling filter: ${filter}`); // Debug statement
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const removeFilter = (type, value = null) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (type === "region") {
        newFilters.region = newFilters.region.filter(
          (region) => region !== value
        );
      } else if (type === "price") {
        newFilters.price = { min: "", max: "" };
      } else if (type === "area") {
        newFilters.area = { min: "", max: "" };
      }
      return newFilters;
    });
  };

  const clearFilters = () =>{
    setSelectedFilters({
      region: [],
    price: { min: "", max: "" },
    area: { min: "", max: "" },
    bedrooms: [],
    })
  }

  return (
    <div>
      <div className="filterDiv">
        <button
          name="region"
          className="filterButton"
          onClick={() => toggleFilter("region")}
        >
          <span>რეგიონი</span> <img src={dropDownIcon} alt="Dropdown Icon" />
        </button>
        <button
          name="price"
          className="filterButton"
          onClick={() => toggleFilter("price")}
        >
          <span>საფასო კატეგორია</span>
          <img src={dropDownIcon} alt="Dropdown Icon" />
        </button>
        <button
          name="area"
          className="filterButton"
          onClick={() => toggleFilter("area")}
        >
          <span>ფართობი</span>
          <img src={dropDownIcon} alt="Dropdown Icon" />
        </button>
        <button
          name="bedrooms"
          className="filterButton"
          onClick={() => toggleFilter("bedrooms")}
        >
          <span>საძინებლების რაოდენობა</span>
          <img src={dropDownIcon} alt="Dropdown Icon" />
        </button>
      </div>

      {activeFilter === "region" && (
        <RegionFilterPopup
          onSelect={handleCheckboxSelect}
          selectedRegions={selectedFilters.region}
          applyFilters={applyFilter}
        />
      )}
      {activeFilter === "price" && (
        <PriceFilterPopup
          onPriceChange={handlePriceChange}
          selectedPrice={selectedFilters.price}
          applyFilters={applyFilter}
          onClose={() => toggleFilter(null)}
        />
      )}
      {activeFilter === "area" && (
        <AreaFilterPopup
          onAreaChange={handleAreaChange}
          selectedArea={selectedFilters.area}
          applyFilters={applyFilter}
          onClose={() => toggleFilter(null)}
        ></AreaFilterPopup>
      )}
      {activeFilter === "bedrooms" && (
        <BedroomFilterPopup
          selectedBedrooms={selectedFilters.bedrooms}
          applyFilters={applyFilter}
        ></BedroomFilterPopup>
      )}
      <ShowSelectedFilters
        selectedFilters={selectedFilters}
        removeFilter={removeFilter}
        clearFilters={clearFilters}
      ></ShowSelectedFilters>
    </div>
  );
};

export default Filter;
