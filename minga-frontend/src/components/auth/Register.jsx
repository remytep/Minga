<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React from "react";
>>>>>>> feature/Categories
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
<<<<<<< HEAD
import { AuthContext } from "../../contexts/AuthContext";

import cover_img from "../../assets/homePages/auth/signup_desk.jpg";

=======
import cover_img from "../../assets/homePages/auth/signup_desk.jpg";

>>>>>>> feature/Categories
const schema = yup.object().shape({
  email: yup.string().email().required("Email is invalid"),
  password: yup
    .string()
    .min(3, "Passwords must be at least 3 characters")
    .max(23)
    .required(),
  confirmPassword: yup
    .string()
<<<<<<< HEAD
    .oneOf([yup.ref("password"), null], "Passwords must match")
=======
    .oneOf([yup.ref("password"), null, "Passwords must match !"])
>>>>>>> feature/Categories
    .required("Type your password again"),
  acceptTerms: yup.bool().oneOf([true], "Accept Terms is required"),
});

function Register() {
  const { registration } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
<<<<<<< HEAD
    registration(data.email, data.password);
=======
    console.log(data);
>>>>>>> feature/Categories
  };

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

      <div className="w-1/2 h-full bg-[#D9D5CA] flex flex-col px-24 py-14 justify-between items-center">
        <div className="w-full flex flex-col max-w-[450px]">
          <h1 className="text-4xl text-[#060606] font-dosis mb-2">Minga</h1>
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-4">Sign Up</h3>
          </div>

<<<<<<< HEAD
          <form onSubmit={handleSubmit(onSubmit)}>
=======
          <form onSubmit={handleSubmit(onSubmit)}> 
>>>>>>> feature/Categories
            <div className="w-full flex flex-col mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 my-3 bg-transparent"
                {...register("email")}
              />
              <p className="text-red-700"> {errors.email?.message} </p>

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 my-3 bg-transparent"
                {...register("password")}
              />
              <p className="text-red-700"> {errors.password?.message} </p>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 mt-3 mb-4 bg-transparent"
                {...register("confirmPassword")}
              />
<<<<<<< HEAD
              <p className="text-red-700">{errors.confirmPassword?.message} </p>
=======
              <p className="text-red-700">
                {" "}
                {errors.confirmPassword?.message}{" "}
              </p>
>>>>>>> feature/Categories
            </div>

            <div className="w-full flex justify-between flex-col">
              <div className="w-full flex items-center">
<<<<<<< HEAD
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2"
                  {...register("acceptTerms")}
                />
                <p className="text-sm">I accept the Terms of Service</p>
=======
                <input type="checkbox" className="w-4 h-4 mr-2" 
                {...register("acceptTerms")}
                />
                <p className="text-sm">
                  I accept the Terms of Service
                </p>
                <p>{errors.acceptTerms?.message}</p>
>>>>>>> feature/Categories
              </div>
              <p className="text-red-700">{errors.acceptTerms?.message}</p>
            </div>

            <div className="w-full h-full flex-col my-2">
              <button
                type="submit"
                className="w-full text-white bg-[#060606] rounded-md p-3 text-center flex items-center justify-center cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="w-full flex items-center justify-center relative py-6">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-md absolute text-black/80 bg-[#D9D5CA] px-1">
              Or
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Already a member ?
            <span className="font-semibold underline underline-offset-2 cursor-pointer px-1">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
