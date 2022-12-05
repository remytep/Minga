import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import cover_img from "../../assets/homePages/auth/signup_desk.jpg";
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";

// Start with a lower or uppercase letter
// Must be followed from 5 to 23 characters that can be lower or uppercase too
// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5, 23}$/;

// Requires at least 1 uppercase case latter, 1 lowercase, 1 digit and 1 special character
// From 5 to 30 characters
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5, 30}$/;

export const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: 
      z.string()
      .min(1, { message: "Last name is required" }),
  })
);

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div class="w-full h-screen flex items-start">
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

          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 my-3 bg-transparent"
                {...register("email", { required: true, maxLength: 80 })}
              />
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "maxLength" && "Max length exceed"}

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 my-3 bg-transparent"
                {...register("password")}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 mt-3 mb-4 bg-transparent"
                {...register("confirmPwd")}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">I accept the Terms of Service</p>
              </div>
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
