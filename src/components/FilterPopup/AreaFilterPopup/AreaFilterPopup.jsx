import React, {  useState } from "react";
import './AreaFilterPopup.css';
import NumberFormat from "../../NumberFormater";

const AreaFilterPopup = ({ selectedArea, onAreaChange, applyFilters, onClose }) => {
  const [minArea, setMinArea] = useState(selectedArea.min || '');
  const [maxArea, setMaxArea] = useState(selectedArea.max || '');
  const [error, setError] = useState(null);
  const Areas = [50000, 100000, 150000, 200000, 300000];

  

  const handleAreaChange = (type, value) => {
    const valueString = typeof value === 'number' ? value.toString() : value;

    const numericValue = valueString === '' ? '' : Number(valueString.replace(/[^0-9]/g, ''));

    if (type === 'min') {
      if (numericValue !== '' && maxArea !== '' && numericValue > Number(maxArea)) {
        setError("Min Area is greater than max Area");
      } else {
        setError(null);
      }
      setMinArea(numericValue);
    } else if (type === 'max') {
      if (numericValue !== '' && minArea !== '' && numericValue < Number(minArea)) {
        setError("Max Area is less than min Area");
      } else {
        setError(null);
      }
      setMaxArea(numericValue);
    }

    onAreaChange(type, numericValue);
  };

  const handleAreaClick = (type, value) => {
    handleAreaChange(type, value);
    onAreaChange(type, value);
  };

  const handleSubmit = () => {
    console.log('Submitting with minArea:', minArea, 'maxArea:', maxArea);

    if (!error) {
      onAreaChange('min', minArea);
      onAreaChange('max', maxArea);
      applyFilters();
      onClose();
      setMinArea('');
      setMaxArea('');

    }
  };
  

  return (
    <div className="areaFilterDiv">
      <div className="areaFilterContentDiv">
        <span className="areaFilterHeader">ფართობის მიხედვით</span>
        <div className="InputsDiv">
          <div className={error && minArea > maxArea ? "areaInputError" : "areaInputDiv"}>
            <input
              className="AreaInput"
              value={minArea}
              placeholder="დან"
              onChange={(e) => handleAreaChange('min', e.target.value)}
            />
            <span className="areaInputCurrency">₾</span>
          </div>
          <div className={error && maxArea < minArea ? "areaInputError" : "areaInputDiv"}>
            <input
              className="AreaInput"
              value={maxArea}
              placeholder="მდე"
              onChange={(e) => handleAreaChange('max', e.target.value)}
            />
            <span className="areaInputCurrency">₾</span>
          </div>
        </div>
        {error && <div className="areaFilterError">ჩაწერეთ ვალიდური მონაცემები</div>}

        <div className="minMaxAreaDiv">
          <div className="AreaDiv">
            <span className="AreaHeader">მინ. ფასი</span>
            <div className="Areas">
              {Areas.map((area) => (
                <span className="areaComponent" key={area} onClick={() => handleAreaClick('min', area)}>
                  <NumberFormat number={area} />₾
                </span>
              ))}
            </div>
          </div>
          <div className="AreaDiv">
            <span className="AreaHeader">მაქს.ფასი</span>
            <div className="Area">
              {Areas.map((area) => (
                <span className="areaComponent" key={area} onClick={() => handleAreaClick('max', area)}>
                  <NumberFormat number={area} />₾
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="setAreaFilterBtnDiv">
          <button className="setAreaFilterBtn" type="button" onClick={handleSubmit}>
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreaFilterPopup;
