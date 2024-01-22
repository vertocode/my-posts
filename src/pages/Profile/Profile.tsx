import './Profile.scss'
import { ReactElement } from 'react'

import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import UserDetails from '../../components/UserDetails/UserDetails'

// hooks
import { useAuthValue } from '../../hooks/useAuthValue'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Profile = (): ReactElement => {
    const { user } = useAuthValue()
    const { uid: userId } = user || {}
    const { documents: posts, loading, error } = useFetchDocuments('posts', userId)

    return (
        <div className="Profile">
            <h1>My Profile</h1>
            <UserDetails user={ user }/>

            {posts && posts.length === 0 && (
                <div className="noposts">
                    <h3>No posts created by you</h3>
                    <Link to="/posts/create">
                        <Button variant="contained">New Post</Button>
                    </Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <h3>{post.title}</h3>
            ))}

        </div>
    )
}

export default Profile