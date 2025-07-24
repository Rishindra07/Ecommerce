import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

function Navbar({ setActiveCategory, isLoggedIn, setIsLoggedIn, userName }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Log out the user
    setActiveCategory("home"); // Redirect to home
  };

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="container">
      <header className="navbar-custom d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
  {/* Logo */}
  <div className="navbar-logo">
    <a href="/" className="d-inline-flex text-decoration-none">
      <img src={logo} alt="Logo" height={80} />
    </a>
  </div>

  {/* Nav links (hidden on mobile) */}
  <ul className="navbar-nav-links nav mb-2 mb-md-0">
    <li><a href="#" onClick={() => setActiveCategory("home")} className="nav-link px-2 link-dark">Home</a></li>
    <li
      className="nav-link px-2 link-dark position-relative dropdown-parent"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Shop
      {isDropdownOpen && (
        <ul className="dropdown-menu show position-absolute">
          <li><a href="#" onClick={() => setActiveCategory("mens")} className="dropdown-item">Mens</a></li>
          <li><a href="#" onClick={() => setActiveCategory("womens")} className="dropdown-item">Womens</a></li>
          <li><a href="#" onClick={() => setActiveCategory("newArrivals")} className="dropdown-item">New Arrivals</a></li>
        </ul>
      )}
    </li>
    <li><a href="#" onClick={() => setActiveCategory("collections")} className="nav-link px-2 link-dark">Collections</a></li>
    {!isLoggedIn && (
      <>
        <li><a href="#" onClick={() => setActiveCategory("about")} className="nav-link px-2 link-dark">About</a></li>
        <li><a href="#" onClick={() => setActiveCategory("contact")} className="nav-link px-2 link-dark">Contact Us</a></li>
      </>
    )}
    {isLoggedIn && (
      <>
        <li><a href="#" onClick={() => setActiveCategory("cart")} className="nav-link px-2 link-dark">Cart</a></li>
        <li><a href="#" onClick={() => setActiveCategory("wishlist")} className="nav-link px-2 link-dark">Wishlist</a></li>
        <li><a href="#" onClick={() => setActiveCategory("orders")} className="nav-link px-2 link-dark">Your Orders</a></li>
        <li><a href="#" onClick={() => setActiveCategory("account")} className="nav-link px-2 link-dark">Account</a></li>
      </>
    )}
  </ul>

  {/* Login/Signup */}
  <div className="navbar-auth-btns">
    {isLoggedIn ? (
      <>
        <span className="me-3">{userName}</span>
        <button type="button" onClick={handleLogout} className="btn btn-outline-dark">Logout</button>
      </>
    ) : (
      <>
        <button type="button" onClick={() => setActiveCategory("Login")} className="btn btn-outline-dark me-2">Login</button>
        <button type="button" onClick={() => setActiveCategory("Signup")} className="btn btn-dark">Sign-up</button>
      </>
    )}
  </div>
</header>

    </div>
  );
}

export default Navbar;
