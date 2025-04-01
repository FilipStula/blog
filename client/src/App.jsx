import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
      </Routes>

    </BrowserRouter>
  );
}
