import React, { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects.jsx";
import Navbar from "./components/Navbar.jsx";
import SingleBlog from "./pages/blogs/SingleBlog.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { fetchUser, authSlice } from "./redux/features/auth/authSlice.js";
import { useDispatch } from "react-redux";

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/logout") dispatch(fetchUser());
  }, [location.pathname]);

   const hideNavbarOn = ["/logout"]; // add more paths here if needed
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/blogs/:blogId" element={<SingleBlog />} />
        <Route path="/" element={<Home key={location.key} />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
