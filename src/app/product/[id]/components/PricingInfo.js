"use client";
import "../product.css";
const PricingInfo = ({ price, stockStatus }) => (
    <div className="rowprice">
      <p className="price ui text size-textlg">
        <span>{price}&nbsp;</span>
        <span className="price-span">(inc gst)</span>
      </p>
      <div className="rowinstock">
        <p className="instock ui text size-textxs">{stockStatus}</p>
      </div>
    </div>
  );
  
  export default PricingInfo;