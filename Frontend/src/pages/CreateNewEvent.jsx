import React, { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import styles from "../components/Events.module.css";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

const CreateNewEvent = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleCreate = async () => {
    const res = await fetchData(
      "/events/create",
      "PUT",
      {
        title: title,
        date: date,
        time: time,
        address: address,
        response_deadline: deadline,
        host_id: userCtx.loggedInUserId,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setTitle(""),
        setDate(""),
        setTime(""),
        setAddress(""),
        setDeadline(""),
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
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>

        <main style={{ flexGrow: 1, padding: "40px" }}>
          <div className={`${styles.container}`}>
            <div className="col-sm-2"></div>
            <div className={`col-sm-8 `}>
              <a className={`${styles.header}`}>Host a New Event</a>
              <br />

              <label className={`col-sm-4`}>Title</label>
              <div className={styles.field}>
                <div className={styles.wrapper}>
                  <input
                    className={`col-sm-8 ${styles.searchbar}`}
                    placeholder="Enter event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>
              </div>
              <br />

              <label className={`col-sm-4`}>Date</label>
              <div className={styles.field}>
                <div className={styles.wrapper}>
                  <input
                    type="date"
                    className={`col-sm-8 ${styles.searchbar}`}
                    placeholder="Enter date of event"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  ></input>
                </div>
              </div>
              <br />

              <label className={`col-sm-4`}>Time</label>
              <div className={styles.field}>
                <div className={styles.wrapper}>
                  <input
                    type="time"
                    className={`col-sm-8 ${styles.searchbar}`}
                    placeholder="Enter time of event"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  ></input>
                </div>
              </div>

              <br />
              <label className={`col-sm-4`}>Address</label>
              <div className={styles.field}>
                <div className={styles.wrapper}>
                  <input
                    className={`col-sm-8 ${styles.searchbar}`}
                    placeholder="Enter location of event"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
              </div>

              <br />
              <label className={`col-sm-4`}>Response Deadline</label>
              <div className={styles.field}>
                <div className={styles.wrapper}>
                  <input
                    type="date"
                    className={`col-sm-8 ${styles.searchbar}`}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  ></input>
                </div>
              </div>
              <br />

              <label
                className={`col-sm-8`}
                placeholder="Enter response deadline"
              ></label>
              <button
                className={`col-sm-4 ${styles.Button}`}
                onClick={() => handleCreate()}
              >
                Create
              </button>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </main>
      </div>
    </>
  );
};
export default CreateNewEvent;
