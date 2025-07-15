"use client";
import React from "react";
import "./showrooms.css";

const Showrooms = () => {
  return (
    <section className="showrooms-section">
      <div className="showrooms-overlay">
        <div className="showrooms-content">
          <h2 className="showrooms-title">OUR SHOWROOMS</h2>
          <hr className="showrooms-divider" />
          <p className="showrooms-description">
            At Living Fire, we believe our work is complete only when our
            clients are enjoying the warmth of their new fireplace with a glass
            of wine in hand. To ensure every customer across Melbourne and
            Australia finds their perfect match, we’ve curated an exceptional
            selection of luxury fireplace brands.
          </p>
          <p className="showrooms-description">
            Visit our showrooms in Richmond and Moorabbin to experience our
            products firsthand.
          </p>
          <button className="showrooms-button">Contact Us</button>

          <div className="showrooms-address-container">
            <div className="showrooms-address-block">
              <h3 className="showrooms-address-title">RICHMOND SHOWROOM</h3>
              <address className="showrooms-address-text">
                359-361 Swan Street,
                <br />
                Richmond, Victoria 3121
                <br />
                <br />
                Monday - Friday:
                <br />
                9:00am - 5:00pm
                <br />
                <br />
                Saturday:
                <br />
                10:00am - 4:00pm
                <br />
                <br />
                (03) 9977 7886
              </address>
            </div>

            <div className="showrooms-address-block">
              <h3 className="showrooms-address-title">MOORABBIN SHOWROOM</h3>
              <address className="showrooms-address-text">
                148-150 Cochranes Road,
                <br />
                Moorabbin, Victoria 3189
                <br />
                <br />
                Monday - Friday:
                <br />
                8:30am - 4:30pm
                <br />
                <br />
                Saturday:
                <br />
                10:00am - 4:00pm
                <br />
                <br />
                (03) 9977 7887
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showrooms;
