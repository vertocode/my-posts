import { Post } from './Post.ts'

type Document = Post | null
type Error = string | null
type Loading = boolean

export interface FetchDocument {
    document: Document
    error: Error
    loading: Loading
}