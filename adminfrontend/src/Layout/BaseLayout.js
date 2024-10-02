import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

const BaseLayout = () => {
  return (
    <>
      <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Sidebar />
          <div className="content-wrapper">
            <Outlet /> {/* This will render the matched child component */}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
