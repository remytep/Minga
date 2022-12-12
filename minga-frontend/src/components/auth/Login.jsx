import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import cover_img from "../../assets/homePages/auth/desk_example1.jpg";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters")
      .max(23, "Password must not exceed 23 characters"),
  });

  const handleSubmit = (data) => {
    axios
      .get("http://127.0.0.1:36783/api/users/13", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
    console.log(data);
  };

  // const onSubmit = (data) => {
  // };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-2xl text-white font-bold my-4">
            Turn your Ideas into Reality
          </h1>
          <p className="text-base text-white font-normal">
            Join us and get attractive offers
          </p>
        </div>
        <img src={cover_img} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="w-1/2 h-full bg-[#D9D5CA] flex flex-col px-24 py-16 justify-between items-center">
        <div className="w-full flex flex-col max-w-[450px]">
          <h1 className="text-4xl text-[#060606] font-dosis mb-2">Minga</h1>
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-4">Login</h3>
            <p className="text-sm mb-2">
              Welcome back ! Please enter your details
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(data) => handleSubmit(data)}
          >
            <Form>
              <div className="w-full flex flex-col">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full text-black border-b border-black outline-none focus:outline-none py-2 my-2 bg-transparent"
                />
                <ErrorMessage name="email" component="small" />

                <Field
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  className="w-full text-black border-b border-black outline-none focus:outline-none py-2 mb-10 bg-transparent"
                />
                <ErrorMessage
                  name="password"
                  component="small"
                />
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center">
                  <input type="checkbox" className="w-4 h-4 mr-2" />
                  <p className="text-sm">Remember Me</p>
                </div>

                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                  Forgot Password
                </p>
              </div>

              <div className="w-full h-full flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-white bg-[#060606] rounded-md p-3 text-center flex items-center justify-center cursor-pointer mb-1"
                >
                  Log In
                </button>
              </div>
            </Form>
          </Formik>

          <div className="w-full flex items-center justify-center relative py-6">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-md absolute text-black/80 bg-[#D9D5CA] px-1">
              Or
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Don't have an account ?
            <span className="font-semibold underline underline-offset-2 cursor-pointer px-1">
              <Link to="/register">Sign up here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
