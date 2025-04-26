"use client";
import { useEffect, useState } from "react";

const AddressDetails = () => (
    <div className="address-details">
      <p className="description ui text size-body_large">
        At Living Fire, we believe our work is complete only when our clients are
        enjoying the warmth of their new fireplace with a glass of wine in hand.
        To ensure every customer across Melbourne and Australia finds their
        perfect match, we have curated an exceptional selection of luxury
        fireplace brands. Visit our showrooms in Richmond and Moorabbin to
        experience our products firsthand.
      </p>
      <div className="locationinfo">
        <div className="column-address">
          <div className="heading">
            <p className="headingfive ui text">Richmond Showroom</p>
          </div>
          <div className="column-1">
            <div className="">
              <p className="bodysmall-1 ui text">
                359-361 Swan Street, <br />
                Richmond, Victoria 3121
              </p>
              <p className="openinghourstex ui text">
                Monday – Friday: 9am – 5pm
                <br />
                Saturday: 10am – 4pm
              </p>
            </div>
            <div>
              <div className="heading7">
                <p className="bodysmall_one ui text">info@livingfire.com.au</p>
              </div>
              <div className="heading7">
                <p className="bodysmall_two ui text">(03) 9977 7886</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column-address">
          <div className="heading">
            <p className="headingfive ui text">Moorabbin Showroom</p>
          </div>
          <div className="column-1">
            <div className="">
              <p className="bodysmall-1 ui text">
                148-150 Cochranes Road, <br />
                Moorabbin, Victoria 3189
              </p>
              <p className="openinghourstex ui text">
                Monday – Friday: 8:30am – 4:30pm
                <br />
                Saturday: 10am – 4pm
              </p>
            </div>
            <div>
              <div className="heading7">
                <p className="bodysmall_one ui text">info@livingfire.com.au</p>
              </div>
              <div className="heading7">
                <p className="bodysmall_two ui text">(03) 9977 7887</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column-address">
          <div className="heading">
            <p className="headingfive ui text">Moorabbin Warehouse</p>
          </div>
          <div className="column-1">
            <div className="">
              <p className="bodysmall-1 ui text">
                148-150 Cochranes Road, <br />
                Moorabbin, Victoria 3189
              </p>
              <div className="bodysmall-15">
                <p className="bodysmall_two ui text">
                  Monday – Friday: 9am – 3pm
                </p>
              </div>
              <p className="openinghourstex ui text">
                Pick-ups must be booked 2-3 Business days in advance
              </p>
            </div>
            <div>
              <div className="heading7">
                <p className="bodysmall_two ui text">Accounts: 03 9977 7880</p>
              </div>
              <div className="heading7">
                <p className="bodysmall_one ui text">
                  <span className="bodysmall_two-span"> Operations:</span>
                  <span> &nbsp;</span>
                  <span> 03 9977 7881</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  export default AddressDetails;