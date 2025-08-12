// src/pages/Login.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// We assume loginLogo is in the `public` folder of your project
const loginLogo = "/loginLogo.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submission
    // Since there's no API, we just navigate to the dashboard
    navigate("/dashboard");
  };

  // --- Basic CSS styles for our elements ---
  const styles = {
    // The main container now centers its content and has a neutral background
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      backgroundColor: "#f0f2f5", // A light gray background
    },
    // A new wrapper to vertically align the logo and the card
    wrapper: {
      display: "flex",
      flexDirection: "column" as "column", // Explicitly type for TS
      alignItems: "center",
    },
    // New style for the logo above the card
    logo: {
      width: "150px",
      height: "auto",
      marginBottom: "0.5rem",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      textAlign: "center" as "center", // Center the title
    },
    description: {
      color: "#6b7280",
      marginBottom: "1.5rem",
      textAlign: "center" as "center", // Center the description
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      border: "none",
      borderRadius: "4px",
      // --- COLOR UPDATED ---
      // I've used a representative blue.
      // TODO: Replace '#3b82f6' with your logo's actual brand color.
      backgroundColor: "#3b82f6",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      {/* This new wrapper holds the logo and the card */}
      <div style={styles.wrapper}>
        {/* The logo is now an explicit image element, visible on all screens */}
        <img src={loginLogo} alt="Company Logo" style={styles.logo} />

        <div style={styles.card}>
          <h1 style={styles.title}>Login to your account</h1>
          <p style={styles.description}>
            Enter your details below to proceed.
          </p>

          <form onSubmit={handleLoginSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.label}>
                Email
              </label>
              <input
                id="username"
                type="email"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
