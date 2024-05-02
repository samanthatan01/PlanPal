import React, { useContext, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import styles from "../components/Events.module.css";
import EventListing from "../components/EventListing";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [userEvents, setUserEvents] = useState([]);

  const getUserEvents = async () => {
    const res = await fetchData(
      "/rsvp",
      "POST",
      {
        is_active: true,
      },
      localStorage.getItem("access")
    );

    if (res.ok) {
      setUserEvents(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      userCtx.setAccessToken(localStorage.getItem("access"));
      const decoded = jwtDecode(localStorage.getItem("access"));
      userCtx.setLoggedInUserId(decoded.id);
      getUserEvents();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "40px" }}>
          <div className={`${styles.container}`}>
            <div className="col-sm-1"></div>
            <div className={`col-sm-10`}>
              <a className={`${styles.header}`}>UPCOMING EVENTS</a>
              <br />
              <br />
              <div className={styles["box-container"]}>
                {userEvents.map((item) => {
                  return (
                    <EventListing
                      id={item.event_id}
                      title={item.title}
                      date={item.date}
                      time={item.time}
                      address={item.address}
                      diet={item.diet}
                      status={item.is_attending}
                      hostId={item.host_id}
                      getUserEvents={getUserEvents}
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

export default UpcomingEvents;
