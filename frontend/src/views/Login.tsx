import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { login } from "../feature/auth/function";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const submitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(login(user));
    navigate('/home')
  };
  return (
    <>
      <h1>Login</h1>
      <form>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => submitHandler(e)}
        >
          Submit
        </button>
      </form>
    </>
  );
};
