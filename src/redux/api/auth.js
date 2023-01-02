import { config } from "../config";
import axios from "axios";
import { headers } from "../headers";

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
