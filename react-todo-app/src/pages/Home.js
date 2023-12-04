// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css'; // Import your CSS file for styling

// Will try using just link, might need to use useNavigate later

const HomePage = () => {

  return (

    <div className="home-page">
      {/* Header */}
      <header className="header">
        <h1>EasyDo</h1>
        <p className="tagline">Take back your time</p>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to Your Website</h2>
        <p>Discover amazing things and take your experience to the next level.</p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* About Us Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>A brief description of your company or project.</p>
      </section>

      {/* Featured Services or Products */}
      <section className="features">
        <h2>Our Services</h2>
        <div className="feature-item">
          <h3>Service 1</h3>
          <p>Description of Service 1.</p>
        </div>
        <div className="feature-item">
          <h3>Service 2</h3>
          <p>Description of Service 2.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial">
          <p>"A great experience with Your Brand. Highly recommended!"</p>
          <cite>- Happy Customer</cite>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>Email: info@yourbrand.com</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Your Brand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
