import React, { useEffect, useContext } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import styles from "../components/Dashboard.module.css";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const handleCreateNewEvent = async () => {
    navigate("/create");
  };

  const handleSendResponse = async () => {
    navigate("/respond");
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
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div className={styles.container}>
            <div className="col-sm-3"></div>
            <div className={`col-sm-6 ${styles.group}`}>
              <button
                className={`col-sm-6 ${styles.Button}`}
                onClick={() => handleCreateNewEvent()}
              >
                Host a New Event
              </button>
              <br />
              <br />
              <button
                className={`col-sm-6 ${styles.Button}`}
                onClick={() => handleSendResponse()}
              >
                RSVP for an Event
              </button>
            </div>

            <div className="col-sm-3"></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
