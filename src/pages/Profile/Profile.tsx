import './Profile.scss'
import { ReactElement } from 'react'
import UserDetails from '../../components/UserDetails/UserDetails'
import { useAuthValue } from '../../hooks/useAuthValue'
import PostList from '../../components/PostList/PostList.tsx'

const Profile = (): ReactElement => {
	const { user } = useAuthValue()

	return (
		<div className="Profile">
			<h1>My Profile</h1>
			<UserDetails user={ user }/>
			<PostList userId={ user.uid }/>
		</div>
	)
}

export default Profile