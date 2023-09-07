import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { register } from "../feature/auth/function";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });
  const dispatch = useAppDispatch();
  const submitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/home");
    dispatch(register(user));
  };
  return (
    <>
      <h1>Register</h1>
      <form>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp1"
            placeholder="Enter name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail2"
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
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password confirm</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Password"
            value={user.password_confirmation}
            onChange={(e) =>
              setUser({ ...user, password_confirmation: e.target.value })
            }
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
