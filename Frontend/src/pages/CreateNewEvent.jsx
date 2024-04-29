import React from "react";
import SideBar from "../components/SideBar";

const CreateNewEvent = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div>Host to create events on this page</div>
        </main>
      </div>
    </>
  );
};

export default CreateNewEvent;
