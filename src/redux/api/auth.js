import { config } from "../config";
import axios from "axios";
import { headers, authHeader } from "../headers";

export const register = async (obj) => {
  try {
    const response = await axios.post(
      `${config.changemaker}register`,
      obj,
      headers
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const message = error.response
      ? error.response.data.message
        ? error.response.data.message
        : error.response.data.response_message
        ? error.response.data.response_message
        : "Invalid Credentials"
      : "Network Error";
    return { message };
  }
};

export const login_user = async (obj) => {
  try {
    const response = await axios.post(
      `${config.changemaker}login`,
      obj,
      headers
    );
    const { data } = await response.data;
    return { data };
  } catch (error) {
    const message = error.response
      ? error.response.data.message
        ? error.response.data.message
        : error.response.data.response_message
        ? error.response.data.response_message
        : "Invalid Credentials"
      : "Network Error";
    return { message };
  }
};

export const reset_password = async (token, obj) => {
  try {
    const response = await axios.post(
      `${config.changemaker}reset_password`,
      obj,
      { headers: authHeader(token) }
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const message = error.response
      ? error.response.data.message
        ? error.response.data.message
        : error.response.data.response_message
        ? error.response.data.response_message
        : "Invalid Credentials"
      : "Network Error";
    return { message };
  }
};

export const update_profile = async (token, obj) => {
  try {
    const response = await axios.put(`${config.changemaker}user/update`, obj, {
      headers: authHeader(token),
    });
    const { data } = await response.data;
    // console.log(data);
    return { data };
  } catch (error) {
    const message = error.response
      ? error.response.data.message
        ? error.response.data.message
        : error.response.data.response_message
        ? error.response.data.response_message
        : "Invalid Credentials"
      : "Network Error";
    return { message };
  }
};
