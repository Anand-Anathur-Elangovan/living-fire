"use client";
import React from "react";
import Image from "next/image";
import "./footer.css";
import InstagramIcon from "@/public/assets/homePage/instagram.svg";
import FacebookIcon from "@/public/assets/homePage/facebook.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerRow">
        {/* Column 1: Showrooms */}
        <div className="footer-column1">
          <div className="foot-heading uppercase">
            <p>Our Showrooms</p>
          </div>
          <div className="columnheadingfi-2">
            <div className="foot-heading ">
              <p>Richmond Showroom</p>
            </div>
            <div className="columnbodysmall">
              <p>
                359-361 Swan Street, <br />
                Richmond, Victoria 3121
              </p>
              <p>(03) 9977 7886</p>
            </div>
          </div>
          <div className="columnheadingfi-3">
            <div className="foot-heading heading7 font-bold">
              <p>Moorabbin Showroom</p>
            </div>
            <div className="columnbodysmall">
              <p>
                148-150 Cochranes Road, <br />
                Moorabbin, Victoria 3189
              </p>
              <div className="column_two">
                <div className="heading7">
                  <p>(03) 9977 7887</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white">
            <p>info@livingfire.com.au</p>
          </div>
        </div>

        {/* Column 2: Information */}
        <div className="footer-column2 flex flex-col gap-2">
          <div className="foot-heading headingfive ui text size-h6 uppercase text-base">
            <p>Information</p>
          </div>
          <ul className="flex flex-col gap-2 font-sans text-sm text-white font-light">
            <li>
              <a href="/ourStory">
                <p className="nofilechosen ui text size-body_small">
                  Our Story
                </p>
              </a>
            </li>
            <li>
              <a href="/maintenanceService">
                <p className="nofilechosen ui text size-body_small">
                  Our Services
                </p>
              </a>
            </li>
            <li>
              <a href="/contactUs">
                <p className="nofilechosen ui text size-body_small">
                  Contact Us
                </p>
              </a>
            </li>
            {/* <li>
              <a href="#">
                <p className="nofilechosen ui text size-body_small">Gallery</p>
              </a>
            </li>
            <li>
              <a href="#">
                <p className="nofilechosen ui text size-body_small">Blog</p>
              </a>
            </li> */}
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div className="footer-column3">
          <div className="foot-heading headingfive ui text size-h6 uppercase">
            <p>Customer Care</p>
          </div>
          <ul className="flex flex-col gap-2 font-sans text-sm text-white font-light">
            {/* <li>
              <a href="#">
                <p className="nofilechosen ui text size-body_small">
                  Trade Accounts
                </p>
              </a>
            </li> */}
            <li>
              <a href="/warranty" className="bodysmall-link">
                <p className="nofilechosen ui text size-body_small">
                  Warranty &amp; Servicing
                </p>
              </a>
            </li>
            <li>
              <a href="/terms" className="bodysmall-link-1">
                <p className="nofilechosen ui text size-body_small">
                  Terms of Service
                </p>
              </a>
            </li>
            <li>
              <a href="/privacyPolicy" className="bodysmall-link">
                <p className="nofilechosen ui text size-body_small">
                  Privacy Policy
                </p>
              </a>
            </li>
          </ul>
          {/* <p className="headingfive ui text size-h6">Specs &amp; Guides</p>
          <ul>
            <li>
              <a href="#" className="bodysmall-link-3">
                <p className="nofilechosen ui text size-body_small">
                  Industry Hub
                </p>
              </a>
            </li>
            <li>
              <a href="#" className="bodysmall-link-1">
                <p className="nofilechosen ui text size-body_small">
                  Product Specifications
                </p>
              </a>
            </li>
            <li>
              <a href="#" className="bodysmall-link-1">
                <p className="nofilechosen ui text size-body_small">Glossary</p>
              </a>
            </li>
          </ul> */}
        </div>

        {/* Column 4: Stay in the Loop */}
        <div className="footer-column4">
          <div className="rowheadingfive-2">
            <p className="headingfive_six ui text size-h3 font-sans text-lg text-white font-extralight">
              Stay in the loop
            </p>
          </div>
          <label className="email ui input gray_900 size-xs underline square">
            <input
              name="email"
              placeholder="Email"
              type="text"
              className="placeholder-shown:text-[#94999F]"
            />
          </label>
          <div className="flex flex-row gap-3">
            <Image
              src={InstagramIcon} //"/assets/instagram" // Replace with actual path
              alt="Instagram Icon"
              className="bg-white"
              width={24}
              height={24}
              unoptimized
            />
            <Image
              src={FacebookIcon} //"/assets/facebook" // Replace with actual path
              alt="Facebook Icon"
              className="bg-white"
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="heading7">
            <p className="bodysmall">© Copyright 2024 Living Fire</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
