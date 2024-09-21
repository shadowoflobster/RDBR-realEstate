import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './AddListingAndAgent.css';
import addListingSvg from "../SVGs/addListingSvg.svg";
import addAgentSvg from "../SVGs/addAgentSvg.svg";
import AddAgentPopup from "../AddAgentPopup/AddAgentPopup";

const AddListingAndAgent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleAgentModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const handleAddListing = () => {
        navigate("/addlisting"); // Ensure this path matches the route defined in App.js
    };

    return (
        <div className="AddListingAndAgentDiv">
            <button className="AddListingButton" onClick={handleAddListing}>
                <img alt="add listing" src={addListingSvg} className="addListingSvg" /> 
                ლისტინგის დამატება
            </button>
            <button className="AddAgentButton" onClick={toggleAgentModal}>
                <img alt="add agent" src={addAgentSvg} className="addAgentSvg" />
                აგენტის დამატება
            </button>

            {isModalOpen && <AddAgentPopup onClose={toggleAgentModal} />}
        </div>
    );
}

export default AddListingAndAgent;
