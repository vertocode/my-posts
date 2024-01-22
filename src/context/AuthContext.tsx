import { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children, value }) => {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}