import React, { useState } from "react";
import styles from "../components/Auth.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Register = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [diet, setDiet] = useState("");

  const registerUser = async () => {
    const res = await fetchData("/auth/register", "PUT", {
      first_name: firstName,
      last_name: lastName,
      contact: contact,
      email: email,
      password: password,
      diet: diet,
    });

    if (res.ok) {
      setFirstName("");
      setLastName("");
      setContact("");
      setEmail("");
      setPassword("");
      setDiet("");
      alert("Registered! Please proceed to login.");
      navigate("/login");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-md-3"></div>
        <div className={`col-md-6 ${styles.header}`}>
          <h3>Sign Up</h3>
          <br />
          <div className={`${styles.field}`}>
            <div className={styles.wrapper}>
              <input
                className="col-sm-12"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
            </div>
          </div>

          <div className={`${styles.field}`}>
            <div className={styles.wrapper}>
              <input
                className="col-sm-12"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></input>
            </div>
          </div>

          <div className={`${styles.field}`}>
            <div className={styles.wrapper}>
              <input
                className="col-sm-12"
                placeholder="Enter contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></input>
            </div>
          </div>

          <div className={`${styles.field}`}>
            <div className={styles.wrapper}>
              <input
                className="col-sm-12"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
          </div>

          <div className={`${styles.field}`}>
            <div className={styles.wrapper}>
              <input
                type="password"
                className="col-sm-12"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>

          <div className={`${styles.field}`}>
            <div className={styles.wrapper}>
              <select
                className="col-sm-12"
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
              >
                <option>Please select your diet</option>
                <option>NONE</option>
                <option>VEGETARIAN</option>
                <option>HALAL</option>
                <option>LACTOSE-INTOLERANT</option>
              </select>
            </div>
          </div>
          <br />

          <div className={styles.field}>
            <label className="col-sm-3" />
            <button
              className={`col-sm-12 ${styles.Button}`}
              onClick={() => registerUser()}
            >
              Register
            </button>
            <label className="col-sm-3" />
          </div>

          <br />
          <div className={`${styles.register}`}>
            <div className="col-sm-3"></div>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/login"
            >
              <p className={`col-sm-6 ${styles.register} `}>
                Already have an account? <br />
                Log in to get started.
              </p>
            </NavLink>
            <div className="col-sm-3"></div>
          </div>

          <br />
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  );
};

export default Register;
