import React, {useEffect, useState} from 'react';
import axios from "axios";
import './resetPassword.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const token = window.location.href.slice(window.location.href.indexOf('token=') + 6 );
    const start = window.location.href.indexOf('uidb64=') + 7;
    const end = window.location.href.indexOf("&", start);
    const uidb64 = window.location.href.slice(start, end );
    useEffect(()=>{
        // console.log(window.location.href.match('token=').index);
        // console.log(window.location.href[window.location.href.match('token=').index + 6 ] );
        // console.log(window.location.href.slice(window.location.href.match('token=').index + 6 ) );
        // console.log('http://localhost:3000/'.length);
        // console.log(`${window.location.href.slice(20)}`)
        console.log("token:", token);
        console.log("uidb64:", uidb64)
    },[]);
    return (
        <div>
            <form className={'reset-password-form'}>
                <input type="password" placeholder={'Введите новый пароль'} onChange={e => setNewPassword(e.target.value)}/>
                <button type={'button'} onClick={()=>{
                    axios.patch(`/api/users/password-reset-complete`,{
                        "password": newPassword,
                         token,
                         uidb64
                    }).then(response =>{
                        console.log(response);
                      alert('Вы успешно поменяли пароль')
                    }).catch((error)=>{
                        console.log(error.response);
                        alert('Произошла ошибка(')
                    })
                }}>Save</button>
            </form>
        </div>
    );
};

export default ResetPassword;