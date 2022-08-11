import React, {useEffect, useState} from 'react';
import axios from "axios";
import {setAuthTokens, setUser, setNewUser, setId} from "../../../../redux/reducers/user";
import jwt_decode from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";

const SignUp = ({setStatus, loginUser}) => {
    const id = useSelector(s => s.user.id);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userStatus, setUserStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

   const signUp = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('/api/users/register/', {
            headers: {
                'Content-Type': 'application/json'
            },
            username,
            password,
            password2,
        }).then((response) => {
            setLoading(true);
            loginUser(e, username, password, setLoading, setUserStatus);
        }).catch((error) => {
            setUserStatus(false);
            setLoading(false);
            if (error.response.data.password){
                setErrorMessage(error.response.data.password[0]);
                console.log(error.response.data?.password[0]);
            } else if(error.response.data.username){
                setErrorMessage(error.response.data.username[0]);
                console.log(error.response.data?.username[0])
            }
        });
    };


    return (
        <div className={'login'}>
            <form onSubmit={(e)=> signUp(e)}>
                <h3>Регистрация</h3>
                {
                    userStatus === false && loading === false ?
                        <h4 className={'error'}>{errorMessage}</h4> : ''
                }
                <input required={true} type="text" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Введите логин"/>
                <input required={true} type="password" onChange={e => setPassword(e.target.value)}
                       placeholder="Введите пароль"/>
                <input required={true} type="password" onChange={e => setPassword2(e.target.value)}
                       placeholder="Подтвердите пароль"/>
                {
                    loading === true ? <div className={'login-preloader'}>
                        <div className="lds-ring lds-ring-white">
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>
                    </div>: <>
                        <button className={'login-btn'} type="submit">Зарегистрироваться</button>
                        <p>Есть аккаунт? <button className={'login-btn-link'}
                                                 onClick={() => setStatus('login')}>Войти</button></p>
                    </>
                }

            </form>
        </div>
    );
};

export default SignUp;