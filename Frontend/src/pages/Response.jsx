import React, { useState } from "react";
import SideBar from "../components/SideBar";
import styles from "../components/Events.module.css";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Response = () => {
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  const goToEvent = () => {
    navigate("/events/" + searchId);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <>
            <div>
              <br />
              <strong> SEARCH FOR EVENT TO RSVP</strong>
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
