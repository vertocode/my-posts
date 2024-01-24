import { ReactElement } from 'react'
import PostForm from '../../components/PostForm/PostForm.tsx'

const CreatePost = (): ReactElement => {
	return (
		<PostForm
			title="Create Post"
			description="Write about anything, and share it with other people."
		/>
	)
}

export default CreatePost