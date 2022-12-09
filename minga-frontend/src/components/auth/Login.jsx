import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import cover_img from "../../assets/homePages/auth/desk_example1.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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

      <div className="w-1/2 h-full bg-[#D9D5CA] flex flex-col px-24 py-16 justify-between items-center">
        <div className="w-full flex flex-col max-w-[450px]">
          <h1 className="text-4xl text-[#060606] font-dosis mb-2">Minga</h1>
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-2xl font-semibold mb-4">Login</h3>
            <p className="text-sm mb-2">
              Welcome back ! Please enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 my-2 bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full text-black border-b border-black outline-none focus:outline-none py-2 mb-10 bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={(e) => handleSubmit(e)}
                className="w-full text-white bg-[#060606] rounded-md p-3 text-center flex items-center justify-center cursor-pointer"
              >
                Log In
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
