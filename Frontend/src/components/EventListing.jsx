import React, { useState, useContext, useEffect } from "react";
import styles from "../components/Events.module.css";
import UpdateModal from "./UpdateModal";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";

const EventListing = (props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
      {showUpdateModal && (
        <UpdateModal
          id={props.id}
          title={props.title}
          date={props.date}
          time={props.time}
          address={props.address}
          deadline={props.deadline}
          status={props.status}
          getAllEvents={props.getAllEvents}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {userCtx.loggedInId != props.hostId ? (
        <div className={`${styles.box}`}>
          <h3>{props.title}</h3>
          <p>{props.date}</p>
          <p>{props.time}</p>
          <p>{props.address}</p>
          <p>
            {props.status ? (
              <div>
                <strong>RSVP:</strong>
                <br />
                Will Be There
              </div>
            ) : (
              <div>
                <strong>RSVP:</strong>
                <br />
                Unable To Attend
              </div>
            )}
          </p>
          <p>
            <div>
              <strong>Chosen Diet:</strong>
              <br />
              {props.diet}
            </div>
          </p>
          <Link to={`/events/${props.id}`}>
            <button className={`${styles.btn}`}>UPDATE RSVP</button>
          </Link>
          <br />
        </div>
      ) : (
        <div className={`${styles.box}`}>
          <h3>{props.title}</h3>
          <p>{props.date}</p>
          <p>{props.time}</p>
          <p>{props.address}</p>
          <p>
            <strong>Copy Code To Share Event:</strong>
            <br />
            {props.id}
          </p>
          <Link to={`/events/${props.id}`}>
            <button className={`${styles.btn}`}>VIEW EVENT</button>
          </Link>
          <br />
          <Link to={`/guestlist/${props.id}`}>
            <button className={`${styles.btn}`}>ALL GUESTS</button>
          </Link>
          <br />
          <button
            className={`${styles.btn}`}
            onClick={() => setShowUpdateModal(true)}
          >
            UPDATE INFO
          </button>
          <br />
        </div>
      )}
    </>
  );
};

export default EventListing;
