"use client";
import React from "react";
import "./maintenanceService.css";
import gasFireplace from "@/public/assets/maintenanceServicePage/image1.png";
import woodFireplace from "@/public/assets/maintenanceServicePage/image2.png";
import electricFireplace from "@/public/assets/maintenanceServicePage/image3.png";
import Image from "next/image";

const MaintenanceService = () => {
  return (
    <div className="maintenance-service-container-body">
      <div className="maintenance-service-container">
        {/* <div className="breadcrumb">
        Home / Maintenance & Servicing
      </div> */}
        <div className="title-group">
          <h1 className="title-category">FIREPLACE</h1>
          <h1 className="title">MAINTENANCE & SERVICING</h1>
        </div>
        <hr class="custom-divider" />
        <p className="description">
          At Living Fire, our fireplaces are built to last, but a little care
          can go a long way in keeping them performing beautifully year after
          year. Regular maintenance not only helps extend the life of your
          fireplace but also ensures it remains safe and efficient. Below are
          some simple tips to help you maintain your fireplace in top condition.
        </p>

        <button className="book-service-btn">BOOK A SERVICE</button>

        {/* Fireplaces Sections */}
        <div className="fireplace-sections">
          <div className="fireplace-section fireplace-section-2">
            <Image
              src={gasFireplace}
              alt="Gas Fireplace"
              className="fireplace-img"
            />
            <div className="left-side-section">
              <h2>GAS FIREPLACES</h2>
              <div className="left-side-typography-section">
                <p>
                  If you own a gas fireplace, regular servicing is key to
                  keeping it safe and efficient. Most manufacturers recommend an
                  annual service, which also helps maintain your warranty. Our
                  expert team is ready to assist with checks and
                  services—whether your fireplace is brand new or you’ve had it
                  for a while.
                </p>
                <p>
                  We’ve partnered with experienced specialists who can install,
                  service, and repair all our brands, including Paul Agnew
                  Designs, Regency, Heatmaster, Pacific Energy, and Kalora. Give
                  us a call anytime, even during the off-season, to ensure your
                  fireplace is in perfect condition for those cozy winter
                  nights.
                </p>
              </div>
            </div>
          </div>

          <div className="fireplace-section fireplace-section-2">
            <div className="left-side-section">
              <h2>WOOD FIREPLACES</h2>
              <div className="left-side-typography-section">
                <p>
                  To keep your wood fireplace running smoothly, it’s important
                  to have your chimney cleaned annually by a certified
                  professional. This removes soot and creosote build-up, and
                  it’s best done at the end of winter when humidity levels are
                  lower.
                </p>
                <p>
                  A chimney sweep can also check for structural issues in your
                  chimney, flue, and firebox. Keep a thin layer of ash in the
                  firebox, which helps insulate the fire. When cleaning out
                  ashes, ensure they’re fully cool and dispose of them safely.
                </p>
              </div>
            </div>
            <Image
              src={woodFireplace}
              alt="Wood Fireplace"
              className="fireplace-img"
            />
          </div>

          <div className="fireplace-section fireplace-section-2">
            <Image
              src={electricFireplace}
              alt="Electric Fireplace"
              className="fireplace-img"
            />
            <div className="left-side-section">
              <h2>ELECTRIC FIREPLACES</h2>
              <div className="left-side-typography-section">
                <p>
                  Maintaining an electric fireplace is simple. Depending on the
                  model, you may need to replace the light bulbs every few
                  years. You should also clean the heater annually to keep it
                  free from dust and debris. Make sure the fireplace is
                  disconnected from electricity and cooled down before wiping it
                  with a soft, dry cloth. Use a vacuum with a brush attachment
                  to gently clean heater outlets.
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr class="custom-divider" />
        {/* Book A Service Form */}
        {/* <div className="book-service-section">
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
        </div> */}
        <div className="book-service-section">
          <h2>BOOK A SERVICE</h2>
          <form className="service-form">
            <p>
              For assistance or to schedule a service, contact us at 03 99 777
              888 or fill out the form below. We are here to help you enjoy your
              fireplace at its very best!
            </p>
            <div className="form-group">
              <div className="input-wrapper">
                <input type="text" placeholder="First Name*" required />
              </div>
              <div className="input-wrapper">
                <input type="text" placeholder="Last Name*" required />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input type="text" placeholder="Phone Number*" required />
              </div>
              <div className="input-wrapper">
                <input type="email" placeholder="Email*" required />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input type="text" placeholder="Street Address*" required />
              </div>
              <div className="input-wrapper">
                <input type="text" placeholder="Suburb*" required />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input type="text" placeholder="State*" required />
              </div>
              <div className="input-wrapper">
                <input type="text" placeholder="Postcode*" required />
              </div>
            </div>

            <div className="input-wrapper-full">
              <textarea placeholder="Description*" required></textarea>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <select required>
                  <option value="">Brand</option>
                  {/* Add more brand options here */}
                </select>
              </div>
              <div className="input-wrapper">
                <input type="text" placeholder="Serial Number" required />
              </div>
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
    </div>
  );
};

export default MaintenanceService;
