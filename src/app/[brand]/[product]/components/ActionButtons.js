"use client";
import "../product.css";
const ActionButtons = () => (
    <div className="row-btn">
      <button className="flex-row-center-center add_to_cart ui button colour_codes_toogle_off_2 size-lg fill square">
        Add to Cart
      </button>
      <button className="flex-row-center-center send_an_enquiry ui button blue_900 size-lg outline square">
        Send an enquiry
      </button>
    </div>
  );
  
  export default ActionButtons;