import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export function useAuthValue() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuthValue must be used within an AuthProvider')
    }

    return context
}