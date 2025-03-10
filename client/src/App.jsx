import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
