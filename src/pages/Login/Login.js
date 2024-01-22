import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Login.scss';
import { useEffect, useState } from 'react';
import LoginImage from '../../assets/images/login.jpeg';
import BaseCard from '../../components/Card/BaseCard';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication.tsx";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { signIn, error: authError, loading } = useAuthentication();
    const navigate = useNavigate();
    useEffect(() => {
        setError(authError);
    }, [authError]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signIn({ email, password });
        console.log('response: ', response);
        console.log(authError, error);
        if (!authError && response) {
            navigate('/');
        }
    };
    return (_jsxs(BaseCard, { className: "Login", children: [_jsx("h1", { children: "Login" }), _jsx("h2", { children: "Log in to create posts and share it with your friends!" }), _jsxs("main", { children: [_jsx("img", { src: LoginImage, alt: "login-image" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(TextField, { type: "email", label: "Email", variant: "standard", onChange: (e) => setEmail(e.target.value) }), _jsx(TextField, { type: "password", label: "Password", variant: "standard", onChange: (e) => setPassword(e.target.value) }), !loading && _jsx(Button, { type: "submit", variant: "contained", children: "Log in" }), loading && _jsx(LoadingButton, { loading: true, type: "submit", variant: "contained", children: "Loading..." }), _jsxs("p", { children: ["Do not have account yet? ", _jsx(Link, { style: { color: '#1466C1' }, to: "/register", children: "Click here to create!" }), " "] })] })] }), error && _jsx("p", { className: "error", children: error })] }));
};
export default Login;
