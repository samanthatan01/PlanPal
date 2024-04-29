import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import CreateNewEvent from "./pages/CreateNewEvent";
import AllEvents from "./pages/AllEvents";
import Response from "./pages/Response";
import UpcomingEvents from "./pages/UpcomingEvents";
import Event from "./pages/Event";
import Guestlist from "./pages/Guestlist";

function App() {
  return (
    <>
      <Suspense fallback={<h2>loading...</h2>}></Suspense>
      <NavBar></NavBar>

      <Routes>
        {/* pages without sidebar */}
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="main" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="event" element={<Event />} />
        <Route path="*" element={<NotFound />} />

        {/* pages with sidebar */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create" element={<CreateNewEvent />} />
        <Route path="all" element={<AllEvents />} />
        <Route path="respond" element={<Response />} />
        <Route path="upcoming" element={<UpcomingEvents />} />
        <Route path="guestlist" element={<Guestlist />} />
      </Routes>
    </>
  );
}

export default App;
