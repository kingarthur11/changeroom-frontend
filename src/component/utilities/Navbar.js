import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
// import { createStyles, withStyles } from "@material-ui/core";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ callback }) => {
  const { login, isAuth } = useSelector((state) => state.auth);

  const buttonStyle = {
    fontSize: "0.875rem",
    "@media (max-width: 600px)": {
      fontSize: "0.8rem",
    },
  };

  return (
    <NavWrapper>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-between">
          <i onClick={callback} className="fa-solid fa-bars harmbuga"></i>
          <div>
            <h3>Change</h3>
            <h3>Maker</h3>
          </div>
        </div>
        <div>
          {isAuth ? (
            <ul className=" d-flex align-items-center justify-content-start">
              <li>
                <Badge badgeContent={4} color="primary">
                  <MailIcon style={{ color: "#ffffff", fontSize: "40px" }} />
                </Badge>
              </li>
              <li>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {(login && login?.name).charAt(0).toUpperCase()}
                </Avatar>
              </li>
              <li>
                <div>
                  <p>Hello</p>
                  <h3>{(login && login?.name).toUpperCase()}</h3>
                </div>
              </li>
            </ul>
          ) : (
            <>
              <Stack spacing={2} direction="row">
                <Link className="nav_link" to="/login">
                  <Button
                    style={{
                      color: " #ffffff",
                    }}
                    sx={buttonStyle}>
                    Login
                  </Button>
                </Link>

                <Link className="nav_link" to="/signup">
                  <Button
                    sx={buttonStyle}
                    style={{
                      color: " #03045e",
                      background: "#ffffff",
                    }}
                    variant="outlined">
                    Signup
                  </Button>
                </Link>
              </Stack>
            </>
          )}
        </div>
      </div>
    </NavWrapper>
  );
};

export default Navbar;

const NavWrapper = styled.div`
  padding: 1.5rem 5rem;
  background: #03045e;
  position: sticky;
  z-index: 10;
  top: 0;
  left: 0;
  .harmbuga {
    color: #ffffff;
    font-size: 40px;
    padding-right: 20px;
  }
  @media (min-width: 1200px) {
    .harmbuga {
      display: none;
    }
  }
  @media (max-width: 600px) {
    padding: 1.5rem 1rem;
    h3 {
      font-size: 1rem;
    }
  }
  .nav_link {
    text-decoration: none;
  }
  h3,
  p {
    color: #ffffff;
    line-height: 25px;
  }
  li {
    padding-left: 20px;
  }
  li:first-child {
    padding-right: 50px;
  }
`;
