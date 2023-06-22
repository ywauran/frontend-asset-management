import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
import Logo from "../../assets/ic_logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      if (user?.role === "admin") {
        navigate("/");
      } else if (user?.role === "guest") {
        navigate("/pages/dashboard");
      } else {
        navigate("/login");
      }
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);
  const handlerLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center px-32 py-10 space-y-2 rounded-md shadow-md">
        <img src={Logo} alt="Logo" />

        <h1 className="text-xl font-bold text-center">
          Login To Your Account!
        </h1>

        <form className="mt-4" onSubmit={handlerLoginSubmit}>
          <div>
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              id="username"
              placeholder="admin"
              className="w-full max-w-xs mt-2 input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="****"
              className="w-full max-w-xs mt-2 input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full mt-5 btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
