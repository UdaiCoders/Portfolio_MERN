import React from "react";
import styled from "styled-components"

const Navbar = () => {
  return (
       <Wrapper>
         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link text-white">
                Home
              </a>
            </li>

            <li className="nav-item d-none d-sm-inline-block ml-5">
              <a href="#" className="nav-link text-white">
                Dashboard
              </a>
            </li>
          </ul>
          {/* SEARCH FORM */}
          <form className="form-inline ml-auto">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
             <button className="" style={{padding:"0px", border:"none",paddingRight:"5px"}} type="submit">
                  <i className="fas fa-search" />
                </button>
            </div>
          </form>
        </nav>
       </Wrapper>
  
  );
};

const Wrapper = styled.section`
.main-header{
 background-color: #31353D;
 border : 1px solid white;
 color : white;
 font-weight: bold;
}
`;

export default Navbar;
