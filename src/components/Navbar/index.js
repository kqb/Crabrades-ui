import React, { useState, useEffect } from "react";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import { Link, NavLink, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import MobileNav from "./MobileNav";
library.add(fab);

export const ReactNavbar = ({ color, logo, menu, social, sticky, account }) => {
  const [navLinks, setNavLinks] = useState([
    { name: "HOME", to: "/" },
    { name: "ARTICLES", to: "/articles" },
    { name: "ABOUT ME", to: "/about" },
    { name: "CONTACT", to: "/contact" },
  ]);
  const [socialIcon, setSocialIcon] = useState([]);
  const [background, setBackground] = useState("#e9d9b4");
  const [logoUrl, setLogoUrl] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    menu && setNavLinks(menu);
    color && setBackground(color);
    logo && setLogoUrl(logo);
    social && setSocialIcon(social);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  if (width < 1150) {
    return (
      <MobileNav
        width={width}
        logoUrl={logoUrl}
        background={background}
        navLinks={navLinks}
        socialIcon={socialIcon}
        sticky={sticky}
        account={account}
      />
    );
  }

  const Error = () => <h1>Please pass the component in the menu prop</h1>;

  return (
    // <div style={{
    //   position: "fixed",
    //   width: "100%",
    //   zIndex: "999"
    // }}>
    <>
      {/* <Router> */}
      <Controller>
        <Scene triggerHook="onLeave" duration={300} pin>
          {progress => (
            <Timeline totalProgress={progress} paused>
              <Tween
                from={{ height: "150px", background: "#e9d9b48a" }}
                to={{ height: "80px", background: background }}
              >
                <div className={"header"}>
                  <div className={"navLogo"}>
                    <Link to="/">
                      <div className="logo-container">
                        <Timeline totalProgress={progress} paused>
                          <Tween from={{ height: "150px" }} to={{ height: "70px" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                              <Timeline totalProgress={progress} paused>
                                <Tween from={{ height: "150px" }} to={{ height: "70px" }}>
                                  <img className={"LogoImg"} src={logoUrl} alt="logo" />
                                </Tween>
                              </Timeline>
                              <h1 className="text-5xl font-bold text-secondary tracking-wide">CRABRADES</h1>
                            </div>
                          </Tween>
                        </Timeline>
                      </div>
                    </Link>
                  </div>

                  <div className={"navLinks"}>
                    <ul>
                      {navLinks
                        .filter(x => !!x)
                        .map((link, i) => (
                          <li key={i}>
                            {link.to && (
                              <NavLink exact to={link.to} activeClassName={"home"}>
                                <h3 className="text-2xl font-bold text-secondary tracking-wide">{link.name}</h3>
                              </NavLink>
                            )}
                            {link.a && (
                              <a href={link.a} activeClassName={"home"}>
                                <h3 className="text-2xl font-bold text-secondary tracking-wide">{link.name}</h3>
                              </a>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className={"navSocial"}>
                    <ul>
                      {socialIcon.map((icon, i) => (
                        <li key={i}>
                          <a target="_blank" href={icon.url}>
                            <FontAwesomeIcon color={"rgb(216, 79, 69)"} icon={icon.icon} />
                          </a>
                          <span className={"tooltiptext"}>{icon.name}</span>
                        </li>
                      ))}
                      <div style={{ margin: "auto 0.5rem auto 0.5rem" }}></div>

                      {account}
                    </ul>
                  </div>
                </div>
              </Tween>
            </Timeline>
          )}
        </Scene>
      </Controller>
      {/* <Switch>
          {navLinks.map((link, i) => (
            <Route key={i} exact path={link.to} component={link.component ? link.component : Error} />
          ))}
        </Switch> */}
      {/* </Router> */}
      {/* // </div> */}
    </>
  );
};
