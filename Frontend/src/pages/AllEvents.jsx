import React, { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import styles from "../components/Events.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import EventListing from "../components/EventListing";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

const AllEvents = () => {
  const navigate = useNavigate();
  const fetchData = useFetch();

  const userCtx = useContext(UserContext);
  const [allEvents, setAllEvents] = useState([]);

  const getAllEvents = async () => {
    const res = await fetchData(
      "/events/all",
      "POST",
      {
        is_active: true,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setAllEvents(res.data);
      navigate("/all");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      userCtx.setAccessToken(localStorage.getItem("access"));
      const decoded = jwtDecode(localStorage.getItem("access"));
      userCtx.setLoggedInUserId(decoded.id);
    } else {
      navigate("/login");
    }
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
                      deadline={item.response_deadline}
                      status={item.is_active}
                      getAllEvents={getAllEvents}
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
