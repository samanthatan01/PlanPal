import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/user";
import styles from "../components/EventCard.module.css";
import SideBar from "../components/SideBar";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Event = () => {
  const { id } = useParams();
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [eventData, setEventData] = useState([]);

  const responseRef = useRef(false);
  const dietRef = useRef("");

  const getEventById = async (id) => {
    console.log(id);
    const res = await fetch(import.meta.env.VITE_SERVER + "/events/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    });
    const data = await res.json();

    if (res.ok) {
      setEventData(data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const submitResponse = async (id) => {
    const res = await fetchData(
      "/rsvp/submit/" + id,
      "PUT",
      {
        diet: dietRef.current.value,
        is_attending: responseRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      navigate("/upcoming");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access")) {
      userCtx.setAccessToken(localStorage.getItem("access"));
      const decoded = jwtDecode(localStorage.getItem("access"));
      userCtx.setLoggedInUserId(decoded.id);
      getEventById(id);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>

        <main style={{ flexGrow: 1, padding: "40px" }}>
          {eventData.length > 0 ? (
            <div className={`${styles.overall}`}>
              <div className={` ${styles.container1}`}>
                <div className="col-sm-12">
                  <a>
                    Hi there! <br />
                    <br />
                    You're warmly invited to <br />
                    <strong>{eventData[0].title}</strong> <br />
                    on
                    <br />
                    <strong>{eventData[0].date}</strong> at{" "}
                    <strong>{eventData[0].time}</strong>.
                  </a>
                </div>
                <br />

                <div className="col-sm-12">
                  <a>
                    Address: <br />
                    <strong>{eventData[0].address}</strong>
                  </a>
                  <br />
                  <br />
                  <a>We look forward to seeing you there! ◡̈</a>
                  <br />
                  <br />
                  <a>
                    Please RSVP by: <br />
                    {eventData[0].response_deadline}
                  </a>
                </div>
                <br />
              </div>

              <div className={` ${styles.container2}`}>
                <div className="col-sm-12">
                  <a>
                    RSVP for <br />
                    <strong>{eventData[0].title}</strong>
                  </a>
                </div>

                <div className="col-sm-12">
                  <label className={`${styles.label}`}>RSVP</label>
                  <br />
                  <select
                    ref={responseRef}
                    onChange={() => responseRef.current.value}
                  >
                    <option value="0">please select</option>
                    <option value={true}>Will Be There</option>
                    <option value={false}>Unable To Attend</option>
                  </select>
                  <br />
                  <br />
                  <label className={`${styles.label}`}>
                    Dietary Preference
                  </label>
                  <br />
                  <select ref={dietRef}>
                    <option value="0">please select</option>
                    <option
                      onChange={() => {
                        dietRef.current = "NONE";
                      }}
                    >
                      NONE
                    </option>
                    <option
                      onChange={() => {
                        dietRef.current = "VEGETARIAN";
                      }}
                    >
                      VEGETARIAN
                    </option>
                    <option
                      onChange={() => {
                        dietRef.current = "LACTOSE-INTOLERANT";
                      }}
                    >
                      LACTOSE-INTOLERANT
                    </option>
                    <option
                      onChange={() => {
                        dietRef.current = "HALAL";
                      }}
                    >
                      HALAL
                    </option>
                  </select>
                  <br />
                  <br />
                  <br />

                  <button
                    className={`${styles.Button}`}
                    onClick={() => submitResponse(id)}
                  >
                    Send
                  </button>
                </div>
                <br />
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </>
  );
};

export default Event;
