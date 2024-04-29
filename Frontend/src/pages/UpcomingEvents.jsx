import React from "react";
import SideBar from "../components/SideBar";

const UpcomingEvents = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div>View list of upcoming events as a guest</div>
        </main>
      </div>
    </>
  );
};

export default UpcomingEvents;
