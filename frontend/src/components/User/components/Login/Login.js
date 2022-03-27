import React, {useState} from 'react';
import './login.css';
import axios from "axios";
import {setAuthTokens, setUser} from "../../../../redux/reducers/user";
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux";

const Login = ({setStatus}) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (e) => {
        e.preventDefault();
        axios.post('http://kyzmat24.com/api/token/', {
            headers: {
                'Content-Type': 'application/json'
            },

            username,
            password


        }).then(({data}) => {
            dispatch(setAuthTokens(data));
            dispatch(setUser(jwt_decode(data.access)));
            localStorage.setItem('authTokens', JSON.stringify(data));
        }).catch(() => alert('Неверный пароль или логин'))
    };

    return (
        <div className={'login'}>
            <form onSubmit={loginUser}>
                <input required={true} type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Введите логин" />
                <input required={true} type="password" name="password" onChange={e => setPassword(e.target.value)} placeholder="Введите пароль" />
                <button type="submit">Войти</button>
                <p>Нет аккаунта? Пройди <button onClick={()=> setStatus('signUp')}>регистрацию</button></p>
            </form>

        </div>
    );
};

export default Login;