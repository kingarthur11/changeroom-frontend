import React, { useState } from "react";
import styled from "styled-components";
// import { NavLink } from "react-router-dom";
// import { logOut } from "../../redux/actions/authActions";
// import { useSelector, useDispatch, connect } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showham, setShowHam] = useState(false);

  const [isToggled, toggle] = useState(false);

  const callback = () => {
    toggle(!isToggled);
    console.log(isToggled);
  };

  return (
    <SidebarWrapper>
      {/* <i onClick={callback} className="fa-solid fa-bars harmbuga"></i> */}
      <div className={(isToggled ? "hamSettin " : "") + "sidebar"}>
        <ul>
          <li>
            <i className="fas fa-cog"></i>
            <span className="px-3">Setting</span>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <span className="px-3">Setting</span>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <span className="px-3">Setting</span>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <span className="px-3">Setting</span>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <span className="px-3">Setting</span>
          </li>
          <li>
            <i className="fas fa-cog"></i>
            <span className="px-3">Setting</span>
          </li>
        </ul>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  .sidebar {
    background: #03045e;
    color: #ffffff;
    height: 100%;
    position: fixed;
    left: 0;
    width: 20%;
    transition: all 0.5s ease;
  }

  ul {
    list-style: none;
    font-size: 20px;
    font-weight: 600;
    padding: 0px;
    padding-top: 100px;
    cursor: pointer;
  }
  li {
    padding: 15px 0;
    padding-left: 30px;
    color: #ffffff;
    transition: 0.7s;
  }
  li:hover {
    background: #ffffff;
    color: #03045e;
    padding-left: 50px;
  }
  .harmbuga {
    color: #03045e;
    font-size: 40px;
    padding: 30px 100px;
  }
  .hamSettin {
    left: -20%;
  }
`;
