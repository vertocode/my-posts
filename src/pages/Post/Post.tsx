import './Post.scss'
import { ReactElement } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useState } from 'react'
import Chip from '@mui/material/Chip'

const Post = (): ReactElement => {
    const { id = '' } = useParams()
    const { document: post, loading, error } = useFetchDocument('posts', id)
    const [background] = useState(document?.backgroundColor || 'white')
    console.log(post)

    const date = new Date(post?.createdAt?.seconds * 1000) || null
    const formattedDate = date ? date.toLocaleString() : null

    return (
        <div className="Post" style={{ backgroundColor: background }}>
            {error && <p className="error">{ error }</p>}
            {loading && <p>Loading...</p>}
            {!loading && !error && post && (
                <main>
                    <header>
                        { post?.image && (
                            <div className="post-image" style={{
                                background: `url(${post.image}`,
                                width: '100%',
                                height: '400px',
                            }}>
                                <h1>{ post.title }</h1>
                            </div>
                        )}
                        { !post?.image && <h1>{ post.title }</h1> }
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