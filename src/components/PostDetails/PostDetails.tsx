import './PostDetails.scss'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { useAuthValue } from '../../hooks/useAuthValue'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal.tsx'
import { useState } from 'react'

const PostComponent = ({ post }) => {
	const { title, createdBy, createdAt, image, tags } = post
	const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false)
	const { user } = useAuthValue()
	const navigate = useNavigate()
	const deleteDocument = useDeleteDocument('posts', post.id)

	const isCreator = post?.uid === user?.uid
	const isAdmin = user?.email === 'evertonvanoni1@gmail.com'
	const canEditAndDelete = isCreator || isAdmin

	const formatCreatedAt = () => {
		const date = new Date(createdAt.seconds * 1000)
		return date.toLocaleString()
	}

	return (
		<div className="PostDetails">
			<header>
				<p className="post-meta">
					<span className="post-author">Created by: { post?.uid
						? (
							<>
								<Link to={ `/profile/${post?.uid}` } style={{ display: 'flex', alignItems: 'center' }}>
									{ post?.createdUserImage && <img style={{ borderRadius: '50%', width: '30px', margin: '0 5px', backgroundColor: '#282C34' }} src={ post.createdUserImage } alt={`${createdBy}-image`}/> }
									{createdBy}
								</Link>
							</>
						)
						: (
							{ createdBy }
						)
					}</span>
					<span className="post-date">Created at: {formatCreatedAt()}</span>
				</p>

				{ tags?.length > 0 && (
					<p className="tags">
						{ tags.map((tag, index) => (
							<Chip
								onClick={() => {
									navigate(`/search?q=${tag}`)
									scrollTo(0, 0)
								}}
								style={{ color: '#AAAAAA' }}
								variant="outlined"
								key={ index }
								className="post-tag"
								label={`#${tag}`}
							></Chip>
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
				{ canEditAndDelete && (
					<>
						<Button onClick={ () => navigate(`/posts/edit/${post.id}`) } variant="contained" color="success">Edit</Button>
						<Button onClick={ () => setShowDeleteConfirmationModal(true) } variant="contained" color="error">Delete</Button>
						<ConfirmDeleteModal
							onClose={ () => setShowDeleteConfirmationModal(false) }
							isOpen={ showDeleteConfirmationModal }
							onConfirm={ deleteDocument.deleteDocument}
						/>
					</>
				)}
			</div>


			{/*<p className="post-content" dangerouslySetInnerHTML={{ __html: content }} />*/}
		</div>
	)
}

export default PostComponent
