import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/user";

const NavBar = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  let location = useLocation();

  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink
              style={{ textDecoration: "none", borderBottom: "none" }}
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/main"
            >
              <h1>PlanPal.</h1>
            </NavLink>
          </li>

          {/* -----TO BE DELETED----- */}
          {userCtx.loggedInUserId}
          {/* -----TO BE DELETED----- */}

          <li
            style={{
              marginLeft: "auto",
              marginRight: "2rem",
            }}
          >
            {!userCtx.accessToken ? (
              <NavLink
                style={{ textDecoration: "none", borderBottom: "none" }}
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/login"
              >
                <button className={styles.loginButton}>Login</button>
              </NavLink>
            ) : (
              <NavLink
                style={{ textDecoration: "none", borderBottom: "none" }}
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/main"
              >
                <button
                  className={styles.loginButton}
                  onClick={() =>
                    userCtx.setAccessToken("") && navigate("/main")
                  }
                >
                  Log Out
                </button>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
