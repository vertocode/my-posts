import { updateProfile, updateEmail } from 'firebase/auth'
import { useAuthentication } from './useAuthentication'
import { useState } from 'react'

export const useUserUpdate = () => {
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { auth } = useAuthentication()

	const updateUser = async (data) => {
		setLoading(true)
		setError('')

		try {
			console.log('data', data)
			await updateProfile(auth.currentUser, data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const updateEmailUser = async (email) => {
		setLoading(true)

		try {
			await updateEmail(auth.currentUser, email)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return {
		error,
		loading,
		updateUser,
		updateEmailUser
	}
}