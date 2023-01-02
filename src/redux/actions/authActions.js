import * as types from "../constant/auth";
import toast from "react-hot-toast";

import { register, login_user } from "../api/auth";

export const registerUser = (dataObj, navigate) => async (dispatch) => {
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  const { formData, message } = await register(dataObj);
  console.log(formData);
  if (formData) {
    dispatch({
      type: types.REGISTER_USER,
      payload: formData,
      success: true,
    });
    navigate("/login");
  }
  if (message) {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const loginUser = (dataObj, navigate) => async (dispatch) => {
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  const { formData, message } = await login_user(dataObj);
  if (formData) {
    localStorage.setItem("token", JSON.stringify(formData.data));
    // console.log(formData.data);
    dispatch({ type: types.LOGIN_USER, payload: formData.data, success: true });
    toast.success("Login was successful");
    navigate("/");
  }

  if (message) {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const logOut = (navigate) => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  dispatch({
    type: types.AUTHORIZE_FAIL,
    payload: "please login again!",
  });
  navigate("/login");
};

export const RefreshUser = () => async (dispatch) => {
  const data = JSON.parse(localStorage.getItem("token"));
  dispatch({
    type: types.LOADING,
    payload: true,
  });
  if (data) {
    dispatch({ type: types.LOGIN_USER, payload: data, success: true });
  } else {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: "please login again!",
    });
  }
};
