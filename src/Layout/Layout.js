import React from "react";
import Nav from "../components/Navbar";

const Layout = (props) => {
  return (
    <>
      <Nav />
      {props.children}
    </>
  );
};

export default Layout;
