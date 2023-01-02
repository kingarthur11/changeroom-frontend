import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { logOut } from "../../redux/actions/authActions";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ show }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => dispatch(logOut(navigate));

  return (
    <SidebarWrapper show={show}>
      <div className={show ? "sidebar" : ""}>
        <ul>
          <NavLink className="nav_link" to="/">
            <li>
              <i className="fas fa-home"></i>
              <span className="px-3">Home</span>
            </li>
          </NavLink>
          <li>
            <i className="fas fa-user"></i>
            <span className="px-3">Customer</span>
          </li>
          <NavLink className="nav_link" to="/companies">
            <li>
              <i className="fas fa-users"></i>
              <span className="px-3">Company</span>
            </li>
          </NavLink>
          <li>
            <i className="fab fa-servicestack"></i>
            <span className="px-3">Services</span>
          </li>
          <li>
            <i className="fas fa-envelope"></i>
            <span className="px-3">Notification</span>
          </li>
          <NavLink className="nav_link" to="/settings">
            <li>
              <i className="fas fa-cog"></i>
              <span className="px-3">Setting</span>
            </li>
          </NavLink>
          <li onClick={logout}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="px-3">Logout</span>
          </li>
        </ul>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  background: #ffffff;
  width: 20%;

  @media (max-width: 1200px) {
    display: ${(props) => (props.show ? "block" : "none")};
    /* left: ${(props) => (props.show ? 0 : "")};
    top: ${(props) => (props.show ? 0 : "")};
    z-index: ${(props) => (props.show ? 10 : "")};
    background: ${(props) => (props.show ? "#03045e" : "")};
    width: ${(props) => (props.show ? "200px" : "")};
    color: ${(props) => (props.show ? "#ffffff" : "")}; */
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background: #03045e;
    color: #ffffff;
    width: 200px;
    .sidebar {
      ul {
        list-style: none;
        font-size: 14px;
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
    }
  }
  .nav_link {
    text-decoration: none;
  }
  .active {
    li {
      background: #03045e;
      color: #ffffff;
    }
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
    color: #03045e;
    transition: 0.7s;
  }
  li:hover {
    background: #03045e;
    color: #ffffff;
    padding-left: 50px;
  }
`;
