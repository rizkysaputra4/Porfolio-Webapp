import React from "react";
import svg from "./svg-sources";
import "./style/Footer.css";

export default class Footer extends React.Component {
  contactLink = () => {
    const key = [svg.github, svg.whatsapp, svg.linkedIn];

    const link = [
      "https://github.com/rizkysaputra4/",
      "https://wa.link/np11bd",
      "https://www.linkedin.com/in/rizky-saputra-a6b469199/",
    ];

    return key.map((key, index) => {
      return (
        <div className="contact-icon px-2" key={index}>
          <a target="_blank" href={link[index]} rel="noopener noreferrer">
            {key}
          </a>
        </div>
      );
    });
  };

  Footer = () => {
    return (
      <footer className="footer-container pt-5 pb-5" id="footer-container">
        <div className="container d-flex justify-content-center pt-3 pb-3">
          {this.contactLink()}
        </div>

        <p>© 2020 by Rizky Saputra</p>
      </footer>
    );
  };

  render() {
    return <this.Footer />;
  }
}
