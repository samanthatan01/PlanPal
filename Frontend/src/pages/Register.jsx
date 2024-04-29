import React from "react";
import styles from "../components/Auth.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="container">
        <div className="col-md-3"></div>
        <div className={`col-md-6 ${styles.header}`}>
          <h3>Sign Up</h3>
          <br />
          <div className={`${styles.fields}`}>
            <label className="col-md-3">FIRST NAME</label>

            <input className="col-sm-6" placeholder="Enter first name"></input>
          </div>

          <div className={`${styles.fields}`}>
            <label className="col-md-3">LAST NAME</label>

            <input className="col-sm-6" placeholder="Enter last name"></input>
          </div>

          <div className={`${styles.fields}`}>
            <label className="col-md-3">CONTACT</label>

            <input className="col-sm-6" placeholder="Enter contact"></input>
          </div>

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

          <div className={`${styles.fields}`}>
            <label className="col-md-3">LAST NAME</label>

            <select className="col-sm-6">
              <option>Please choose one</option>
              <option>NONE</option>
              <option>VEGETARIAN</option>
              <option>HALAL</option>
              <option>LACTOSE-INTOLERANT</option>
            </select>
          </div>
          <br />

          <div className={`${styles.fields}`}>
            <label className="col-sm-3"></label>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/dashboard"
            >
              <button className={`col-sm-6 ${styles.Button}`}>Submit</button>
            </NavLink>
          </div>

          <br />
          <div className={`${styles.register}`}>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/login"
            >
              <label className="col-sm-12">
                Already have an account? Log in to get started.
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

export default Register;
