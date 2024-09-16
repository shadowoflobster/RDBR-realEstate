import React from "react";
import Filter from "../Filter/Filter"
import AddListingAndAgent from "../AddListingBtn/AddListingAndAgent";
import './FilterAndAddListingAgent.css'


const FilterAndAddListingAgent = ()=>{
 return(
 <div className="FAALADiv">
    <Filter/>
    <AddListingAndAgent/>
    </div>
)
}

export default FilterAndAddListingAgent;