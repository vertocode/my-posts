import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './CreatePost.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');
    const [tagHtml, setTagHtml] = useState('');
    const [customTag, setCustomTag] = useState('');
    const [customColor, setCustomColor] = useState('black');
    const { insertDocument, response: { loading, error: documentError } } = useInsertDocument('posts');
    const { user } = useAuthValue();
    const navigate = useNavigate();
    useEffect(() => setFormError(documentError), [documentError]);
    const [editableElements] = useState([
        { tag: 'h1', title: 'Title' },
        { tag: 'h2', title: 'Sub Title' },
        { tag: 'h3', title: 'Sub Title 2' },
        { tag: 'p', title: 'Paragraph' },
        { tag: 'blockquote', title: 'Blockquote' },
        { tag: 'code', title: 'Code' }
    ]);
    const handleSubmit = async (e) => {
        setFormError('');
        e.preventDefault();
        const postContent = document.querySelector('.post-content');
        const content = postContent.getInnerHTML();
        if (!title || !content) {
            setFormError('Please fill all the required fields');
            return;
        }
        await insertDocument({
            title,
            image,
            content,
            tags,
            uid: user.uid,
            createdBy: user.displayName
        });
        navigate('/');
    };
    const focusPost = () => {
        const postContent = document.querySelector('.post-content');
        postContent.focus();
    };
    const handleEdit = (htmlTag) => {
        const postContent = document.querySelector('.post-content');
        const selectedText = window.getSelection().toString();
        const [elementWithText] = Array.from(document.querySelectorAll('.post-content *')).filter(element => element.innerText.includes(selectedText));
        const { localName = null } = elementWithText || {};
        if (!localName && selectedText) {
            postContent.innerHTML = postContent.innerHTML.replace(`${selectedText}`, `<${htmlTag}>${selectedText}</${htmlTag}>`);
        }
        else if (selectedText) {
            // Get the element with all the attributes
            const regex = new RegExp(`<(${localName})([^>]*)>${selectedText}</${localName}>`, 'g');
            postContent.innerHTML = postContent.innerHTML.replace(regex, `<${htmlTag} style="color: ${customColor}">${selectedText}</${htmlTag}>`);
        }
        else {
            const text = (() => {
                switch (htmlTag) {
                    case 'h1':
                        return 'Title';
                    case 'h2':
                        return 'Sub Title';
                    case 'p':
                        return 'Paragraph';
                    case 'blockquote':
                        return 'Blockquote';
                    case 'code':
                        return 'Code';
                    default:
                        return 'Text';
                }
            })();
            postContent.innerHTML = postContent.innerHTML += `<${htmlTag} style="color: ${customColor}">${text}</${htmlTag}>`;
        }
    };
    useEffect(() => {
        if (tagHtml) {
            handleEdit(tagHtml);
            setTagHtml('');
        }
    }, [tagHtml]);
    useEffect(() => {
        const selectedText = window.getSelection().toString();
        if (customColor && selectedText) {
            const postContent = document.querySelector('.post-content');
            const [elementWithText] = Array.from(document.querySelectorAll('.post-content *')).filter(element => element.innerText.includes(selectedText));
            const { localName = null } = elementWithText || {};
            // Get the element with all the attributes
            const regex = new RegExp(`<(${localName})([^>]*)>${selectedText}</${localName}>`, 'g');
            postContent.innerHTML = postContent.innerHTML.replace(regex, `<${localName} style="color: ${customColor}">${selectedText}</${localName}>`);
        }
    }, [customColor]);
    return (_jsxs("div", { className: "CreatePost", children: [_jsx("h1", { children: "Create Post" }), _jsx("p", { children: "Write about anything, and share it with other people." }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(TextField, { required: true, value: title, type: "text", label: "Title", variant: "standard", onChange: (e) => setTitle(e.target.value) }), _jsx(TextField, { value: image, type: "text", label: "Image URL", variant: "standard", onChange: (e) => setImage(e.target.value) }), _jsxs("div", { className: "create-post", children: [_jsx("p", { children: "If you add any code in html, the result in the posts will follow your code. (warn: if you add a wrong code, it can break your content.)" }), _jsxs("blockquote", { className: "post-content", contentEditable: "true", suppressContentEditableWarning: true, children: [_jsx("h1", { children: "MyPosts" }), _jsx("p", { children: "You can edit and style this content." }), _jsx("p", { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio eget quam varius tristique. Donec faucibus eros tortor. Etiam auctor scelerisque erat. Curabitur mollis scelerisque metus et scelerisque. Nam sapien enim, tristique a mauris a, finibus luctus est. Phasellus hendrerit odio malesuada justo ultrices viverra. In a risus non nibh tempor placerat sit amet nec ex. Proin sed interdum tellus, quis iaculis sem. Nam mi quam, dictum non lobortis quis, vestibulum auctor ante. Donec ut sagittis orci. Aliquam vitae est nec nunc varius maximus. Maecenas malesuada laoreet euismod. Cras lobortis ex non ligula mattis lacinia. Maecenas ornare eleifend mattis. Morbi pretium malesuada quam, a auctor est viverra tempor. Aliquam scelerisque eros a magna placerat, et pulvinar diam sagittis." }), _jsx("h2", { children: "Click here to edit it and start your new post!" })] }), _jsxs("div", { className: "editor", children: [_jsxs("span", { style: { cursor: 'pointer', marginTop: '.5em' }, onClick: focusPost, children: ["Edit ", _jsx("i", { className: "fa fa-edit" })] }), _jsxs("div", { className: "chips", children: [editableElements.map((element) => (_jsx(Chip, { onClick: () => setTagHtml(element.tag), label: element.title, avatar: _jsx(Avatar, { children: element.tag }) }, `${element.tag}-editable-element`))), _jsx("input", { onBlur: (e) => setCustomColor(e.target.value), type: "color" })] })] })] }), _jsxs("div", { className: "tags", children: [_jsxs("div", { className: "input-container", children: [_jsx(TextField, { value: customTag, variant: "standard", label: "Add Tag", onChange: (e) => setCustomTag(e.target.value) }), _jsx(Button, { variant: "contained", color: "info", onClick: () => {
                                            setTags(tags => customTag ? [...tags, customTag] : null);
                                            setCustomTag('');
                                        }, children: "Add" })] }), tags?.length > 0 && (_jsx("div", { className: "tags-container", children: tags.map((tag) => (_jsx(Chip, { onDelete: () => setTags(tags => tags.filter(currentTag => currentTag !== tag)), color: "warning", label: tag }, tag))) }))] }), !loading && _jsx(Button, { type: "submit", variant: "contained", color: "info", children: "Post" }), loading && _jsx(LoadingButton, { loading: true, type: "submit", variant: "contained", children: "Posting..." })] }), formError && _jsx("p", { className: "error", children: formError })] }));
};
export default CreatePost;
