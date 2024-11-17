"use client";
import React, { useState } from "react";
import "./privacypolicy.css";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: null,
      content: `At Living Fire, we understand that we have a responsibility to protect and respect your privacy and look after your personal data. This privacy notice explains what data we collect, how we use your personal data, reasons we may need to disclose it to others, and how we keep it securely. Living Fire has taken into account the additional safeguards under General Data Protection Regulations (GDPR) effective 1st July 2017.`,
    },
    {
      title: "Who is responsible for personal data?",
      content: `Your personal data is controlled ultimately by Living Fire Pty Ltd, a company registered in Australia with ABN number 92 620 098 535 whose registered office is at 361 Swan Street, Richmond, Victoria 3121, Australia.`,
    },
    {
      title: "Paul Agnew Designs Warranty",
      content: `Paul Agnew Designs, through its exclusive distribution partner in Australia and New Zealand, offers a Limited Warranty to the original purchaser, as long as the product stays in its original place of installation. This warranty is in addition to the rights you have under Australian Consumer Law and does not limit those rights in any way.`,
    },
    {
      title: "What personal data do we collect?",
      content: `We collect and use personal data (including name, address, telephone number, email, and IP addresses) to better provide you with the required services, or information. In the case of IP addresses, these are collected to give the optimum browsing experience of the products and services available in your geographic region. We may also collect data from you in conversation on the phone, via e-mail exchange, or in person in our showrooms.`,
    },
    {
      title: "How do we use your personal data?",
      content: `We use information about you in the following ways: To process orders that you have submitted to us; to provide you with products and services; to comply with our contractual obligations we have with you; to help us identify you and any accounts you hold with us; to enable us to review, develop and improve the website and services; to provide customer care, including responding to your requests if you contact us with a query.`,
    },
    {
      title: "Keeping our records accurate",
      content: `We aim to keep our information about you as accurate as possible. If you would like to review, change, or delete the details you have supplied us with, please contact us at info@livingfire.com.au.`,
    },
    {
      title: "Cookies policy",
      content: `Cookies are small data files that your browser places on your computer or device. Cookies help your browser navigate a website and cannot collect any information stored on your computer or files. We use cookies to learn more about the way you interact with our content and help us to improve your experience when visiting our website.`,
    },
    {
      title: "Your rights",
      content: `You have the right to object to our use of your personal data, or ask us to delete, remove or stop using it if there is no need for us to keep it. If you stop us from processing your personal data, it may delay or prevent us from fulfilling our contractual obligations to you.`,
    },
    {
      title: "Changes to this policy",
      content: `From time to time, we may make changes to this privacy policy. If we make any substantial changes to this privacy policy and the way in which we use your personal data, we will post these changes on this page.`,
    },
  ];

  return (
    <div className="privacy-policy-container-body">
      <div className="privacy-policy-container">
        <div className="title-group">
          <h1 className="title">PRIVACY POLICY</h1>
        </div>
        <hr class="custom-divider" />
        <div className="privacy-container">
          <div className="privacy-content">
            {sections.map((section, index) => (
              <div key={index} className="section">
                {section.title && <h2 className="section-title">{section.title}</h2>}
                <p>{section.content}</p>
                <br/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
