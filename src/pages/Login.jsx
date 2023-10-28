import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom'

function Login({ setAuth }) {

    const useNav = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('sumbit!')
        setAuth(true);
        useNav('/dasbhoard')
    }

    return ( 
        <Fragment>
            <h3 className="App">Login</h3>
            <form className="login" onSubmit={handleSubmit}>
                <input type="text" placeholder='user'/>
                <br />
                <input type="text" placeholder='password'/>
                <br />
                <button>login</button>
            </form>

        </Fragment>
    );
}

export {Login};