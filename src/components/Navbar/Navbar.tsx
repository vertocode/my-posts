import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'
import { ReactElement } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'
import Button from '@mui/material/Button'

const Navbar = (): ReactElement => {
    const { user } = useAuthValue()
    const { logout, error } = useAuthentication()
    const [isMenuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    }

    return (
        <nav className={`Navbar${isMenuOpen ? ' open' : ''}`}>
            <div className="menu-icon" onClick={toggleMenu}>
                <div className="line"></div>
            </div>

            <NavLink to="/" className="home-logo">
                My<span className="posts-title">Posts</span>
            </NavLink>

            <ul className={`Navbar-links${isMenuOpen ? ' open' : ''}`}>
                <li onClick={isMenuOpen ? toggleMenu : null}><NavLink to="/">Home</NavLink></li>
                <li onClick={isMenuOpen ? toggleMenu : null}><NavLink to="/about">About</NavLink></li>
                {!user && (
                    <>
                        <li style={{ display: 'flex', gap: '1em' }} onClick={isMenuOpen ? toggleMenu : null}>
                            <NavLink to="/login">
                                <Button variant="contained" color="info">Login</Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button variant="contained" color="success">Register</Button>
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li onClick={isMenuOpen ? toggleMenu : null}><NavLink to="/posts/create">New Post</NavLink></li>
                        <li onClick={isMenuOpen ? toggleMenu : null}><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li onClick={ logout }>
                            <Button variant="contained" color="info">Logout</Button>
                        </li>
                    </>
                )}
                {error && <p className="error" style={{ color: '#721c24' }}>{ error }</p>}
            </ul>
        </nav>
    )
}

export default Navbar
