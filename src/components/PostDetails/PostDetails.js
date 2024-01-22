import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import './PostDetails.scss';
import Chip from '@mui/material/Chip';
const PostComponent = ({ post }) => {
    const { title, content, createdBy, createdAt, image, tags } = post;
    const formatCreatedAt = () => {
        const date = new Date(createdAt.seconds * 1000);
        return date.toLocaleString();
    };
    return (_jsxs("div", { className: "PostDetails", children: [_jsxs("header", { children: [_jsxs("p", { className: "post-meta", children: [_jsxs("span", { className: "post-author", children: ["Created by: ", createdBy] }), _jsxs("span", { className: "post-date", children: ["Created at: ", formatCreatedAt()] })] }), tags?.length > 0 && (_jsx("p", { className: "tags", children: tags.map((tag, index) => (_jsx(Chip, { style: { color: 'white' }, variant: "outlined", className: "post-tag", label: `#${tag}` }, index))) }))] }), image && (_jsx("div", { style: {
                    textAlign: 'center',
                    height: '200px',
                    backgroundImage: `url(${image})`,
                    display: 'flex',
                    objectFit: 'contain',
                    backgroundSize: 'cover',
                    justifyContent: 'center',
                    alignItems: 'center',
                }, children: _jsx("h1", { style: {
                        textAlign: 'center',
                        backgroundColor: 'white',
                        width: '100%',
                    }, className: "post-title", children: title }) })), !image && (_jsx("h1", { style: { textAlign: 'center' }, className: "post-title", children: title }))] }));
};
export default PostComponent;
