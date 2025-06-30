import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MissionVision.css";

const MissionVision = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ flex: 1 }} className="mission-vision-container">
        <h1 className="mission-vision-title">Mission & Vision</h1>

        <section className="mission-section">
          <h2 className="section-heading">Our Mission</h2>
          <p className="section-paragraph">
            To win souls and make disciples.
          </p>
        </section>

        <section className="vision-section">
          <h2 className="section-heading">Our Vision</h2>
          <p className="section-paragraph">
            To love God and love people.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default MissionVision;
