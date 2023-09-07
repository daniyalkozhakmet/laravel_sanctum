import axios from "../api/axios";
import { useAppDispatch, useAppSelector } from "./hooks";
import { refreshSet } from "../feature/auth/authSlice";
import { deleteToken, getToken, storeToken } from "../feature/auth/function";
const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    const refreshToken = getToken("refresh");

    axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && refreshToken) {
          config.headers["Authorization"] = `Bearer ${refreshToken}`;
          config.headers["Accept"] = `application/vnd.api+json`;
          config.headers["Content-Type"] = `application/vnd.api+json`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const response = await axios.post("/auth/refresh");

    if (response.status == 200) {
      storeToken({ key: "access", value: response.data.accessToken });
      refreshSet(response.data.accessToken);
    }
    if (response.status == 401) {
      deleteToken("access");
      deleteToken("refresh");
      deleteToken("user");
    }

    // setAuth((prev) => {
    //   console.log(JSON.stringify(prev));
    //   console.log(response.data.accessToken);
    //   return { ...prev, accessToken: response.data.accessToken };
    // });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
