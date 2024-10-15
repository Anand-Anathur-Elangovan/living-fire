"use client";
import React from "react";
import "./maintenanceService.css";
import gasFireplace from "../assets/maintenanceServicePage/image1.png";
import woodFireplace from "../assets/maintenanceServicePage/image2.png";
import electricFireplace from "../assets/maintenanceServicePage/image3.png";
import Image from "next/image";

const MaintenanceService = () => {
  return (
    <div className="maintenance-service-container">
      {/* <div className="breadcrumb">
        Home / Maintenance & Servicing
      </div> */}
      <h1 className="title">FIREPLACE MAINTENANCE & SERVICING</h1>
      <p className="description">
        At Living Fire, our fireplaces are built to last, but a little care can
        go a long way in keeping them performing beautifully year after year.
        Regular maintenance not only helps extend the life of your fireplace but
        also ensures it remains safe and efficient. Below are some simple tips
        to help you maintain your fireplace in top condition.
      </p>
      <button className="book-service-btn">BOOK A SERVICE</button>

      {/* Fireplaces Sections */}
      <div className="fireplace-sections">
        <div className="fireplace-section">
          <Image
            src={gasFireplace}
            alt="Gas Fireplace"
            className="fireplace-Image"
          />
          <h2>GAS FIREPLACES</h2>
          <p>
            If you own a gas fireplace, regular servicing is key to keeping it
            safe and efficient. Most manufacturers recommend an annual service,
            which also helps maintain your warranty...
          </p>
        </div>

        <div className="fireplace-section">
          <Image
            src={woodFireplace}
            alt="Wood Fireplace"
            className="fireplace-Image"
          />
          <h2>WOOD FIREPLACES</h2>
          <p>
            To keep your wood fireplace running smoothly, its important to have
            your chimney cleaned annually by a certified professional. This
            removes soot and creosote build-up...
          </p>
        </div>

        <div className="fireplace-section">
          <Image
            src={electricFireplace}
            alt="Electric Fireplace"
            className="fireplace-Image"
          />
          <h2>ELECTRIC FIREPLACES</h2>
          <p>
            Maintaining an electric fireplace is simple. Depending on the model,
            you may need to replace the light bulbs every few years. You should
            also clean the heater annually to keep it free from dust and
            debris...
          </p>
        </div>
      </div>

      {/* Book A Service Form */}
      <div className="book-service-section">
        <h2>BOOK A SERVICE</h2>
        <p>
          For assistance or to schedule a service, contact us at 03 99 777 888
          or fill out the form below.
        </p>

        <form className="service-form">
          <div className="form-group">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Phone Number" required />
            <input type="email" placeholder="Email" required />
          </div>

          <div className="form-group">
            <input type="text" placeholder="Street Address" required />
            <input type="text" placeholder="Suburb" required />
          </div>

          <div className="form-group">
            <input type="text" placeholder="State" required />
            <input type="text" placeholder="Postcode" required />
          </div>

          <textarea placeholder="Description" required></textarea>

          <div className="form-group">
            <select required>
              <option>Brand</option>
              {/* Add more brand options */}
            </select>
            <input type="text" placeholder="Serial Number" required />
          </div>

          <div className="file-upload">
            <label>Proof of Purchase</label>
            <input type="file" />
          </div>

          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceService;
