import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import "./Style.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />
          <Route path="/login" element={
            !user ? (
              <LoginPage onLogin={setUser} />
            ) : (
              <Navigate to="/dashboard" />
            )
          } />
          <Route path="/signup" element={
            !user ? (
              <SignupPage onSignup={setUser} />
            ) : (
              <Navigate to="/dashboard" />
            )
          } />
          <Route path="/dashboard" element={
            user ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;