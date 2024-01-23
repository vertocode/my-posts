import { ReactElement } from 'react'
import { useParams } from "react-router-dom";
import PostForm from "../../components/PostForm/PostForm.tsx"
import { useFetchDocument } from "../../hooks/useFetchDocument.ts"

const EditPost = (): ReactElement => {
    const { id } = useParams()
    const { document: post, loading, error } = useFetchDocument('posts', id)

    return (
        <div className="EditPost">
            { loading && <p>Loading...</p> }
            { error && <p className="error">{ error }</p> }
            { post && <PostForm
                title="Edit Post"
                post={ post }
                id={ id }
            />
            }
        </div>
    )
}

export default EditPost