"use client";
import "../product.css";
const DeliveryOption = ({ options }) => (
  <div className="col-delivery">
    <p className="materialfinish ui text size-h6">Delivery</p>
    <div className="delivery-address">
      {options.map((option, index) => (
        <label className="delivery-2 address ui radio" key={index}>
          <input
            type="radio"
            className="ui radio size-xs primary"
            value={option.value}
            name="delivery"
          />
          <span>{option.description}</span>
        </label>
      ))}
    </div>
  </div>
);

export default DeliveryOption;
