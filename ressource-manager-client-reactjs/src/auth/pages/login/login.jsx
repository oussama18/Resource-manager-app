import Header from '../../../components/common/Header';
import Login from '../../../components/auth/Login';
import React,{useState} from 'react';

import './login.css'

const LoginPage = () => {

    return(
        <div className="content">
            <Header />

            <main className='main-login'>
                <div className='main-content'>
                    <Login />
                </div>
            </main>
        </div>
    );
}

export default LoginPage;