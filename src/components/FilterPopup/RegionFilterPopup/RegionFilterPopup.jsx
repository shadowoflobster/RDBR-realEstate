import React from "react";
import './RegionFilterPopup.css';

const RegionFilterPopup = ({ onSelect, selectedRegions = [], applyFilters }) => {
  const regions = [
    'ქართლი', 'გურია','აჭარა', 'კახეთი', 'რაჭა', 
     'სვანეთი', 'იმერეთი', 'ლეჩხუმი',
    'მცხეთა-მთიანეთი', 'სამეგრელო', 'სამცხე-ჯავახეთი', 'თბილისი'
  ];

  return (
    <div className="regionFilterDiv">
      <div className="regionFilterContent">
        <span className="regionFilterHeader">რეგიონის მიხედვით</span>
        <div className="regionFilterChecks">
          {regions.map((region) => (
            <label key={region} className="regionFilterLabel">
              <input
                className="regionFilterCheckBox"
                type="checkbox"
                checked={selectedRegions.includes(region)}
                onChange={() => onSelect('region', region)}
              />
              {region}
            </label>
          ))}
        </div>
        <div className="setRegionFilterBtnDiv">
          <button className="setRegionFilterBtn" type="button" onClick={applyFilters}>
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegionFilterPopup;






