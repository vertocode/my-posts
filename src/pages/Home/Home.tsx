import './Home.scss'
import { ReactElement } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormHelperText } from '@mui/material'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetails from '../../components/PostDetails/PostDetails'

const Home = (): ReactElement => {
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const { documents: fetchedPosts, loading, error } = useFetchDocuments('posts')
    console.log(fetchedPosts)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => fetchedPosts?.length ? setPosts(fetchedPosts) : undefined, [fetchedPosts])

    return (
        <div className="Home">
            <h1>All Posts</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <TextField
                        value={ search }
                        type="text"
                        onChange={ (e) => setSearch(e.target.value) }
                    />
                    <FormHelperText style={{ color: 'white' }} variant="outlined">Search by title, content, tags, etc.</FormHelperText>
                </div>


                {!loading && <Button size="small" type="submit" variant="contained">Search</Button>}
                {loading && <LoadingButton size="small" loading type="submit" variant="contained">Loading...</LoadingButton>}
            </form>
            <main>
                { loading && <p>Loading...</p> }
                {posts.length === 0 && !loading && (
                    <div className="noposts">
                        <h2 style={{ color: 'white' }}>No posts found</h2>
                        <p>Try searching for something else, or create a new post.</p>
                        <Link to="/posts/create">
                            <Button variant="contained" color="success">Create Post</Button>
                        </Link>
                    </div>
                )}
                {posts.map((post) => (
                    <Link style={{ width: '80%' }} to={ `/posts/${post.id}` } key={ post.id }>
                        <PostDetails key={ post.id } post={ post } />
                    </Link>
                ))}
            </main>
        </div>
    )
}

export default Home