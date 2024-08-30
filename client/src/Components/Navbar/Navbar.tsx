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
              <div className="">
                <div className="">Welcome, {user?.userType} {user?.userName}</div>
                <a
                  onClick={logout}
                  className=""
                >
                  Logout
                </a>
              </div>
            ) : (
              <div className="loggingContainer">
                <Link to="/login" className="hover:text-darkBlue">
                  Login
                </Link>
                <Link
                  to="/register"
                  className=""
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