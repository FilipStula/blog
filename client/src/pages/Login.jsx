import React, { useState } from "react";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
  const dispacher = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    console.log(data);

    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      console.log(response.token);
      const {user} = response;
      console.log(user)
      navigate("/")
      setMessage("");
    } catch (error) {
      setMessage("Email or password not correct");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-2 rounded-2xl bg-gray-200 border-gray-800 w-80 h-80 relative p-8 pt-26 overflow-hidden">
        <div className="bg-gray-800 absolute top-0 left-0 w-full pl-8 pt-5 pb-3">
          <label className="text-white font-bold text-3xl">Login</label>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded"
              type="password"
            />
          </div>
          <div className="w-full flex items-cente justify-center mt-5">
            <button
              disabled={loginLoading}
              className="bg-gray-800 ruonded text-white font-bold p-2 rounded-xl cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-red-600 mt-1 flex justify-center">{message}</div>
      </div>
    </div>
  );
}

export default Login;
