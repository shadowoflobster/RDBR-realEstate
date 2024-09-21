import React, { useState } from "react";
import addAgentSvg from "../SVGs/addFile.svg";

const AgentDropDown = ({ agents, onSelect, onAddAgent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (agent) => {
    setSelectedAgent(agent);
    onSelect(agent);
    setIsOpen(false);
  };

  const handleAddAgent = () => {
    onAddAgent(); 
    setIsOpen(false);
  };

  return (
    <div className="regionDropdown">
      <div className="regionDropdownSelected">
        <div className="dropDownLabel" onClick={toggleDropdown}>
          {selectedAgent ? selectedAgent.name : "აირჩიე აგენტი"}
        </div>
      </div>
      {isOpen && (
        <div className="dropDownList">
          {selectedAgent && (
            <div className="dropDownItem">
              {selectedAgent.name} {/* Already selected agent */}
            </div>
          )}
          <div className="dropDownItem" onClick={handleAddAgent}>
            <img src={addAgentSvg} alt="Add Agent" />
            <span>ახალი აგენტის დამატება</span>
          </div>
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="dropDownItem"
              onClick={() => handleSelect(agent)}
            >
              {agent.name}
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
};

export default AgentDropDown;
