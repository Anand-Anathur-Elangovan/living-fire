"use client";
import React, { useState } from "react";
import "./privacypolicy.css";
import Head from "next/head";

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
    <>
      {/* <br/><br/> */}
      <div className="privacy-policy">
        <div className="privacy-col">
          <div className="privacy-text">
            <p className="privacypolicy ui text size-text2xl">Privacy Policy</p>
          </div>
          <div className="rowdescription">
            <div class="column-one">
              <div class="">
                <p class="description ui text size-body_small">
                  At Living Fire, we understand that we have a responsibility to
                  protect and respect your privacy and look after your personal
                  data.
                  <br />
                  This privacy notice explains what data we collect, how we use
                  your personal data reasons we may need to disclose it to
                  others, and how we keep it securely. Living Fire has taken
                  into account the additional safeguards under General Data
                  Protection Regulations (GDPR) effective 1st July 2017.
                </p>
                <div class="columnwhois_one">
                  <p class="whois_one ui text size-h4">
                    Who is responsible for the personal data collected on this
                    site?
                  </p>
                  <p class="description ui text size-body_small">
                    Your personal data is controlled ultimately by Living Fire
                    Pty Ltd a company registered in Australia with ABN number 92
                    620 098 535 whose registered office is at 361 Swan Street,
                    Richmond, Victoria 3121, Australia.
                  </p>
                </div>
                <div class="columnhowdoweus">
                  <p class="howdoweuse ui text size-h4">
                    Paul Agnew Designs Warranty
                  </p>
                  <p class="description-2 ui text size-body_small">
                    Paul Agnew Designs, through its exclusive distribution
                    partner in Australia and New Zealand, offers a Limited
                    Warranty to the original purchaser, as long as the product
                    stays in its original place of installation.
                    <br />
                    <br />
                    This warranty is in addition to the rights you have under
                    Australian Consumer Law and does not limit those rights in
                    any way.
                  </p>
                </div>
                <div class="columnhowdoweus">
                  <p class="howdoweuse ui text size-h4">
                    What personal data do we collect and why?
                  </p>
                  <p class="description-2 ui text size-body_small">
                    One of the purposes of our website is to inform you of who
                    we are and what we do. We collect and use personal data
                    (including name, address, telephone number, email and IP
                    addresses) to better provide you with the required services,
                    or information. In the case of IP addresses, these are
                    collected to give the optimum browsing experience of the
                    products and services available in your geographic region.
                    <br />
                    <br />
                    We may also collect data from you in conversation on the
                    phone, via e-mail exchange, or in person in our showrooms.
                    <br />
                    <br />
                    If at any time you wish us to stop using your information
                    for any or all of the above purposes, please contact us at
                    info@livingfire.com.au. We will stop the use of your
                    information for such purposes as soon as it is reasonably
                    possible to do so.
                    <br />
                    We respect your personal data and therefore we will take
                    appropriate steps to ensure that your privacy rights
                    continue to be protected if we transfer your information
                    outside of Australia. This might be necessary where you have
                    told us that you are interested in receiving our
                    goods/services outside Australia. Except as set out in this
                    privacy policy, we will not disclose any personally
                    identifiable information without your permission unless we
                    are legally entitled or required to do so (for example, if
                    required to do so by legal process or for the purposes of
                    prevention of fraud or other crime) or if we believe that
                    such action is necessary to protect and/or defend our
                    rights, property or personal safety and those of our
                    users/customers or other individuals.
                    <br />
                    <br />
                    Please be assured that we will not use your information for
                    any of the purposes mentioned if you have indicated that you
                    do not wish us to use your information in this way when
                    submitting the information or at a later stage.
                  </p>
                </div>
              </div>
              <div className="columnhowdoweus">
                <p className="howdoweuse ui text size-h4">
                  How do we use your personal data?
                </p>
                <div className="description-1 ui text size-body_small">
                  <ul>
                    <li>We use information about you in the following ways:</li>
                    <li>To process orders that you have submitted to us;</li>
                    <li>To provide you with products and services;</li>
                    <li>
                      To comply with our contractual obligations we have with
                      you;
                    </li>
                    <li>
                      To help us identify you and any accounts you hold with us;
                    </li>
                    <li>
                      To enable us to review, develop and improve the website
                      and services;
                    </li>
                    <li>
                      To provide customer care, including responding to your
                      requests if you contact us with a query;
                    </li>
                    <li>
                      To administer accounts, process payments and keep track of
                      billing and payments;
                    </li>
                    <li>
                      To detect fraud and to make sure what you have told us is
                      correct;
                    </li>
                    <li>To carry out marketing and statistical analysis;</li>
                    <li>To review job applications;</li>
                    <li>
                      To notify you about changes to our website and services;
                    </li>
                    <li>
                      To provide you with information about products or services
                      that you request from us or which we feel may interest
                      you, where you have consented to be contacted for such
                      purposes;
                    </li>
                  </ul>

                  <span>
                    We may automatically collect non-personal information about
                    you such as the type of Internet browsers you use or the
                    website from which you linked to our website. You cannot be
                    identified from this information and it is only used to
                    assist us in providing an effective service on this website.
                    We may from time to time supply third parties with this
                    non-personal or aggregated data for uses in connection with
                    this website.
                  </span>
                </div>
              </div>
              <div class="columnhowdoweus">
                <p class="howdoweuse ui text size-h4">
                  Keeping our records accurate
                </p>
                <p class="description-2 ui text size-body_small">
                  We aim to keep our information about you as accurate as
                  possible. If you would like to review, change or delete the
                  details you have supplied us with, please contact us at
                  info@livingfire.com.au.
                </p>
              </div>
              <div class="columnwhois_one">
                <p class="whois_one ui text size-h4">
                  Who is responsible for the personal data collected on this
                  site?
                </p>
                <p class="description ui text size-body_small">
                  Your personal data is controlled ultimately by Living Fire Pty
                  Ltd a company registered in Australia with ABN number 92 620
                  098 535 whose registered office is at 361 Swan Street,
                  Richmond, Victoria 3121, Australia.
                </p>
              </div>
              <div class="columnhowdoweus">
                <p class="howdoweuse ui text size-h4">
                  Security of your personal data
                </p>
                <p class="description-2 ui text size-body_small">
                  We have implemented technology and policies with the objective
                  of protecting your privacy from unauthorised access and
                  improper use and will update these measures as new technology
                  becomes available, as appropriate.
                </p>
              </div>
            </div>
            <div class="column-two">
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">Cookies policy</p>
                <p class="description-2 ui text size-body_small">
                  We use the term “cookies” to refer to cookies and other
                  similar technologies covered by the EU Directive on privacy in
                  electronic communications.
                </p>
              </div>
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">Third Parties</p>
                <p class="description-2 ui text size-body_small">
                  For the avoidance of doubt, we do not and never shall sell
                  your personal data to third parties for marketing or
                  advertising purposes. We may pass on your personal data to
                  third parties for the provision of services on our behalf (for
                  example to process your payment), and to Living Fire
                  stockists, where you have given your consent in advance. On
                  our websites, we may have links to other websites or you may
                  be referred to our website through a link from another
                  website. We also use trusted partners to help us analyse the
                  personal data we collect.
                  <br />
                  <br />
                  Whilst we cannot be responsible for the privacy policies and
                  practices of third party websites, we take reasonable measures
                  to ensure that our partners have appropriate data protection
                  measures in place and therefore that they are compliant with
                  GDPR. We recommend that you check the privacy policy of each
                  website you visit to better understand your rights and
                  obligations especially when you are submitting any type of
                  content on those third party website. Please contact the owner
                  or operator of such website if you have any concerns or
                  questions.
                </p>
              </div>
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">What is a cookie?</p>
                <p class="description-2 ui text size-body_small">
                  Cookies are small data files that your browser places on your
                  computer or device. Cookies help your browser navigate a
                  website and the cookies themselves cannot collect any
                  information stored on your computer or your files. When a
                  server uses a web browser to read cookies they can help a
                  website deliver a more user-friendly service. To protect your
                  privacy, your browser only gives a website access to the
                  cookies it has already sent to you.
                </p>
              </div>
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">Why do we use cookies?</p>
                <p class="description-2 ui text size-body_small">
                  We use cookies to learn more about the way you interact with
                  our content and help us to improve your experience when
                  visiting our website.
                  <br />
                  Cookies remember the type of browser you use and which
                  additional browser software you have installed. They also
                  remember your preferences, such as language and region, which
                  remain as your default settings when you revisit the website.
                  Cookies also allow you to rate pages and fill in comment
                  forms.
                  <br />
                  <br />
                  Some of the cookies we use are session cookies and only last
                  until you close your browser, others are persistent cookies,
                  which are stored on your computer for longer.
                </p>
              </div>
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">
                  How are third party cookies used?
                </p>
                <p class="description-2 ui text size-body_small">
                  For some of the functions within our websites we use third
                  party suppliers, for example, when you visit a page with
                  videos embedded from or, links to, YouTube. These videos or
                  links (and any other content from third party suppliers) may
                  contain third party cookies and you may wish to consult the
                  policies of these third party websites for information
                  regarding their use of cookies.
                </p>
              </div>
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">
                  How do I reject and delete cookies?
                </p>
                <p class="description-2 ui text size-body_small">
                  You can choose to reject or block the cookies set by Living
                  Fire Pty Ltd or the websites of any third party suppliers by
                  changing your browser settings – see the Help function within
                  your browser for further details. Please note that most
                  browsers automatically accept cookies so if you do not wish
                  cookies to be used you may need to actively delete or block
                  the cookies.
                  <br />
                  <br />
                  You can also visit www.allaboutcookies.org – opens in new
                  window for details on how to delete or reject cookies and for
                  further information on cookies generally. For information on
                  the use of cookies in mobile phone browsers and for details on
                  how to reject or delete such cookies, please refer to your
                  handset manual.
                  <br />
                  <br />
                  Note, however, that if you reject the use of cookies you will
                  still be able to visit our websites but some of the functions
                  may not work correctly.
                </p>
              </div>
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">Your Rights</p>
                <p class="description-2 ui text size-body_small">
                  You have the right to object to our use of your personal data,
                  or ask us to delete, remove or stop using it if there is no
                  need for us to keep it. This is known as your right to be
                  forgotten. There are legal and accountancy reasons why we will
                  need to keep your data, but please do inform us if you think
                  we are retaining or using your personal data incorrectly.
                  <br />
                  <br />
                  If you stop us from processing your personal data, it may
                  delay or prevent us from fulfilling our contractual
                  obligations to you. It may also mean that we shall be unable
                  to provide our goods or services to you.
                  <br />
                  <br />
                  You have the right to receive from us your personal data that
                  we hold if you make the request. Please contact us at
                  info@livingfire.com.au.
                  <br />
                  You have the right to ask us not to process your personal data
                  for marketing purposes. You will be able to exercise this
                  choice by ticking the boxes situated on the relevant pages.
                  <br />
                  We will not contact you for marketing purposes unless you have
                  given us your prior consent.
                </p>
              </div>
              <div class="columncookiespo">
                <p class="howdoweuse ui text size-h4">Changes to this policy</p>
                <p class="description-2 ui text size-body_small">
                  From time to time we may make changes to this privacy policy.
                  If we make any substantial changes to this privacy policy and
                  the way in which we use your personal data we will post these
                  changes on this page and will do our best to notify you of any
                  significant changes. Please check our privacy policy on a
                  regular basis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
