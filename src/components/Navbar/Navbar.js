import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
import Button from '@mui/material/Button';
const Navbar = () => {
    const { user } = useAuthValue();
    const { logout, error } = useAuthentication();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (_jsxs("nav", { className: `Navbar${isMenuOpen ? ' open' : ''}`, children: [_jsx("div", { className: "menu-icon", onClick: toggleMenu, children: _jsx("div", { className: "line" }) }), _jsxs(NavLink, { to: "/", className: "home-logo", children: ["My", _jsx("span", { className: "posts-title", children: "Posts" })] }), _jsxs("ul", { className: `Navbar-links${isMenuOpen ? ' open' : ''}`, children: [_jsx("li", { onClick: isMenuOpen ? toggleMenu : null, children: _jsx(NavLink, { to: "/", children: "Home" }) }), _jsx("li", { onClick: isMenuOpen ? toggleMenu : null, children: _jsx(NavLink, { to: "/about", children: "About" }) }), !user && (_jsx(_Fragment, { children: _jsxs("li", { style: { display: 'flex', gap: '1em' }, onClick: isMenuOpen ? toggleMenu : null, children: [_jsx(NavLink, { to: "/login", children: _jsx(Button, { variant: "contained", color: "info", children: "Login" }) }), _jsx(NavLink, { to: "/register", children: _jsx(Button, { variant: "contained", color: "success", children: "Register" }) })] }) })), user && (_jsxs(_Fragment, { children: [_jsx("li", { onClick: isMenuOpen ? toggleMenu : null, children: _jsx(NavLink, { to: "/posts/create", children: "New Post" }) }), _jsx("li", { onClick: isMenuOpen ? toggleMenu : null, children: _jsx(NavLink, { to: "/dashboard", children: "Dashboard" }) }), _jsx("li", { onClick: logout, children: _jsx(Button, { variant: "contained", color: "info", children: "Logout" }) })] })), error && _jsx("p", { className: "error", style: { color: '#721c24' }, children: error })] })] }));
};
export default Navbar;
