// import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { postlogin } from "../services/todoitemservices";
import { TodoContext } from "../store/context";
import { useContext } from "react";
const Login = () => {
  let navigate = useNavigate();
  let { setloggedin, setloginemail, loginemail, setloginpass, loginpass } =
    useContext(TodoContext);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add login logic here
  //   console.log(`Email: ${email}\nPassword: ${password}`);
  // };

  let loginhandler = async (e) => {
    e.preventDefault();
    console.log(loginpass, loginemail);
    let res = await postlogin(loginpass, loginemail);
    if (res.data.message == "user not found") {
      console.log(res.data.message);
      navigate("/signup");
    }
    if (res.data.token) {
      navigate("/");
    }
    console.log(res);
    setloggedin(res.data.isloggedin);
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        method="POST"
        onSubmit={(e) => {
          loginhandler(e);
        }}
      >
        <h2 className="login-title">Login</h2>
        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setloginemail(e.target.value);
            }}
            required
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setloginpass(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
