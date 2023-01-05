import React from "react";
import Dashboard from "../components/Dashboard";
import Header from "../components/Headerdashboard";
// import Nav from "../components/Navbar";

const Dashboardlayout = (props) => {
  return (
    <>
      <Header />
      <div className="flex relative flex-row">
        <div className="relative left-0 w-1/4" aria-label="Sidebar">
          <Dashboard />
        </div>
        <div
          className=" overflow-x-auto sm:rounded-lg w-full"
          aria-label="content-section"
        >
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Dashboardlayout;
