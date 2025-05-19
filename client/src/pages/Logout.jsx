import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";

function Logout() {
  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async (e) => {
      try {
        await logoutUser();
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

    logout();
    setTimeout(() => {
      navigate("/");
    }, 250);
  }, []);
}

export default Logout;
