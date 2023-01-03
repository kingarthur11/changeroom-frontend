import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { resetPassword } from "../../redux/actions/authActions";
import Button from "@mui/material/Button";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const [values, setValues] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const refresh = () => {
    setValues({ old_password: "", password: "", password_confirmation: "" });
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(resetPassword(token, data));
    refresh();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Wrapper>
      <div className="w-100">
        <div className="w-50">
          <h3>Change Password</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2">
              <div className="">
                <label>Old Password</label>
                <input
                  name="old_password"
                  {...register("old_password", { required: true })}
                  value={values.old_password}
                  className="w-100 dollar-input"
                  type="password"
                  placeholder="Old Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="my-2">
              <div className="">
                <label>New Password</label>
                <input
                  name="password"
                  {...register("password", { required: true })}
                  value={values.password}
                  className="w-100 dollar-input"
                  type="password"
                  placeholder="New Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="my-2">
              <div className="">
                <label>Comfirm Password</label>
                <input
                  name="password_confirmation"
                  {...register("password_confirmation", { required: true })}
                  value={values.password_confirmation}
                  className="w-100 dollar-input"
                  type="password"
                  placeholder="Comfirm Password"
                  onChange={handleChange}
                />
              </div>
            </div>
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
          </form>
        </div>
      </div>
      <div className="w-50"></div>
    </Wrapper>
  );
};

export default ResetPassword;

const Wrapper = styled.div`
  padding: 1rem 10rem;
`;
