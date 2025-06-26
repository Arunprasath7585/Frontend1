import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function Auth({ setCurrentUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const users = JSON.parse(localStorage.getItem('users')) || {
    admin: { password: 'admin123', joinedEvents: [], createdAt: new Date().toISOString() }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    const { username, password } = formData;
    if (!username || !password) return setMessage('Enter both fields');
    if (!users[username]) return setMessage('User not found');
    if (users[username].password !== password) return setMessage('Wrong password');

    localStorage.setItem('currentUser', username);
    setCurrentUser(username);
  };

  const handleRegister = () => {
    const { username, password, confirmPassword } = formData;
    if (!username || !password || !confirmPassword) return setMessage('Fill all fields');
    if (users[username]) return setMessage('Username exists');
    if (password !== confirmPassword) return setMessage('Passwords mismatch');

    users[username] = { password, joinedEvents: [], createdAt: new Date().toISOString() };
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Registered! Please login.');
    setIsRegister(false);
  };

  return (
    <div className="auth-box">
      <div className="auth-title">{isRegister ? 'Register' : 'Login'}</div>
      <input name="username" onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" />
      {isRegister && <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm Password" />}
      <button onClick={isRegister ? handleRegister : handleLogin}>
        {isRegister ? <FaUserPlus /> : <FaSignInAlt />} {isRegister ? 'Sign Up' : 'Login'}
      </button>
      <p>{message}</p>
      <p>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsRegister(!isRegister)}> {isRegister ? 'Login' : 'Register'}</button>
      </p>
    </div>
  );
}

export default Auth;