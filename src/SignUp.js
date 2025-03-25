import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import posthog from "posthog-js";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Simulate user being created (in a real app, send data to backend)
    const user = {
      email,
      id: `user_${Math.floor(Math.random() * 100000)}`, // Generate a fake user ID
      signupMethod: "manual",
    };

    // Store user in localStorage (acting as a simple session store)
    localStorage.setItem("user", JSON.stringify(user));

    // Log user as identified in PostHog
    posthog.identify(user.id, {
      email: user.email,
      signup_method: user.signupMethod,
    });

    // Track signup event
    posthog.capture("user_signed_up", {
      email: user.email,
      signup_method: user.signupMethod,
    });

    alert("Signup successful! Redirecting to home...");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
