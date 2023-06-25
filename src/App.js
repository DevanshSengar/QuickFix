import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Student from "./pages/Student";
import Admin from "./pages/Admin";

import "./styles/app.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-image">
      <ToastContainer></ToastContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-student" element={<Student />} />
          <Route path="/user-admin" element={<Admin />} />

          <Route
            path="*"
            element={<h1 style={{ color: "white" }}>404 page not found</h1>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
