import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { notificationsType, ROUTE_PATHS } from "../../../utility/constants";
import './login.css';
import { useNavigate } from "react-router-dom";
import Notifications from "../../../Components/Notifications/notification";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
       
      const response = await axios.post('http://localhost:8080/api/login', data);
      console.log(response.data);
       
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('authenticated', true);
      navigate(ROUTE_PATHS.HOME);
      // Handle success (e.g., navigate to the dashboard, show a success message)
    } catch (error) {
       
      console.error(error);
      Notifications({
        type: notificationsType.ERROR,
        message: 'Invalid userName or Password.',
      });
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="login_body">
    <div className="container login_container">
      <input type="checkbox" id="check" />
      <div className="login form">
        <header>Login</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={"mb-2"}>
          <input 
            type="text" 
            placeholder="Enter your email" 
            className={"mb-2"}
            {...register("username", { required: true })}
          />
          {errors.username && <span className={"error"}>This field is required</span>}
          </div>
          <input 
            type="password" 
            placeholder="Enter your password" 
            className={"mb-2"}
            {...register("password", { required: true })}
          />
          {errors.password && <span className={"error"}>This field is required</span>}

          {/* <a href="#">Forgot password?</a> */}
          <input type="submit" className="button" value="Login" />
        </form>
        <div className="signup">
          <span className="signup">
            Don't have an account?
            <Link to={ROUTE_PATHS.SIGNUP} className="navbar-brand">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
