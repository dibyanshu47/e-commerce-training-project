import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {

    const isAuth = JSON.parse(localStorage.getItem('user') as string)

    if (!isAuth) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute