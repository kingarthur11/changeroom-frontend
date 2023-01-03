import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { updateProfile } from "../../redux/actions/authActions";
import Button from "@mui/material/Button";
import { authHeader, headers } from "../../redux/headers";
import { config } from "../../redux/config";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));

  const { isLoading } = useSelector((state) => state.auth);

  const [country, setCountry] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    country_id: 0,
  });

  const getUser = async () => {
    try {
      const response = await axios.get(`${config.changemaker}user`, {
        headers: authHeader(token),
      });
      const data = await response.data;
      console.log(data);
      setValues(data);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateProfile(token, data));
    getUser();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    getUser();
    getCountry();
  }, []);

  return (
    <Wrapper>
      <div className="w-100">
        <div className="w-50">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <div className="">
                <label>Full Name</label>
                <input
                  name="name"
                  {...register("name", { required: true })}
                  value={values?.name}
                  className="w-100 dollar-input"
                  type="text"
                  placeholder="Full name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="my-2">
                  <div className="">
                    <label>Email</label>
                    <input
                      name="email"
                      {...register("email", { required: true })}
                      value={values?.email}
                      className="w-100 dollar-input"
                      placeholder="Email Address"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="my-2">
                  <div className="">
                    <label>Phone Number</label>
                    <input
                      name="phone_number"
                      {...register("phone_number", { required: true })}
                      value={values?.phone_number}
                      className="w-100 dollar-input"
                      type="text"
                      placeholder="Phone number"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <label>Country</label>
                <select
                  className="w-100 dollar-input"
                  name="country_id"
                  {...register("country_id")}
                  onChange={handleChange}
                  value={values?.country_id}>
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
              </div>
            </div>
            {isLoading ? (
              <Button
                type="submit"
                style={{
                  color: "#ffffff",
                  background: "#205295",
                  marginTop: "30px",
                }}
                size="medium"
                variant="contained">
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                style={{
                  color: "#ffffff",
                  background: "#03045e",
                  marginTop: "30px",
                }}
                size="medium"
                variant="contained">
                Save
              </Button>
            )}
          </form>
        </div>
      </div>
      <div className="w-50"></div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  /* width: 100%; */
  padding: 1rem 10rem;
`;
