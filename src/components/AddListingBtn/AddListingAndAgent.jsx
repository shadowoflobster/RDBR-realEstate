import React from "react";
import './AddListingAndAgent.css'
import addListingSvg from "../SVGs/addListingSvg.svg"
import addAgentSvg from "../SVGs/addAgentSvg.svg"



const AddListingAndAgent =()=>{
    return (
        <div className="AddListingAndAgentDiv">
            <button className="AddListingButton"><img src={addListingSvg} className="addListingSvg"/> ლისტინგის დამატება</button>
            <button className="AddAgentButton"><img src={addAgentSvg} className="addAgentSvg"/>აგენტის დამატება</button>

        </div>
    )
}

export default AddListingAndAgent;