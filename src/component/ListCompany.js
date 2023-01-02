import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ModalComponent from "./utilities/modal";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Sidebar from "./utilities/Sidebar";
import Navbar from "./utilities/Navbar";
import { config } from "../redux/config";
import axios from "axios";
import { authHeader, headers } from "../redux/headers";
import { dateFormatter } from "./utilities/dateFormater";
import { useForm } from "react-hook-form";
import Select from "react-select";

const ListCompany = () => {
  const [editShow, setEditShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const { token } = JSON.parse(localStorage.getItem("token"));

  const [formData, setFormData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`${config.changemaker}user/companies`, {
        headers: authHeader(token),
      });
      const { data } = await response.data;
      console.log(data);
      setFormData(data);
      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = (id) => {
    axios
      .delete(`${config.changemaker}companies/${id}`, {
        headers: authHeader(token),
      })
      .then(() => {
        getData();
      });
  };

  const onEditClick = async (id) => {
    setEditId(id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {" "}
      <Wrapper>
        <Sidebar />
        <MainWrapper>
          <Navbar />
          <BodyWrapper>
            <div className="py-4 d-flex align-items-center justify-content-between px-5">
              <h4 className="pl-4">Company Details</h4>
              <Button
                onClick={() => setAddShow(true)}
                style={{
                  color: "#ffffff",
                  background: "#03045e",
                }}
                size="medium"
                variant="contained">
                Add company
              </Button>
            </div>
            <hr className="mb-4" />
            <div className="body-content w-100">
              <div className="row">
                {formData &&
                  formData.map((content, index) => (
                    <div className="col-md-6">
                      <div className="company-card">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{(content?.company_name).toUpperCase()}</h5>
                            <p>{content?.company_email}</p>
                          </div>
                          <Stack spacing={2} direction="row">
                            <Button
                              onClick={() => {
                                setEditShow(true);
                                onEditClick(content.id);
                              }}
                              style={{
                                color: "#ffffff",
                                background: "#03045e",
                              }}
                              size="medium"
                              variant="contained">
                              Edit
                            </Button>
                            <Button
                              onClick={() => onDelete(content.id)}
                              size="medium"
                              variant="outlined">
                              Delete
                            </Button>
                          </Stack>
                        </div>
                        <hr className="my-3" />
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>Country</h5>
                            <p>{content?.country?.name}</p>
                          </div>
                          <div>
                            <h5>Service</h5>
                            <p>{content?.service?.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </BodyWrapper>
        </MainWrapper>
        <ModalComponent
          show={editShow}
          size={"lg"}
          handleClose={() => setEditShow(false)}>
          <EditCompany
            editId={editId}
            show={editShow}
            getData={getData}
            handleClose={() => setEditShow(false)}
          />
        </ModalComponent>
        <ModalComponent
          show={addShow}
          size={"lg"}
          getData={getData}
          handleClose={() => setAddShow(false)}>
          <AddCompany show={addShow} handleClose={() => setAddShow(false)} />
        </ModalComponent>
      </Wrapper>
    </div>
  );
};

export default ListCompany;

const EditCompany = ({ handleClose, editId, getData }) => {
  const { token } = JSON.parse(localStorage.getItem("token"));
  const [service, setService] = useState([]);
  const [country, setCountry] = useState([]);
  const [values, setValues] = useState({
    company_name: "",
    company_email: "",
    service_id: "",
    country_id: "",
  });
  const getService = async () => {
    try {
      const response = await axios.get(`${config.changemaker}services`, {
        headers,
      });
      const { data } = await response.data;
      setService(data);
      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  const getCompany = async (id) => {
    try {
      const response = await axios.get(`${config.changemaker}companies/${id}`, {
        headers: authHeader(token),
      });
      const { data } = await response.data;
      setValues(data);
      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (data) => {
    try {
      const response = await axios.put(
        `${config.changemaker}companies/${editId}`,
        data,
        {
          headers: authHeader(token),
        }
      );
      const success = await response.data;
      console.log(success);
      getData();
      handleClose();
    } catch (error) {
      console.log(error);
      getData();
      handleClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    editData(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const getCountry = async () => {
    try {
      const response = await axios.get(`${config.changemaker}countries`, {
        headers,
      });
      const { data } = await response.data;
      setCountry(data);
      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry();
    getService();
  }, []);

  useEffect(() => {
    getCompany(editId);
  }, [editId]);

  return (
    <EditWrapper>
      <h3>Edit Company</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <div className="">
            <label>Company name</label>
            <input
              name="company_name"
              {...register("company_name", { required: true })}
              value={values.company_name}
              className="w-100 dollar-input"
              type="text"
              placeholder="Company name"
              onChange={handleChange}
            />
            {errors.company_name?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }} role="alert">
                Company Name is required
              </p>
            )}
          </div>
        </div>
        <div className="my-2">
          <div className="">
            <label>Company Email</label>
            <input
              name="company_email"
              {...register("company_email", { required: true })}
              value={values.company_email}
              className="w-100 dollar-input"
              placeholder="Company Email"
              type="text"
              onChange={handleChange}
            />
            {errors.company_email?.type === "required" && (
              <p
                style={{
                  lineHeight: "20px",
                  color: "red",
                  fontSize: "12px",
                }}
                role="alert">
                Company Email is required
              </p>
            )}
          </div>
        </div>
        <div className="my-2">
          <div className="">
            <label>Service</label>
            <select
              className="w-100 dollar-input"
              name="service_id"
              {...register("service_id")}
              onChange={handleChange}
              value={values?.service_id}>
              <option></option>
              {service &&
                service.map((item) => {
                  // console.log(item);
                  return (
                    <option key={item.id} value={item?.id}>
                      {item?.name}
                    </option>
                  );
                })}
            </select>
            {errors.service_id?.type === "required" && (
              <p
                style={{
                  lineHeight: "20px",
                  color: "red",
                  fontSize: "12px",
                }}
                role="alert">
                Country number is required
              </p>
            )}
          </div>
        </div>
        <div className="my-2">
          <div className="">
            <label>Country</label>
            <select
              className="w-100 dollar-input"
              name="country_id"
              {...register("country_id")}
              onChange={handleChange}
              value={values?.country?.id}>
              <option></option>
              {country &&
                country.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            {errors.country_id?.type === "required" && (
              <p
                style={{
                  lineHeight: "20px",
                  color: "red",
                  fontSize: "12px",
                }}
                role="alert">
                Country number is required
              </p>
            )}
          </div>
        </div>
        <Stack style={{ paddingTop: "50px" }} spacing={4} direction="row">
          <Button
            type="submit"
            style={{ color: "#ffffff", background: "#03045e" }}
            size="medium"
            variant="contained">
            Save
          </Button>
          <Button onClick={handleClose} size="medium" variant="outlined">
            Cancel
          </Button>
        </Stack>
      </form>
    </EditWrapper>
  );
};

const AddCompany = ({ handleClose, getData }) => {
  const { token } = JSON.parse(localStorage.getItem("token"));
  const [service, setService] = useState([]);
  const [country, setCountry] = useState([]);
  const [values, setValues] = useState({
    company_name: "",
    company_email: "",
    service_id: "",
    country_id: "",
  });

  const getService = async () => {
    try {
      const response = await axios.get(`${config.changemaker}services`, {
        headers,
      });
      const { data } = await response.data;
      setService(data);
      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  const getCountry = async () => {
    try {
      const response = await axios.get(`${config.changemaker}countries`, {
        headers,
      });
      const { data } = await response.data;
      setCountry(data);
      return { data };
    } catch (error) {
      console.log(error);
    }
  };

  const addData = async (data) => {
    try {
      const response = await axios.post(
        `${config.changemaker}companies`,
        data,
        {
          headers: authHeader(token),
        }
      );
      const success = await response.data;
      console.log(success);
      getData();
      handleClose();
    } catch (error) {
      console.log(error);
      getData();
      handleClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => addData(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    getCountry();
    getService();
  }, []);

  return (
    <EditWrapper>
      <h3>Add Company</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <div className="">
            <label>Company name</label>
            <input
              name="company_name"
              {...register("company_name", { required: true })}
              value={values.company_name}
              className="w-100 dollar-input"
              type="text"
              placeholder="Company name"
              onChange={handleChange}
            />
            {errors.company_name?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }} role="alert">
                Company Name is required
              </p>
            )}
          </div>
        </div>
        <div className="my-2">
          <div className="">
            <label>Company Email</label>
            <input
              name="company_email"
              {...register("company_email", { required: true })}
              value={values.company_email}
              className="w-100 dollar-input"
              placeholder="Company Email"
              type="text"
              onChange={handleChange}
            />
            {errors.company_email?.type === "required" && (
              <p
                style={{
                  lineHeight: "20px",
                  color: "red",
                  fontSize: "12px",
                }}
                role="alert">
                Company Email is required
              </p>
            )}
          </div>
        </div>
        <div className="my-2">
          <div className="">
            <label>Service</label>
            <select
              className="w-100 dollar-input"
              name="service_id"
              {...register("service_id")}>
              <option></option>
              {service &&
                service.map((item) => {
                  // console.log(item);
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name.toUpperCase()}
                    </option>
                  );
                })}
            </select>
            {errors.service_id?.type === "required" && (
              <p
                style={{
                  lineHeight: "20px",
                  color: "red",
                  fontSize: "12px",
                }}
                role="alert">
                Country number is required
              </p>
            )}
          </div>
        </div>
        <div className="my-2">
          <div className="">
            <label>Country</label>
            <select
              className="w-100 dollar-input"
              name="country_id"
              {...register("country_id")}>
              <option></option>
              {country &&
                country.map((item) => {
                  // console.log(item);
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name.toUpperCase()}
                    </option>
                  );
                })}
            </select>
            {errors.country_id?.type === "required" && (
              <p
                style={{
                  lineHeight: "20px",
                  color: "red",
                  fontSize: "12px",
                }}
                role="alert">
                Country number is required
              </p>
            )}
          </div>
        </div>
        <Stack style={{ paddingTop: "50px" }} spacing={4} direction="row">
          <Button
            type="submit"
            style={{ color: "#ffffff", background: "#03045e" }}
            size="medium"
            variant="contained">
            Save
          </Button>
          <Button onClick={handleClose} size="medium" variant="outlined">
            Cancel
          </Button>
        </Stack>
      </form>
    </EditWrapper>
  );
};

const EditWrapper = styled.div`
  padding: 20px 70px;
`;

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
    font-style: normal;
    font-weight: 700;
    font-size: 27.7819px;
    line-height: 33px;
    color: #000000;
  }
  .body-content {
    padding: 1rem 5rem;
  }
  .company-card {
    padding: 10px 20px;
    background: #ffffff;
    box-shadow: 0px 11.9769px 27.9462px rgba(0, 0, 0, 0.16);
    margin-bottom: 20px;

    h5 {
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
    }

    p {
      line-height: 20px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
    }
  }
`;
