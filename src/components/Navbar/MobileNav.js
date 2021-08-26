import React, { useRef, useState } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TweenMax, Power3 } from "gsap";
import "./MobileNav.css";

library.add(fab, faBars);

const MobileNav = ({
  width,
  logoUrl,
  background,
  navLinks,
  socialIcon,
  sticky,
}) => {
  let nav = useRef(null);
  const [click, setClick] = useState(false);
  const socialLinks = socialIcon.map((icon, index) => (
    <li key={index}>
      <a target="_blank" href={icon.url}>
        <FontAwesomeIcon icon={icon.icon} />
      </a>
    </li>
  ));
  const handelExpand = () => {
    if (click === false) {
      TweenMax.to(nav, 0.8, { height: 300, ease: Power3.easeOut });
      setClick(true);
    } else {
      TweenMax.to(nav, 0.8, { height: 0, ease: Power3.easeOut });
      setClick(false);
    }
  };

  return (
    <div style={{  width: "100%" }}>
      {/* <Router> */}
        <div
          className={"MoNavContainer"}
          style={{
            background: background,
            position: sticky ? "sticky" : "unset",
          }}
        >
          <div className={"mobileNav"} style={{ background: background }}>
            <div className={"navBars"}>
              <FontAwesomeIcon icon={faBars} onClick={handelExpand} />
            </div>
            <div className={"MoNavLogo"}>
              <img src={logoUrl} alt="logo" />
            </div>

            <div className={"MoNavSocial"}>
              {width > 700 ? <ul>{socialLinks}</ul> : null}
            </div>
          </div>
          <div
            className={"MoNavLinks"}
            ref={(el) => {
              nav = el;
            }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.to}>{link.name}</Link>
                </li>
              ))}
            </ul>
            {width < 700 ? (
              <div className={"mobileNavII"}>
                <div className={"MoNavSocialII"}>
                  <ul>{socialLinks}</ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* <Switch>
          {navLinks.map((link, i) => (
            <Route
              key={i}
              exact
              path={`/${link.to}`}
              component={link.component}
            />
          ))}
        </Switch> */}
      {/* </Router> */}
    </div>
  );
};

export default MobileNav;
