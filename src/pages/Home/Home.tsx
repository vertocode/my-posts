import './Home.scss'
import { ReactElement } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormHelperText } from '@mui/material'

const Home = (): ReactElement => {
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

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
                {posts.length === 0 && (
                    <div className="noposts">
                        <h2 style={{ color: 'white' }}>No posts found</h2>
                        <p>Try searching for something else, or create a new post.</p>
                        <Link to="/posts/create">
                            <Button variant="contained" color="success">Create Post</Button>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Home