import './PostDetails.scss'
import Chip from '@mui/material/Chip'

const PostComponent = ({ post }) => {
    const { title, content, createdBy, createdAt, image, tags } = post

    const formatCreatedAt = () => {
        const date = new Date(createdAt.seconds * 1000)
        return date.toLocaleString()
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
                        Tags:
                        { tags.map((tag, index) => (
                            <Chip style={{color: 'white'}} variant="outlined" key={ index } className="post-tag" label={tag}>{ tag }</Chip>
                        ))}
                    </p>
                )}
            </header>
            { image && (
                <div style={{
                    textAlign: 'center',
                    height: '200px',
                    backgroundImage: `url(${image})`,
                    display: 'flex',
                    objectFit: 'contain',
                    backgroundSize: 'cover',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        backgroundColor: 'white',
                        width: '100%',
                    }} className="post-title">{ title }</h1>
                </div>
            )}
            {
                !image && (
                    <h1 style={{ textAlign: 'center' }} className="post-title">{ title }</h1>
                )
            }

            <p className="post-content" dangerouslySetInnerHTML={{ __html: content }} />

        </div>
    )
}

export default PostComponent
