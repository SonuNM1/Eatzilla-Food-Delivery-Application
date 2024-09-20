import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Signup.css'; // External CSS for custom styling
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL ; 

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${REACT_APP_BASE_URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      navigate("/login");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="signup-container">
        <div className="card signup-card shadow-lg p-4">
          <h2 className="text-center mb-4 text-white">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control input-dark"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control input-dark"
                  id="exampleInputEmail1"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
                <div id="emailHelp" className="form-text text-light">
                  We'll never share your email with anyone else.
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control input-dark"
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="geolocation" className="form-label text-white">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control input-dark"
                  id="geolocation"
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-dark w-100 mb-2">
                Sign Up
              </button>

              <Link to="/login" className="btn btn-link text-light">
                Already a User? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
