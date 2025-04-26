import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    deliveryOption: '',
    postcode: '',
    dropdownOne: 'option1',
    dropdownThree: 'option1',
    message: '',
  });

  const [tab, setTab] = useState('sales'); // Manage active tab
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/contact', formData); // Replace with your API endpoint
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
        <link rel="stylesheet" href="/index.css" />
        <link rel="stylesheet" href="/contactus.css" />
      </Head>
      <div className="contact-us">
        <p className="contactus-text ui text size-text2xl">Contact Us</p>
      </div>

      <section>
        <AddressDetails />
      </section>

      <section>
        <div className="contactus-form">
          <div className="container">
            <div className="tab-list">
              <span
                className={`tablist-text ${tab === 'sales' ? 'active' : ''}`}
                onClick={() => setTab('sales')}
              >
                Sales Enquiry
              </span>
              <span
                className={`tablist-text ${tab === 'trade' ? 'active' : ''}`}
                onClick={() => setTab('trade')}
              >
                Trade Enquiry
              </span>
              <span
                className={`tablist-text ${tab === 'service' ? 'active' : ''}`}
                onClick={() => setTab('service')}
              >
                Service Enquiry
              </span>
              <span
                className={`tablist-text ${tab === 'warranty' ? 'active' : ''}`}
                onClick={() => setTab('warranty')}
              >
                Warranty Claim
              </span>
            </div>

            <div className="lineeleven_one"></div>

            {tab === 'sales' && (
              <form onSubmit={handleSubmit}>
                <p className="form-description ui text">
                  To get more information about a specific product or to receive a quote, fill out the form and our care team will get in touch.
                </p>
                <div className="row-form">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name*"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name*"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row-form">
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number*"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row-form">
                  <input
                    type="text"
                    name="deliveryOption"
                    placeholder="Pickup or delivery?"
                    value={formData.deliveryOption}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode*"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row-form">
                  <select
                    name="dropdownOne"
                    value={formData.dropdownOne}
                    onChange={handleInputChange}
                  >
                    <option value="option1">Option1</option>
                    <option value="option2">Option2</option>
                    <option value="option3">Option3</option>
                  </select>
                  <select
                    name="dropdownThree"
                    value={formData.dropdownThree}
                    onChange={handleInputChange}
                  >
                    <option value="option1">Option1</option>
                    <option value="option2">Option2</option>
                    <option value="option3">Option3</option>
                  </select>
                </div>
                <textarea
                  className="form_textarea ui textarea"
                  name="message"
                  placeholder="How can we help?*"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <button
                  className="flex-row-center-center submit ui button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const AddressDetails = () => (
  <div className="address-details">
    <p className="description ui text size-body_large">
      At Living Fire, we believe our work is complete only when our clients are enjoying the warmth of their new fireplace with a glass of wine in hand...
    </p>
    {/* Add your address cards here */}
  </div>
);

export default ContactUs;
