import React, { Component } from "react";
import axios from "axios";
import "./style/Home.css";
import svg from "./svg-sources";
import { TimelineLite, Bounce } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const server = "http://localhost:5000/api";

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
        console.log(res.data);
        if (!res.data.login) {
          console.log("generate token");
          axios.post(`${server}/generateGuestToken`).then((res) => {
            console.log(res.data);
          });
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
        backgroundColor: "#3b413c",
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

  fromLeftAnimations(el, index) {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: -200,
      },
      {
        duration: 1.5,
        y: 0,
        autoAlpha: 1,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          id: `sectionright-${index}`,
          trigger: el,
          start: "center center+=200",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  fromBottomAnimation(el, index) {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: -100,
      },
      {
        duration: 1,
        y: 0,
        autoAlpha: 1,
        ease: "power3.out",
        scrollTrigger: {
          id: `sectionright-${index}`,
          trigger: el,
          start: "center center+=300",
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

        <div id="and-container" ref={(div) => this.changeBackground(div, 1)}>
          <p id="and">And . . .</p>
        </div>

        <div id="container" ref={(div) => this.changeBackground(div, 2)}>
          <div id="profile-container">
            <div
              className="profile-row"
              id="I-container"
              ref={(div) => this.fromLeftAnimations(div, 0)}
            >
              <h1 id="I">I</h1>
            </div>
            <div className="profile-row" id="profile-list">
              <ul id="profile-list">
                <li ref={(div) => this.fromRightAnimation(div, 0)}>
                  Am 24 Years Old
                </li>
                <li ref={(div) => this.fromRightAnimation(div, 1)}>
                  Have graduated from university of Lampung in Electrical
                  Engineering
                </li>
                <li ref={(div) => this.fromRightAnimation(div, 2)}>
                  Live in Lampung Province
                </li>
                <li ref={(div) => this.fromRightAnimation(div, 3)}>
                  Love Computer programming
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="skill-box" ref={(div) => this.changeBackground(div, 3)}>
          <h5 style={{ color: "white" }} id="my-skills" align="center">
            My Skills
          </h5>
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

        <div id="hope" ref={(div) => this.changeBackground(div, 4)}>
          <h3 align="center">Hope we can work together</h3>
          <div id="cv" align="center">
            <a
              target="_blank"
              href="https://drive.google.com/file/d/12yHWXSegaYidHD9w1I_9Oe_nWdpi_iOx/view?usp=sharing"
            >
              My CV
            </a>
          </div>
        </div>

        <div
          id="contact-container"
          ref={(div) => this.changeBackground(div, 5)}
        >
          <div id="contacts">
            <h6>Contact me</h6>
            <ul>
              <li ref={(li) => this.fromBottomAnimation(li, 0)}>
                Email: rizkysaputra000@gmail.com
              </li>
              <li ref={(li) => this.fromBottomAnimation(li, 1)}>
                Phone: 082186326036
              </li>
              <li ref={(li) => this.fromBottomAnimation(li, 2)}>
                WA: 082186326036
              </li>
              <li ref={(li) => this.fromBottomAnimation(li, 3)}>
                <a target="_blank" href="https://github.com/rizkysaputra4/">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
