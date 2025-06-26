import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: `${username}@mail.com`, password })
      });
      const data = await response.json();
      if (response.ok) {
        const userWithId = {
          ...data.user,
          username: data.user.name,
          _id: data.user._id || data.user.username || data.user.name || Date.now().toString()
        };
        onLogin(userWithId);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch(err) {
      setError("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary" type="submit">Login</button>
        <Link className="btn btn-link" to="/signup">Signup</Link>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;