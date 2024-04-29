import React from "react";
import SideBar from "../components/SideBar";

const AllEvents = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div>Display all events hosted by user</div>
        </main>
      </div>
    </>
  );
};

export default AllEvents;
