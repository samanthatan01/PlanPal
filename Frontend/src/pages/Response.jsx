import React, { useState, useEffect, useContext } from "react";
import SideBar from "../components/SideBar";
import styles from "../components/Events.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Response = () => {
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const goToEvent = () => {
    navigate("/events/" + searchId);
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      userCtx.setAccessToken(localStorage.getItem("access"));
      const decoded = jwtDecode(localStorage.getItem("access"));
      userCtx.setLoggedInUserId(decoded.id);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "40px" }}>
          <>
            <div>
              <br />
              <strong> ENTER EVENT CODE TO RSVP</strong>
            </div>
            <div className={`${styles.wrapper}`}>
              <input
                placeholder="Enter event id"
                className={`${styles.searchbar}`}
                onChange={(e) => {
                  setSearchId(e.target.value);
                }}
              />
            </div>
            <div>
              <button className={`${styles.goBtn}`} onClick={() => goToEvent()}>
                GO
              </button>
            </div>
          </>
        </main>
      </div>
    </>
  );
};

export default Response;
