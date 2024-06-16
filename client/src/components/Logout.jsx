import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom'

const Logout = () => {
    useEffect(() => {
        localStorage.clear();
    }, [])

    return <Navigate to={'/login'} />

}

export default Logout
