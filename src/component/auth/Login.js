import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import Button from "@mui/material/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const refresh = () => {
    setValues({ email: "", password: "" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(loginUser(data, navigate));
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
      <LeftWrapper>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        </h3>
      </LeftWrapper>
      <RightWrapper>
        <div className="">
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h3>Login</h3>
              <Link className="nav_link" to="/">
                {" "}
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

            <div className="mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3">
                  <div className="">
                    {/* <label>Email</label> */}
                    <input
                      name="email"
                      {...register("email", { required: true })}
                      value={values.email}
                      className="w-100 dollar-input"
                      type="text"
                      onChange={handleChange}
                      placeholder="Email Address"
                    />
                    {errors.email?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Email is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="my-3">
                  <div className="">
                    {/* <label>Password</label> */}
                    <input
                      name="password"
                      {...register("password", {
                        required: true,
                      })}
                      value={values.password}
                      className="w-100 dollar-input"
                      type="password"
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    {errors.password?.type === "required" && (
                      <p style={{ color: "red" }} role="alert">
                        Password is required
                      </p>
                    )}
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
                      Login
                    </Button>
                  )}
                  <p>
                    Don???t have an account?{" "}
                    <span className="">
                      <Link to="/signup">Sign up</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </RightWrapper>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const RightWrapper = styled.div`
  width: 50%;
  background: #ffffff;
  padding: 50px 150px;
  input,
  select {
    margin-top: 20px;
  }

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
