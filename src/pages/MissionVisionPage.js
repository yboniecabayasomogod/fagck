import React from "react";
import "./MissionVision.css";

const MissionVision = () => {
  return (
    <div className="mission-vision-container">
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
  );
};

export default MissionVision;
