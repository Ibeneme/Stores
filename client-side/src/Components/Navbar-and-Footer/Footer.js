import React from "react";
import logo from "./image/Group 12.png";
import './Footer.css'

const Footer = () => {
  return (
    <div className="main-footer">
    <div className="main-footer-first-div">
      <div className="main-footer-first-first-div">
        <div className="main-footer-logo">
          <img src={logo} alt="img-logo" />
          <h2>Hydra</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur. Sit neque posuere auctor
          euismod pharetra pellentesque. Faucibus eu nunc lorem non facilisis.
          Ipsum ipsum elementum aliquet morbi eget sodales in massa. Metus
          scelerisque pharetra diam orci pretium non. Etiam ipsum nisl ipsum
          egestas sed. Lorem ipsum dolor sit amet consectetur. Sit neque posuere
          auctor euismod pharetra pellentesque. Faucibus eu nunc lorem non
          facilisis. Ipsum ipsum elementum aliquet morbi eget sodales in massa.
          Metus scelerisque pharetra diam orci pretium non. Etiam ipsum nisl
          ipsum egestas sed.
        </p>
        <div>
          <h4>CONTACT US</h4>
          <p className="pim">info@hydraexpress.com</p>
        </div>
      </div>

      <div className="second-footer-div">
        <div>
          <p className="pim">Partnership </p>
          <p className="pim"> Blog </p>
          <p className="pim"> Help </p>
          <p className="pim"> Center </p>
          <p className="pim"> Feedback</p>
          <p className="pim"> Contact Us</p>
        </div>

        <div>
          <p className="pim">Community </p>
          <p className="pim"> Wallet </p>
          <p className="pim"> Privacy </p>
          <p className="pim"> Center </p>
          <p className="pim"> Terms and Conditions</p>
          <p className="pim"> Download</p>
        </div>
      </div>
    </div>  
    <p className="pim copyright">© 2022Hydra ExpressBC. All Rights Reserved. </p>
    </div>
   
  );
};

export default Footer;
