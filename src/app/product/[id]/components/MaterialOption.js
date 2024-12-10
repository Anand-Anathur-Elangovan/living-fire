"use client";
import { transformImageSrc } from "@/src/helper/utils/component/productSpecsDrawer/transformImageSrc/transformImageSrc";
import "../product.css";
import Image from "next/image";

const MaterialOption = ({ options }) => (
  <div className="col-material">
    <p className="materialfinish ui text size-h6">Material & Finish Options</p>
    <div className="colourchoices">
      {options.map((option, index) => (
        <div className="colourchoice" key={index}>
          <Image
            src={transformImageSrc(option?.imgSrc)}
            alt={option.alt}
            className="reflectiveblack"
            layout="responsive"
            unoptimized
          />
          <label className="choice-radio">
            <input
              type="radio"
              className="ui radio size-xs primary"
              value={option.value}
              name="delivery"
            />
            <p className="zeroclearancete ui text size-body_medium">
              {option.description}
            </p>
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default MaterialOption;
