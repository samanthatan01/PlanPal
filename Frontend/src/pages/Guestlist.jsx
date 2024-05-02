import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "../components/Guestlist.module.css";
import UserContext from "../context/user";
import GuestListing from "../components/GuestListing";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Guestlist = () => {
  const { id } = useParams();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [guestlist, setGuestlist] = useState([]);

  const getGuestlist = async (id) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/guestlist/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();

    if (res.ok) {
      setGuestlist(data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      userCtx.setAccessToken(localStorage.getItem("access"));
      const decoded = jwtDecode(localStorage.getItem("access"));
      userCtx.setLoggedInUserId(decoded.id);
      getGuestlist(id);
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
              <a className={`${styles.header}`}>GUESTLIST</a>
              <br />
              <h6>
                <strong>Event Code:</strong> {id}
              </h6>
            </div>
          </div>
          <br />

          <div className={`${styles.container}`}>
            <div className={styles["box-container"]}>
              {guestlist.map((item) => {
                return (
                  <GuestListing
                    id={item.event_id}
                    guestId={item.guest_id}
                    firstName={item.first_name}
                    lastName={item.last_name}
                    email={item.email}
                    contact={item.contact}
                    response={item.is_attending}
                    diet={item.diet}
                    getGuestlist={getGuestlist}
                  />
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Guestlist;
