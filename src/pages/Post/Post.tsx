import './Post.scss'
import { ReactElement } from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useState } from 'react'
import Chip from '@mui/material/Chip'
import Button from "@mui/material/Button";
import {useAuthValue} from "../../hooks/useAuthValue.ts";
import ConfirmDeleteModal from "../../components/Modal/ConfirmDeleteModal.tsx";
import {useDeleteDocument} from "../../hooks/useDeleteDocument.ts";

const Post = (): ReactElement => {
    const { id = '' } = useParams()
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)
    const { document: post, loading, error } = useFetchDocument('posts', id)
    const { user } = useAuthValue()
    const navigate = useNavigate()
    const deleteDocument = useDeleteDocument('posts', id)
    const [background] = useState(post?.backgroundColor || 'white')

    const isCreator = post?.createdBy === user?.displayName
    const isAdmin = user.email === 'vertocode@gmail.com'
    const canEditAndDelete = isCreator || isAdmin

    const date = new Date(post?.createdAt?.seconds * 1000) || null
    const formattedDate = date ? date.toLocaleString() : null
    const handleDelete = async () => {
        await deleteDocument.deleteDocument()
        setShowDeleteConfirmationModal(false)
        navigate('/')
    }

    return (
        <div className="Post" style={{ backgroundColor: background }}>
            {error && <p className="error">{ error }</p>}
            {loading && <p>Loading...</p>}
            {!loading && !error && post && (
                <main>
                    <div className="action-buttons">
                        { canEditAndDelete && (
                            <>
                                <Button onClick={ () => navigate(`/posts/edit/${id}`) } variant="contained" color="success">Edit</Button>
                                <Button onClick={ () => setShowDeleteConfirmationModal(true) } variant="contained" color="error">Delete</Button>
                                <ConfirmDeleteModal
                                    onClose={ () => setShowDeleteConfirmationModal(false) }
                                    isOpen={ showDeleteConfirmationModal }
                                    onConfirm={ handleDelete }
                                />
                            </>
                        )}
                    </div>
                    <header>
                        { post?.image && (
                            <div className="post-image" style={{
                                background: `url(${post.image}`,
                                width: '100%',
                                height: '400px'
                            }}>
                                <h1>{ post.title }</h1>
                            </div>
                        )}
                        { !post?.image && <h1 style={{ textAlign: 'center' }}>{ post.title }</h1> }
                        <div className="meta">
                            <p className="post-date">Created at: { formattedDate }</p>
                            <p className="post-author">
                                Created by: {post?.userId ? (<Link to={`/users/${post.userId}`}>
                                <em>{post.createdBy}</em>
                            </Link>) : (<em>{post.createdBy}</em>)}
                            </p>
                            <p className="post-tags">
                                { post?.tags?.length && post.tags.map((tag) => (
                                    <Chip variant="outlined" key={ tag } label={ tag } />
                                )) }
                            </p>
                        </div>
                    </header>
                    <p className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                </main>
            )}
        </div>
    )
}

export default Post