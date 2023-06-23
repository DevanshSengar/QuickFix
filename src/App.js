import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Student from "./pages/Student";
import Admin from "./pages/Admin";

import "./styles/app.css";

function App() {
  return (
    <div className="bg-image">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/student" element={<Student />} />
        <Route path="/user/admin" element={<Admin />} />

        <Route
          path="*"
          element={<h1 style={{ color: "white" }}>404 page not found</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
