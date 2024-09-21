import React from "react";
import "./BedroomFilterPopup.css";

const BedroomsFilterPopup = (onSelect, selectedBedrooms = [] ,applyFilters) => {

  

  return (
    <div className="bedroomsFilterPopup">
      <div className="bedroomsFilterContent">
        <span className="bedroomsFilterHeader">საძინებლების რაოდენობა</span>
        <div className="bedroomFilterOptionsDiv">
            
        </div>
        
      </div><div className="setBedroomsFilterBtnDiv">
          <button className="setBedroomsFilterBtn" type="button" >
            არჩევა
          </button>
          </div>
    </div>
  );
};

export default BedroomsFilterPopup;
