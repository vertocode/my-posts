import './Profile.scss'
import {ReactElement, useEffect, useState} from 'react'
import UserDetails from '../../components/UserDetails/UserDetails'
import PostList from '../../components/PostList/PostList.tsx'
import { useParams } from 'react-router-dom'
import { useUserCollection } from '../../hooks/useUserCollection'
import Button from "@mui/material/Button";
import {useAuthValue} from "../../hooks/useAuthValue.ts";

const Profile = (): ReactElement => {
	const { id: userId } = useParams()
	const { getUserById, loading, error, user } = useUserCollection()
	const { user: userLogged } = useAuthValue()

	const isLoggedProfile = user?.uid === userLogged?.uid

	useEffect(() => {
		const getUser = async () => {
			if (userId) {
				await getUserById(userId)
			}
		}

		getUser()
	}, [userId])

	return (
		<div className="Profile">
			<h1>{ isLoggedProfile ?  'My Profile' : `${user.displayName}'s Profile` }</h1>
			{
				loading && <p>Loading...</p>
			}
			{
				error && <p className="error">{ error }</p>
			}
			{
				!userId || (!loading && !user) && (
					<>
						<p className="error">User not found</p>
						<Button variant="outlined" color="warning">Home</Button>
					</>
				)
			}
			{
				user && (
					<>
						<UserDetails user={ user } />
						<PostList userId={ user.uid } isLogged={ isLoggedProfile }/>
					</>
				)
			}
		</div>
	)
}

export default Profile