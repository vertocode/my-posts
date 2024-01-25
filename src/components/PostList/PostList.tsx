import './PostList.scss'
import { ReactElement, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments.tsx'
import TextField from '@mui/material/TextField'
import { FormHelperText } from '@mui/material'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import PostDetails from '../PostDetails/PostDetails.tsx'

const PostList = ({ userId = null, isLogged }): ReactElement => {
	const [posts, setPosts] = useState([])
	const navigate = useNavigate()
	const location = useLocation()
	const isSearchRoute = location.pathname.includes('search')
	const { documents: fetchedPosts, loading, search: fetchSearch } = useFetchDocuments('posts', userId)
	const [search, setSearch] = useState(fetchSearch || '')

	const handleSubmit = (e = null) => {
		if (e) {
			e.preventDefault()
		}

		setPosts(fetchedPosts)
		if (search) {
			return navigate(`/search?q=${search}`)
		}
	}

	useEffect(() => {
		setPosts(fetchedPosts || [])
	}, [fetchedPosts, location])

	return (
		<div className="PostList">
			<h1>{isLogged ? 'All your posts' : 'All posts'}</h1>
			<form onSubmit={ handleSubmit }>
				<div>
					<TextField
						value={ search }
						type="text"
						onChange={ (e) => setSearch(e.target.value) }
					/>
					<FormHelperText variant="outlined">Search by title, content, tags, etc.</FormHelperText>
				</div>


				{!loading && <Button disabled={ !search } size="small" type="submit" variant="contained">Search</Button>}
				{loading && <LoadingButton size="small" loading type="submit" variant="contained">Loading...</LoadingButton>}
				{!loading && isSearchRoute && <Button onClick={ () => navigate('/') } size="small" type="submit" color="success" variant="contained">Clear</Button>}
			</form>
			<main key={`list-with-search-${search}`}>
				{ loading && <p>Loading...</p> }
				{posts && posts.length === 0 && isSearchRoute && !loading && (
					<div className="noposts">
						<h2>No posts found according to your search</h2>
						<p>Try searching for something else, or clear this search criteria.</p>
						<Link to="/">
							<Button variant="contained" color="success">Clear Filter</Button>
						</Link>
					</div>
				)}
				{posts && posts.length === 0 && !isSearchRoute && !loading && (
					<div className="noposts">
						<h2>{userId ? 'No posts created by you' : 'No posts found'}</h2>
						<p>Try create a new post.</p>
						<Link to="/posts/create">
							<Button variant="contained" color="success">New Post</Button>
						</Link>
					</div>
				)}
				{posts && posts.map((post, index) => (
					<PostDetails key={ `post-${index}-${post?.uid || '0'}` } post={ post } />
				))}
			</main>
		</div>
	)
}

export default PostList