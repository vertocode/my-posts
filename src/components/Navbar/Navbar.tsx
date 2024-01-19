
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import { ReactElement } from 'react'

const Navbar = (): ReactElement => {
    return (
        <nav className="Navbar">
            <NavLink to="/" className="home-logo">
                My<span className="posts">Posts</span>
            </NavLink>
            <ul className="Navbar-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar