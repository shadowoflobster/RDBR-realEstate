import React, {  useState } from "react";
import './PriceFilterPopup.css';
import NumberFormat from "../../NumberFormater";

const PriceFilterPopup = ({ selectedPrice, onPriceChange, applyFilters, onClose }) => {
  const [minPrice, setMinPrice] = useState(selectedPrice.min || '');
  const [maxPrice, setMaxPrice] = useState(selectedPrice.max || '');
  const [error, setError] = useState(null);
  const Prices = [50000, 100000, 150000, 200000, 300000];

  

  const handlePriceChange = (type, value) => {
    const valueString = typeof value === 'number' ? value.toString() : value;

    const numericValue = valueString === '' ? '' : Number(valueString.replace(/[^0-9]/g, ''));

    if (type === 'min') {
      if (numericValue !== '' && maxPrice !== '' && numericValue > Number(maxPrice)) {
        setError("Min price is greater than max price");
      } else {
        setError(null);
      }
      setMinPrice(numericValue);
    } else if (type === 'max') {
      if (numericValue !== '' && minPrice !== '' && numericValue < Number(minPrice)) {
        setError("Max price is less than min price");
      } else {
        setError(null);
      }
      setMaxPrice(numericValue);
    }

    onPriceChange(type, numericValue);
  };

  const handlePriceClick = (type, value) => {
    handlePriceChange(type, value);
    onPriceChange(type, value);
  };

  const handleSubmit = () => {
    console.log('Submitting with minPrice:', minPrice, 'maxPrice:', maxPrice);

    if (!error) {
      onPriceChange('min', minPrice);
      onPriceChange('max', maxPrice);
      applyFilters();
      onClose();
      setMinPrice('');
      setMaxPrice('');

    }
  };
  

  return (
    <div className="priceFilterDiv">
      <div className="priceFilterContentDiv">
        <span className="priceFilterHeader">ფასის მიხედვით</span>
        <div className="InputsDiv">
          <div className={error && minPrice > maxPrice ? "priceInputError" : "priceInputDiv"}>
            <input
              className="PriceInput"
              value={minPrice}
              placeholder="დან"
              onChange={(e) => handlePriceChange('min', e.target.value)}
            />
            <span className="priceInputCurrency">₾</span>
          </div>
          <div className={error && maxPrice < minPrice ? "priceInputError" : "priceInputDiv"}>
            <input
              className="PriceInput"
              value={maxPrice}
              placeholder="მდე"
              onChange={(e) => handlePriceChange('max', e.target.value)}
            />
            <span className="priceInputCurrency">₾</span>
          </div>
        </div>
        {error && <div className="priceFilterError">ჩაწერეთ ვალიდური მონაცემები</div>}

        <div className="minMaxPriceDiv">
          <div className="PriceDiv">
            <span className="PriceHeader">მინ.ფასი</span>
            <div className="Prices">
              {Prices.map((price) => (
                <span className="priceComponent" key={price} onClick={() => handlePriceClick('min', price)}>
                  <NumberFormat number={price} />₾
                </span>
              ))}
            </div>
          </div>
          <div className="PriceDiv">
            <span className="PriceHeader">მაქს.ფასი</span>
            <div className="Prices">
              {Prices.map((price) => (
                <span className="priceComponent" key={price} onClick={() => handlePriceClick('max', price)}>
                  <NumberFormat number={price} />₾
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="setPriceFilterBtnDiv">
          <button className="setPriceFilterBtn" type="button" onClick={handleSubmit}>
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterPopup;
