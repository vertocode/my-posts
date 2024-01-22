import './Profile.scss'
import { ReactElement } from 'react'

import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import UserDetails from '../../components/UserDetails/UserDetails'

// hooks
import { useState } from 'react'
import { useAuthValue } from '../../hooks/useAuthValue'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Profile = (): ReactElement => {
    const [posts, setPosts] = useState([])
    const { user } = useAuthValue()
    const { uid: userId } = user || {}

    return (
        <div className="Profile">
            <h1>My Profile</h1>
            <UserDetails user={ user }/>

            {posts && posts.length === 0 && (
                <div className="noposts">
                    <h3>No posts found</h3>
                    <Link to="posts/create">
                        <Button variant="contained">New Post</Button>
                    </Link>
                </div>
            )}

        </div>
    )
}

export default Profile