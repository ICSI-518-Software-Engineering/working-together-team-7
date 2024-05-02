import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../utility/constants";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // Initialize useForm hook
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Function to execute on form submit
  const onSubmit = async (data) => {
    try {
      // Extracting username and password from the form data
      const { username, password } = data;
      // Make an API call with username and password
      const response = await axios.post('http://localhost:8080/api/register', { username, password });
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('authenticated', true);
      navigate(ROUTE_PATHS.HOME);
      // Handle response or redirect user
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
<div className="login_body">
    <div className="container login_container">
      <div className="login form">
        <header>Signup</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input
            type="text"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>} */}

          <input
            type="text"
            placeholder="Enter your username"
            className={"mb-2"}
            {...register("username", { required: true })}
          />
          {errors.username && <span className={"error"}>This field is required</span>}

          <input
            type="password"
            placeholder="Create a password"
            className={"mb-2"}
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && <span className={"error"}>This field is required</span>}
          {errors.password && errors.password.type === "minLength" && <span className={"error"}>Password must have at least 6 characters</span>}

          <input
            type="password"
            placeholder="Confirm your password"
            className={"mb-2"}
            {...register("confirmPassword", { 
              validate: (value) => value === watch('password') || "The passwords do not match"
            })}
          />
          {errors.confirmPassword && <span className={"error"}>{errors.confirmPassword.message}</span>}

          <input type="submit" className="button" value="Signup" />
        </form>
        <div className="signup">
          <span className="signup">
            Already have an account?
            <Link to={ROUTE_PATHS.LOGIN} className="navbar-brand">Login</Link>
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
