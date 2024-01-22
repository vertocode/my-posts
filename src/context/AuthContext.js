import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children, value }) => {
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
export function useAuthValue() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthValue must be used within an AuthProvider');
    }
    return context;
}
