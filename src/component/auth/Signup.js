import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { registerUser } from "../../redux/actions/authActions";
import { config } from "../../redux/config";
import axios from "axios";
import { headers } from "../../redux/headers";
import Button from "@mui/material/Button";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState([]);
  const [values, setValues] = useState({
    email: "",
    password: "",
    c_password: "",
    name: "",
    phone_number: "",
    country_id: "",
  });

  const refresh = () => {
    setValues({
      email: "",
      password: "",
      c_password: "",
      name: "",
      phone_number: "",
      country_id: "",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(registerUser(data, navigate));
    refresh();
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${config.changemaker}countries`, {
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

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Wrapper>
      <LeftWrapper>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        </h3>
      </LeftWrapper>
      <RightWrapper>
        <div className="signup-content">
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h3>Signup</h3>
              <Link className="nav_link" to="/">
                <Button
                  style={{
                    color: "#ffffff",
                    background: "#03045e",
                  }}
                  size="medium"
                  variant="contained">
                  Home
                </Button>
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pt-3">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="">
                      <label>Full Name</label>
                      <input
                        name="name"
                        {...register("name", { required: true })}
                        value={values.name}
                        className="w-100 dollar-input"
                        type="text"
                        placeholder="Full name"
                        onChange={handleChange}
                      />
                      {errors.name?.type === "required" && (
                        <p
                          style={{ color: "red", fontSize: "12px" }}
                          role="alert">
                          Name is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label>Country</label>
                      <select
                        className="w-100 dollar-input"
                        name="country_id"
                        {...register("country_id")}>
                        <option></option>
                        {formData &&
                          formData.map((item) => {
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
                </div>
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="">
                      <label>Email</label>
                      <input
                        name="email"
                        {...register("email", { required: true })}
                        value={values.email}
                        className="w-100 dollar-input"
                        placeholder="Email Address"
                        type="text"
                        onChange={handleChange}
                      />
                      {errors.email?.type === "required" && (
                        <p
                          style={{
                            lineHeight: "20px",
                            color: "red",
                            fontSize: "12px",
                          }}
                          role="alert">
                          Email is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label>Phone Number</label>
                      <input
                        name="phone_number"
                        {...register("phone_number", { required: true })}
                        value={values.phone_number}
                        className="w-100 dollar-input"
                        type="text"
                        placeholder="Phone number"
                        onChange={handleChange}
                      />
                      {errors.phone_number?.type === "required" && (
                        <p
                          style={{
                            lineHeight: "20px",
                            color: "red",
                            fontSize: "12px",
                          }}
                          role="alert">
                          Phone number is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  <div className="">
                    <label>Password</label>

                    <input
                      name="password"
                      {...register("password", { required: true })}
                      value={values.password}
                      className="w-100 dollar-input"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    {errors.password?.type === "required" && (
                      <p
                        style={{
                          lineHeight: "20px",
                          color: "red",
                          fontSize: "12px",
                        }}
                        role="alert">
                        Password is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="my-2">
                  <div className="">
                    <label>Comfirm Password</label>
                    <input
                      name="c_password"
                      value={values.c_password}
                      className="w-100 dollar-input"
                      placeholder="Comfirm Password"
                      type="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="text-center">
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
                      Signup
                    </Button>
                  )}
                  <p className="text-center pt-3">
                    Already have an account?{" "}
                    <span className="">
                      <Link to="/login">Login</Link>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </RightWrapper>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const RightWrapper = styled.div`
  width: 50%;
  background: #ffffff;
  padding: 50px 150px;

  @media (max-width: 996px) {
    width: 100%;
    padding: 50px 100px;
  }

  @media (max-width: 600px) {
    padding: 50px 30px;
  }
  .nav_link {
    text-decoration: none;
  }
  .signup-content {
    width: 100%;
  }

  input {
    color: #000000;
  }
  label,
  h3 {
    color: #000000;
    font-style: normal;
    line-height: 40px;
  }
  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
  }
  label,
  input {
    font-weight: 500;
    font-size: 15px;
  }
  .login-btn {
    background: #03045e;
    border-radius: 5px;
    font-weight: 700;
    color: #ffffff;
    padding: 10px 20px;
    align-items: center;
  }
  .style-link {
    text-decoration: none;
    color: #ffffff;
  }
`;

const LeftWrapper = styled.div`
  width: 50%;
  background: #03045e;
  padding: 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    color: #ffffff;
    font-size: 45px;
    line-height: 60px;
  }
  @media (max-width: 996px) {
    display: none;
  }
`;
