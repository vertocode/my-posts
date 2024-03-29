import {ReactElement, useEffect} from 'react'
import './UserDetails.scss'
import UserPNG from '../../assets/images/user.png'
import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useUserUpdate } from '../../hooks/useUserUpdate'
import LoadingButton from '@mui/lab/LoadingButton'
import {useAuthValue} from "../../hooks/useAuthValue.ts";

const UserDetails = ({ user }): ReactElement => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [photoURL, setPhotoURL] = useState('')
	const [isEditingName, setIsEditingName] = useState(false)
	const [isEditingEmail, setIsEditingEmail] = useState(false)
	const [isEditingPhotoURL, setIsEditingPhotoURL] = useState(false)
	const { updateUser, updateEmailUser, loading, error, updateDBEmailUser,updateDBUser  } = useUserUpdate()
	const { user: userLogged } = useAuthValue()

	const isLoggedProfile = user?.uid === userLogged?.uid

	useEffect(() => {
		setName(user.displayName)
		setEmail(user.email)
		setPhotoURL(user.photoURL)
	}, [user])

	const hasEmailChanged = () => {
		return email !== user.email
	}

	const hasChanged = () => {
		return name !== user.displayName || hasEmailChanged() || photoURL !== user.photoURL
	}

	const save = async () => {
		setIsEditingName(false)
		setIsEditingEmail(false)
		setIsEditingPhotoURL(false)

		if (hasEmailChanged()) {
			await updateEmailUser(email)
			await updateDBEmailUser({ email }, user.uid)
		}

		if (photoURL !== user.photoURL || name !== user.displayName) {
			await updateUser({ displayName: name, photoURL })
			await updateDBUser({ displayName: name, photoURL }, user.uid)
		}
	}

	return (
		<div className="UserDetails">
			<header>
				<h1>User's Details</h1>
				{ hasChanged() && !loading && <Button variant="contained" onClick={save}>Save</Button> }
				{ loading && <LoadingButton loading variant="contained">Loading...</LoadingButton> }
			</header>

			<div className="user-info">
				<div className="profile-pic">
					<img src={photoURL || UserPNG} alt="User's profile picture" />
					{!isEditingPhotoURL && isLoggedProfile && <i className="fa fa-edit" onClick={ () => setIsEditingPhotoURL(true) }></i>}
					{isEditingPhotoURL && (
						<TextField
							onChange={(e) => setPhotoURL(e.target.value)}
							onBlur={() => setIsEditingPhotoURL(false)}
							label="Photo URL"
							variant="standard"
							value={photoURL}
							type="text"
						/>
					)}
				</div>
				<div className="info">
					<p><strong>User ID:</strong> {user?.uid}</p>
					{isEditingName
						? (
							<p>
								<strong>Name:</strong>
								<TextField
									value={ name }
									type="text"
									onBlur={ () => setIsEditingName(false) }
									onChange={ (e) => setName(e.target.value) }
								/>
							</p>
						)
						: (
							<p>
								<strong>Name:</strong> {name}
								{ isLoggedProfile && <i className="fa fa-edit" onClick={ () => setIsEditingName(true) }></i> }
							</p>
						)}
					{isEditingEmail
						? (
							<p>
								<strong>Email:</strong>
								<TextField
									value={ email }
									type="text"
									onBlur={ () => setIsEditingEmail(false) }
									onChange={ (e) => setEmail(e.target.value) }
								/>
							</p>
						)
						: (
							<p>
								<strong>Email:</strong> {email}
								{/*<i className="fa fa-edit" onClick={ () => setIsEditingEmail(true) }></i>*/}
							</p>
						)}
				</div>
			</div>
			{/*<div className="token-info">*/}
			{/*    <p><strong>Access Token:</strong> {user.stsTokenManager.accessToken}</p>*/}
			{/*    <p><strong>Refresh Token:</strong> {user.stsTokenManager.refreshToken}</p>*/}
			{/*</div>*/}

			{ error && <p style={{ color: 'red' }}>{error}</p> }
		</div>
	)
}

export default UserDetails
