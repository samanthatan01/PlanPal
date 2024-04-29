import React from "react";
import styles from "../components/Auth.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="col-md-3"></div>
        <div className={`col-md-6 ${styles.header}`}>
          <h3>Sign In</h3>
          <br />
          <div className={`${styles.fields}`}>
            <label className="col-md-3">EMAIL</label>

            <input
              className="col-sm-6"
              placeholder="Enter email address"
            ></input>
          </div>

          <div className={`${styles.fields}`}>
            <label className="col-sm-3">PASSWORD</label>

            <input className="col-sm-6" placeholder="Enter password"></input>
          </div>
          <br />

          <div className={`${styles.fields}`}>
            <label className="col-sm-3"></label>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/dashboard"
            >
              <button className={`col-sm-6 ${styles.Button}`}>Log In</button>
            </NavLink>
          </div>

          <br />
          <div className={`${styles.register}`}>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/register"
            >
              <label className="col-sm-12">
                Don't have an account yet? Register for one today.
              </label>
            </NavLink>
          </div>
          <br />
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Login;
