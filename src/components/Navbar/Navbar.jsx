import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const serviceMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getCartItemCount();
  const { wishlistCount } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceMenuRef.current &&
        !serviceMenuRef.current.contains(event.target)
      ) {
        setServiceMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      setSearchTerm(params.get('q') || '');
    }
  }, [location.pathname, location.search]);

  const toggleServiceMenu = () => {
    setServiceMenuOpen((prev) => !prev);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <header className="navbar">
      {/* Top Blue Bar */}
      <div className="navbar-top-bar"></div>

      {/* Main Header Section */}
      <div className="navbar-main">
        <div className="navbar-container">
          {/* Logo Section */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="8" r="4" fill="#0056CC"/>
                <path d="M8 20 L8 32 L12 32 L12 20 Z" fill="#0056CC"/>
                <path d="M28 20 L28 32 L32 32 L32 20 Z" fill="#0056CC"/>
                <path d="M8 32 L12 32 L20 24 L28 32 L32 32 L20 16 Z" fill="#0056CC"/>
              </svg>
            </div>
            <div className="logo-text-section">
              <h1 className="logo-text">
                <span className="logo-m-red">M</span>AKERS
              </h1>
              <p className="logo-tagline">WE MAKE THE FUTURE</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="search-icon-btn" type="submit" aria-label="Search catalog">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L15 15" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* Utility Icons */}
          <div className="navbar-icons">
            <Link to="/cart" className="icon-link cart-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="icon-badge">{cartCount}</span>
              )}
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"} className="icon-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            <Link to="/wishlist" className="icon-link wishlist-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="icon-badge">{wishlistCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar-nav">
        <div className="navbar-nav-container">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/products" className={`nav-item ${isActive('/products') ? 'active' : ''}`}>
            Products
          </Link>
          <Link to="/categories" className={`nav-item ${isActive('/categories') ? 'active' : ''}`}>
            Products Categories
          </Link>
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className={`nav-item ${isActive('/dashboard') || isActive('/login') ? 'active' : ''}`}>
            My Account
          </Link>
          <Link to="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`}>
            Blog
          </Link>
          <div className="dropdown-container" ref={serviceMenuRef}>
            <button
              type="button"
              className={`nav-item dropdown-trigger ${serviceMenuOpen ? 'active' : ''}`}
              onClick={toggleServiceMenu}
            >
              Customer Service
              <span className={`dropdown-arrow ${serviceMenuOpen ? 'open' : ''}`}>▼</span>
            </button>
            {serviceMenuOpen && (
              <div className="dropdown-menu">
                <Link to="/contact" className="dropdown-link" onClick={() => setServiceMenuOpen(false)}>
                  Contact Us
                </Link>
                <Link to="/special-order" className="dropdown-link" onClick={() => setServiceMenuOpen(false)}>
                  Special Order
                </Link>
              </div>
            )}
          </div>
          <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>
            About
          </Link>
          <div className="navbar-phone">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.5 10.5a.678.678 0 0 1-.58-.122L6.622 8.08a.678.678 0 0 1-.122-.58l.5-2.307a.678.678 0 0 0-.122-.58L4.654 1.328z" fill="#333333"/>
            </svg>
            <span className="phone-number">+20248813824</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

