import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./styles/app.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import EmailVerify from "./pages/EmailVerify";
import Forgot from "./pages/Forgot";
import NewComplaint from "./pages/NewComplaint";

function App() {
  // token store
  return (
    <div className="bg-image">
      <ToastContainer
        style={{ fontSize: "1.4rem" }}
        theme="dark"
        pauseOnHover
        position="bottom-right"
      ></ToastContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="/emailVerification" element={<EmailVerify />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/newComplaint" element={<NewComplaint />} />

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
