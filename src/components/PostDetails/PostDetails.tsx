import './PostDetails.scss'

const PostComponent = ({ post }) => {
    const { title, content, createdBy, createdAt, image } = post

    const formatCreatedAt = () => {
        const date = new Date(createdAt.seconds * 1000)
        return date.toLocaleString()
    }

    return (
        <div className="PostDetails">
            <header>
                <h1 className="post-title">{ title }</h1>
                <p className="post-meta">
                    <span className="post-author">Created by: {createdBy}</span>
                    <span className="post-date">Created at: {formatCreatedAt()}</span>
                </p>
            </header>
            { image && (
                <div style={{ textAlign: 'center' }}>
                    <img src={ image } alt={ title } />)
                </div>
            )}
            <p className="post-content" dangerouslySetInnerHTML={{ __html: content }} />

        </div>
    )
}

export default PostComponent
