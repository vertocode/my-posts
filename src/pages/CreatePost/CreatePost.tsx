import './CreatePost.scss'
import { ReactElement, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

const CreatePost = (): ReactElement => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')
    const [tagHtml, setTagHtml] = useState('')
    const [customTag, setCustomTag] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !body) {
            setFormError('Please fill all the required fields')
            return
        }
    }

    useEffect(() => {
        const postContent = document.querySelector('.post-content')
        postContent.innerHTML = `<${tagHtml}> ${postContent.textContent} </${tagHtml}>`.replaceAll('<>', '')
    }, [tagHtml])

    return (
        <div className="CreatePost">
            <h1>Create Post</h1>
            <p>Write about anything, and share it with other people.</p>
            <form onSubmit={ handleSubmit }>
                <TextField
                    required
                    value={ title }
                    type="text"
                    label="Title"
                    variant="standard"
                    onChange={ (e) => setTitle(e.target.value) }
                />
                <TextField
                    value={ image }
                    type="text"
                    label="Image URL"
                    variant="standard"
                    onChange={ (e) => setImage(e.target.value) }
                />
                <TextField
                    value={ tagHtml }
                    type="text"
                    label="Insert the html tag to your post"
                    variant="standard"
                    onChange={ (e) => setTagHtml(e.target.value) }
                />

                <blockquote className="post-content" contentEditable="true">
                    <h2>MyPosts</h2>
                    <p>This is fundamental to create great posts.</p>

                    <h1>Click here to edit it and write your post!</h1>
                </blockquote>

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
                                    onClick={ () => setTags(tags => tags.filter(currentTag => currentTag !== tag)) }
                                    color="warning" key={ tag } label={ `${tag} X` }
                                />
                            ))}
                        </div>
                    )}
                </div>
                <Button type="submit" variant="contained" color="info">Post</Button>
            </form>
            {formError && <p className="error">{formError}</p>}
        </div>
    )
}

export default CreatePost