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

    const focusPost = () => {
        const postContent = document.querySelector('.post-content')
        postContent.focus()
    }

    const handleEdit = (htmlTag) => {
        const postContent = document.querySelector('.post-content')
        const selectedText = window.getSelection().toString()
        const [elementWithText] = Array.from(document.querySelectorAll('.post-content *')).filter(element => element.innerText.includes(selectedText))
        const { localName = null } = elementWithText || {}
        console.log(localName)
        if (!localName && selectedText) {
            postContent.innerHTML = postContent.innerHTML.replace(`${selectedText}`, `<${htmlTag}>${selectedText}</${htmlTag}>`)
            return
        } else if (selectedText) {
            postContent.innerHTML = postContent.innerHTML.replace(`<${localName}>${selectedText}</${localName}>`, `<${htmlTag}>${selectedText}</${htmlTag}>`)
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
            postContent.innerHTML = postContent.innerHTML += `<${htmlTag}>${text}</${htmlTag}>`
        }
    }

    useEffect(() => {
        handleEdit(tagHtml)
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

                <div className="create-post">
                    <blockquote className="post-content" contentEditable="true" suppressContentEditableWarning={true}>
                        <h1>MyPosts</h1>
                        <p>You can edit and style this content.</p>

                        <h2>Click here to edit it and write your post!</h2>
                    </blockquote>
                    <div className="editor">
                        <span style={{ cursor: 'pointer' }} onClick={ focusPost }>Edit <i className="fa fa-edit"></i></span>
                        <div className="chips">
                            <Chip onClick={ () => setTagHtml('h1') } label="Title"  />
                            <Chip onClick={ () => setTagHtml('h2') } label="Sub Title"  />
                            <Chip onClick={ () => setTagHtml('p') } label="Paragraph"  />
                            <Chip onClick={ () => setTagHtml('blockquote') } label="Blockquote" />
                            <Chip onClick={ () => setTagHtml('code') } label="Code"  />
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