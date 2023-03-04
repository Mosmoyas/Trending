import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = (props) => {

    console.log(props.children)
    if (!localStorage.getItem('userToken')) {
        console.log('notallowed');
        <Navigate to='/login' />

    } else {
        return props.children;
    }

}

export default ProtectedRoute
