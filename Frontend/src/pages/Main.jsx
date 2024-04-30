import React from "react";
import styles from "../components/Main.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div className={styles.layer}></div>
      <div className={styles.container}>
        <div className="col-md-3"></div>
        <div className={`col-md-6 ${styles.header}`}>
          HOST YOUR EVENTS <br />
          MANAGE YOUR RSVP <br />
          <p className={`${styles.text}`}>all-in-one-place</p>
          <NavLink
            style={{ textDecoration: "none", borderBottom: "none" }}
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/login"
          >
            <button className={styles.Button}>Get Started</button>
          </NavLink>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Main;
