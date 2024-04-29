import React from "react";
import styles from "./NavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
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
          <li
            style={{
              marginLeft: "auto",
              marginRight: "2rem",
            }}
          >
            <button className={styles.loginButton}>
              <NavLink
                style={{ textDecoration: "none", borderBottom: "none" }}
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/login"
              >
                Login
              </NavLink>
            </button>

            {/* --- uncomment only after accessToken is implemented --- */}

            {/* {!userCtx.accessToken ? (
              <button
                className={styles.loginButton}
                onClick={handleOpenLoginModal}
              >
                Login <LockOpenOutlinedIcon />
              </button>
            ) : (
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout <ExitToAppOutlinedIcon />
              </button>
            )} */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
