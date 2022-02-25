import React from "react";
import "./TheCompany.css";
import { aboutUs } from "../../../data/FooterData/TheCompany.js";
function AboutDasa() {
  return (
    <div className="about__dasa">
      {/* THe Image section */}
      <div
        className="theBackgroundImage"
        style={{
          backgroundImage: `url("images/croped.jpg")`,
        }}
      >
        <div className="faq__title">ABOUT US</div>
      </div>

      {/* The content part */}
      <div className="about__us__content__container">
        <div className="about__us__content">{aboutUs[0].part1}</div>
        <div className="about__us__content">{aboutUs[0].part2}</div>
      </div>
    </div>
  );
}

export default AboutDasa;
