import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Navbar from "./Navbar";
import styled from "styled-components";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
  const [sidebarVisible, setSidebarVisible] = useState(false); // Track sidebar visibility
  const sidebarRef = useRef(null); // Reference to the sidebar

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Handle submenu toggle
  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    // Handle logout and redirect based on token presence
    const userToken = localStorage.getItem("token");
    if (userToken !== null) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Wrapper>
      <div
        ref={sidebarRef}
        className={`page-wrapper chiller-theme ${
          !sidebarVisible ? "toggled" : ""
        }`}
      >
        <Navbar />
        {/* Side Bar Settion */}

        <nav id="sidebar" className="sidebar-wrapper">
          <div className="sidebar-content">
            <div className="sidebar-brand">
              <a href="#">Admin Dashboard</a>
            </div>
            <div className="sidebar-header">
              <div className="user-pic">
                <img className="img-responsive img-rounded" src="" alt="User" />
              </div>
              <div className="user-info">
                <span className="user-name">
                  Vipin <strong>Kushwaha</strong>
                </span>
                <span className="user-role">Administrator</span>
                <span className="user-status">
                  <i className="fa fa-circle"></i>
                  <span>Online</span>
                </span>
              </div>
            </div>
            <div className="sidebar-search">
              <div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control search-menu"
                    placeholder="Search..."
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sidebar-menu">
              <ul>
                <li className="header-menu">
                  <span>General</span>
                </li>

                {/* Dashbord Section */}

                <li
                  className={
                    activeDropdown === "dashboard"
                      ? "sidebar-dropdown active"
                      : "sidebar-dropdown"
                  }
                >
                  <Link
                    to="/dashboard"
                    onClick={() => toggleDropdown("dashboard")}
                  >
                    <i className="fa fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                    <span className="badge badge-pill badge-warning">New</span>
                  </Link>
                </li>

                {/* Experience Section */}
                <li
                  className={
                    activeDropdown === "experience"
                      ? "sidebar-dropdown active"
                      : "sidebar-dropdown"
                  }
                >
                  <a href="#" onClick={() => toggleDropdown("experience")}>
                    <i className="fa fa-briefcase"></i>
                    <span>Experience</span>
                  </a>
                  <div
                    className="sidebar-submenu"
                    style={{
                      display:
                        activeDropdown === "experience" ? "block" : "none",
                    }}
                  >
                    <ul>
                      <li>
                        <Link to="/experience_category">Categories</Link>
                      </li>
                      <li>
                        <a href="#">Experience</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Skills Section */}
                <li
                  className={
                    activeDropdown === "skill"
                      ? "sidebar-dropdown active"
                      : "sidebar-dropdown"
                  }
                >
                  <a href="#" onClick={() => toggleDropdown("skill")}>
                    <i className="fa fa-gem"></i>
                    <span>Skill</span>
                  </a>
                  <div
                    className="sidebar-submenu"
                    style={{
                      display: activeDropdown === "skill" ? "block" : "none",
                    }}
                  >
                    <ul>
                      <li>
                        <Link to="/skill_category">Categories</Link>
                      </li>
                      <li>
                        <a href="#">Skills</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Education Section */}
                <li
                  className={
                    activeDropdown === "education"
                      ? "sidebar-dropdown active"
                      : "sidebar-dropdown"
                  }
                >
                  <a href="#" onClick={() => toggleDropdown("education")}>
                    <i className="fa fa-graduation-cap"></i>
                    <span>Education</span>
                  </a>
                  <div
                    className="sidebar-submenu"
                    style={{
                      display:
                        activeDropdown === "education" ? "block" : "none",
                    }}
                  >
                    <ul>
                      <li>
                        <Link to="/education_category">Categories</Link>
                      </li>
                      <li>
                        <a href="#">Education</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Project Section */}
                <li
                  className={
                    activeDropdown === "project"
                      ? "sidebar-dropdown active"
                      : "sidebar-dropdown"
                  }
                >
                  <a href="#" onClick={() => toggleDropdown("project")}>
                    <i className="fa fa-industry"></i>
                    <span>Project</span>
                  </a>
                  <div
                    className="sidebar-submenu"
                    style={{
                      display: activeDropdown === "project" ? "block" : "none",
                    }}
                  >
                    <ul>
                      <li>
                        <Link to="/porject_category">Categories</Link>
                      </li>
                      <li>
                        <a href="#">Project</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Blog Setction */}
                <li
                  className={
                    activeDropdown === "blog"
                      ? "sidebar-dropdown active"
                      : "sidebar-dropdown"
                  }
                >
                  <a href="#" onClick={() => toggleDropdown("blog")}>
                    <i className="fa fa-rss"></i>
                    <span>Blog</span>
                  </a>
                  <div
                    className="sidebar-submenu"
                    style={{
                      display: activeDropdown === "blog" ? "block" : "none",
                    }}
                  >
                    <ul>
                      <li>
                        <Link to="/blog_category">Categories</Link>
                      </li>
                      <li>
                        <a href="#">Project</a>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Extra Section */}
                <li className="header-menu">
                  <span>Extra</span>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-book"></i>
                    <span>Documentation</span>
                    <span className="badge badge-pill badge-primary">Beta</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-calendar"></i>
                    <span>Calendar</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-folder"></i>
                    <span>Uploads</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Section */}
          <div className="sidebar-footer">
            <a href="#">
              <i className="fa fa-bell"></i>
              <span className="badge badge-pill badge-warning notification">
                3
              </span>
            </a>
            <a href="#">
              <i className="fa fa-envelope"></i>
              <span className="badge badge-pill badge-success notification">
                7
              </span>
            </a>
            <a href="#">
              <i className="fa fa-cog"></i>
              <span className="badge-sonar"></span>
            </a>
            <a onClick={handleLogout}>
              <i className="fa fa-power-off"></i>
            </a>
          </div>
        </nav>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .active {
    background-color: white;
    color: black;
  }
`;

export default Sidebar;
