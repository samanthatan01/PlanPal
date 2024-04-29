import React from "react";
import SideBar from "../components/SideBar";

const Response = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div>User to search event by ID, view event and submit RSVP</div>
        </main>
      </div>
    </>
  );
};

export default Response;
