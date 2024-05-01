import React, { useContext, useRef, useEffect } from "react";
import styles from "../components/Modal.module.css";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const OverLay = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const titleRef = useRef("");
  const dateRef = useRef("");
  const timeRef = useRef("");
  const addressRef = useRef("");
  const deadlineRef = useRef("");

  const updateEvent = async (id) => {
    const res = await fetchData(
      "/events/update/" + id,
      "PATCH",
      {
        title: titleRef.current.value,
        date: dateRef.current.value,
        time: timeRef.current.value,
        address: addressRef.current.value,
        response_deadline: deadlineRef.current.value,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      props.getAllEvents();
      props.setShowUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const cancelEvent = async (id) => {
    const res = await fetchData(
      "/events/delete/" + id,
      "DELETE",
      {
        is_active: false,
      },
      userCtx.accessToken
    );

    if (res.ok) {
      props.getAllEvents();
      props.setShowUpdateModal(false);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    titleRef.current.value = props.title;
    dateRef.current.value = props.date;
    timeRef.current.value = props.time;
    addressRef.current.value = props.address;
    deadlineRef.current.value = props.dealine;
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <br />
        <br />

        <br />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <strong>Title</strong>
          </div>
          <input ref={titleRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <strong>Date</strong>
          </div>
          <input ref={dateRef} type="date" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <strong>Time</strong>
          </div>
          <input ref={timeRef} type="time" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <strong>Address</strong>
          </div>
          <input ref={addressRef} type="text" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <strong>Response Deadline</strong>
          </div>
          <input ref={deadlineRef} type="date" className="col-md-3" />
          <div className="col-md-3"></div>
        </div>
        <br />
        <br />

        <div className="row">
          <div className="col-sm-2"></div>

          <button
            onClick={() => cancelEvent(props.id)}
            className={`col-md-3 ${styles.btn} `}
          >
            Cancel Event
          </button>
          <br />

          <button
            onClick={() => updateEvent(props.id)}
            className={`col-md-2 ${styles.btn} `}
          >
            Update
          </button>

          <br />

          <button
            onClick={() => props.setShowUpdateModal(false)}
            className={`col-md-2 ${styles.btn} `}
          >
            Back
          </button>
          <div className="col-md-5"></div>
        </div>
      </div>
    </div>
  );
};

const UpdateModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay
          id={props.id}
          title={props.title}
          date={props.date}
          time={props.time}
          address={props.address}
          deadline={props.deadline}
          status={props.status}
          getAllEvents={props.getAllEvents}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateModal;
