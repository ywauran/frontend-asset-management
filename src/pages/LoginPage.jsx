import React from "react";
import Logo from "../assets/ic_logo.png";

const LoginPage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center px-32 py-10 space-y-2 rounded-md shadow-md">
          <img src={Logo} alt="" />
          <h1 className="text-xl font-bold text-center">
            Login To Your Account!
          </h1>

          <form className="mt-4">
            <div>
              <label htmlFor="" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                placeholder="example@gmail.com"
                className="w-full max-w-xs mt-2 input input-bordered"
              />
            </div>
            <div>
              <label htmlFor="" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="****"
                className="w-full max-w-xs mt-2 input input-bordered"
              />
            </div>

            <button type="submit" className="w-full mt-5 btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
