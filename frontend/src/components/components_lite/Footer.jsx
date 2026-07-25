import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* generate a footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <p>0 2026 Job Portal. All rights reserved.</p>
        <p>
          Powered by{" "}
          <a href="https://github.com/soniyadhote8">Shraddha Dhote</a>
        </p>
        <p>
          <Link to={"/PrivacyPolicy"}>Privacy Policy </Link> |
          <Link to={"/terms-of-service"}> Terms of Service</Link>
          
        </p>
      </div>
    </div>
  );
};

export default Footer;
