import React from "react";
import styled from "styled-components";
import Navbar from "./utilities/Navbar";
import Sidebar from "./utilities/Sidebar";
import Profile from "./Settings/Profile";
import ResetPassword from "./Settings/ResetPassword";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const Settings = () => {
  const [value, setValue] = React.useState("profile");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Wrapper>
      <Sidebar />

      <MainWrapper>
        <Navbar />
        <BodyWrapper>
          <div className="py-4 d-flex align-items-center justify-content-start px-5">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              aria-label="secondary tabs example">
              <Tab
                style={{
                  marginRight: "30px",
                  background: "#f8f9fa",
                  color: "#03045e",
                }}
                value="profile"
                label="Profile"
              />
              <Tab
                style={{
                  marginRight: "30px",
                  background: "#f8f9fa",
                  color: "#03045e",
                }}
                value="password"
                label="Password"
              />
              <Tab
                style={{
                  marginRight: "30px",
                  background: "#f8f9fa",
                  color: "#03045e",
                }}
                value="three"
                label="Notifications"
              />
            </Tabs>
          </div>
          <hr className="mb-4" />
          {value === "profile" ? (
            <Profile />
          ) : value === "password" ? (
            <ResetPassword />
          ) : (
            <></>
          )}
        </BodyWrapper>
      </MainWrapper>
    </Wrapper>
  );
};

export default Settings;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  background: #f8f9fa;
`;

const MainWrapper = styled.div`
  width: 85%;
`;

const BodyWrapper = styled.div`
  background: #f8f9fa;

  h4 {
    font-size: 16px;
    font-weight: 500;
    padding-left: 50px;
  }
  .body-content {
    padding: 1rem 10rem;
  }
  button {
    background: #03045e;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 600;
  }
`;
