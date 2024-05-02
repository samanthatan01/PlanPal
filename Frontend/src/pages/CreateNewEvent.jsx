import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import styles from "../components/Events.module.css";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";

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
              <br />
              <label className={`col-sm-4`}>Title</label>

              <input
                className={`col-sm-8`}
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <br />
              <br />
              <label className={`col-sm-4`}>Date</label>

              <input
                type="date"
                className={`col-sm-8`}
                placeholder="Enter date of event"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></input>
              <br />
              <br />
              <label className={`col-sm-4`}>Time</label>

              <input
                type="time"
                className={`col-sm-8`}
                placeholder="Enter time of event"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              ></input>
              <br />
              <br />
              <label className={`col-sm-4`}>Address</label>

              <input
                className={`col-sm-8`}
                placeholder="Enter location of event"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></input>
              <br />
              <br />
              <label className={`col-sm-4`}>Response Deadline</label>

              <input
                type="date"
                className={`col-sm-8`}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              ></input>
              <br />
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
