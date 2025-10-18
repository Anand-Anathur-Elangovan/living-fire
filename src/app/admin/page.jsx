"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./admin.css";

const AdminPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = sessionStorage.getItem("adminUsername");
      const storedPass = sessionStorage.getItem("adminPassword");
      if (storedUser === "admin" && storedPass === "password123") {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === "admin" && password === "password123") {
      sessionStorage.setItem("adminUsername", username);
      sessionStorage.setItem("adminPassword", password);
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminUsername");
    sessionStorage.removeItem("adminPassword");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const adminActions = [
    {
      title: "Add Product",
      description: "Add new products to the catalog",
      path: "/add-product"
    },
    // {
    //   title: "Manage Products",
    //   description: "Edit or remove existing products",
    //   path: "/manage-others"
    // },
    {
      title: "Manage Others",
      description: "Manage categories, brands, and content",
      path: "/manage-others"
    },
    // {
    //   title: "View Analytics",
    //   description: "Check website statistics and performance",
    //   path: "/analytics"
    // }
  ];

  if (!isLoggedIn) {
    return (
      <div className="admin-container">
        <div className="admin-login-card">
          <div className="admin-header">
            <h1 className="admin-title">Admin Login</h1>
            <p className="admin-subtitle">Enter your credentials to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter password"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">
              Manage website content and products
            </p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
        </div>

        <div className="admin-actions-grid">
          {adminActions.map((action) => (
            <div
              key={action.title}
              className="action-card"
              onClick={() => router.push(action.path)}
            >
              <div className="card-content">
                <h3 className="card-title">{action.title}</h3>
                <p className="card-description">{action.description}</p>
              </div>
              <div className="card-arrow">→</div>
            </div>
          ))}
        </div>

        {/* <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-number">150+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">25k+</span>
            <span className="stat-label">Visitors</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminPage;