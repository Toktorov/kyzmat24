import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import './resetPassword.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const params = useParams();
    useEffect(()=>{
        console.log(window.location.href.match('token=').index);
        console.log(window.location.href[window.location.href.match('token=').index + 6 ] );
        console.log(window.location.href.slice(window.location.href.match('token=').index + 6 ) );
        console.log('http://localhost:3000/'.length);
        console.log(`${window.location.href.slice(20)}`)
    },[]);
    return (
        <div>
            <form >
                <input type="password" placeholder={'Введите новый пароль'} onChange={e => setNewPassword(e.target.value)}/>
                <button type={'button'} onClick={()=>{
                    axios.patch(`${window.location.href.slice(20)}`,{
                        "password": newPassword,
                        "token": window.location.href.slice(window.location.href.match('token=').index + 6 ),
                        "uidb64": "MQ"
                    }).then(response => console.log(response))
                }}>Save</button>
            </form>
        </div>
    );
};

export default ResetPassword;