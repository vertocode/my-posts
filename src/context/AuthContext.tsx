import { createContext, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children, value }) => {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthValue() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuthValue must be used within an AuthProvider')
    }

    return context
}