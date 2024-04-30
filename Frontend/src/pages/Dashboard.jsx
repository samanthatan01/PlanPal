import React from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import styles from "../components/Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateNewEvent = async () => {
    navigate("/create");
  };

  const handleSendResponse = async () => {
    navigate("/respond");
  };
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
