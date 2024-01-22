import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './PostList.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments.tsx";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import PostDetails from "../../components/PostDetails/PostDetails.tsx";
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { documents: fetchedPosts, loading, search: fetchSearch } = useFetchDocuments('posts');
    const [search, setSearch] = useState(fetchSearch);
    console.log('posts', posts);
    const handleSubmit = (e) => {
        e.preventDefault();
        setPosts(fetchedPosts);
        console.log('posts', posts);
        console.log('fetchPosts', fetchedPosts);
        if (search) {
            return navigate(`/search?q=${search}`);
        }
    };
    useEffect(() => setPosts(fetchedPosts || []), [fetchedPosts, search]);
    return (_jsxs("div", { className: "PostList", children: [_jsx("h1", { children: "All Posts" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx(TextField, { value: search, type: "text", onChange: (e) => setSearch(e.target.value) }), _jsx(FormHelperText, { style: { color: 'white' }, variant: "outlined", children: "Search by title, content, tags, etc." })] }), !loading && _jsx(Button, { size: "small", type: "submit", variant: "contained", children: "Search" }), loading && _jsx(LoadingButton, { size: "small", loading: true, type: "submit", variant: "contained", children: "Loading..." })] }), _jsxs("main", { children: [loading && _jsx("p", { children: "Loading..." }), posts.length === 0 && !loading && (_jsxs("div", { className: "noposts", children: [_jsx("h2", { style: { color: 'white' }, children: "No posts found" }), _jsx("p", { children: "Try searching for something else, or create a new post." }), _jsx(Link, { to: "/posts/create", children: _jsx(Button, { variant: "contained", color: "success", children: "Create Post" }) })] })), posts.map((post) => (_jsx(Link, { style: { width: '80%' }, to: `/posts/${post.id}`, children: _jsx(PostDetails, { post: post }, post.id) }, post.id)))] })] }));
};
export default PostList;
