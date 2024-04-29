import React from "react";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <div>Logged In User Dashboard</div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
