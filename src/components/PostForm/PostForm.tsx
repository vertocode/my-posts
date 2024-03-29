import './PostForm.scss'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { useInsertDocument } from '../../hooks/useInsertDocument.tsx'
import { useAuthValue } from '../../hooks/useAuthValue.ts'
import { useNavigate } from 'react-router-dom'
import { useUpdateDocument } from '../../hooks/useUpdateDocument.ts'
import { Post } from '../../types/Post.ts'

interface PostFormProps {
    title?: string
    description?: string
    post?: Post
    id?: string
}

const PostForm = ({ post, title, description, id }: PostFormProps): ReactElement => {
	const [postTitle, setPostTitle] = useState(post?.title || '')
	const [image, setImage] = useState(post?.image || '')
	const [tags, setTags] = useState(post?.tags || [])
	const [formError, setFormError] = useState('')
	const [tagHtml, setTagHtml] = useState('')
	const [customTag, setCustomTag] = useState('')
	const [customColor, setCustomColor] = useState('black')
	const { insertDocument, response: { loading, error: documentError } } = useInsertDocument('posts')
	const { updateDocument } = useUpdateDocument('posts')
	const { user } = useAuthValue()
	const navigate = useNavigate()

	useEffect(() => setFormError(documentError), [documentError])

	const [editableElements] = useState([
		{ tag: 'h1', title: 'Title' },
		{ tag: 'h2', title: 'Sub Title' },
		{ tag: 'h3', title: 'Sub Title 2' },
		{ tag: 'p', title: 'Paragraph' },
		{ tag: 'blockquote', title: 'Blockquote' },
		{ tag: 'code', title: 'Code' }
	])

	const handleSubmit = async (e) => {
		setFormError('')
		e.preventDefault()
		const postContent = document.querySelector('.post-content')
		const content = postContent.getInnerHTML()

		if (!postTitle || !content) {
			setFormError('Please fill all the required fields')
			return
		}

		const isCreator = user?.uid === post?.uid
		if (post && !isCreator) {
			setFormError('You are not allowed to edit this post, only the creator can edit it.')
			return
		}

		const data = {
			title: postTitle,
			image,
			content,
			tags,
			uid: user.uid,
			createdBy: user.displayName,
			createdUserImage: user?.photoURL || '',
		}

		if (post) {
			await updateDocument(data, id)
		} else {
			await insertDocument(data)
		}

		navigate('/')
	}


	const focusPost = () => {
		const postContent = document.querySelector('.post-content')
		postContent.focus()
	}

	const handleEdit = useCallback((htmlTag) => {
		const postContent = document.querySelector('.post-content')
		const selectedText = window.getSelection().toString()
		const [elementWithText] = Array.from(document.querySelectorAll('.post-content *')).filter(element => element.innerText.includes(selectedText))
		const { localName = null } = elementWithText || {}
		if (!localName && selectedText) {
			postContent.innerHTML = postContent.innerHTML.replace(`${selectedText}`, `<${htmlTag}>${selectedText}</${htmlTag}>`)
		} else if (selectedText) {
			// Get the element with all the attributes
			const regex = new RegExp(`<(${localName})([^>]*)>${selectedText}</${localName}>`, 'g')
			postContent.innerHTML = postContent.innerHTML.replace(regex, `<${htmlTag} style="color: ${customColor}">${selectedText}</${htmlTag}>`)
		} else {
			const text = (() => {
				switch (htmlTag) {
				case 'h1':
					return 'Title'
				case 'h2':
					return 'Sub Title'
				case 'p':
					return 'Paragraph'
				case 'blockquote':
					return 'Blockquote'
				case 'code':
					return 'Code'
				default:
					return 'Text'
				}
			})()
			postContent.innerHTML = postContent.innerHTML += `<${htmlTag} style="color: ${customColor}">${text}</${htmlTag}>`
		}
	}, [customColor])

	useEffect(() => {
		if (tagHtml) {
			handleEdit(tagHtml)
			setTagHtml('')
		}
	}, [handleEdit, tagHtml])

	useEffect(() => {
		const selectedText = window.getSelection().toString()
		if (customColor && selectedText) {
			const postContent = document.querySelector('.post-content')
			const [elementWithText] = Array.from(document.querySelectorAll('.post-content *')).filter(element => element.innerText.includes(selectedText))
			const { localName = null } = elementWithText || {}

			// Get the element with all the attributes
			const regex = new RegExp(`<(${localName})([^>]*)>${selectedText}</${localName}>`, 'g')
			postContent.innerHTML = postContent.innerHTML.replace(regex, `<${localName} style="color: ${customColor}">${selectedText}</${localName}>`)
		}
	}, [customColor])

	return (
		<div className="PostForm">
			{title && <h1>{ title }</h1> }
			{description && <p>{ description }</p> }
			<form onSubmit={ handleSubmit }>
				<TextField
					style={{ width: '70%', margin: 'auto' }}
					required
					value={ postTitle }
					type="text"
					label="Title"
					variant="standard"
					onChange={ (e) => setPostTitle(e.target.value) }
				/>
				<div className="image-url">
					<TextField
						value={ image }
						type="text"
						label="Image URL"
						variant="standard"
						onChange={ (e) => setImage(e.target.value) }
					/>
					{ image && <img src={ image } alt="image URL typed"/> }
				</div>


				<div className="create-post">
					<blockquote className="post-content" contentEditable="true" suppressContentEditableWarning={true}>
						{
							post ? (
								<div dangerouslySetInnerHTML={{ __html: post.content }} />
							) : (
								<div>
									<h1>MyPosts</h1>
									<p>You can edit and style this content.</p>
									<p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in odio eget quam varius tristique. Donec faucibus eros tortor. Etiam auctor scelerisque erat. Curabitur mollis scelerisque metus et scelerisque. Nam sapien enim, tristique a mauris a, finibus luctus est. Phasellus hendrerit odio malesuada justo ultrices viverra. In a risus non nibh tempor placerat sit amet nec ex. Proin sed interdum tellus, quis iaculis sem. Nam mi quam, dictum non lobortis quis, vestibulum auctor ante. Donec ut sagittis orci. Aliquam vitae est nec nunc varius maximus. Maecenas malesuada laoreet euismod. Cras lobortis ex non ligula mattis lacinia. Maecenas ornare eleifend mattis. Morbi pretium malesuada quam, a auctor est viverra tempor. Aliquam scelerisque eros a magna placerat, et pulvinar diam sagittis.
									</p>

									<h2>Click here to edit it and start your new post!</h2>
								</div>
							)
						}
					</blockquote>
					<div className="editor">
						<span style={{ cursor: 'pointer', marginTop: '.5em' }} onClick={ focusPost }>Edit <i className="fa fa-edit"></i></span>
						<div className="chips">
							{editableElements.map((element) => (
								<Chip key={`${element.tag}-editable-element`} onClick={ () => setTagHtml(element.tag) } label={ element.title } avatar={ <Avatar>{element.tag}</Avatar> }  />
							))}
							<input onBlur={ (e) => setCustomColor(e.target.value) } type="color"/>
						</div>
					</div>
				</div>


				<div className="tags">
					<div className="input-container">
						<TextField
							value={ customTag }
							variant="standard"
							label="Add Tag"
							onChange={ (e) => setCustomTag(e.target.value) }
						/>
						<Button
							variant="contained"
							color="info"
							onClick={ () => {
								setTags(tags => customTag ? [...tags, customTag] : null)
								setCustomTag('')
							}
							}>
                            Add
						</Button>
					</div>
					{tags?.length > 0 && (
						<div className="tags-container">
							{tags.map((tag) => (
								<Chip
									onDelete={ () => setTags(tags => tags.filter(currentTag => currentTag !== tag)) }
									color="warning" key={ tag } label={ tag }
								/>
							))}
						</div>
					)}
				</div>

				{!loading && <Button type="submit" variant="contained" color={ post ? 'success': 'info' }>{ post ? 'Save' : 'Post' }</Button>}
				{loading && <LoadingButton loading type="submit" variant="contained">Posting...</LoadingButton>}
			</form>
			{formError && <p className="error">{formError}</p>}
		</div>
	)
}

export default PostForm