import './PostDetails.scss'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { useAuthValue } from '../../hooks/useAuthValue'
import { useNavigate } from 'react-router-dom'

const PostComponent = ({ post }) => {
    const { title, createdBy, createdAt, image, tags } = post
    const { user } = useAuthValue()
    const navigate = useNavigate()

    const isCreator = post.createdBy === user?.displayName

    const formatCreatedAt = () => {
        const date = new Date(createdAt.seconds * 1000)
        return date.toLocaleString()
    }

    const editPost = e => {
        console.log('editing post')
    }

    const deletePost = e => {
        console.log('deletando post')
    }

    return (
        <div className="PostDetails">
            <header>
                <p className="post-meta">
                    <span className="post-author">Created by: {createdBy}</span>
                    <span className="post-date">Created at: {formatCreatedAt()}</span>
                </p>

                { tags?.length > 0 && (
                    <p className="tags">
                        { tags.map((tag, index) => (
                            <Chip style={{color: '#AAAAAA'}} variant="outlined" key={ index } className="post-tag" label={`#${tag}`}></Chip>
                        ))}
                    </p>
                )}
            </header>
            { image && (
                <div style={{
                    textAlign: 'center',
                    height: '200px',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${image})`,
                    display: 'flex',
                    objectFit: 'contain',
                    backgroundSize: 'cover',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        backgroundColor: '#282C34',
                        width: '100%',
                    }} className="post-title">{ title }</h1>
                </div>
            )}
            {
                !image && (
                    <h1 style={{ textAlign: 'center' }} className="post-title">{ title }</h1>
                )
            }

                <div className="action-buttons">
                    <Button onClick={ () => navigate(`/posts/${post.id}`) } variant="contained">View</Button>
                    { isCreator && (
                        <>
                            <Button onClick={ editPost } variant="contained" color="success">Edit</Button>
                            <Button onClick={ deletePost } variant="contained" color="error">Delete</Button>
                        </>
                    )}
                </div>


            {/*<p className="post-content" dangerouslySetInnerHTML={{ __html: content }} />*/}
        </div>
    )
}

export default PostComponent
