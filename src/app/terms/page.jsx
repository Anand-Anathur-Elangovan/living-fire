"use client";
import React, { useState } from "react";
import "./terms.css";

const Terms = () => {

  const content = ` 
We are committed to ensuring that the product information displayed on our website, in catalogues and advertisements, including any information relating to the pricing of our products, is correct and up to date. Please note that any typographical, clerical, or other omissions in our sales literature, including product descriptions, features, and specifications, quotation, pricing, or invoice, or indeed any document bearing information issued by Living Fire, will be subject to correction without any liability on our part.
While we make every effort to ensure that the information detailed in our product descriptions, features, specifications, and pricing quotations is accurate, it remains the responsibility of those purchasing our products to verify that all such information is correct.
We reserve the right to adjust the pricing of any products in our range and to discontinue any model at our discretion. We advise all customers to contact the company directly in order to verify that all product details provided are accurate and up to date.
All prices displayed on our website and in our printed marketing materials are exclusive of the installation fee. The prices shown relate to the unit only, and do not include any additional/optional extras that may be required, such as flue kits, fascias, remote controls, media, hearths, mantels, ducting, brackets, etc. Please refer to your final quote for any additional fixtures and fittings that may be required for your project.
All heating capacities in our product range are to be used in accordance with manufacturers’ guidelines, the operation of which may depend on environmental factors such as a site’s insulation and building characteristics, etc.
Returns or cancellations are not accepted by Living Fire without prior arrangement made between the customer and the company directly and in writing. Should a return or cancellation be authorised, a 30% handling charge will be deducted from your refund or your full purchase price before it has been processed. If products are returned, all products and packaging must be in their original condition, free from damage and blemishes, in order for your return or cancellation to be valid. Any bespoke items which have arrived with the customer in good working order and good condition will not be accepted for return or cancellation, as all made-to-order items are non-refundable.
Any products which have been awarded or supplied through special promotions are not accepted for return or cancellation, nor can these products be redeemed for their cash value or traded for any other product from Living Fire, unless otherwise specified.
All images used in our advertising are for display purposes only, and it remains the responsibility of the customer to verify which aspects are included in the price displayed, and which would be considered as optional/added extras. Please clarify such details with our sales staff before placing your order with us.
It is the customer’s responsibility to inspect the items purchased upon delivery. Any surface damage, breakages, missing parts, or functional issues must be reported in writing directly to the company within 7 days of receipt of the product(s), with images provided (where possible) for evidence. The cost of repair or replacement for any faults reported after this 7-day period will no longer be the responsibility of Living Fire. Living Fire adheres to the guidelines of ACCC with regards to the warranties offered.
For the products that need to be ordered from other sites/warehouses, the same-day collection will, unfortunately, be unavailable.
Whilst we cannot guarantee collection on a specified date, please advise our sales staff on which date you would like to collect your order and we will endeavour to meet your request. Confirmation of your collection date will be provided over the phone once your order has been placed.
Please refer to the manufacturer of the product for any information regarding warranties.
Should the price of the product you have purchased be decreased at any point after you have been invoiced and your order dispatched, we will not be liable to issue a partial refund on your order, and you will still be required to pay the price outlined on the invoice in full.
All prices shown are inclusive of GST and are subject to change at any time at the discretion of Living Fire.
Any time-restricted offers apply from the date of the initial publication and to the products explicitly outlined within the offer. Offers cannot be applied to quotes, orders, or invoices which pre-date the publication date.
All offers are limited to be redeemed once per customer unless otherwise specified.
Discounts are applied to the Recommended Retail Price of the unit (RRP), and will not be applied to trade items or any items which have already been discounted.
Offers will not be redeemable in conjunction with any other promotional offer.
Installation charges are subject to site inspection.
All offers promoting free installation are valid on a standard installation for that particular unit, to the value of $800 or less. Any further variations to a standard installation will be quoted and invoiced accordingly.
All advertised offers will display pricing for the unit only, exclusive of any additional extras unless otherwise stated.
All offers promoting a free flue kit will include a standard flue kit or specified flue kit as appropriate to that particular unit.
Products must be ordered and paid for in full by 5 pm on the final date of the promotional period in order of the offer to stand. Finance options will not be available, and offers will not be extended past nominated dates, nor will the terms of any offers be extended for any reason.
Any prizes awarded will be exclusive of delivery, therefore delivery fees will be payable by the customer.
Service & Maintenance Terms of Service
Servicing costs for any product(s) are exclusive of any cost associated with product repair. Repairs are billed separately to servicing or may have to be referred back to the manufacturer.
Certain brands supplied by Living Fire outline their own restrictions on servicing and maintenance. Some brands require that a unit be serviced within a specific time frame in order for the manufacturer’s warranty to be valid. Please refer to the manufacturer’s terms and conditions before and after purchase.
  `;

  return (
    <div className="privacy-policy-container-body">
      <div className="privacy-policy-container">
        <div className="title-group">
          <h1 className="title">GENERAL TERMS OF SERVICE</h1>
        </div>
        <hr className="custom-divider" />
        <div className="privacy-container">
          <div className="privacy-content">
            {content
              .split("\n")
              .map(
                (line, index) => line.trim() && <p key={index}>{line.trim()}</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
  };

export default Terms;
