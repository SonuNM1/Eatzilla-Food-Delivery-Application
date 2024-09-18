import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Make sure to create this CSS file

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:7000/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();

    if (!json.success) {
      alert('Enter valid credentials');
    } else {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4 text-light">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control input-dark"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control input-dark"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 mt-3">
            Login
          </button>

          <div className="text-center mt-3">
            <Link to="/createuser" className="btn btn-link">
              First Time Here? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
