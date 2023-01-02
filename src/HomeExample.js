import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./utilities/Sidebar";
import Navbar from "./utilities/Navbar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ModalComponent from "./utilities/modal";
import { config } from "../redux/config";
import axios from "axios";
import { headers } from "../redux/headers";
import { dateFormatter } from "./utilities/dateFormater";

const Home = () => {
  const [show, setShow] = useState(false);
  const [isToggled, toggle] = useState(false);

  const [formData, setFormData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${config.changemaker}companies`, {
        headers,
      });
      const { data } = await response.data;
      console.log(data);
      setFormData(data);
      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  const callback = () => {
    toggle(!isToggled);
    console.log(isToggled);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <MainWrapper>
        <div>
          <Navbar callback={callback} />
        </div>
        <BodyWrapper>
          <div className="py-4 d-flex align-items-center justify-content-between px-5">
            <input placeholder="search company" />
            <div></div>
          </div>
          <hr className="mb-4" />
          <div className="px-5 table-content position-relative">
            <div className="style-round">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Date created</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Company Email</th>
                    <th scope="col">Service</th>
                  </tr>
                </thead>
                <tbody>
                  {formData &&
                    formData.map((item) => {
                      // console.log(item.service.name);
                      return (
                        <tr key={item.id}>
                          <td>{dateFormatter(item?.created_at)}</td>
                          <td>{item?.company_name}</td>
                          <td>{item?.company_email}</td>
                          <td>{item?.service.name}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </BodyWrapper>
      </MainWrapper>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  background: #f8f9fa;
`;

const MainWrapper = styled.div`
  width: 100%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const BodyWrapper = styled.div`
  background: #f8f9fa;

  button {
    background: #03045e;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 600;
  }
`;
