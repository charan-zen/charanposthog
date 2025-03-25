import React, { useState, useEffect } from "react";
import posthog from "posthog-js";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./SignUp";

// Initialize PostHog
posthog.init("phc_GuERJaBzGbEsdJT9Hsyw3lIFHggdgoNXHycRXxBiBTD");

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already signed up (from localStorage)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      posthog.identify(parsedUser.id, {
        email: parsedUser.email,
        provider: "manual",
      });
    }

    // Track a page view event
    posthog.capture("page_view", { page: window.location.pathname });
  }, []);

  const loginWithGitHub = () => {
    posthog.capture("login_attempt", { provider: "GitHub" });
    window.location.href = "/.auth/login/github";
  };

  const loginWithGoogle = () => {
    posthog.capture("login_attempt", { provider: "Google" });
    window.location.href = "/.auth/login/google";
  };

  const logout = () => {
    posthog.capture("logout");
    localStorage.removeItem("user"); // Clear stored user
    setUser(null);
    window.location.href = "/.auth/logout";
  };

  return (
    <Router>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Azure Static Web App with PostHog</h1>
        <Routes>
          <Route path="/" element={
            user ? (
              <>
                <p>Welcome, {user.email}!</p>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={loginWithGitHub}>Login with GitHub</button>
                <button onClick={loginWithGoogle}>Login with Google</button>
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
              </>
            )
          } />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
