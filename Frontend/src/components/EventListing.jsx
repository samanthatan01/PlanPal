import React from "react";
import styles from "../components/Events.module.css";

const EventListing = (props) => {
  return (
    <>
      <div className={`${styles.box}`}>
        <h3>{props.title}</h3>
        <p>{props.id}</p>
        <p>{props.date}</p>
        <p>{props.time}</p>
        <p>{props.address}</p>

        <button className={`${styles.btn}`}>EDIT</button>
        <button className={`${styles.btn}`}>VIEW</button>
      </div>
    </>
  );
};

export default EventListing;
