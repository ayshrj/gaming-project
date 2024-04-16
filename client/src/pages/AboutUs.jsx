import React from "react";
import "./AboutUs.css";
import { IconBrandLinkedin, IconBrandGmail } from "@tabler/icons-react";

const aboutDetails = {
  name: "Ayush Raj",
  email: "ayshrj10@gmail.com",
  linkedInUrl: "https://www.linkedin.com/in/ayush-raj-b1359a249/",
};

const AboutUs = () => {
  return (
    <section className="about-us">
      <h1>Made with ❤️ by</h1>
      <h1>{aboutDetails.name}</h1>
      <p>
        <IconBrandGmail className="about-us-brand-icons" />:{" "}
        <a href={`mailto:${aboutDetails.email}`}>{aboutDetails.email}</a>
      </p>
      <p>
        <IconBrandLinkedin className="about-us-brand-icons" />:{" "}
        <a
          href={aboutDetails.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit LinkedIn Profile
        </a>
      </p>
    </section>
  );
};

export default AboutUs;
