import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import './Navbar.css'

const Navbar = () => {

    const { isLoggedIn, user, logout } = useAuth()
  
    return (
        <nav className="relative container mx-auto p-6 navContainer">
          <div className="flex items-center justify-between itemsContainer">
            <Link to="/">
              <h3>Home</h3>
            </Link>
            {isLoggedIn() ? (
              <div className="hidden lg:flex items-center space-x-6 text-back">
                <div className="hover:text-darkBlue">Welcome, {user?.userType} {user?.userName}</div>
                <a
                  onClick={logout}
                  className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
                >
                  Logout
                </a>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-6 text-back loggingContainer">
                <Link to="/login" className="hover:text-darkBlue">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
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