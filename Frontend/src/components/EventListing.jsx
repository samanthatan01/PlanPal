import React, { useState } from "react";
import styles from "../components/Events.module.css";
import UpdateModal from "./UpdateModal";

const EventListing = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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
      <div className={`${styles.box}`}>
        <h3>{props.title}</h3>
        <p>{props.id}</p>
        <p>{props.date}</p>
        <p>{props.time}</p>
        <p>{props.address}</p>

        <button className={`${styles.btn}`}>VIEW EVENT</button>
        <br />
        <button
          className={`${styles.btn}`}
          onClick={() => setShowUpdateModal(true)}
        >
          UPDATE
        </button>
        <br />
        <button className={`${styles.btn}`}>ALL GUESTS</button>
      </div>
    </>
  );
};

export default EventListing;
