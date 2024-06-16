import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedComponent = ({ children }) => {
    const location = useLocation();

    if (!localStorage.getItem("auth")) {
        return <Navigate to='/login' />
    } else {
        return <>{children}</>
    }
}

export default ProtectedComponent
