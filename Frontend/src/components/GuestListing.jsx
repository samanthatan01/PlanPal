import React, { useState, useEffect, useContext } from "react";
import styles from "../components/Guestlist.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const GuestListing = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const eventId = props.id;

  const removeGuest = async (guestId) => {
    const res = await fetchData(
      "/guestlist/delete-guest",
      "DELETE",
      {
        event_id: eventId,
        guest_id: guestId,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      props.getGuestlist(eventId);
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
      <div className={`col-sm-12 ${styles.box}`}>
        <div className="col-sm-2">{props.firstName}</div>
        <div className="col-sm-1"> {props.lastName}</div>
        <div className="col-sm-2">{props.contact}</div>

        {props.response ? (
          <div className="col-sm-2">
            <strong>Will Be There</strong>
          </div>
        ) : (
          <div className="col-sm-2">
            <strong>Unable To Attend</strong>
          </div>
        )}
        {props.response ? (
          <div className="col-sm-2">{props.diet}</div>
        ) : (
          <div className="col-sm-2"></div>
        )}

        <br />
        <button
          value={props.guestId}
          className={`col-sm-2 ${styles.btn}`}
          onClick={(e) => {
            removeGuest(e.target.value);
          }}
        >
          REMOVE GUEST
        </button>

        <br />
      </div>
    </>
  );
};

export default GuestListing;
