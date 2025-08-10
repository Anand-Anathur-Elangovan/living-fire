"use client";
import "../product.css";
const DescriptionSection = ({ title, text }) => (
  <div className="columndesc">
    <p className="materialfinish ui text size-h6">{title}</p>
    <p className="description ui text size-body_medium">{text}</p>
  </div>
);
export default DescriptionSection;
