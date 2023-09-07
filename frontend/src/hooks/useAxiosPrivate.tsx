import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector, useAppDispatch } from "./hooks";
import { getToken } from "../feature/auth/function";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const refreshToken = getToken("refresh");
  const accessToken = getToken("access");
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {

      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, token?.refresh]);

  // axiosPrivate.interceptors.request.use(
  //   (config) => {
  //     console.log(config.headers["Authorization"]);
  //     if (!config.headers["Authorization"]) {
  //       config.headers["Authorization"] = `Bearer ${accessToken}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     console.log(error);
  //     return Promise.reject(error);
  //   }
  // );

  return axiosPrivate;
};

export default useAxiosPrivate;
