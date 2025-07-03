import React from "react";
import "../pages/MissionVision.css";

const Footer = () => {
  return (
    <footer className="text-center py-3 mt-5 bg-light">
      <small>&copy; {new Date().getFullYear()} First Assembly of God. All rights reserved.</small>
    </footer>
  );
};

export default Footer;