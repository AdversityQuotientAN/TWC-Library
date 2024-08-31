import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import './Navbar.css'

const Navbar = () => {

    const { isLoggedIn, user, logout } = useAuth()
  
    return (
        <nav className="navContainer">
          <div className="itemsContainer">
            <Link to="/">
              <h3 style={{ 'margin-left': '1rem' }}>Home</h3>
            </Link>
            {isLoggedIn() ? (
              <div className="userContainer">
                <div className="">Welcome, {user?.userType} {user?.userName}</div>
                <a
                  onClick={logout}
                  className="link"
                >
                  Logout
                </a>
              </div>
            ) : (
              <div className="loggingContainer">
                <Link to="/login" className="link">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </nav>
    );
}

export default Navbar