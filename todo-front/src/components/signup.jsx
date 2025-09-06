import React, { useContext, useState } from "react";
import { registeruser } from "../services/todoitemservices";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../store/context";

const Signup = () => {
  let {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    user,
    setuser,
  } = useContext(TodoContext);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add signup logic here
    // console.log(e);
    // console.log(
    //   `Name: ${name}\nEmail: ${email}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`
    // );
    let res = await registeruser(name, email, password);
    console.log(res);
    if (res.data.userid) {
      setuser(res.data.userid);
      console.log(res.data.userid);
      navigate(res.data.route);
    }
    if (res.data.errors) {
      console.log(res.data.errors);
    }
    if (res.data.route) {
      // navigate(res.data.route);
    }
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>
        <div className="signup-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="signup-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="signup-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="signup-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
