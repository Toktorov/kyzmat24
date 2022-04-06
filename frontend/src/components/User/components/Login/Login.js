import React, {useState} from 'react';
import './login.css';
import axios from "axios";
import {setAuthTokens, setUser} from "../../../../redux/reducers/user";
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux";

const Login = ({setStatus}) => {
    const dispatch = useDispatch();
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('https://cors-anywhere.herokuapp.com/http://kyzmat24.com/api/token/', {
            headers: {
                'Content-Type': 'application/json'
            },

            username,
            password


        }).then(({data}) => {
            setUserStatus(true);
            setLoading(false);
            dispatch(setAuthTokens(data));
            dispatch(setUser(jwt_decode(data.access)));
            localStorage.setItem('authTokens', JSON.stringify(data));
        }).catch(() => {
            setUserStatus(false);
            setLoading(false)
        })
    };

    return (
        <div className={'login'}>
            <form onSubmit={loginUser}>
                <h3>Вход в аккаунт</h3>
                {
                    userStatus === false ? <h4 className={'error'}>Неверный пароль или логин</h4> : ''
                }

                <input required={true} type="text" name="username" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Введите логин"/>
                <input required={true} type="password" name="password" onChange={e => setPassword(e.target.value)}
                       placeholder="Введите пароль"/>
                {
                    loading === true ? <div className="lds-ring">
                        <div> </div>
                        <div> </div>
                        <div> </div>
                        <div> </div>
                    </div> : <>  <button className={'login-btn'} type="submit">Войти</button>
                        <p>Нет аккаунта? Пройди <button className={'login-btn-link'}
                                                        onClick={() => setStatus('signUp')}>регистрацию</button></p>
                    </>
                }


            </form>

        </div>
    );
};

export default Login;