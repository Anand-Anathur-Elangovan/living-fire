"use client";
import "../product.css";
const PackageOption = ({ label, value, description }) => (
    <div className="col-package">
      <p className="materialfinish ui text size-h6">{label}</p>
      <label className="pricingoption">
        <input type="radio" className="ui radio size-xs primary" value={value} name="delivery" />
        <p className="price-1 ui text size-body_medium">{description}</p>
      </label>
    </div>
  );
  
  export default PackageOption;