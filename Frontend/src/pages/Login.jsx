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

      const decoded = jwtDecode(res.data.access); // decode the claims
      userCtx.setLoggedInUserId(decoded.id); // set logged in user id
      navigate("/dashboard");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-md-3"></div>
        <div className={`col-md-6 ${styles.header}`}>
          <h3>Sign In</h3>
          <br />
          <div className={`${styles.fields}`}>
            <label className="col-md-3"></label>

            <input
              className="col-sm-6"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${styles.fields}`}>
            <label className="col-sm-3"></label>

            <input
              type="password"
              className="col-sm-6"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />
          <div className={`${styles.fields}`}>
            <label className="col-sm-3" />
            <button
              className={`col-sm-6 ${styles.Button}`}
              onClick={() => handleLogin()}
            >
              Log In
            </button>
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
