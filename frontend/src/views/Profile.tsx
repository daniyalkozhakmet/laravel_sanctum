import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getProfile } from "../feature/auth/function";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
export const Profile = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { profile } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getProfile(axiosPrivate));
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <h2>{profile?.name}</h2>
      </div>
    </div>
  );
};
