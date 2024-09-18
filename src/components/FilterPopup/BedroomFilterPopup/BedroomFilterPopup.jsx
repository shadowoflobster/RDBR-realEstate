import React, { useState } from "react";
import "./BedroomFilterPopup.css";

const BedroomsFilterPopup = (onSelect, selectedBedrooms = [] ,applyFilters) => {
  const Bedrooms = [1, 2, 3, 4, 5];

  const handleAreaClick = (Bedroom) =>{
    onSelect('Bedroom',Bedroom)
  }

  return (
    <div className="bedroomsFilterPopup">
      <div className="bedroomsFilterContent">
        <span className="bedroomsFilterHeader">საძინებლების რაოდენობა</span>
        <div className="bedroomFilterOptionsDiv">
            {Bedrooms.map((Bedroom)=>
            <div
            // className={selectedBedrooms.includes(Bedroom)?'bedroomFilterOptionSelected':'bedroomsFilterOption' }
            className="bedroomsFilterOption"
            key={Bedroom}
                
            
            >{Bedroom}</div>
            )}
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
