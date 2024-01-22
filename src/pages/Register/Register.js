import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Register.scss';
import { useState, useEffect } from 'react';
import BaseCard from '../../components/Card/BaseCard';
import RegisterImage from '../../assets/images/register.jpeg';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();
    const { createUser, error: authErrors, loading } = useAuthentication();
    const navigate = useNavigate();
    useEffect(() => {
        setError(authErrors);
    }, [authErrors]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const user = {
            displayName,
            email,
            password
        };
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        await createUser(user);
        if (!authErrors) {
            navigate('/login');
        }
        else {
        }
    };
    return (_jsxs(BaseCard, { className: "Register", children: [_jsx("h1", { children: "Register" }), _jsx("h2", { children: "Create your account to start posts and share it with your friends!" }), _jsxs("main", { children: [_jsx("img", { src: RegisterImage, alt: "register-image" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(TextField, { value: displayName, name: "displayName", required: true, type: "text", label: "Name", variant: "standard", onChange: e => setDisplayName(e.target.value) }), _jsx(TextField, { value: email, name: "displayEmail", required: true, type: "email", label: "Email", variant: "standard", onChange: e => setEmail(e.target.value) }), _jsx(TextField, { value: password, name: "displayPassword", required: true, type: "password", label: "Password", variant: "standard", onChange: e => setPassword(e.target.value) }), _jsx(TextField, { value: confirmPassword, name: "confirmPassword", required: true, type: "password", label: "Confirm Password", variant: "standard", onChange: e => setConfirmPassword(e.target.value) }), !loading && _jsx(Button, { type: "submit", variant: "contained", children: "Register" }), loading && _jsx(LoadingButton, { loading: true, type: "submit", variant: "contained", children: "Registering..." })] })] }), error && _jsx("p", { className: "error", children: error })] }));
};
export default Register;
