import React, { Component } from "react";
import axios from "axios";
import "./style/Home.css";
import svg from "./svg-sources";
import { TimelineLite, Bounce } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { server } from "./Wall";

gsap.registerPlugin(ScrollTrigger);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.HelloText = null;
    this.Hello = new TimelineLite({ paused: true });

    this.Rizky = null;
    this.RizkyEffect = new TimelineLite({ paused: true });

    this.myName = null;
    this.myNameEffect = new TimelineLite({ paused: true });

    this.el = null;
  }

  componentDidMount() {
    axios
      .get(`${server}/checkLogin`)
      .then((res) => {
        if (!res.data.login) {
          axios.post(`${server}/generateGuestToken`).then((res) => {});
        }
      })
      .catch((err) => console.log(err));

    this.RizkyEffect.to(this.Rizky, 0, { opacity: 0, x: 300 }, 1)
      .to(this.Rizky, 1, { opacity: 1, x: 0 })
      .play();

    this.Hello.to(this.HelloText, 0, { opacity: 0, y: -100 })
      .to(this.HelloText, 2.5, { opacity: 1, ease: Bounce.easeOut, y: 0 })
      .play();

    this.myNameEffect
      .to(this.myName, 0, { opacity: 0 }, 0.5)
      .to(this.myName, 1, { opacity: 1 })
      .play();
  }

  changeBackground(el, index) {
    gsap.fromTo(
      el,
      {
        opacity: 1,
      },
      {
        duration: 1,
        backgroundColor: "#007bff",
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          id: `section-${index}`,
          trigger: el,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  fromRightAnimation(el, index) {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: 100,
      },
      {
        duration: 1,

        x: 0,
        autoAlpha: 1,
        ease: Bounce.easeOut,
        scrollTrigger: {
          id: `sectionright-${index}`,
          trigger: el,
          start: "center center+=200",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  fromRightBgWhiteAnimation(el, index) {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: 100,
      },
      {
        duration: 1,
        backgroundColor: "white",
        x: 0,
        autoAlpha: 1,
        ease: Bounce.easeOut,
        scrollTrigger: {
          id: `sectionright-${index}`,
          trigger: el,
          start: "center center+=200",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  fromLeftAnimation(el, index) {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: -100,
      },
      {
        duration: 1,
        backgroundColor: "white",
        x: 0,
        autoAlpha: 1,
        ease: Bounce.easeOut,
        scrollTrigger: {
          id: `sectionright-${index}`,
          trigger: el,
          start: "center center+=200",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  render() {
    return (
      <div>
        <div id="Welcome-container">
          <div style={{ color: "white" }} id="welcome-content">
            <h3 id="hello" ref={(div) => (this.HelloText = div)}>
              Hello,
            </h3>
            <div id="name">
              <div
                style={{ color: "white", opacity: 0 }}
                ref={(div) => (this.myName = div)}
                id="mynameis"
              >
                My Name is&nbsp;
              </div>

              <p style={{ opacity: 0 }} ref={(div) => (this.Rizky = div)}>
                Rizky Saputra
              </p>
            </div>
          </div>
        </div>

        <div
          className="container d-flex align-items-center justify-content-center "
          id="about-me"
        >
          <div className="w-75 " id="about-div">
            <h4 align="center" className="">
              About Me
            </h4>
            <div align="center">
              <img
                className="mt-4"
                src={require("../pic/rizky.jpg")}
                alt="rizky saputra"
                id="profile-picture"
                align="center"
              />
            </div>
            <br></br>
            <h6 className="mb-3 mt-4" align="center">
              Hi, I am Rizky, nice to meet you!
            </h6>
            <p className="">
              I am a Junior Developer, raised in a small town in Lampung
              Province, and currently living in Cikarang, Bekasi. Graduated from
              University of Lampung in Electrical Engineering in 2020, now I am
              starting to looking for a career path in software developer field.
              I already have an interest with programming and tech stuff since
              14 years old. Especially in Web development and Machine learning
              field. I enjoy watching good Movie, Tv shows, or even Korean Tv
              series, playing video games is also my hobbies. Since I really
              like watching movie, my current project at the moment is trying to
              build an algorithm to predict user movie preference.
            </p>
          </div>
        </div>

        <div
          className="d-flex align-items-center justify-content-center"
          id="skill-box"
        >
          <div>
            <h4 className="mb-5" style={{ color: "white" }} align="center">
              My Skills
            </h4>
            <div id="skills-container">
              <div id="skill-list">
                <ul>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromLeftAnimation(div, 0)}
                  >
                    {svg.mongoDB}
                  </li>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromLeftAnimation(div, 1)}
                  >
                    {svg.express}
                  </li>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromLeftAnimation(div, 2)}
                  >
                    {svg.reactjs}
                    ReactJs
                  </li>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromLeftAnimation(div, 3)}
                  >
                    {svg.nodeJs}
                  </li>
                </ul>
                <ul>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromRightBgWhiteAnimation(div, 4)}
                  >
                    {svg.javascript}Javascript
                  </li>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromRightBgWhiteAnimation(div, 5)}
                  >
                    {svg.matlab}
                    Matlab
                  </li>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromRightBgWhiteAnimation(div, 6)}
                  >
                    {svg.arduino}
                    Arduino
                  </li>
                  <li
                    className="skill-name"
                    ref={(div) => this.fromRightBgWhiteAnimation(div, 7)}
                  >
                    {svg.bootstrap}
                    Bootstrap
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex align-items-center justify-content-center"
          id="contact"
        >
          <div className="w-50" id="contact-div">
            <h4 className="mb-5" align="center">
              I hope we can work together
            </h4>
            <p className="mt-5 mb-5">
              Click this{" "}
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1AjB2dNMfNwr8y230WR9l-WyvefKhdT5q/view?usp=sharing"
                rel="noopener noreferrer"
              >
                link
              </a>{" "}
              to see my resume, and if you have any other question or interested
              to work with me, you can reach me via phone or email. I would like
              to hear from you.
            </p>
            <h6 align="center">– rizkysaputra000@gmail.com –</h6>
            <h6 align="center">– (+62)82186326036 –</h6>
          </div>
        </div>
      </div>
    );
  }
}
