import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <span className="footer__copyright">
            &copy; 2025 <span className="footer__brand">Eventify</span>. All
            rights reserved.
          </span>
          <nav aria-label="Footer navigation" className="footer__nav">
            <a href="#" className="footer__link">
              <i className="fas fa-user-shield footer__icon"></i>Privacy Policy
            </a>
            <a href="#" className="footer__link">
              <i className="fas fa-file-contract footer__icon"></i>Terms of
              Service
            </a>
          </nav>
          <span className="footer__dev">
            <i className="fas fa-code footer__icon"></i>Developed by
            <b>KITM @ JS25</b>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
