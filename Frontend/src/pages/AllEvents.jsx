import React, { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import styles from "../components/Events.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import EventListing from "../components/EventListing";

const AllEvents = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [allEvents, setAllEvents] = useState([]);

  const getAllEvents = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/events/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userCtx.accessToken,
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setAllEvents(data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "40px" }}>
          <div className={`${styles.container}`}>
            <div className="col-sm-1"></div>
            <div className={`col-sm-10`}>
              <a className={`${styles.header}`}>All Events</a>
              <br />
              <br />
              <div className={styles["box-container"]}>
                {allEvents.map((item) => {
                  return (
                    <EventListing
                      id={item.event_id}
                      title={item.title}
                      date={item.date}
                      time={item.time}
                      address={item.address}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-sm-1"></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AllEvents;
