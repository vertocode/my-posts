import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// scss
import './App.scss';
// routes
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// pages
import PostList from './pages/PostList/PostList';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
// components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// context
import { AuthProvider } from './context/AuthContext';
// firebase
import { onAuthStateChanged } from 'firebase/auth';
// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();
    const loadingUser = user === undefined;
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);
    if (loadingUser) {
        return _jsx("p", { style: { textAlign: 'center' }, children: "Loading..." });
    }
    return (_jsx("div", { className: "App", children: _jsx(AuthProvider, { value: { user }, children: _jsxs(BrowserRouter, { children: [_jsx(Navbar, {}), _jsx("div", { className: "container", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PostList, {}) }), _jsx(Route, { path: "/search", element: _jsx(PostList, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/login", element: !user ? _jsx(Login, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/register", element: !user ? _jsx(Register, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/posts/create", element: user ? _jsx(CreatePost, {}) : _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/dashboard", element: user ? _jsx(Dashboard, {}) : _jsx(Navigate, { to: "/" }) })] }) }), _jsx(Footer, {})] }) }) }));
}
export default App;
