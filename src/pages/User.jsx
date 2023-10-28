import React from 'react';
import { useParams, Link } from 'react-router-dom'

function User() {

    const { id } = useParams();


    return (
        <div className='App'>
            <h2>user page</h2>
            <p>{id}</p>
            <Link to='/dasbhoard'>Dasbhoard</Link>
        </div>
    );
}

export {User};