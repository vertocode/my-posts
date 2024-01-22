import {useContext} from "react"
import { AuthProvider } from "../context/AuthContext"

export function useAuthValue() {
    const context = useContext(AuthProvider)

    if (context === undefined) {
        throw new Error('useAuthValue must be used within an AuthProvider')
    }

    return context
}