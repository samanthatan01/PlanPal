import React from "react";
import styles from "./SideBar.module.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  let location = useLocation();

  return (
    <>
      <Sidebar className={styles.SideBar}>
        <Menu>
          <Link to="/dashboard" className={styles.l1}>
            <MenuItem>Home</MenuItem>
          </Link>
          <SubMenu
            label="As a Host"
            className={styles.l1}
            defaultOpen={
              location.pathname.startsWith("/create") ||
              location.pathname.startsWith("/all") ||
              location.pathname.startsWith("/guestlist")
            }
          >
            <Link to="/create" className={styles.l2}>
              <MenuItem>Host New Event</MenuItem>
            </Link>
            <Link to="/all" className={styles.l2}>
              <MenuItem>View All Events</MenuItem>
            </Link>
          </SubMenu>

          <SubMenu
            label="As a Guest"
            className={styles.l1}
            defaultOpen={
              location.pathname.startsWith("/respond") ||
              location.pathname.startsWith("/upcoming") ||
              location.pathname.startsWith("/rsvp")
            }
          >
            <Link to="/respond" className={styles.l2}>
              <MenuItem>Send RSVP</MenuItem>
            </Link>
            <Link to="/upcoming" className={styles.l2}>
              <MenuItem>Events To Attend</MenuItem>
            </Link>
          </SubMenu>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
