import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosInstance } from "axios";
export const register = createAsyncThunk(
  "users/register",
  async (
    user: {
      email: string;
      password: string;
      name: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const REGESTER_URL = "/register";
      let config = {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
      };
      const response = await axios.post(REGESTER_URL, user, config);

      let userResponse = {
        name: response.data.data.name,
        email: response.data.data.email,
      };
      localStorage.setItem("user", JSON.stringify(userResponse));
      storeToken({
        key: "access",
        value: JSON.stringify(response.data.data.accessToken),
      });
      storeToken({
        key: "refresh",
        value: JSON.stringify(response.data.data.refreshToken),
      });
      //   storeToken(JSON.stringify(response.data.data.token));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "users/login",
  async (
    user: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const LOGIN_URL = "/login";
      let config = {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
      };
      const response = await axios.post(LOGIN_URL, user, config);

      let userResponse = {
        name: response.data.data.name,
        email: response.data.data.email,
      };
      localStorage.setItem("user", JSON.stringify(userResponse));
      storeToken({
        key: "access",
        value: JSON.stringify(response.data.data.accessToken),
      });
      storeToken({
        key: "refresh",
        value: JSON.stringify(response.data.data.refreshToken),
      });

      return response.data.data;
    } catch (error: any) {

      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    const LOGOUT_URL = "/logout";
    let token: string | false = getToken("access");
    let config = {
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${token}`,
      },
    };
    deleteToken("token");
    const response = await axios.post(LOGOUT_URL, config);

    return response.data;
  } catch (error: any) {
    // return rejectWithValue(error.response.data);
  }
});

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (axiosInstance: AxiosInstance, { rejectWithValue }) => {
    try {
      const controller = new AbortController();
      const response = await axiosInstance.get("/profile", {
        signal: controller.signal,
      });

      return response.data.data;
    } catch (error: any) {

      return rejectWithValue(error.response.data);
    }
  }
);

export const storeToken = (token: { key: string; value: string }) => {

  localStorage.setItem(token.key, token.value.slice(1, token.value.length - 1));
};

export const getToken = (tokenname: string): string | false => {
  const token: string | null = localStorage.getItem(tokenname);
  if (token) {
    return token;
  }
  return false;
};

export const deleteToken = (tokenname: string): boolean => {
  const token: string | null = localStorage.getItem(tokenname);
  if (token) {
    localStorage.removeItem(tokenname);
    return true;
  }
  return false;
};
