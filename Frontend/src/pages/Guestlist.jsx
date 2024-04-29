import React from "react";
import SideBar from "../components/SideBar";

const Guestlist = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div>View guestlist for an event</div>
        </main>
      </div>
    </>
  );
};

export default Guestlist;
