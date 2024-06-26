import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import styles from "../components/Auth.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const fetchData = useFetch();

  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetchData("/auth/login", "POST", {
      email: email,
      password: password,
    });

    if (res.ok) {
      // get access and refresh token from response
      userCtx.setAccessToken(res.data.access); // set access token
      localStorage.setItem("access", res.data.access);
      const decoded = jwtDecode(res.data.access); // decode the claims
      userCtx.setLoggedInUserId(decoded.id); // set logged in user id
      navigate("/dashboard");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <div className={"container"}>
        <div className="col-md-3"></div>
        <div className={`col-md-6 ${styles.header}`}>
          <h3>Sign In</h3>
          <br />
          <div className={styles.field}>
            <div className={styles.wrapper}>
              <input
                className={`col-sm-12 ${styles.searchbar}`}
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.field}>
            <div className={styles.wrapper}>
              <input
                type="password"
                className={`col-sm-12 ${styles.searchbar}`}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <br />
          <div className={styles.field}>
            <label className="col-sm-3" />
            <button
              className={`col-sm-6 ${styles.Button}`}
              onClick={() => handleLogin()}
            >
              Log In
            </button>
            <label className="col-sm-3" />
          </div>
          <br />
          <div className={`${styles.register}`}>
            <div className="col-sm-3"></div>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/register"
            >
              <p className={`col-sm-6 ${styles.register}`}>
                Don't have an account yet? <br />
                Register for one today.
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

export default Login;
