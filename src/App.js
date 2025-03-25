import React, { useState, useEffect } from "react";
import posthog from "posthog-js";

// Initialize PostHog
posthog.init("phc_GuERJaBzGbEsdJT9Hsyw3lIFHggdgoNXHycRXxBiBTD")

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/.auth/me") // Check if user is authenticated
      .then((res) => res.json())
      .then((data) => {
        if (data.clientPrincipal) {
          setUser(data.clientPrincipal);
          posthog.identify(data.clientPrincipal.userId, {
            email: data.clientPrincipal.userDetails,
            provider: data.clientPrincipal.identityProvider,
          });
        }
      })
      .catch((err) => console.log("Not logged in"));

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
    window.location.href = "/.auth/logout";
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Azure Static Web App with PostHog</h1>
      {user ? (
        <>
          <p>Welcome, {user.userDetails}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={loginWithGitHub}>Login with GitHub</button>
          <button onClick={loginWithGoogle}>Login with Google</button>
        </>
      )}
    </div>
  );
}

export default App;
