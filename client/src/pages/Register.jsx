import React, { useState, useEffect } from "react";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Register() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const [registerUser, { isLoading: loginLoading }] = useRegisterUserMutation();
  const [disableButton, setDisableButton] = useState(true);
  const [passwordText, setPasswordText] = useState("");

  const [checkNumbers, setCheckNumbers] = useState(false);
  const [checkWordsL, setCheckWordsL] = useState(false);
  const [checkWordsU, setCheckWordsU] = useState(false);
  const [checkSpecial, setCheckSpecial] = useState(false);
  const [checkLen, setCheckLen] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispacher = useDispatch();

  const numbers = new RegExp("[\\d]");
  const wordsLower = new RegExp("[a-z]");
  const wordsUpper = new RegExp("[A-Z]");
  const specialChars = new RegExp("[^\\d\\w]");
  const lengthReg = new RegExp("^.{9,}$");

  useEffect(() => {
    const hasNumber = numbers.test(password);
    const hasLower = wordsLower.test(password);
    const hasUpper = wordsUpper.test(password);
    const hasSpecial = specialChars.test(password);
    const hasMinLength = lengthReg.test(password);

    setCheckNumbers(hasNumber);
    setCheckWordsL(hasLower);
    setCheckWordsU(hasUpper);
    setCheckSpecial(hasSpecial);
    setCheckLen(hasMinLength);

    const isPasswordValid =
      hasNumber && hasLower && hasUpper && hasSpecial && hasMinLength;

    setDisableButton(isPasswordValid);
  }, [password]);

  const user = {
    email: email,
    username: username,
    password: password,
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const res = await registerUser(user).unwrap();
      console.log(res.data);
      console.log("New user registered");
    } catch (error) {
      console.log("Error registrating a new user");
      const { message } = error.data;
      console.log(message);
      setError(message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-2 rounded-2xl bg-gray-200 border-gray-800 w-120 relative p-8 pt-26 overflow-hidden">
        <div className="bg-gray-800 absolute top-0 left-0 w-full pl-8 pt-5 pb-3">
          <label className="text-white font-bold text-3xl">Register</label>
        </div>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white rounded"
              type="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded"
              type="password"
            />
            {checkLen ? (
              <label className="text-green-500 block">
                ✅ Password must be 9 characters long
              </label>
            ) : (
              <label className="text-red-500 block">
                ❌ Password must be 9 characters long
              </label>
            )}
            {checkSpecial ? (
              <label className="text-green-500 block">
                {" "}
                ✅Password must contain one special character
              </label>
            ) : (
              <label className="text-red-500 block">
                ❌ Password must contain one special character
              </label>
            )}
            {checkNumbers ? (
              <label className="text-green-500 block">
                ✅ Password must contain one number
              </label>
            ) : (
              <label className="text-red-500 block">
                ❌ Password must contain one number
              </label>
            )}
            {checkWordsU ? (
              <label className="text-green-500 block">
                ✅ Password must contain uppercase letter
              </label>
            ) : (
              <label className="text-red-500 block">
                ❌ Password must contain uppercase letter
              </label>
            )}
            {checkWordsL ? (
              <label className="text-green-500 block">
                ✅ Password must contain one lowercase letter
              </label>
            ) : (
              <label className="text-red-500 block">
                ❌ Password must contain one lowercase letter
              </label>
            )}
          </div>
          <div>
            <label htmlFor="">Retype password:</label>
            <input
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full bg-white rounded"
              type="password"
            />
          </div>

          <div className="w-full flex items-cente justify-center mt-5">
            <button
              disabled={(loginLoading, !disableButton)}
              className={`text-white font-bold p-2 rounded-xl cursor-pointer ${
                disableButton ? "bg-gray-800" : "bg-gray-500 cursor-pointer"
              }`}
            >
              Register
            </button>
          </div>
        </form>

        {error ? (
          <label
            htmlFor="error"
            className="flex justify-center mt-3 text-red-600"
          >
            {error}
          </label>
        ) : (
          <div className="block">
              
          </div>
        )}
        <div className="text-red-600 mt-1 flex justify-center">{message}</div>
      </div>
    </div>
  );
}

export default Register;
