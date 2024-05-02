import React, { useContext, useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import styles from "../components/Events.module.css";
import EventListing from "../components/EventListing";
import useFetch from "../hooks/useFetch";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [userEvents, setUserEvents] = useState([]);
  // const id = userCtx.loggedInUserId;

  const getUserEvents = async () => {
    const res = await fetchData(
      "/rsvp",
      "POST",
      {
        is_active: true,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setUserEvents(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getUserEvents();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div className={`${styles.container}`}>
            <div className="col-sm-1"></div>
            <div className={`col-sm-10`}>
              <a className={`${styles.header}`}>UPCOMING EVENTS</a>
              <br />
              <br />
              <div className={styles["box-container"]}>
                {/* {JSON.stringify(userEvents)} */}
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
