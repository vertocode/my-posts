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
    const location = useLocation()
    const isSearchRoute = location.pathname.includes('search')
    const { documents: fetchedPosts, loading, search: fetchSearch } = useFetchDocuments('posts')
    const [search, setSearch] = useState(fetchSearch || '')

    const handleSubmit = (e) => {
        e.preventDefault()

        setPosts(fetchedPosts)
        if (search) {
            return navigate(`/search?q=${search}`)
        }
    }

    useEffect(() => {
        console.log('executou aqui', fetchedPosts)
        setPosts(fetchedPosts || [])
    }, [fetchedPosts, location])

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
                    <FormHelperText variant="outlined">Search by title, content, tags, etc.</FormHelperText>
                </div>


                {!loading && <Button size="small" type="submit" variant="contained">Search</Button>}
                {loading && <LoadingButton size="small" loading type="submit" variant="contained">Loading...</LoadingButton>}
            </form>
            <main key={`list-with-search-${search}`}>
                { loading && <p>Loading...</p> }
                {posts.length === 0 && isSearchRoute && !loading && (
                    <div className="noposts">
                        <h2 style={{ color: 'white' }}>No posts found according to your search</h2>
                        <p>Try searching for something else, or clear this search criteria.</p>
                        <Link to="/">
                            <Button variant="contained" color="success">Clear Filter</Button>
                        </Link>
                    </div>
                )}
                {posts.length === 0 && !isSearchRoute && !loading && (
                    <div className="noposts">
                        <h2>No posts found</h2>
                        <p>Try create a new post.</p>
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