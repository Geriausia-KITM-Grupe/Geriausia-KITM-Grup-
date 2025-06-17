import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact">
      <h2 className="contact__title">Contact us</h2>

      <div className="contact__grid">
        <div className="contact__card">
          <FaPhoneAlt className="contact__icon" />
          <h3 className="contact__heading">Phone Number</h3>
          <p>+370 2017 1003</p>
        </div>
        <div className="contact__card">
          <FaEnvelope className="contact__icon" />
          <h3 className="contact__heading">Email</h3>
          <p>info@kitm.com</p>
          <p>support@kitm.com</p>
        </div>
        <div className="contact__card">
          <FaMapMarkerAlt className="contact__icon" />
          <h3 className="contact__heading">Location</h3>
          <p>Laisvės al. 33, Kaunas, 44311 Kauno m. sav.</p>
        </div>
        <div className="contact__card">
          <FaClock className="contact__icon" />
          <h3 className="contact__heading">Working Hours</h3>
          <p>Monday to Friday</p>
          <p>07:00 AM to 06:00 PM</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
