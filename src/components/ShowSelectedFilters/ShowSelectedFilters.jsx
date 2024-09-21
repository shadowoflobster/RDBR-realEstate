import React from "react";
import removeIcon from "../SVGs/deleteSelectedFilterSvg.svg"
import './ShowSelectedFilters.css'

const ShowSelectedFilters =({selectedFilters,removeFilter,clearFilters})=>{
    return (
        <div className="ShowSelectedFiltersDiv">
            {selectedFilters.region.map((region,i)=>(
        <div 
        className="SelectedFilter"
        key={i}
        
        >{region}<img alt="remove"
        className="removeFilterBtn"
        src={removeIcon}
        onClick={()=>removeFilter('region',region)}    
            /></div>
        
        ))}
         {(selectedFilters.price.min || selectedFilters.price.max) && (
        <div className="SelectedFilter">
          {selectedFilters.price.min && `${selectedFilters.price.min} ₾ - `}
          {selectedFilters.price.max && `${selectedFilters.price.max} ₾`}
          <img alt="removefilter"
            className="removeFilterBtn"
            src={removeIcon}
            onClick={() => removeFilter('price')}
          />
        </div>
         )}
          {(selectedFilters.area.min || selectedFilters.area.max) && (
        <div className="SelectedFilter">
          {selectedFilters.area.min && `${selectedFilters.area.min} მ - `}
          {selectedFilters.area.max && `${selectedFilters.area.max} მ`}
          <img alt="removefilter"
            className="removeFilterBtn"
            src={removeIcon}
            onClick={() => removeFilter('area')}
          />
        </div>
         )}
         
        {(selectedFilters.region.length > 0 || selectedFilters.price.min || selectedFilters.price.max || selectedFilters.area.min || selectedFilters.area.max || selectedFilters.bedrooms.length > 0) && (
  <span className="clearBtn" onClick={clearFilters}>გასუფთავება</span>
)}



        </div>
      
    )
}

export default ShowSelectedFilters

