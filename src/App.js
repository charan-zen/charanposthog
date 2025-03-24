import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
import posthog from "posthog-js";

// Initialize PostHog

const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    posthog.capture("$pageview", { page: location.pathname });
        // Capture a custom event for specific pages
        if (location.pathname === "/") {
          posthog.capture("home_page_visited");
        } else if (location.pathname === "/services") {
          posthog.capture("services_page_visited");
        }
      }, [location]);
    };



    const Home = () => {
      usePageTracking();
    
      useEffect(() => {
        const button = document.getElementById("signup-button");
        if (button) {
          button.addEventListener("click", function () {
            posthog.capture("button_clicked", { button_name: "sign_up" });
          });
    
          return () => {
            button.removeEventListener("click", function () {
              posthog.capture("button_clicked", { button_name: "sign_up" });
            });
          };
        }
      }, []);
    
      return (
        <div>
          <h1>Home Page</h1>
          <button id="signup-button">Sign Up</button>
        </div>
      );
    };

const About = () => {
  usePageTracking();
  return <h1>About Us</h1>;
};

const Services = () => {
  usePageTracking();
  return <h1>Our Services</h1>;
};

const Contact = () => {
  usePageTracking();
  return <h1>Contact Us</h1>;
};

const Dashboard = () => {
  usePageTracking();
  return <h1>Dashboard</h1>;
};

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | <Link to="/about">About</Link> | 
    <Link to="/services">Services</Link> | <Link to="/contact">Contact</Link> | 
    <Link to="/dashboard">Dashboard</Link>
  </nav>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
