"use client";

import { useState } from "react";
import "./FilterComponent.css";

const FilterComponent = ({ fuelTypes, fireplaceType, setFireplaceType }) => {
  const firePlaceType = [
    { fueltype_id: 1, fueltype_name: "Hybrid - Wood/Electric" },
    { fueltype_id: 2, fueltype_name: "Bio-Ethanol" },
    { fueltype_id: 3, fueltype_name: "Gas" },
    { fueltype_id: 4, fueltype_name: "Wood" },
    { fueltype_id: 5, fueltype_name: "Electric" },
  ];

  const directionType = [
    { id: 1, name: "Single Sided" },
    { id: 2, name: "Double Sided" },
    { id: 3, name: "Triple Sided" },
    { id: 4, name: "Corner" },
    { id: 5, name: "Freestanding" },
  ];

  const [selectedFirePlace, setSelectedFirePlace] = useState(null);
  const [selectedDirection, setSelectedDirection] = useState(null);

  const handleFirePlaceClick = (id) => {
    setSelectedFirePlace((prev) => (prev === id ? null : id));
    setFireplaceType((prev) => (prev === id ? null : id));
  };

  const handleDirectionClick = (id) => {
    setSelectedDirection((prev) => (prev === id ? null : id));
  };

  const clearFilters = () => {
    setSelectedFirePlace(null);
    setSelectedDirection(null);
  };

  return (
    // <div className="flex flex-col gap-8 items-start relative content-center mx-10 my-10">
    <div className="flex flex-col gap-8 items-start relative content-center px-10 py-10 filter-component-container">
      {/* Filter Section */}
      <div className="text-lg mb-4 filter-heading-style">FILTER</div>

      {/* Fireplace Type */}
      <div className="selection-section-style">
        <div className="fireplace-type-style">
          <div className="text-sm font-semibold mb-2 fireplace-type-heading-style">
            FIREPLACE TYPE
          </div>
          <div className="flex gap-4 fireplace-type-heading-style fireplace-type-list-style">
            {fuelTypes &&
              fuelTypes?.length > 0 &&
              fuelTypes?.map((type) => (
                <button
                  key={type.fueltype_id}
                  className={`px-4 py-2 border-0 rounded-md ${
                    selectedFirePlace === type.fueltype_id &&
                    "button-active-style"
                  } fireplace-type-individual-style`}
                  onClick={() => handleFirePlaceClick(type.fueltype_id)}
                >
                  {type.fueltype_name}
                </button>
              ))}
          </div>
        </div>
        <div className="divider"></div>
        {/* Direction Type */}
        <div className="mb-6 fireplace-type-style">
          <div className="text-sm font-semibold mb-2 fireplace-type-heading-style">
            DIRECTION
          </div>
          <div className="flex gap-4 fireplace-type-heading-style fireplace-type-list-style">
            {directionType.map((direction) => (
              <button
                key={direction.id}
                className={`px-4 py-2 border-0 rounded-md ${
                  selectedDirection === direction.id && "button-active-style"
                } fireplace-type-individual-style`}
                onClick={() => handleDirectionClick(direction.id)}
              >
                {direction.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Clear Button */}
      {/* <button
        className="px-6 py-2 bg-gray-200 text-black font-semibold rounded-md hover:bg-gray-300"
        onClick={clearFilters}
      >
        Clear Filters
      </button> */}
    </div>
  );
};

export default FilterComponent;
