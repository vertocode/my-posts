import './PostList.scss'
import {ReactElement, useEffect, useState} from 'react'
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useFetchDocuments} from "../../hooks/useFetchDocuments.tsx";
import TextField from "@mui/material/TextField";
import {FormHelperText} from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import PostDetails from "../../components/PostDetails/PostDetails.tsx";

const PostList = (): ReactElement => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const { documents: fetchedPosts, loading, search: fetchSearch } = useFetchDocuments('posts')
    const [search, setSearch] = useState(fetchSearch)
    console.log('posts', posts)

    const handleSubmit = (e) => {
        e.preventDefault()

        setPosts(fetchedPosts)
        console.log('posts', posts)
        console.log('fetchPosts', fetchedPosts)
        if (search) {
            return navigate(`/search?q=${search}`)
        }
    }

    useEffect(() => setPosts(fetchedPosts || []), [fetchedPosts, search])

    return (
        <div className="PostList">
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

export default PostList