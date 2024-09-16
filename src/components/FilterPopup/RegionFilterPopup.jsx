import React from "react";
import './RegionFilterPopup.css'
import checked from'../SVGs/checked.svg'

const RegionFilterPopup = ({ onSelect, selectedRegions }) => {


    return (
        <div className="regionFilterDiv">
            <div className="regionFilterContent">
                <span className="regionFilterHeader">რეგიონის მიხედვით</span>
                <div className="regionFilterChecks">
                    <div className="regionFilterChecksRow">
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>ქართლი</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>კახეთი</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>იმერეთი</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>სამეგრელო</label>
                </div>
                <div className="regionFilterChecksRow">
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>გურია</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>რაჭა</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>ლეჩხუმი</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>სამცხე-ჯავახეთი</label>
                </div>
                <div className="regionFilterChecksRow">
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>აჭარა</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>სვანეთი</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>მცხეთა-მთიანეთი</label>
                    <label className="regionFilterLabel"><input className="regionFilterCheckBox" type="checkbox"/>თბილისი</label>
                </div>
                
                </div>
                <div className="setRegionFilterBtnDiv"><button className="setRegionFilterBtn" type="submit">არჩევა</button></div>
            </div>
            </div>
    )
}
export default RegionFilterPopup;


/* <div className="filterPopupdiv">
            {filterName === 'region' &&(
                <div className="regionFilterDiv">
                    
                </div>
            )}
        </div>*/